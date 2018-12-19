class IcsReporteNacional {
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

		set container(container) {
			this._container = container;
		}

		get container() {
			return this._container;
		}

		isLimitValRate(val){
			let result = true;
			let limit_rate = val.toString(),
		    	substring = "999";
			for (var i = 0; i < limit_rate.length; i++) {
  				if(limit_rate.charAt(i) !== "9")
					result = false; 			
			}
			return result && limit_rate.includes(substring);
		}	

		drawRangeFills() {		
			//OPERACIONES PARA PINTAR LOS ELEMENTOS BASICOS DE EL REPORTE NACIONAL
			let idnacional = `${this._elemento['elemento']}${this._elemento['hasta']}`;
			idnacional = idnacional.replace(/\s/g, '');			

			if( $(`table.table_servicios_nacionales > tbody input#${idnacional}`) ){
					$(`table.table_servicios_nacionales > tbody input#${idnacional}`)
						.val(`${this._elemento['precio'].toFixed(2)} €`);
			}				
		}

		getKgAdicional(asc){			
			let result = "";
			let last_pos = asc.length - 1;
			let prev_last_pos = asc.length - 2;
			if(this.isLimitValRate((asc[last_pos]['hasta']))){
				result = (asc[last_pos]['precio']).toFixed(2);
			}else {
				result = (asc[last_pos]['precio']-asc[prev_last_pos]['precio'] ).toFixed(2);
			}
			return result;	
		}

		drawAditionalFills(adicionales){
      		//console.warn(adicionales);
			Object.keys(adicionales).forEach((key)=>{					
				let asc = adicionales[key].arraySelf.sort(function (a, b) {
					if (a.hasta > b.hasta) {
						return 1;
					}
					if (a.hasta < b.hasta) {
						return -1;
					}
					// a must be equal to b
					return 0;
				}); 
				let last_pos = asc.length-1;
				let prev_last_pos = asc.length-2;					
				$(`table.table_servicios_nacionales > tbody input#${key}[refid="kg"]`)
					.val(`${this.getKgAdicional(asc)} €`)				
			});

			this.drawTomisslFills(adicionales);

		}	

		getLastRangeValid(asc, tramoToCompare){
			let result = asc[0];
			asc.forEach((val, key)=>{
				if(val.precio && val.hasta < tramoToCompare){						
					if((tramoToCompare - parseInt(val.hasta)) < (tramoToCompare - parseInt(result['hasta'])))
						result = val;			
					}
			});
			return result;
		}

		//SEGUN UN ARREGLO DE ELEMENTOS Y UN TRAMO CALCULA EL MENOR TRAMO DONDE SE PUEDE EXTRAER EL PRECIO
		//DE DICHO TRAMO QUE NO VIENE EN LOS DATOS DEL REPORTE
		calculatePriceExistenInRateRange(arrayVal, this_tramo){
			let result = {boolean_exist: false, price: null };
			let lower_val = null;			
			arrayVal.forEach((val, key) => {
				if((this_tramo >= parseFloat(val.desde)) && (this_tramo <= parseFloat(val.hasta)) && !this.isLimitValRate(val.hasta)) {
					if(!lower_val || parseFloat(val.hasta) < lower_val){
						lower_val = parseFloat(val.hasta);
						result.boolean_exist = true;
						result.price = val.precio;
					} 					
				 }
			});			
			return result;
		}
		//ESTE METODO CALCULA LOS VALORES PARA TODO LOS TRAMOS QUE NO TIENEN VALOR EN EL REPORTE
		calculateRangeInexistent(element, adicionales){				
			if(element.attr('element')){				
				let this_tramo = parseInt(element.attr('tramo'));				
				Object.keys(adicionales).forEach((key)=>{	
					if(key.toString() ===  (element.attr('element')).toString()){
						/*if(element.attr('element') === "329" && this_tramo == 3){
							console.info(adicionales[key].arraySelf);
						}*/
						let calculatePriceInRange = this.calculatePriceExistenInRateRange(adicionales[key].arraySelf, this_tramo);
						if(calculatePriceInRange.boolean_exist){
							element.val(`${calculatePriceInRange.price.toFixed(2)} €`);
						}else{
							let asc = adicionales[key].arraySelf.sort(function (a, b) {
								if (a.hasta > b.hasta) {
									return 1;
								}
								if (a.hasta < b.hasta) {
									return -1;
								}
								// a must be equal to b
								return 0;
							});
							
							let kgAdicional = this.getKgAdicional(asc);
							let lastRangeValid = this.getLastRangeValid(asc, parseInt(element.attr('tramo')));
							let tramoDiferrences = (parseInt(element.attr('tramo'))) - parseInt(lastRangeValid['hasta']);
							
							element.val(`${(tramoDiferrences * kgAdicional + lastRangeValid.precio).toFixed(2)} €`);				
							
						}
					}				
					
													
					
				})				
					
			}
		}

		drawTomisslFills(adicionales){
				let nacionales_input = $('table.table_servicios_nacionales > tbody > tr').find('td > input');
					$.each(nacionales_input,(key, elm)=>{
						//console.info(elm)
						if($(elm).val() === "0.00 €"){
							this.calculateRangeInexistent($(elm), adicionales);//3291	
						}
						
				})			
			
		}

}

