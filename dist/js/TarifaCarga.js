"use strict";function _classCallCheck(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,a){for(var e=0;e<a.length;e++){var n=a[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(a,e,n){return e&&t(a.prototype,e),n&&t(a,n),a}}(),IcsReporteCarga=function(){function t(a){_classCallCheck(this,t),this._elemento=a,this._container=$("table.tabla_tarifas_cargas > tbody")}return _createClass(t,[{key:"isLimitValRate",value:function(t){for(var a=!0,e=t.toString(),n=0;n<e.length;n++)"9"!==e.charAt(n)&&(a=!1);return a&&e.includes("999")}},{key:"drawRangeFills",value:function(){var t=""+this._elemento.elemento+this._elemento.hasta;t=t.replace(/\s/g,""),$("table.tabla_tarifas_cargas> tbody input#"+t)&&$("table.tabla_tarifas_cargas> tbody input#"+t).val(this._elemento.precio.toFixed(2)+" €")}},{key:"getKgAdicional",value:function(t){var a=t.length-1,e=t.length-2;return this.isLimitValRate(t[a].hasta)?t[a].precio.toFixed(2):(t[a].precio-t[e].precio).toFixed(2)}},{key:"drawAditionalFills",value:function(t){var a=this;Object.keys(t).forEach(function(e){var n=t[e].arraySelf.sort(function(t,a){return t.hasta>a.hasta?1:t.hasta<a.hasta?-1:0});n.length,n.length;$("table.tabla_tarifas_cargas  > tbody input#"+e+'[refid="kg"]').val(a.getKgAdicional(n)+" €")}),this.drawTomisslFills(t)}},{key:"getLastRangeValid",value:function(t,a){var e=t[0];return t.forEach(function(t,n){t.precio&&t.hasta<a&&a-parseInt(t.hasta)<a-parseInt(e.hasta)&&(e=t)}),e}},{key:"calculatePriceExistenInRateRange",value:function(t,a){var e=this,n={boolean_exist:!1,price:null},i=null;return t.forEach(function(t,r){a>=parseFloat(t.desde)&&a<=parseFloat(t.hasta)&&!e.isLimitValRate(t.hasta)&&(!i||parseFloat(t.hasta)<i)&&(i=parseFloat(t.hasta),n.boolean_exist=!0,n.price=t.precio)}),n}},{key:"calculateRangeInexistent",value:function(t,a){var e=this;if(t.attr("element")){var n=parseInt(t.attr("tramo"));Object.keys(a).forEach(function(i){if(i.toString()===t.attr("element").toString()){t.attr("element");var r=e.calculatePriceExistenInRateRange(a[i].arraySelf,n);if(r.boolean_exist)t.val(r.price.toFixed(2)+" €");else{var l=a[i].arraySelf.sort(function(t,a){return t.hasta>a.hasta?1:t.hasta<a.hasta?-1:0}),s=e.getKgAdicional(l),o=e.getLastRangeValid(l,parseInt(t.attr("tramo"))),c=parseInt(t.attr("tramo"))-parseInt(o.hasta);t.val((c*s+o.precio).toFixed(2)+" €")}}})}}},{key:"drawTomisslFills",value:function(t){var a=this,e=$("table.tabla_tarifas_cargas  > tbody > tr").find("td > input");$.each(e,function(e,n){"0.00 €"===$(n).val()&&a.calculateRangeInexistent($(n),t)})}},{key:"cleanTable",value:function(){$("#tabla_tarifas_cargas > tbody input").val("0.00 €")}},{key:"listaElementos",set:function(t){this._elemento=t}},{key:"listaElemento",get:function(){return this._elemento}},{key:"container",set:function(t){this._container=t},get:function(){return this._container}}]),t}();