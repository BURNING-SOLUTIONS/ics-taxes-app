$(function () {
    class IcsTaxesTraslate {      

        constructor(arr) {
            var that = this;
            this._oFileIn = document.getElementById('file_prices_list_input');
            this._buttonSubmit = document.getElementById("butttonCalculeTarifas");
            this._consoleElement = document.getElementById("console-container");
            this._progressBarElement = $("div.progress-bar");
            this._ajaxLoadRequest = $('#ajaxLoadRequest');
            this._servicios_locales_table = $("table#servicios_locales");
            this._liReportsDisponibles = $("ul#reportListAvailable li.available");
            this._liReportsSelected = $("ul#reportListAvailable li.selected");
            this._inputSearchClient = $("input#searchClientData");
            this._modalEmail = $('#exampleModal');
            this._inputSearchEmpresa = $("input#searchClientEmpresa");
            this._rangeRadio = $('#range');
            this._buttonSendCientRange = $('#searchClientData_btn');
            this._array_lista_precios = arr || [];
            this._array_lista_tarifas_fijas = [];
            this.registerListeners();
        }

        set consoleElement(consoleElement) {
            this._consoleElement = consoleElement;
        }

        get consoleElement() {
            return this._consoleElement;
        }

        set progressBarElement(progressBarElement) {
            this._progressBarElement = progressBarElement;
        }

        get progressBarElement() {
            return this._progressBarElement;
        }

        get serviciosLocalesTable() {
            return this._servicios_locales_table;
        }

        set serviciosLocalesTable(servicios_locales_table) {
            this._servicios_locales_table = servicios_locales_table;
        }

        set buttonSubmit(buttonSubmitnew) {
            this._buttonSubmit = buttonSubmitnew;
        }

        get buttonSubmit() {
            return this._buttonSubmit;
        }

        set array_lista_precios(precios) {
            this._array_lista_precios = precios;
        }

        get array_lista_precios() {
            return this._array_lista_precios;
        }

        registerListeners() {
            this.checkRouteType();
            this.markedAllReportsByDefault();            
            this._liReportsDisponibles.click(function (event) {
                $(this).toggleClass('selected');
            });
            this._inputSearchClient.keyup((event) => {
                if (event.which === 13) {
                    event.preventDefault();
                    this.sendServerRequest();
                }
            });
            this._buttonSendCientRange.click(() => {
                event.preventDefault();
                this.sendServerRequestRangeClients();
            });

            $("button#sendEmail").on('click', this.sendClientEmail);
            /*evento para el model levante*/

            ($("#modal-report").find("input")).on('click', function () {

            });

            this._modalEmail.on('show.bs.modal', (e) => {
                $('#recipient-address').val($('#containerEmail').val());

                var value = $("#modal-report").find("input");
                (value).each(function (index, item) {
                    $(item).prop('checked', false);
                });

                array_nombres_reportes.forEach(function (element) {
                    $('#chbox_' + element).prop('checked', true);                  
                }, this);
            });

            this._modalEmail.on('hide.bs.modal', (e) => {
                var value = $("#modal-report").find("input"); 
                (value).each(function (index, item) {
                    $("#div_show_report [id ='" + $(item).val() + "']").hide();
                });
                $("#div_show_report [id ='" + array_nombres_reportes[indice_activo] + "']").show();
                $('#errorEmailSender').attr('hidden', true);
            });

        }

        markedAllReportsByDefault() {
            let liReportsDisponibles = $("ul#reportListAvailable li.available");
            this._liReportsDisponibles.click();
            this._liReportsDisponibles.addClass('selected');
            $('ul.pagination > li.page-item#0').click();
        }

        checkRouteType() {
            let url = new URL(window.location.href);
            var isExternalLink = url.searchParams.get("external_source");
            //console.info(isExternalLink);
            if (isExternalLink) {
                this.sendServerRequest(true, url.searchParams)
            }/*else{
                console.info(getPermisionsList());
                //if(getPermisionsList().length === 0)
                    //window.location.href = 'index.html';
            }*/
        }

        getTotalReportsSelected() {
            return $("#reportListAvailable").find('li.selected').length;
        }

        showHideLoadSpinner(boolean) {
            let overlay = $('.ngdialog-overlay-blocking');
            (!boolean) ? overlay.removeAttr('hidden') : overlay.attr('hidden', true);
            (!boolean) ? this._ajaxLoadRequest.removeAttr('hidden') : this._ajaxLoadRequest.attr('hidden', true);
        }

        sendClientEmail() {
			/*this._ajaxLoadRequest.removeAttr('hidden');
     		$('.ngdialog-overlay-blocking').removeAttr('hidden');*/
            if ($("#recipient-address").val() && $("#recipient-subject").val() && $("#recipient-message").val()) {

                kendo.pdf.defineFont({
                    "DejaVu Sans": "http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans.ttf",
                    "DejaVu Sans|Bold": "http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
                    "DejaVu Sans|Bold|Italic": "http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
                    "DejaVu Sans|Italic": "http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
                });

                var value = $("#modal-report").find("input");

                (value).each(function (index, item) {
                    if ($(item).prop('checked')) {
                        $("#div_show_report [id ='" + $(item).val() + "']").show();                        
                    }
                    else {
                        $("#div_show_report [id ='" + $(item).val() + "']").hide();                       
                    }
                });


                kendo.drawing.drawDOM($("#div_show_report"), { paperSize: "A4", margin: "1.5cm", scale: 0.5 })

                    .then(function (group) {
                        return kendo.drawing.exportPDF(group);
                    })
                    .done((data) => {
                        $.ajax({
                            type: "POST",
                            timeout: 600000,
                            url: "server.php",
                            data: {
                                "route": "send-client-email",
                                "subject": $("#recipient-subject").val(),
                                "address": $("#recipient-address").val(),
                                "message_body": $("#recipient-message").val(),
                                "pdf_data": data.split('data:application/pdf;base64,')[1],
                            },
                            success: (result) => {
                                let response = JSON.parse(result);
                                //console.info(response);
                                if(response['status'].ok === true){
                                    swal("Operación Finalizada", response['status'].message, "success");
                                    //alert(response['status'].message)
                                }else{
                                    swal("Error!", response['status'].error, "error");
                                    //alert(response['status'].error)
                                }
                                $("#recipient-subject").val("");
                                $("#recipient-message").val("");
                                $('#exampleModal').modal('hide');
                                $('#errorEmailSender').attr('hidden', true);
                            },
                            error: (error) => {
                                console.warn(error);
                                $('#errorEmailSender').attr('hidden', true);
                            }
                        });
                    });                

            } else
                $('#errorEmailSender').removeAttr('hidden');
            /**/
        }

        setReportHeaderNameClient(element) {
            if (element) {
                $('h3#codeClientLocal').empty().html(`Servicios locales: ${this._inputSearchClient.val()} - ${element['nombre']}`);
                $('h3#codeClientNacional').empty().html(`Servicios Nacionales: ${this._inputSearchClient.val()} - ${element['nombre']}`);
                $('h3#codeClientInsular').empty().html(`Servicios Insular: ${this._inputSearchClient.val()} - ${element['nombre']}`);
                $('h3#codeClientIntTerrestre').html(`${this._inputSearchClient.val()} - ${element['nombre']}`);
                $('h3#codeClientIntTerrestre2').html(`${this._inputSearchClient.val()} - ${element['nombre']}`);
                $('h3#codeClientIntTerrestre3').html(`${this._inputSearchClient.val()} - ${element['nombre']}`);
            }
        }

        setYearNameAllReports() {
            $('span.this_year').html(new Date().getFullYear())
        }

        showAlertClientMessage(message){
            $('#msgAlertReportTodos').html(message);
        }

        runCommonValidations() {
            let response = true;
            if (!$("#searchClientData").val()) {
                response = false;
                alert('Especifique por favor el número de CLIENTE que desea consultar.');
            }
            else if (!$("#searchClientEmpresa").val()) {
                response = false;
                alert('Esta olvidando especificar la EMPRESA de este cliente.');
            }
            else if (this.getTotalReportsSelected() < 1) {
                response = false;
                alert('Seleccione al menos en un reporte en la lista de reportes disponibles para mostrar resultados.');
            }
            return response;
        }

        sendServerRequestRangeClients() {
            if (!$("#searchClientEmpresa").val() || !$("#searchClientData_1").val() || !$("#searchClientData_2").val()) {
                alert('Para realizar esta operación debe llenar los campos EMPRESA, y los números clientes DESDE y HASTA');
            } else {
                swal({
                    title: "Está seguro?",
                    text: "Si acepta realizar esta operación se enviaran emails masivamente a todos los clientes del rango indicado enviándoles su url de acceso al sistema para que conzcan sus tarifas actuales.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            console.info('Init request');
                            $('.ngdialog-overlay-blocking').removeAttr('hidden');
                            $.ajax({
                                type: "POST",
                                timeout: 1200000,
                                data: {
                                    "route": "process-clients-range",
                                    "id_empresa": this._inputSearchEmpresa.val(),
                                    "filters": $('.demo').val(),
                                    "range": {
                                        "from": parseInt($("#searchClientData_1").val()),
                                        "to": parseInt($("#searchClientData_2").val())
                                    }
                                },
                                url: "server.php",
                                success: (result) => {
                                    //console.warn(result);
                                    console.info('init request');
                                    var reportData = JSON.parse(result);
                                    //console.info(reportData);
                                    this.showHideLoadSpinner(false);
                                    $('.ngdialog-overlay-blocking').attr('hidden', true);
                                    if (reportData['status'].ok === true) {
                                        swal(`${reportData['results']} y, ${(reportData['errors'] ? reportData['errors'] : '')}`, {
                                            icon: "success",
                                        });
                                    }
                                    console.info('Complete request');
                                },
                                error: (error) => {
                                    this.showHideLoadSpinner(false);
                                    console.warn(error);
                                }
                            });
                        } else {
                            swal("Operación cancelada.");
                        }
                    });


            }
        }

        sendServerRequest(external_link, searchParams) {
            let params = {};
            if (!external_link)
                params = {
                    "route": "get-client-rates",
                    "id_cliente": this._inputSearchClient.val(),
                    "id_empresa": this._inputSearchEmpresa.val()
                };
            else
                params = { "route": "get-client-rates", "base64": searchParams.get("external_source") };
            if (external_link || this.runCommonValidations()) {
                this.showHideLoadSpinner(false);
                $('#msgAlertReportNacional').attr('hidden', true);
                $('#msgAlertReportTodos').html("");
                $.ajax({
                    type: "POST",
                    timeout: 1200000,
                    data: params,
                    url: "server.php",
                    success: (result) => {
                        //console.info(result);
                        $('tbody input').val('0.00 €');
                        $('#buttonActions').removeAttr('hidden');
                        $('span.fixed-color1').css('color', 'transparent');
                        $('span.fixed-color').css('color', 'black');
                        var reportData = JSON.parse(result);
                        var results = reportData['results'];
                        var especialRateCharge = false;
                        $('#containerEmail').val(results[0].email);
                        var reporteLocal = {};
                        var reportNac = {};
                        var reporteInsular = {};
                        var reporteCarga = {};
                        var elementos_nacionales = {
                            "522": { "id": "522", "arraySelf": [] },
                            "501": { "id": "501", "arraySelf": [] },
                            "840": { "id": "840", "arraySelf": [] },
                            "329": { "id": "329", "arraySelf": [] },
                            "523": { "id": "523", "arraySelf": [] },
                            "503": { "id": "503", "arraySelf": [] },
                            "841": { "id": "841", "arraySelf": [] },
                            "330": { "id": "330", "arraySelf": [] },
                            "549": { "id": "549", "arraySelf": [] },
                            "504": { "id": "504", "arraySelf": [] },
                            "842": { "id": "842", "arraySelf": [] },
                            "331": { "id": "331", "arraySelf": [] },
                            "525": { "id": "525", "arraySelf": [] },
                            "505": { "id": "505", "arraySelf": [] },
                            "318": { "id": "318", "arraySelf": [] },
                            "322": { "id": "322", "arraySelf": [] },
                            "310": { "id": "310", "arraySelf": [] },
                            "314": { "id": "314", "arraySelf": [] },
                            "319": { "id": "319", "arraySelf": [] },
                            "323": { "id": "323", "arraySelf": [] },
                            "315": { "id": "315", "arraySelf": [] },
                            "320": { "id": "320", "arraySelf": [] },
                            "324": { "id": "324", "arraySelf": [] },
                            "312": { "id": "312", "arraySelf": [] },
                            "316": { "id": "316", "arraySelf": [] },
                        };
                        var elementos_insulares = {
                            "318": { "id": "318", "arraySelf": [] },
                            "322": { "id": "322", "arraySelf": [] },
                            "310": { "id": "310", "arraySelf": [] },
                            "314": { "id": "314", "arraySelf": [] },
                            "319": { "id": "319", "arraySelf": [] },
                            "323": { "id": "323", "arraySelf": [] },
                            "311": { "id": "311", "arraySelf": [] },
                            "315": { "id": "315", "arraySelf": [] },
                            "320": { "id": "320", "arraySelf": [] },
                            "324": { "id": "324", "arraySelf": [] },
                            "312": { "id": "312", "arraySelf": [] },
                            "316": { "id": "316", "arraySelf": [] },
                            "1655": { "id": "1655", "arraySelf": [] },
                            "1665": { "id": "1665", "arraySelf": [] },
                        };
                        var elementos_carga = {
                            "753": { "id": "753", "arraySelf": [] },
                            "752": { "id": "752", "arraySelf": [] },
                            "1674": { "id": "1674", "arraySelf": [] },
                            "1844": { "id": "1844", "arraySelf": [] },
                            
                        };

                        if (reportData['status'].ok === false) {
                            alert(reportData['status'].message)
                        } else {
                            let msg = results[0]['baja'] === 1 ? "Inactivo " : "";
                            let msg1 = results[0]['BloqueoTrafico'] === 1 ? "Bloqueado en Tráfico," : "";
                            let msg2 = results[0]['BloqueoNacional'] === 1 ? "Bloqueado Nacional" : "";
                            if (msg || msg1 || msg2)
                                this.showAlertClientMessage(`Cliente ${msg} ${msg1} ${msg2}`);


                            this.setReportHeaderNameClient(results["0"]);
                            this.setYearNameAllReports();
                            var cont = 0;
                            Object.keys(results).forEach((key) => {
                                let elemento_tarifario = results[key]['elemento'];
                                reporteLocal = new IcsReporteLocal(results[key]);
                                reporteLocal.drawRangeFills();
                                let is_national_tarife = (results[0]['tarifa'].indexOf("NR") >= 0 || results[0]['tarifa'].indexOf("N2") >= 0);
                                if (!(results[0]['tarifa'] && is_national_tarife)) {
                                    $('span.fixed-color1').css('color', 'black');
                                    $('span.fixed-color').css('color', 'transparent');
                                }
                                if (elementos_nacionales[elemento_tarifario]) {
                                    elementos_nacionales[elemento_tarifario].arraySelf.push(results[key]);
                                    reportNac = new IcsReporteNacional(results[key]);
                                    reportNac.drawRangeFills();
                                }
                                if (elementos_insulares[elemento_tarifario]) {
                                    elementos_insulares[elemento_tarifario].arraySelf.push(results[key]);
                                    reporteInsular = new IcsReporteInsular(results[key]);
                                    reporteInsular.drawRangeFills();
                                }
                                 if (elementos_carga[elemento_tarifario]) {
                                    elementos_carga[elemento_tarifario].arraySelf.push(results[key]);
                                    reporteCarga = new IcsReporteCarga(results[key]);
                                    reporteCarga.drawRangeFills();
                                }

                                if(parseInt(results[key]['elemento'])>=5000 && parseInt(results[key]['elemento'])<=5999){
                                    especialRateCharge = true;
                                }
                                cont++;

                            });
                            if(especialRateCharge)
                                this.showAlertClientMessage(`Este cliente tiene una tarifa de carga especial.`);
                            reportNac.drawAditionalFills(elementos_nacionales);
                            reporteInsular.drawAditionalFills(elementos_insulares);
                            
                        }
                        this.showHideLoadSpinner(true);
                        $('.ngdialog-overlay-blocking').attr('hidden', true);
                        console.info('Complete request');
                    },
                    error: (error) => {
                        this.showHideLoadSpinner(false);
                        $('.ngdialog-overlay-blocking').attr('hidden', true);
                        console.warn(error);
                    }
                });
            }

        }

        getNombreById(id) {
            var nombre = '';
            NOMENCLADORES_LOCALES.Moto.forEach((val, pos) => {
                if (val.id === id) {
                    nombre = val.name
                }
            });
            return nombre;
        }

        calculeNewTaxes(Event) {
            Event.preventDefault();
            this.addConsoleText('2 - Calculando tarifas locales...');
            //console.warn(this.array_lista_precios)
            let moto_locales = this.array_lista_precios.filter(tarifa => {
                return (NOMENCLADORES_LOCALES.Moto.map(nom => nom.id.toString()).indexOf(tarifa.elemento_tarifa_id.toString())) !== -1
            })
            //console.warn()
            $("table#servicios_locales tbody").append(`<td style='font-weight: bold'> Moto </td>`);
            moto_locales.forEach((val, pos) => {
                $("table#servicios_locales tbody").append(`
					<tr>
					<td> </td>
					<td> ${this.getNombreById(val.elemento_tarifa_id.toString())} </td>
					<td style='align-items: center;text-align: center'> ${val.precio_venta} € </td>
					</tr>
					`)
            })

        }

        addProgessBar(porcent) {
            this.progressBarElement.animate({ width: `${porcent}%` }, 150)
        }

        addConsoleText(text, appendLastElemtent) {
            //$("tr:last")
            if (!appendLastElemtent)
                $(this.consoleElement).append(`<div class='h6'> ${text} </div>`);
            else
                $(this.consoleElement).find(`div.h6:last`).append(`<span class='badge badge-secondary'>Completado</span>`);
        }

        readLocalNomenclators() {
            //console.warn(NOMENCLADORES_LOCALES.Moto)
        }

        fileNewTaxesPicked(oEvent) {
            $("div#console-container").css("display", "block");
            this.addConsoleText('1 - Analizando excel de las tarifas...');
            // Get The File From The Input
            var oFile = oEvent.target.files[0];
            if (oFile && oFile.name) {
                var sFilename = oFile.name;
                // Create A File Reader HTML5
                var reader = new FileReader();
                // Ready The Event For When A File Gets Selected
                reader.onload = e => {
                    var data = e.target.result;
                    var cfb = XLS.CFB.read(data, { type: 'binary' });
                    var wb = XLS.parse_xlscfb(cfb);
                    var listaPrecios = [];
                    // Loop Over Each Sheetarray_lista_preciosarray_lista_precios
                    wb.SheetNames.forEach((sheetName) => {
                        // Obtain The Current Row As CSV
                        var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                        var data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
                        $.each(data, (indexR, valueR) => {
                            //Insertando en el array de precios cada fila como objeto...
                            listaPrecios.push(new PrecioActual(data[indexR][0], data[indexR][1], data[indexR][3], data[indexR][4], 'tramo_local'))
                            //console.warn(precio.calculePrecio());
                            var sRow = "<tr>";
                            $.each(data[indexR], function (indexC, valueC) {
                                //sRow = sRow + "<td>" + valueC + "</td>";
                            });
                            //sRow = sRow + "</tr>";
                            //$("#my_fil	e_output").append(sRow);
                        });
                        this.array_lista_precios = listaPrecios;
                        this.addProgessBar('30');
                        setTimeout(() => {
                            this.addConsoleText('Completado', true);
                            this.readLocalNomenclators();
                        }, 600)
                    });
                };

                // Tell JS To Start Reading The File.. You could delay this if desired
                reader.readAsBinaryString(oFile);
            }

        }

    }

    var icsTranslate = new IcsTaxesTraslate([]);


});

