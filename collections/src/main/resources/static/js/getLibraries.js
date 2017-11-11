$( document ).ready(function() {
	
	//GET Request
	$("#getAllLibraries").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
    
	//GET Function
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : "http://localhost:8080/manage/library?userId=1",
			success: function(result){
					$('#getResultDiv ul').empty();
					var library = result[0].name;
					result.forEach(function(element){
						library += element.name;
					});
					console.log("Success: ", result[0].name);
					$("#getResultDiv").html(library);
			},
			error : function(e){
				$("#getResultDiv").html("<strong>Error2</strong>");
				console.log("ERROR: ", e);
			}
		});
	}
})