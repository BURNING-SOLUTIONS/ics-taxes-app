

var array_nombres_reportes = new Array();
var indice_activo = -1;
var servicio_aereo = "";


$(document).ready(function () {
    /*Oculta todos los reportes*/
    $('[data-toggle="tooltip"]').tooltip();
    Hide_All_Reporte();
    Show_Reporte("plantilla");

    $("#reportListAvailable li").click(function () {

        var nombre_reporte = $(this).attr("value")
        /*comrueba en este array dinamico si ya s eseeciono algun reporte*/
        var index = array_nombres_reportes.indexOf(nombre_reporte);
        if (index >= 0) {
            Remove_Reporte_Paginado(index);
            if (nombre_reporte == "int_terrestre") {
                $(".div_panel").slideToggle("fast");
            }
        }
        else {
            if (nombre_reporte == "int_terrestre") {
                $(".div_panel").slideToggle("fast");
                /*desabilito los demas reportes hsta que selecione o ciere*/
            }
            else {
                Add_Reporte_Paginado(nombre_reporte);
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
    });


    /*MAs adeante mejorar este coodigo*/
    $("#reportListAvailable .div_panel input").click(function () {
        var value = array_nombres_reportes.indexOf("int_terrestre");
        if (value >= 0) {
            if ($(this).attr("value") == "servicio_aéreo_1") {

                servicio_aereo = "servicio_aéreo_1";

            }
            else {

                servicio_aereo = "servicio_aéreo_2";

            }
            Remove_Reporte_Paginado(value);
            Add_Reporte_Paginado("int_terrestre");
        }
        else {
            if ($(this).attr("value") == "servicio_aéreo_1") {
                servicio_aereo = "servicio_aéreo_1";
            }
            else {
                servicio_aereo = "servicio_aéreo_2";
            }

            Add_Reporte_Paginado("int_terrestre");
            $('[data-toggle="tooltip"]').tooltip();
        }

        //$(".div_panel").slideToggle("fast");
    });


    /*se captura el evento de moverse por el paginado*/
    $("#ul_pagination ").on(
        "click", "li", function () {
            var id_indice = $(this).attr("id");


            if (id_indice == "previous") {

                if (indice_activo > 0 && indice_activo <= array_nombres_reportes.length - 1) {

                    $("#ul_pagination [id = '" + (indice_activo) + "']").attr("class", "page-item");
                    Hide_Reporte(array_nombres_reportes[indice_activo]);
                    $("#ul_pagination [id = '" + (indice_activo - 1) + "']").attr("class", "page-item" + "  " + "active");
                    Show_Reporte(array_nombres_reportes[indice_activo - 1]);
                    --indice_activo;
                }
            }
            else if (id_indice == "next") {
                if (indice_activo >= 0 && indice_activo < array_nombres_reportes.length - 1) {

                    $("#ul_pagination [id = '" + (indice_activo) + "']").attr("class", "page-item");
                    Hide_Reporte(array_nombres_reportes[indice_activo]);
                    $("#ul_pagination [id = '" + (indice_activo + 1) + "']").attr("class", "page-item" + "  " + "active");
                    Show_Reporte(array_nombres_reportes[indice_activo + 1]);
                    ++indice_activo;
                }
            }
            else {
                for (var i = 0; i < array_nombres_reportes.length; i++) {
                    if (i != id_indice) {
                        $("#ul_pagination [id = '" + (i) + "']").attr("class", "page-item");
                        Hide_Reporte(array_nombres_reportes[i]);
                    }
                    else {
                        $(this).attr("class", "page-item" + "  " + "active");
                        indice_activo = i;
                        Show_Reporte(array_nombres_reportes[i]);
                    }
                }
            }
        })

     $("#div_left_side .closebtn").click(function () {
        $("#div_pagination").hide();
        $("#reportListAvailable").hide();
        $("#div_left_side").css({ "background-color": "#white", "width": "2%" });      
       
        $("#div_show_report").css({ "margin-left": "6.5%" });
        $("#div_show_report").attr("class", "col-md-11");
        $("#div_left_side .openbtn").show();
    });

    $("#div_left_side .openbtn").click(function () {
        $("#div_pagination").show();
        $("#reportListAvailable").show();
        $("#div_left_side").css({ "background-color": "#white", "width": "25%" });
        $("#div_left_side").attr("class", "col-md-3");
        $("#div_show_report").attr("class", "col-md-9");
        $("#div_show_report").css({ "margin-left": "27%" });
        $("#div_left_side .openbtn").hide();
    });

        /* Cntrol d ecuand marca o desmarca el radio button*/
    $("#range").click(function () {
        if (this.checked) {
            $("#searchClientData").hide();
            $("#searchClientData_1").val("");
            $("#searchClientData_2").val("");
            $("#searchClientData_1").show();
            $("#searchClientData_2").show();
            $("#searchClientData_btn").show();
        }
        else {
            $("#searchClientData").show();
            $("#searchClientData_1").hide();
            $("#searchClientData_2").hide();
            $("#searchClientData_btn").hide();
        }
    });

    /*Control de todos los eventos que arrojan los campos input de rango clientes*/

    $("#searchClientData").on({
        keydown: function (event) {
            /*verifico que todos os input esten llenos con valores validos y mando a porcesar datos*/
            if (event.key == "Enter") {
                if (isNaN($("#searchClientEmpresa"))  && isNaN($("#searchClientData").val()) {
                    alert("enVIO PETICION AL SERVIDOR CON NUMERO DE CLIENTE");
                }
                else {

                }
            }

        }
    });

    $("#searchClientData_1").on({
        keydown: function (event) {
            /*verifico que todos os input esten llenos con valores validos y mando a porcesar datos*/
            var key = event.key;
            if (key == "Enter")
                if (isNAN($("#searchClientEmpresa").val()) && isNAN($("#searchClientData_1").val()) && isNAN($("#searchClientData_2").val())) {
                    alert("enVIO PETICION AL SERVIDOR CON NUMERO DE CLIENTE1");
                }
                else {

                }
            if (/^([0-9])*$/.test(event.key) && $("#searchClientData_2").val() > 0) {
                $("#searchClientData_btn").attr("disabled", false);
            }
            else {
                var tecla = event.key;
                switch (tecla) {

                    case "Delete":
                        if(/^([0-9])*$/.test($("#searchClientData_1").val()))
                            $("#searchClientData_btn").attr("disabled", true);
                        break;
                    case "Backspace":
                        if(/^([0-9])*$/.test($("#searchClientData_1").val()))
                            $("#searchClientData_btn").attr("disabled", true);
                        break;                      
                    
                }
            }
        }
    });

    $("#searchClientData_2").on({
        keydown: function (event) {
            /*verifico que todos os input esten llenos con valores validos y mando a porcesar datos*/
            var key = event.key;
            if (key == "Enter")
                if (isNAN($("#searchClientEmpresa").val()) && isNAN($("#searchClientData_1").val()) && isNAN($("#searchClientData_2").val())) {
                    alert("enVIO PETICION AL SERVIDOR CON NUMERO DE CLIENTE2");
                }
                else {

                }
            if (/^([0-9])*$/.test(event.key) && $("#searchClientData_1").val() > 0) {
                $("#searchClientData_btn").attr("disabled", false);
            }
            else {
                var tecla = event.key;
                switch (tecla) {

                    case "Delete":
                        if(/^([0-9])*$/.test($("#searchClientData_2").val()))
                            $("#searchClientData_btn").attr("disabled", true);
                        break;
                    case "Backspace":
                        if(/^([0-9])*$/.test($("#searchClientData_2").val()))
                            $("#searchClientData_btn").attr("disabled", true);
                        break;                      
                    
                }
            }
        }
    });


    /*Se captura el evento dle click a exportar*/
    $("#pdf").click(function () {
        Exportar_PDF(array_nombres_reportes[indice_activo], array_nombres_reportes[indice_activo]);
    });

    $("#print").click(function () {      
        $("#"+ array_nombres_reportes[indice_activo]).print({        	
            globalStyles: true,
            mediaPrint: false,
            stylesheet: "css/style_"+ array_nombres_reportes[indice_activo] +".css",
            noPrintSelector: "",
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

});

/***************************Funciones para agregar reortes o eliminar por cliente********************************/
/*Funcion para anadir al paginado un nuevo reporte al paginado*/
function Add_Reporte_Paginado(nombre_reporte) {

    var a = ($("#reportListAvailable").children("li")).toArray();


    if (array_nombres_reportes.length == 0) {

        var a = $("<a></a>").text("<");
        a.attr({ "class": "page-link", "href": "#" });
        var li = $("<li></li>").append(a);
        li.attr({ "class": "page-item", "id": "previous" });

        var a1 = $("<a></a>").text(">");
        a1.attr({ "class": "page-link", "href": "#" });
        var li1 = $("<li></li>").append(a1);
        li1.attr({ "class": "page-item", "id": "next" });

        $("#ul_pagination").append(li);
        $("#ul_pagination").append(li1);

        $("#div_action_report").show();
    }

    array_nombres_reportes.push(nombre_reporte);
    var pos = array_nombres_reportes.length - 1;
    console.log(array_nombres_reportes[pos]);
    /*creo el indice para anadirlo al paginado*/
    var a = $("<a></a>", { "data-toggle": "tooltip", "data-placement": "top", "title": nombre_reporte, "data-trigger": "hover" }).text(pos + 1);
    a.attr({ "class": "page-link", "href": "#" });
    var li = $("<li></li>").append(a);
    li.attr({ "class": "page-item ", "id": pos });
    ($("#ul_pagination li").last()).before(li);

    /*activa el nuevo elemento agregado y desactiva el que le precede*/
    if (indice_activo == -1) {
        indice_activo = pos;
        $("#ul_pagination  [id = '" + (indice_activo) + "']").attr("class", "page-item" + "  " + "active");
        Hide_Reporte("plantilla");
        Load_Templates();
        Show_Reporte(nombre_reporte);
    }
    else {
        $("#ul_pagination  [id = '" + (indice_activo) + "']").attr("class", "page-item");
        Hide_Reporte(array_nombres_reportes[(indice_activo)]);

        indice_activo = pos;
        $("#ul_pagination  [id = '" + (pos) + "']").attr("class", "page-item" + "  " + "active");
        Load_Templates();
        Show_Reporte(nombre_reporte);

    }

}

/*Funcion para eliminar al paginado un reporte */
function Remove_Reporte_Paginado(index) {
    var temp;
    if (array_nombres_reportes.length == 1) {
        $("#ul_pagination").empty();
        $("#div_action_report").hide();
        Hide_Reporte(array_nombres_reportes[index]);
        array_nombres_reportes.splice(index, 1);
        indice_activo = -1;
        Show_Reporte("plantilla");
    }

    else if (index == (array_nombres_reportes.length - 1)) {

        if (indice_activo == index) {
            $("#ul_pagination  [id = '" + (index) + "']").remove();
            Hide_Reporte(array_nombres_reportes[index]);
            array_nombres_reportes.splice(index, 1);
            indice_activo = array_nombres_reportes.length - 1;
            $("#ul_pagination  [id = '" + (indice_activo) + "']").attr("class", "page-item" + "  " + "active");
            Show_Reporte(array_nombres_reportes[indice_activo]);
        }
        else {
            $("#ul_pagination  [id = '" + (index) + "']").remove();
            array_nombres_reportes.splice(index, 1);
        }
    }
    else {

        $("#ul_pagination  [id = '" + (index) + "']").remove();
        Hide_Reporte(array_nombres_reportes[index]);
        array_nombres_reportes.splice(index, 1);

        for (var i = index; i < array_nombres_reportes.length; i++) {

            if (indice_activo == $("#ul_pagination  [id = '" + (i + 1) + "']").attr("id")) {
                $("#ul_pagination  [id = '" + (i + 1) + "']").attr("class", "page-item" + "  " + "active");
                indice_activo = i;
            }
            if (indice_activo == i) {
                $("#ul_pagination  [id = '" + (i + 1) + "']").attr("class", "page-item" + "  " + "active");
            }

            $("#ul_pagination  [id = '" + (i + 1) + "']").children().text(i + 1);
            $("#ul_pagination  [id = '" + (i + 1) + "']").attr("id", (i));
        }
        Show_Reporte(array_nombres_reportes[indice_activo]);

    }
}

function Div_Is_Empty($target) {
    $target = ($target instanceof jQuery) ? $target : $($target);
    return ($target.length > 0) && !$.trim($target.html());
}

/*Funcion apra cargar d eun solo golpe todos los templates cuando selecione un _Reporte*/
function Load_Templates() {
    var value = $("#reportListAvailable").children("li");
    (value).each(function (index, item) {
        if (Div_Is_Empty($("#div_show_report [id ='" + $(item).attr("value") + "']")))
            $("#div_show_report [id ='" + $(item).attr("value") + "']").load("templates/" + $(item).attr("value") + ".html");
        if ($(item).attr("value") == "int_terrestre") {
            var value_1 = $("#reportListAvailable").children("div").children("label").children("input");
            (value_1).each(function (index_1, item_1) {
                if (Div_Is_Empty($("#div_show_report [id ='" + $(item_1).attr("value") + "']"))) {
                    $("#div_show_report [id ='" + $(item_1).attr("value") + "']").load("templates/" + $(item_1).attr("value") + ".html");
                }
            });
        }
    });
}

/*Funcion para anadir dinamicamente e reporte segun lo selecione*/
function Show_Reporte(nombre_reporte) {

    switch (nombre_reporte) {
        case "plantilla":
            if (Div_Is_Empty($("#div_show_report [id ='" + nombre_reporte + "']"))) {
                $("#div_show_report [id ='" + nombre_reporte + "']").load("templates/plantilla.html");
            }
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;
        case "servicios_locales":
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;
        case "int_terrestre":
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            if (servicio_aereo == "servicio_aéreo_1") {
                $("#servicio_aéreo_1").show();
            } else if (servicio_aereo == "servicio_aéreo_2") {
                $("#servicio_aéreo_2").show();
            }
            break;
        case "servicio_nacional":
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;
        case "servicio_insular":
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;
    }
}

function Hide_Reporte(nombre_reporte) {

    switch (nombre_reporte) {
        case "plantilla":
            $("#div_show_report [id ='" + nombre_reporte + "']").hide();
            break;
        case "servicios_locales":
            $("#div_show_report [id ='" + nombre_reporte + "']").hide();
            break;
        case "int_terrestre":
            $("#div_show_report [id ='" + nombre_reporte + "']").hide();
            $("#servicio_aéreo_1").hide();
            $("#servicio_aéreo_2").hide();
            break;
        case "servicio_nacional":
            $("#div_show_report [id ='" + nombre_reporte + "']").hide();
            break;
        case "tarifa_carga":
            $("#div_show_report [id ='" + nombre_reporte + "']").hide();
            break;
        case "servicio_insular":
            $("#div_show_report [id ='" + nombre_reporte + "']").hide();
            break;
    }
}

function Hide_All_Reporte() {

   $("#div_left_side .openbtn").hide();
    $("#div_action_report").hide();
    $("#div_pagination").show();
    $("#div_show_report #plantilla").hide();
    $("#div_show_report #servicios_locales").hide();
    $("#div_show_report #int_terrestre").hide();
    $("#div_show_report #servicio_aéreo_2").hide();
    $("#div_show_report #servicio_aéreo_1").hide();
    $("#div_show_report #servicio_nacional").hide();
    $("#div_show_report #servicio_reporte").hide();
    $("#div_show_report #tarifa_carga").hide();
    $("#div_show_report #servicio_insular").hide();
    $("#searchClientData_1").hide();
    $("#searchClientData_2").hide();
    $("#searchClientData_btn").hide();
}

/* Aca termina el codigo para mostrar los reportes y ocultarlos*/




/*Aca comien el codigo para relizar las acciones de imprimir y exportar los reportes seleccionados*/

/*Metodo de validacion para saber que es un entero*/
function Input_Is_Empty(id) {
    return true;
}


function Input_Is_NUmber(id) {
    return true;
}




/*Aca comien el codigo para relizar las acciones de imprimir y exportar los reportes seleccionados*/

function Exportar() {
    array_nombres_reportes.forEach(function (element) {
        alert("Nombre:" + element);
        Exportar_PDF(element, element);
    });
}

function Exportar_PDF(Contenido_ID, nombre) {

    var doc = new jsPDF("p", "mm", "a4");
    var width_p = doc.internal.pageSize.getWidth();
    var height_p = doc.internal.pageSize.getHeight();

    html2canvas($("#" + Contenido_ID), {
        onrendered: function (canvas) {
            var img = canvas.toDataURL("image/jpg", 1.0);
            /*var img_w = canvas.width;
               var img_h = canvas.height;*/
            /* alert("ancho:" + img_w + "ancho d ela hoja:"+ width_p);
               alert("altura:" + img_h + "altura d ela hoja:"+ height_p);*/
            //window.open(img);

            doc.addImage(img, 'JPEG', 1, 1, width_p, height_p);
            doc.save(nombre + '.pdf');

            /* var pdf = doc.output('blob');
 
             var data = new FormData();
             data.append('data', pdf);
 
 
             var xhr = new XMLHttpRequest();
             xhr.onreadystatechange = function () {
                 if (this.readyState == 4) {
                     if (this.status !== 200) {
                         // handle error
                     }
                 }
             }
 
             xhr.open('POST', 'upload.php', true);
             xhr.send(data);*/


        }
    });
}