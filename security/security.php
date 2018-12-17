<?php

class IcsSecurity{
	// Declaración de una propiedad
	static $icsTaxesPermisos = array(
			array("route"=>'index', "users"=>array("authenticated")),
			array("route"=>'clients-range-reports', "users"=>array("gema","fernando"))
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

	static function getPermissionByUser($user){
		$permissions =  self::$icsTaxesPermisos;
		$permissions_list = array();
		foreach ($permissions as $key => $permission) {
			# iterate over ics permissions constant...
			if(in_array("authenticated", $permission["users"]) || in_array($user, $permission["users"])) {
				$permissions_list[] = $permission["route"];
			}
		}
		return $permissions_list;
	}

	static function userHavePermisoForRoute($path, $user){
		$permissions =  self::$icsTaxesPermisos;
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