"use strict";function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,a){for(var t=0;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(a,t,r){return t&&e(a.prototype,t),r&&e(a,r),a}}();$(function(){var e=function(){function e(a){_classCallCheck(this,e);this._oFileIn=document.getElementById("file_prices_list_input"),this._buttonSubmit=document.getElementById("butttonCalculeTarifas"),this._consoleElement=document.getElementById("console-container"),this._progressBarElement=$("div.progress-bar"),this._ajaxLoadRequest=$("#ajaxLoadRequest"),this._servicios_locales_table=$("table#servicios_locales"),this._liReportsDisponibles=$("ul#reportListAvailable li.available"),this._liReportsSelected=$("ul#reportListAvailable li.selected"),this._inputSearchClient=$("input#searchClientData"),this._modalEmail=$("#exampleModal"),this._inputSearchEmpresa=$("input#searchClientEmpresa"),this._rangeRadio=$("#range"),this._logsLink=$("#systemLogs"),this._buttonSendCientRange=$("#searchClientData_btn"),this._array_lista_precios=a||[],this._array_lista_tarifas_fijas=[],this.registerListeners()}return _createClass(e,[{key:"registerListeners",value:function(){var e=this;this.checkRouteType(),this.markedAllReportsByDefault(),this._liReportsDisponibles.on("click",function(e){$(this).hasClass("selected")?($(this).removeClass("selected"),$(this).css("background","#fff")):($(this).addClass("selected"),$(this).css("background","#3949ab"))}),this._inputSearchClient.on("keyup",function(a){13===a.which&&(a.preventDefault(),e.sendServerRequest())}),this._buttonSendCientRange.on("click",function(a){a.preventDefault(),e.sendServerRequestRangeClients()}),$("button#sendEmail").on("click",this.sendClientEmail),$("#pdf").on("click",this.ExportPdf),$("#modal-report").find("input").on("click",function(){}),this._modalEmail.on("show.bs.modal",function(a){$("#recipient-address").val($("#containerEmail").val()),$("#modal-report").find("input").each(function(e,a){$(a).prop("checked",!1)}),array_nombres_reportes.forEach(function(e){$("#chbox_"+e).prop("checked",!0)},e),setTimeout(function(){$("#recipient-address").focus()},800)}),this._modalEmail.on("hide.bs.modal",function(e){$("#modal-report").find("input").each(function(e,a){$("#div_show_report [id ='"+$(a).val()+"']").hide()}),$("#div_show_report [id ='"+array_nombres_reportes[indice_activo]+"']").show(),$("#errorEmailSender").attr("hidden",!0)})}},{key:"ExportPdf",value:function(){var e=this;$("i#pdfExportTaxes").removeAttr("hidden"),$(this).attr("disabled",!0),$(this).parent().append('<i id="aaaText" style="display:block">Espere por favor...<i/>'),kendo.pdf.defineFont({"DejaVu Sans":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans.ttf","DejaVu Sans|Bold":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Bold.ttf","DejaVu Sans|Bold|Italic":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf","DejaVu Sans|Italic":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"}),$("#modal-export").find("input").each(function(e,a){$(a).prop("checked")?$("#div_show_report [id ='"+$(a).val()+"']").show():$("#div_show_report [id ='"+$(a).val()+"']").hide()}),kendo.drawing.drawDOM($("#div_show_report"),{paperSize:"A4",margin:{top:"1.5cm",left:"1cm",right:"1cm",bottom:"1.2cm"},scale:.5}).then(function(e){return kendo.drawing.exportPDF(e)}).done(function(a){kendo.saveAs({dataURI:a,fileName:"Reportes.pdf"}),$("#exampleModal2").modal("hide"),$(e).attr("disabled",!1),$("i#pdfExportTaxes").attr("hidden",!0),$("i#aaaText").remove(),swal("Sus tarifas se han generado correctamente.!!")})}},{key:"markedAllReportsByDefault",value:function(){this._liReportsDisponibles.click(),$("ul.pagination > li.page-item#0").click()}},{key:"checkRouteType",value:function(){var e=new URL(window.location.href);e.searchParams.get("external_source")&&this.sendServerRequest(!0,e.searchParams)}},{key:"getTotalReportsSelected",value:function(){return $("#reportListAvailable").find("li.selected").length}},{key:"showHideLoadSpinner",value:function(e){var a=$(".ngdialog-overlay-blocking");e?a.attr("hidden",!0):a.removeAttr("hidden"),e?this._ajaxLoadRequest.attr("hidden",!0):this._ajaxLoadRequest.removeAttr("hidden")}},{key:"sendClientEmail",value:function(){var e=this;if($("#recipient-address").val()&&$("#recipient-subject").val()&&$("#recipient-message").val()){$(this).attr("disabled",!0),$("#loadingEmail").addClass("fa-spin").removeAttr("hidden"),kendo.pdf.defineFont({"DejaVu Sans":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans.ttf","DejaVu Sans|Bold":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Bold.ttf","DejaVu Sans|Bold|Italic":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf","DejaVu Sans|Italic":"http://cdn.kendostatic.com/2018.3.1017/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"});$("#modal-report").find("input").each(function(e,a){$(a).prop("checked")?$("#div_show_report [id ='"+$(a).val()+"']").show():$("#div_show_report [id ='"+$(a).val()+"']").hide()}),kendo.drawing.drawDOM($("#div_show_report"),{paperSize:"A4",margin:{top:"1.5cm",left:"1cm",right:"1cm",bottom:"1.2cm"},scale:.5}).then(function(e){return kendo.drawing.exportPDF(e)}).done(function(a){$.ajax({type:"POST",timeout:6e5,url:"server.php",data:{route:"send-client-email",subject:$("#recipient-subject").val(),address:$("#recipient-address").val(),message_body:$("#recipient-message").val(),pdf_data:a.split("data:application/pdf;base64,")[1]},success:function(a){var t=JSON.parse(a);!0===t.status.ok?swal("Operación Finalizada",t.status.message,"success"):swal("Error!",t.status.error,"error"),$("#recipient-subject").val(""),$("#recipient-message").val(""),$("#exampleModal").modal("hide"),$("#errorEmailSender").attr("hidden",!0),$(e).attr("disabled",!1),$("#loadingEmail").removeClass("fa-spin").attr("hidden",!0)},error:function(a){$(e).attr("disabled",!1),$("#errorEmailSender").attr("hidden",!0),$("#loadingEmail").removeClass("fa-spin").attr("hidden",!0)}})})}else $("#errorEmailSender").removeAttr("hidden")}},{key:"setReportHeaderNameClient",value:function(e){e&&($("h3#codeClientLocal").empty().html("Servicios Locales: "+this._inputSearchClient.val()+" - "+e.nombre),$("h3#codeClientNacional").empty().html("Servicios Nacionales: "+this._inputSearchClient.val()+" - "+e.nombre),$("h3#codeClientInsular").empty().html("Servicios Insular: "+this._inputSearchClient.val()+" - "+e.nombre),$("h3#codeClientCarga").empty().html("Servicios Cargas: "+this._inputSearchClient.val()+" - "+e.nombre),$("h3#codeClientIntTerrestre").html(this._inputSearchClient.val()+" - "+e.nombre),$("h3#codeClientIntTerrestre2").html(this._inputSearchClient.val()+" - "+e.nombre),$("h3#codeClientIntTerrestre3").html(this._inputSearchClient.val()+" - "+e.nombre))}},{key:"setYearNameAllReports",value:function(){$("span.this_year").html((new Date).getFullYear())}},{key:"showAlertClientMessage",value:function(e){$("#msgAlertReportTodos").html(e)}},{key:"runCommonValidations",value:function(){var e=!0;return $("#searchClientData").val()?$("#searchClientEmpresa").val()?this.getTotalReportsSelected()<1&&(e=!1,alert("Seleccione al menos en un reporte en la lista de reportes disponibles para mostrar resultados.")):(e=!1,alert("Esta olvidando especificar la EMPRESA de este cliente.")):(e=!1,alert("Especifique por favor el número de CLIENTE que desea consultar.")),e}},{key:"sendServerRequestRangeClients",value:function(){var e=this;$("#searchClientEmpresa").val()&&$("#searchClientData_1").val()&&$("#searchClientData_2").val()?swal({title:"Está seguro?",text:"Si acepta realizar esta operación se enviaran emails masivamente a todos los clientes del rango indicado enviándoles su url de acceso al sistema para que conzcan sus tarifas actuales.",icon:"warning",buttons:!0,dangerMode:!0}).then(function(a){a?($(".ngdialog-overlay-blocking").removeAttr("hidden"),$.ajax({type:"POST",timeout:12e5,data:{route:"process-clients-range",id_empresa:e._inputSearchEmpresa.val(),filters:$(".demo").val(),range:{from:parseInt($("#searchClientData_1").val()),to:parseInt($("#searchClientData_2").val())}},url:"server.php",success:function(a){var t=JSON.parse(a);e.showHideLoadSpinner(!0),$(".ngdialog-overlay-blocking").attr("hidden",!0),!0===t.status.ok&&swal(t.results+" y, "+(t.errors?t.errors:""),{icon:"success"})},error:function(a){e.showHideLoadSpinner(!0)}})):swal("Operación cancelada.")}):alert("Para realizar esta operación debe llenar los campos EMPRESA, y los números clientes DESDE y HASTA")}},{key:"sendServerRequest",value:function(e,a){var t=this,r={};r=e?{route:"get-client-rates",base64:a.get("external_source")}:{route:"get-client-rates",id_cliente:this._inputSearchClient.val(),id_empresa:this._inputSearchEmpresa.val()},(e||this.runCommonValidations())&&(this.showHideLoadSpinner(!1),$("#msgAlertReportNacional").attr("hidden",!0),$("#msgAlertReportTodos").html(""),$.ajax({type:"POST",timeout:12e5,data:r,url:"server.php",success:function(e){$("tbody input").val("0.00 €"),$("#buttonActions").removeAttr("hidden"),$("span.fixed-color2").html(""),$("span.fixed-color1").css("color","transparent").hide(),$("span.fixed-color").css("color","black").show();var a=JSON.parse(e),r=a.results,i={522:{id:"522",arraySelf:[]},501:{id:"501",arraySelf:[]},840:{id:"840",arraySelf:[]},329:{id:"329",arraySelf:[]},523:{id:"523",arraySelf:[]},503:{id:"503",arraySelf:[]},841:{id:"841",arraySelf:[]},330:{id:"330",arraySelf:[]},549:{id:"549",arraySelf:[]},504:{id:"504",arraySelf:[]},842:{id:"842",arraySelf:[]},331:{id:"331",arraySelf:[]},525:{id:"525",arraySelf:[]},505:{id:"505",arraySelf:[]},318:{id:"318",arraySelf:[]},322:{id:"322",arraySelf:[]},310:{id:"310",arraySelf:[]},314:{id:"314",arraySelf:[]},319:{id:"319",arraySelf:[]},323:{id:"323",arraySelf:[]},315:{id:"315",arraySelf:[]},320:{id:"320",arraySelf:[]},324:{id:"324",arraySelf:[]},312:{id:"312",arraySelf:[]},316:{id:"316",arraySelf:[]}},n={318:{id:"318",arraySelf:[]},322:{id:"322",arraySelf:[]},310:{id:"310",arraySelf:[]},314:{id:"314",arraySelf:[]},319:{id:"319",arraySelf:[]},323:{id:"323",arraySelf:[]},311:{id:"311",arraySelf:[]},315:{id:"315",arraySelf:[]},320:{id:"320",arraySelf:[]},324:{id:"324",arraySelf:[]},312:{id:"312",arraySelf:[]},316:{id:"316",arraySelf:[]},1655:{id:"1655",arraySelf:[]},1665:{id:"1665",arraySelf:[]}},s={753:{id:"753",arraySelf:[]},752:{id:"752",arraySelf:[]},1674:{id:"1674",arraySelf:[]},1844:{id:"1844",arraySelf:[]}};if(!1===a.status.ok)alert(a.status.message);else{var o=!1;$("#containerEmail").val(r[0].email);var l={},d={},c={},u={},p=1===r[0].baja?"Inactivo ":"",h=1===r[0].BloqueoTrafico?"Bloqueado en Tráfico,":"",f=1===r[0].BloqueoNacional?"Bloqueado Nacional":"";(p||h||f)&&t.showAlertClientMessage("Cliente "+p+" "+h+" "+f),t.setReportHeaderNameClient(r[0]),t.setYearNameAllReports();var m=0;Object.keys(r).forEach(function(e){var a=r[e].elemento;l=new IcsReporteLocal(r[e]),l.drawRangeFills(),l=new IcsCondicionesGenerales(r[e]),l.drawRangeFills();var t=r[0].tarifa.indexOf("NR")>=0||r[0].tarifa.indexOf("N2")>=0;r[0].tarifa&&t||($("span.fixed-color1").css("color","black").show(),$("span.fixed-color").css("color","transparent").hide());var p=r[0].carburante;p>1&&($("span.fixed-color2").css("color","black"),$("span.fixed-color2").html("No Incluido el  "+p+" % de carburante")),i[a]&&(i[a].arraySelf.push(r[e]),d=new IcsReporteNacional(r[e]),d.drawRangeFills()),n[a]&&(n[a].arraySelf.push(r[e]),c=new IcsReporteInsular(r[e]),c.drawRangeFills()),s[a]&&(s[a].arraySelf.push(r[e]),u=new IcsReporteCarga(r[e]),u.drawRangeFills()),parseInt(r[e].elemento)>=5e3&&parseInt(r[e].elemento)<=5999&&(o=!0),m++}),u.drawAditionalFills(s),d.drawAditionalFills(i),c.drawAditionalFills(n),o&&(t.showAlertClientMessage("Este cliente tiene una tarifa de carga especial."),u.cleanTable())}t.showHideLoadSpinner(!0),$(".ngdialog-overlay-blocking").attr("hidden",!0),-1===window.getPermisionsList().indexOf("edited-inputs-report")&&($("input").attr("disabled",!0),$("input").css("background","white"))},error:function(e){t.showHideLoadSpinner(!1),$(".ngdialog-overlay-blocking").attr("hidden",!0)}}))}},{key:"getNombreById",value:function(e){var a="";return NOMENCLADORES_LOCALES.Moto.forEach(function(t,r){t.id===e&&(a=t.name)}),a}},{key:"calculeNewTaxes",value:function(e){var a=this;e.preventDefault(),this.addConsoleText("2 - Calculando tarifas locales...");var t=this.array_lista_precios.filter(function(e){return-1!==NOMENCLADORES_LOCALES.Moto.map(function(e){return e.id.toString()}).indexOf(e.elemento_tarifa_id.toString())});$("table#servicios_locales tbody").append("<td style='font-weight: bold'> Moto </td>"),t.forEach(function(e,t){$("table#servicios_locales tbody").append("\n\t\t\t\t\t<tr>\n\t\t\t\t\t<td> </td>\n\t\t\t\t\t<td> "+a.getNombreById(e.elemento_tarifa_id.toString())+" </td>\n\t\t\t\t\t<td style='align-items: center;text-align: center'> "+e.precio_venta+" € </td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t")})}},{key:"addProgessBar",value:function(e){this.progressBarElement.animate({width:e+"%"},150)}},{key:"addConsoleText",value:function(e,a){a?$(this.consoleElement).find("div.h6:last").append("<span class='badge badge-secondary'>Completado</span>"):$(this.consoleElement).append("<div class='h6'> "+e+" </div>")}},{key:"readLocalNomenclators",value:function(){}},{key:"fileNewTaxesPicked",value:function(e){var a=this;$("div#console-container").css("display","block"),this.addConsoleText("1 - Analizando excel de las tarifas...");var t=e.target.files[0];if(t&&t.name){var r=(t.name,new FileReader);r.onload=function(e){var t=e.target.result,r=XLS.CFB.read(t,{type:"binary"}),i=XLS.parse_xlscfb(r),n=[];i.SheetNames.forEach(function(e){var t=(XLS.utils.make_csv(i.Sheets[e]),XLS.utils.sheet_to_json(i.Sheets[e],{header:1}));$.each(t,function(e,a){n.push(new PrecioActual(t[e][0],t[e][1],t[e][3],t[e][4],"tramo_local"));$.each(t[e],function(e,a){})}),a.array_lista_precios=n,a.addProgessBar("30"),setTimeout(function(){a.addConsoleText("Completado",!0),a.readLocalNomenclators()},600)})},r.readAsBinaryString(t)}}},{key:"consoleElement",set:function(e){this._consoleElement=e},get:function(){return this._consoleElement}},{key:"progressBarElement",set:function(e){this._progressBarElement=e},get:function(){return this._progressBarElement}},{key:"serviciosLocalesTable",get:function(){return this._servicios_locales_table},set:function(e){this._servicios_locales_table=e}},{key:"buttonSubmit",set:function(e){this._buttonSubmit=e},get:function(){return this._buttonSubmit}},{key:"array_lista_precios",set:function(e){this._array_lista_precios=e},get:function(){return this._array_lista_precios}},{key:"logLink",get:function(){return this._logsLink}}]),e}();new e([])});