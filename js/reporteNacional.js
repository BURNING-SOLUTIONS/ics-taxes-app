


class IcsReporteNacional {

	constructor(arr) {
		this._elemento = arr;
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
		

		drawRangeFills() {

			//if(this._elemento['tarifa'] && this._elemento['tarifa'].indexOf("NR")>=0 ) {
				let idnacional=`${this._elemento['elemento']}${this._elemento['hasta']}`;
				idnacional=idnacional.replace(/\s/g, '');
				if($(`input#${idnacional}`) && !$(`input#${idnacional}`).attr('refid') ){									
					if(!$(`input#${idnacional}`).attr('refid')){
						$(`input#${idnacional}`).val(`${this._elemento['precio'].toFixed(2)} €`);
						$(`input[refid=${idnacional}]`).val(`${this._elemento['precio'].toFixed(2)} €`);
					}
				}



				if(this._elemento['precio']){
					$(`input#${this._elemento['elemento']}`).val(`${this._elemento['precio'].toFixed(2)} €`);

				}	
				else 
					$(`input#${this._elemento['elemento']}`).val(`0.00 €`);



			//}

		/*	if($(`input#${this._elemento['elemento']}`).attr('refid')=="kg"){
					let kgadd=5000;
					$(`input#${this._elemento['elemento']}`).val(kgadd.toFixed(2));

				}
				*/

				
			}

			drawAditionalFills(adicionales){
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
					console.warn(asc);
					
					if((asc[last_pos]['hasta'] == 999) || (asc[last_pos]['hasta'] == 9999) ){
						/*if(asc[0].elemento === "330"){
							console.warn(asc, elem);
						}; */
						$(`input#${key}[refid="kg"]`).val(`${(asc[last_pos]['precio']).toFixed(2)} € `);
					}else {

						$(`input#${key}[refid="kg"]`).val(`${(asc[last_pos]['precio']-asc[prev_last_pos]['precio'] ).toFixed(2)} € `);
					}

				})

			}

		}

		









	//export IcsReporteNacional;




