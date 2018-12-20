(function(){
	$(document).ready( ()=> {
		var showOptionsByMenu = function (permissions) {
			var permission_list = $.map(permissions, function(elm) { return elm });
			permission_list.forEach((val, key)=>{
				$(`[permission-route=${val}]`).css('display', 'inline-block');
				$(`[permission-route=${val}]`).removeAttr('hidden');
			})
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

	});
})();