<?php

class IcsSecurity{
	// Declaración de una propiedad
	static $icsTaxesPermisos = array(
			array("route"=>'index', "users"=>array("authenticated")),
			array("route"=>'clients-range-reports', "users"=>array("gema"))
		);

	function __construct() {
		/*self::$icsTaxesPermisos = array(
			array("route"=>'index', "users"=>array("authenticated")),
			array("route"=>'clients-range-reports', "users"=>array("gema"))
		);*/
	}

	static function getIcsPermisos(){
		return self::$icsTaxesPermisos;
	}

	public function userHavePermisoForRoute($path, $user){
		$permissions =  $this->getIcsPermisos();
		$have_permission = false;
		foreach ($permissions as $key => $permission) {
			# iterate over ics permissions constant...
			if($permission["route"] === $path && 
				(in_array($user, $permission["users"]) || in_array("authenticated", $permission["users"]))){
				$have_permission = true;
				break;
			}
		}
		return $have_permission;
	}

} 

?>