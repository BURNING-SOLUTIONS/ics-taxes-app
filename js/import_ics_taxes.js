
$(function () {
	class IcsTaxesTraslate {
	
		constructor(arr) {
			this._oFileIn = document.getElementById('file_prices_list_input');
			this._buttonSubmit = document.getElementById("butttonCalculeTarifas");
			this._consoleElement = document.getElementById("console-container");
			this._progressBarElement = $("div.progress-bar");
			this._ajaxLoadRequest = $('#ajaxLoadRequest');
			this._servicios_locales_table = $("table#servicios_locales");
			this._liReportsDisponibles = $("ul#reportListAvailable li.available");
			this._liReportsSelected = $("ul#reportListAvailable li.selected");
			this._inputSearchClient = $("input#searchClientData");
			this._inputSearchEmpresa = $("input#searchClientEmpresa");
			this._array_lista_precios = arr || [];
			this._array_lista_tarifas_fijas = [];			
			this.registerListeners();
			var that = this;
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
			$("#servicios_locales").on('click', '#imprimirReporte', function () {
				$("#servicios_locales").print({
					globalStyles: true,
					mediaPrint: false,
					stylesheet: "css/style_servicios_locales.css",
					noPrintSelector: ".not_print",
					iframe: true,
					append: null,
					prepend: null,
					manuallyCopyFormValues: true,
					deferred: $.Deferred(),
					timeout: 750,
					title: null,
					doctype: '<!doctype html>'
				});
			});

			$("#servicio_nacional").on('click', '#print_servicio_nacional', function () {
				$("#servicio_nacional").print({
					globalStyles: true,
					mediaPrint: false,
					stylesheet: "css/style_servicio_nacional.css",
					noPrintSelector: ".not_print",
					iframe: true,
					append: null,
					prepend: null,
					manuallyCopyFormValues: true,
					deferred: $.Deferred(),
					timeout: 750,
					title: null,
					doctype: '<!doctype html>'
				});
			});

			$("#servicio_insular").on('click', '#print_servicio_insular', function () {
				$("#servicio_insular").print({
					globalStyles: true,
					mediaPrint: false,
					stylesheet: "css/style_servicios_locales.css",
					noPrintSelector: ".not_print",
					iframe: true,
					append: null,
					prepend: null,
					manuallyCopyFormValues: true,
					deferred: $.Deferred(),
					timeout: 750,
					title: null,
					doctype: '<!doctype html>'
				});
			});

			$("#int_terrestre").on('click', '#print_int_terrestre', function () {
				$("#int_terrestre").print({
					globalStyles: true,
					mediaPrint: false,
					stylesheet: "css/style_servicios_locales.css",
					noPrintSelector: ".not_print",
					iframe: true,
					append: null,
					prepend: null,
					manuallyCopyFormValues: true,
					deferred: $.Deferred(),
					timeout: 750,
					title: null,
					doctype: '<!doctype html>'
				});
			});

			$("#servicio_aéreo_2").on('click', '#print_serv_aereo_2', function () {
				$("#servicio_aéreo_2").print({
					globalStyles: true,
					mediaPrint: false,
					stylesheet: "css/style_servicios_locales.css",
					noPrintSelector: ".not_print",
					iframe: true,
					append: null,
					prepend: null,
					manuallyCopyFormValues: true,
					deferred: $.Deferred(),
					timeout: 750,
					title: null,
					doctype: '<!doctype html>'
				});
			});

			$("#servicio_aéreo_1").on('click', '#print_serv_aereo_1', function () {
				$("#servicio_aéreo_1").print({
					globalStyles: true,
					mediaPrint: false,
					stylesheet: "css/style_servicios_locales.css",
					noPrintSelector: ".not_print",
					iframe: true,
					append: null,
					prepend: null,
					manuallyCopyFormValues: true,
					deferred: $.Deferred(),
					timeout: 750,
					title: null,
					doctype: '<!doctype html>'
				});
			});

			this._liReportsDisponibles.click(function (event) {
				$(this).toggleClass('selected');
			})
			this._inputSearchClient.keyup((event) => {
				if (event.which == 13) {
					event.preventDefault();
					this.sendServerRequest();
				}
			});
		}

		getTotalReportsSelected(){
			return $("#reportListAvailable").find('li.selected').length;
		}

		showHideLoadSpinner(boolean){
			(!boolean) ? this._ajaxLoadRequest.removeAttr('hidden') : this._ajaxLoadRequest.attr('hidden', true);
		}

		setReportHeaderNameClient(element){
			if(element){
				$('h3#codeClientLocal').empty().html(`Servicios locales: ${this._inputSearchClient.val()} - ${element['nombre']}`);
				$('h3#codeClientNacional').empty().html(`Servicios Nacionales: ${this._inputSearchClient.val()} - ${element['nombre']}`);
				$('h3#codeClientInsular').empty().html(`Servicios Insular: ${this._inputSearchClient.val()} - ${element['nombre']}`);
				$('h3#codeClientIntTerrestre').html(`${this._inputSearchClient.val()} - ${element['nombre']}`);
				$('h3#codeClientIntTerrestre2').html(`${this._inputSearchClient.val()} - ${element['nombre']}`);
				$('h3#codeClientIntTerrestre3').html(`${this._inputSearchClient.val()} - ${element['nombre']}`);
			}
		}

		setYearNameAllReports(){
			$('span.this_year').html(new Date().getFullYear())
		}

		sendServerRequest() {
			if(!$("#searchClientData").val()){
				alert('Especifique por favor el número de cliente que desea consultar.');
			}
			else if(!$("#searchClientEmpresa").val()){
				alert('Esta olvidando especificar la empresa de este cliente.');
			}
			else if(this.getTotalReportsSelected() < 1){
				alert('Seleccione al menos en un reporte en la lista de reportes disponibles para mostrar resultados.');
			}else{
				this.showHideLoadSpinner(false);	
				$('#msgAlertReportNacional').attr('hidden', true);		
				console.info('Init request');				
				$.ajax({
					type: "POST",
					data: { "id_cliente": this._inputSearchClient.val(), "id_empresa": this._inputSearchEmpresa.val() },
					url: "server.php",
					success: (result) => {
						//console.info(result);
						$('input').val('0.00 €');
						$('span.fixed-color1').css('color', 'transparent');
						$('span.fixed-color').css('color', 'black');
						var reportData = JSON.parse(result);
						var results = reportData['results'];
						var reporteLocal = {};
						var reportNac = {};
						var reporteInsular = {};
																
						if (reportData['status'].ok == false) {
							alert(reportData['status'].message)
						}else {
						 let msg  =  results[0]['baja'] == 1 ? "Inactivo " : "";
						 let msg1 = results[0]['BloqueoTrafico'] == 1 ? "Bloqueado en Tráfico" : "";
						 let msg2 = results[0]['BloqueoNacional'] == 1 ? "Bloqueado Nacional " : "";
						 if(msg || msg1 || msg2)
						 	$('#msgAlertReportNacional').removeAttr('hidden').html(`Cliente ${msg} ${msg1} ${msg2}`);						 
                         							
						this.setReportHeaderNameClient(results["0"]);	
						this.setYearNameAllReports();

						let elementos_nacionales = {
							"522":{"id": "522", "arraySelf": []},
							"501":{"id": "501", "arraySelf": []},
							"840":{"id": "840", "arraySelf": []},
							"329":{"id": "329", "arraySelf": []},
							"523":{"id": "523", "arraySelf": []},
							"503":{"id": "503", "arraySelf": []},
							"841":{"id": "841", "arraySelf": []},
							"330":{"id": "330", "arraySelf": []},
							"549":{"id": "549", "arraySelf": []},
							"504":{"id": "504", "arraySelf": []},
							"842":{"id": "842", "arraySelf": []},
							"331":{"id": "331", "arraySelf": []},
							"525":{"id": "525", "arraySelf": []},
							"505":{"id": "505", "arraySelf": []},
							"318":{"id": "318", "arraySelf": []},
							"322":{"id": "322", "arraySelf": []},
							"310":{"id": "310", "arraySelf": []},
							"314":{"id": "314", "arraySelf": []},
							"319":{"id": "319", "arraySelf": []},
							"323":{"id": "323", "arraySelf": []},
							"315":{"id": "315", "arraySelf": []},
							"320":{"id": "320", "arraySelf": []},
							"324":{"id": "324", "arraySelf": []},
							"312":{"id": "312", "arraySelf": []},
							"316":{"id": "316", "arraySelf": []},
						}
						let elementos_insulares = {
							"318":{"id": "318", "arraySelf": []},
							"322":{"id": "322", "arraySelf": []},
							"310":{"id": "310", "arraySelf": []},
							"314":{"id": "314", "arraySelf": []},
							"319":{"id": "319", "arraySelf": []},
							"323":{"id": "323", "arraySelf": []},
							"311":{"id": "311", "arraySelf": []},
							"315":{"id": "315", "arraySelf": []},
							"320":{"id": "320", "arraySelf": []},
							"324":{"id": "324", "arraySelf": []},
							"312":{"id": "312", "arraySelf": []},
							"316":{"id": "316", "arraySelf": []},								
						}		

						Object.keys(results).forEach( (key) => {
							let elemento_tarifario = results[key]['elemento'];
							reporteLocal = new IcsReporteLocal(results[key]);
							reporteLocal.drawRangeFills();
							let is_national_tarife = (results[0]['tarifa'].indexOf("NR") >= 0 || results[0]['tarifa'].indexOf("N2") >= 0);
							if(!(results[0]['tarifa'] && is_national_tarife)){
								$('span.fixed-color1').css('color', 'black');
								$('span.fixed-color').css('color', 'transparent');
							}
							if(elementos_nacionales[elemento_tarifario]){
								elementos_nacionales[elemento_tarifario].arraySelf.push(results[key]);
								reportNac = new IcsReporteNacional(results[key]);									
								reportNac.drawRangeFills();									
							}
							if(elementos_insulares[elemento_tarifario]){
								elementos_insulares[elemento_tarifario].arraySelf.push(results[key]);
								reporteInsular = new IcsReporteInsular(results[key]);
								reporteInsular.drawRangeFills();								
							}

						});								
							reportNac.drawAditionalFills(elementos_nacionales);
							reporteInsular.drawAditionalFills(elementos_insulares);
						}							
						this.showHideLoadSpinner(true);
						console.info('Complete request');
					},
					error: function (error) {
						console.warn(error);
						this.showHideLoadSpinner(false);
					}
				});	
			}			

		}

		getNombreById(id) {
			var nombre = '';
			NOMENCLADORES_LOCALES.Moto.forEach((val, pos) => {
				if (val.id == id) {
					nombre = val.name
				}
			})
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

