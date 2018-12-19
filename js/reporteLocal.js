class IcsReporteLocal {
	constructor(arr) {
		this._elemento = arr;
		this._container = $('table.table_servicios_nacionales > tbody');
			/*this._oFileIn = document.getElementById('file_prices_list_input');
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
			var that = this;*/
		}

		set listaElementos(elm) {
			this._elemento = elm;
		}

		get listaElemento() {
			return this._elemento;
		}

		//DRAW FIELDS IN THIS REPORT, THAT CONTAINS "ELEMENT" AND "HASTA" TRAMO..
		drawRangeFills() {
			//console.info(this.getContainer());
			//REPORTE LOCAL OPERACTIONS.. TODO CLIENTE TIENE REPORTE LOCAL
			if(this._elemento['precio']){
				$(`div#serviciosLocalesReport table > tbody input#${this._elemento['elemento']}`).val(`${this._elemento['precio'].toFixed(2)} €`)
			}	
			else 
				$(`div#serviciosLocalesReport table > tbody input#${this._elemento['elemento']}`).val(`0.00 €`);				
		}
		

}

