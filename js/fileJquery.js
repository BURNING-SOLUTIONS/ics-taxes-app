

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

    /*Se captura el evento dle click a exportar*/
    $("#bt_exportar").click(function () {
        Exportar_PDF(array_nombres_reportes[indice_activo], "archivo");
    });

});

/***************************Funciones para agregar reortes o eliminar por cliente********************************/
/*Funcion para anadir al paginado un nuevo reporte al paginado*/
function Add_Reporte_Paginado(nombre_reporte) {

    if (array_nombres_reportes.length == 0) {

        var a = $("<a></a>").text("<");
        a.attr({ "class": "page-link", "href": "#" });
        var li = $("<li></li>").append(a);
        li.attr({ "class": "page-item", "id": "Siguiente" });

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
        console.log("el elemento a mostras:" + nombre_reporte);
        Hide_Reporte("plantilla");
        Show_Reporte(nombre_reporte);
    }
    else {
        $("#ul_pagination  [id = '" + (indice_activo) + "']").attr("class", "page-item");
        Hide_Reporte(array_nombres_reportes[(indice_activo)]);

        indice_activo = pos;
        $("#ul_pagination  [id = '" + (pos) + "']").attr("class", "page-item" + "  " + "active");
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

/*Funcion para saber si un div esta vacio o no*/
function Div_Is_Empty($target) {
    $target = ($target instanceof jQuery) ? $target : $($target);
    return ($target.length > 0) && !$.trim($target.html());
};

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
            if (Div_Is_Empty($("#div_show_report [id ='" + nombre_reporte + "']"))) {
                $("#div_show_report [id ='" + nombre_reporte + "']").load("templates/servicios_locales.html");
            }
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;

        case "int_terrestre":
            if (Div_Is_Empty($("#div_show_report [id ='" + nombre_reporte + "']"))) {
                $("#div_show_report [id ='" + nombre_reporte + "']").load("templates/Int.Terrestre.html");
            }
            $("#div_show_report [id ='" + nombre_reporte + "']").show();

            if (servicio_aereo == "servicio_aéreo_1") {
                if (Div_Is_Empty($("#div_show_report #servicio_aéreo_1"))) {
                    $("#div_show_report [id ='" + servicio_aereo + "']").load("templates/servicio_aéreo_1.html");
                }
                $("#servicio_aéreo_1").show();
            } else if (servicio_aereo == "servicio_aéreo_2") {
                if (Div_Is_Empty($("#div_show_report #servicio_aéreo_2"))) {
                    $("#div_show_report [id ='" + servicio_aereo + "']").load("templates/servicio_aéreo_2.html");
                }
                $("#servicio_aéreo_2").show();
            }
            break;

        case "servicio_nacional":
            if (Div_Is_Empty($("#div_show_report [id ='" + nombre_reporte + "']"))) {
                $("#div_show_report [id ='" + nombre_reporte + "']").load("templates/servicio_nacional.html");
            }
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;

        case "servicio_insular":
            if (Div_Is_Empty($("#div_show_report [id ='" + nombre_reporte + "']"))) {
                $("#div_show_report [id ='" + nombre_reporte + "']").load("templates/servicio_insular.html");
            }
            $("#div_show_report [id ='" + nombre_reporte + "']").show();
            break;

        case "tarifa_carga":
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
}

/* Aca termina el codigo para mostrar los reportes y ocultarlos*/




/*Aca comien el codigo para relizar las acciones de imprimir y exportar los reportes seleccionados*/

function Exportar_PDF(Contenido_ID, nombre) {
    var pdf = new jsPDF('l', 'mm', 'a4');
    var html = $("#" + Contenido_ID).html();
    specialElemententHandlers = {};
    margin = { top: 10, bottom: 20, left: 10, width: 522 };
    pdf.fromHTML(html, margin.left, margin.top, { 'width': margin.width }, function (dispose) { pdf.save(nombre + '.pdf') }, margin);
}










/* Aca comeinsa el codigo para modificar reporte tarifas internacionales terrestres */

function Add_Filas_Tabla() {
    var campo;
    var celda;
    var fila;
    for (var i = 0; i < 31; i++) {
        fila = $("<tr></tr>");
        for (var j = 0; j < 6; j++) {
            if (j == 0) {
                if (i >= 0 && i < 10) {
                    campo = $("<a></a>").text("hola1");
                    celda = $("<td></td>").append(campo);
                    fila.append(celda);
                } else if (i >= 10 && i < 15) {
                    campo = $("<a></a>").text("hola2");
                    celda = $("<td></td>").append(campo);
                    fila.append(celda);
                } else if (i >= 15 && i < 31) {
                    campo = $("<a></a>").text("hola3");
                    celda = $("<td></td>").append(campo);
                    fila.append(celda);
                }
            }
            campo = $("<a></a>").text("hola");
            celda = $("<td></td>").append(campo);
            fila.append(celda);
        }
    }

    $(".tbody_t_i_t .tr_second").after(fila);
}

