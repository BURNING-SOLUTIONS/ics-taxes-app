class IcsCondicionesGenerales {
    constructor(arr) {
        this._elemento = arr;
        this._container = $('table.tabla_tarifas_cargas > tbody');

    }

    set listaElementos(elm) {
        this._elemento = elm;
    }

    get listaElemento() {
        return this._elemento;
    }

    set container(container) {
        this._container = container;
    }

    get container() {
        return this._container;
    }


    //DRAW FIELDS IN THIS REPORT, THAT CONTAINS "ELEMENT" AND "HASTA" TRAMO..
    drawRangeFills() {
        //console.info(this.getContainer());
        let elemento = $(`input#${this._elemento['elemento']}`);
        //REPORTE LOCAL OPERACTIONS.. TODO CLIENTE TIENE CONDICIONES GENERALES
        if (elemento && this._elemento['precio']) {
            elemento.val(`${this._elemento['precio'].toFixed(2)} €`)
        }
        else
            elemento.val(`0.00 €`);
    }

}

