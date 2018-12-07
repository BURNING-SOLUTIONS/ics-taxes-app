
<?php

class reporteLocal{
	// Declaración de una propiedad
	private $arrayTarifas;

	function __construct($arrayTarifas) {
		$this->arrayTarifas = $arrayTarifas;
		$this->elementsToCompare = array("001", "002", "003", "004", "005", "006", "676", "012", "678", "679", "014", "681", "154");
	}

	// Declaración de un método
	public function getReportData() {
		$array_taxes = array();
		foreach ($this->arrayTarifas as $key => $value) {
			if( in_array($value['elemento'], $this->elementsToCompare) ){
				array_push($array_taxes, $value);
			}
		}
		return $array_taxes;
	}

} 

?>