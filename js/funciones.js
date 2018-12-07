
function myFunction() {

    var a = document.getElementById("FormControlSelect1").value;
    alert("You have selected some text!" + a);

    Desmarcar_Reportes();
}


/*Funcion para desmarcar los checkbock de los reportes reportes*/
function Desmarcar_Reportes() {
    var i = 0;
    var array_reportes = new Array("check_reporte_1", "check_reporte_2", "check_reporte_3", "check_reporte_4", "check_reporte_5", "check_reporte_6", "check_reporte_7", "check_reporte_8", "check_reporte_9", "check_reporte_10", "check_reporte_11", "check_reporte_12");

    for (; i < array_reportes.length; i++) {

        if (document.getElementById(array_reportes[i]).checked == true) {
            document.getElementById(array_reportes[i]).checked = 0;
        }
    }
    document.getElementById("btn_generar").disabled = true;
}

/*Funcion para habilitar el boton generar reportes cuando se seleciona  los checkbock de los reportes*/
function Habilitar_Btn_Generar(checkbock) {
    if (checkbock.checked == true) {
        document.getElementById("btn_generar").disabled = false;
    }
    else if (checkbock.checked == false) {
        console.log(Cantidad_CheckBox_Marcados());
        var valor = Cantidad_CheckBox_Marcados();

        if (Cantidad_CheckBox_Marcados() == 0) {
            document.getElementById("btn_generar").disabled = true;
        }
    }
}

/* Cuenta la cantidad d echeckbock marcados en los reportes si es mayor que cero habilita el boton d egenerar si es igual a cero lo desabilita*/
function Cantidad_CheckBox_Marcados() {
    var cantidad = 0;
    var i = 0;
    var x = document.getElementsByClassName("form-check-input");

    for (; x[i];) {
        if (x[i].checked == true) {
            cantidad++;
        }
        i++
    }
    return cantidad;
}


/* metodos para mostrar dinamicamente los reportes*/

/*array a cojone para dibujar dinamicamente la tabla del reporte servicios todo esto deberia venir de la BD*/
var array_servicios = new Array(
    {
        tipo_servicio: "MOTO URGENTE",
        descripcion: "asdasdadasdasdasda",
        nombre_servicio: "MOTO",
        array_elementos: new Array(
            {
                id: 001,
                nombre: "Dirreciones"
            },
            {
                id: 003,
                nombre: "PESOS Y MEDIDAS(Hasta 5 kg y 45*25*25 cm)"
            },
            {
                id: 002,
                nombre: "Tiempo de espera(A partir de 10 minutos)"
            },
            {
                id: 005,
                nombre: "Kilometros(Fuera del casco Urbano)"
            },
            {
                id: 004,
                nombre: "CANON DE LLUVIA(Por direccion)"
            },
            {
                id: 006,
                nombre: "CANON DE LLUVIA(Por Km)"
            }
        )
    },
    {
        tipo_servicio: "FURGONETAS",
        descripcion: "asdasdadasdasdasda sobre las furgonetas",
        nombre_servicio: "FURGONETA 400 Kg",
        array_elementos: new Array(
           {
                id: 676,
                nombre: "PRECIO POR DIRECCION"
            },
            {
                id: 012,
                nombre: "PRECIO POR KILOMETRO(Fuera del casco Urbano)"
            },
            {
                id: 678,
                nombre: "Tiempo de espera(A partir de 10 minutos)"
            }
        )
    },
    {
        tipo_servicio: "FURGONETAS",
        descripcion: "asdasdadasdasdasda sobre las furgonetas",
        nombre_servicio: "FURGONETA 1500 Kg",
        array_elementos: new Array(
            
            {
                id: 679,
                nombre: "PRECIO POR DIRECCION"
            },
            {
                id: 014,
                nombre: "PRECIO POR KILOMETRO(Fuera del casco Urbano)"
            },
            {
                id: 681,
                nombre: "Tiempo de espera(A partir de 10 minutos)"
            }
        )
    }
)

function Elemento(id,nombre) {
  this.id = id;
  this.nombre = nombre;
 
}

function Prueba() {
    
    /*genera_tabla_reporte1(array_servicios[0]);*/
    Generar_Reporte();
}

/*Metodo para recorrer el array d eservicios que existen  y pintar cada una d ela s tipos de serviciosque hay*/
function Generar_Reporte() {

    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>





    array_cabeceras_servicios = new Array();
    array_tipos_servicios = new Array();
    //variable que guarda sobre que div cabecera agregar la tabla que s egenerara para cada elemto serivicio d emi array de servicios
    var pos_div_cabecera;
    var tipo_servicio

    for (var i = 0; i < array_servicios.length; i++) {
        
        console.log("entre en generar reporte: "+ i);

         tipo_servicio = array_servicios[i].tipo_servicio;
        
        /*aca compruebo si el servicio existe o no, si existe no creo una cabecera nueva solo agrego como hijo la tabla html genrada dinamicamente a esa cabecera, d eno exixstir si creo una cabesera nuevo y luego agrego el codigo html de la tabal generada*/
        var existe_cabecera = Existe_Servicio(array_tipos_servicios, tipo_servicio);
       
       

        if (existe_cabecera < 0) {
            array_tipos_servicios.push(tipo_servicio);
            //Creo el div cabecerra para estetipo de serivicio, Guardo en array_cabeceras_servicios este div para no tenerlo que generar nuevamente
            array_cabeceras_servicios.push(Generar_Cabecera(tipo_servicio));
            pos_div_cabecera = array_tipos_servicios.length - 1;
        }
        else {
            pos_div_cabecera = existe_cabecera;
        }
     
        array_cabeceras_servicios[pos_div_cabecera].appendChild(generar_tabla_reporte1(array_servicios[i]));
    }
  
    for (var i = 0; i < array_cabeceras_servicios.length; i++)
        body.appendChild(array_cabeceras_servicios[i]);
}


/* metodo par ageenerar dinamicamente la cabecera*/
function Generar_Cabecera(tipo_de_servicio) {

    
    var div_contenedor = document.createElement("div");
    div_contenedor.setAttribute("class", "contenedora");

    var div_cabecera = document.createElement("div");
    div_cabecera.setAttribute("class", "topnav");


    var a_elemento1 = document.createElement("a");
    a_elemento1.innerHTML = "SERVICIOS";
    a_elemento1.setAttribute("class", "a_elemento1");


    var a_elemento2 = document.createElement("a");
    a_elemento2.innerHTML = "EUROS";

    var a_elemento3 = document.createElement("a");    
    a_elemento3.innerHTML = tipo_de_servicio;

    var a_elemento4 = document.createElement("a");    
    a_elemento4.innerHTML = "";


    div_cabecera.appendChild(a_elemento1);
    div_cabecera.appendChild(a_elemento4);
    div_cabecera.appendChild(a_elemento3);
    div_cabecera.appendChild(a_elemento2);
    
    a_elemento1.setAttribute("class", "a_elemento4");
    

    div_contenedor.appendChild(div_cabecera);

    return div_contenedor;
}


/*Metodo para corroborar si existe o no un Tipo de servicio se le pasa un array  dodne se buscara por el nombre un servicio determinado*/
function Existe_Servicio(array_tipos_servicios, tipo_servicio) {
    
    /*console.log("tipo de servicio" + tipo_servicio);
    console.log("tipo dearray servicio" + array_tipos_servicios);
      console.log("longitud del array" + array_tipos_servicios.length);*/
    var value = -1;
    for (var i = 0; i < array_tipos_servicios.length; i++) {
        var element = array_tipos_servicios[i];
        if (tipo_servicio == array_tipos_servicios[i])
           value = i;
    }
    
    return value;
}


/*Genera una tabla para un determinado servicio pasandole como atributo el objeto servicio obtenido del array que contiene todos los servicios que s eusan en el reporte 1*/

function generar_tabla_reporte1(obj_servicio) {

    var tabla = document.createElement("table");
    
    //tabla.setAttribute(id="tabla_reporte1");

    var tblBody = document.createElement("tbody");

    // Crea las celdas

    // la cantidas de hileras es el resultado d ela cantidad de elementos que contien el servicio +1 lo cual almaceno en este array
    var array_elementos1 = obj_servicio.array_elementos;
 

    for (var i = 0; i <= array_elementos1.length; i++) {
          
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
             

        if (i == 0) {

            for (var j = 0; j < 3; j++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                var celda = document.createElement("td");
                var textoCelda;

                //asi s emodifican los atributos de los objetos creados con DOM
                if (j == 0) {
                    textoCelda = document.createTextNode(obj_servicio.nombre_servicio);
                    celda.setAttribute("rowspan", "7");
                    celda.setAttribute("class", "hileras_cabeceras");
                    celda.appendChild(textoCelda);
                }
                else if (j == 1)
                    celda.setAttribute("colspan", "2");
                else {
                    textoCelda = document.createTextNode(obj_servicio.descripcion);
                    celda.setAttribute("class", "hileras_cabeceras");
                    celda.setAttribute("rowspan", "7");
                    celda.appendChild(textoCelda);
                }

                hilera.appendChild(celda);
            }
        }
        else {        
               

                for (var j = 0; j < 2; j++) {
                   
                    // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                    // texto sea el contenido de <td>, ubica el elemento <td> al final
                    // de la hilera de la tabla
                    var celda = document.createElement("td");
                    var textoCelda;
                    if (j == 0)
                    {
                      
                
                         //var a = array_elementos1[i].nombre;
                        textoCelda = document.createTextNode("aasdfasdfasdfasdfasdfasdfdasfasdfasfasfsdafasdfdasdfasdfdasfasf");
                    }
                         
                    else
                    {
                         //var b = array_elementos1[i].id;
                         textoCelda = document.createTextNode("p");
                    }
                        

                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }          


        }




        // agrega la hilera al final de la tabla (al final del elemento tblbody)
   
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>

    // modifica el atributo "border" de la tabla y lo fija a "2";
    //tabla.setAttribute("border", "2");
    tabla.setAttribute("class","table table-striped");
    return tabla;
}