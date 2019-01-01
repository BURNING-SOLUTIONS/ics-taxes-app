(function(){
	$(document).ready( ()=> {

		var permission_list = [];

		var showOptionsByMenu = function (permissions) {			
			permission_list = $.map(permissions, function(elm) { return elm });
		
		//console.warn(permission_list.indexOf("edited-inputs-report"))	;
			if(permission_list.indexOf("edited-inputs-report")===-1){
          	$('table tbody input').attr("disabled", true);
			$('table tbody input').css("background", "white");
			}
			if(permission_list.length){
				permission_list.forEach((val, key)=>{
					$(`[permission-route=${val}]`).css('display', 'inline-block');
					$(`[permission-route=${val}]`).removeAttr('hidden');
				});
			}else{
				let url = new URL(window.location.href);
            	var isExternalLink = url.searchParams.get("external_source");
            	if (!isExternalLink) {
                	window.location.href = 'index.html';
            	}
			}
			
		};

	 	$.ajax({url: "./security/check_auth.php"})
		 	.done( (response)=> {  
		 		let data = JSON.parse(response);
		      	if(data.status === 401){
		      		window.location.href = "index.html";	      		
		      	}else if(data.status === 200){
		      		showOptionsByMenu(data.permissions);
		      	}
	      	});

	 	window.getPermisionsList = function(){
	 		return permission_list;
		}

	});
})();