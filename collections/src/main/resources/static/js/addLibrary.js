$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#libraryForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    function ajaxPost(){
    	var formData = {
        	userId : 1,
        	name :  $("#libName").val(),
        	type :  $("#libType").val().toLowerCase()
        }
    	
    	$.ajax({
    		type : "POST",
    		contentType : "application/json",
    	    url : "http://localhost:8080/manage/createlibrary",
    	    data : JSON.stringify(formData),
    	    dataType : 'json',
    	    success : function(result) {
    	    	console.log("Success: ", result.data.name);
				$("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" + 
					"Post Successfully! <br>" +
					"---> Customer's Info: userId = " + 
					result.data.userId + " ,name = " + result.data.name + " ,type = " + result.data.type + "</p>");
    	    },
    	    error : function(e) {
    	    	console.log("FAILURE: ", result.data.name);
    	    	$("#postResultDiv").html("<strong>Error</strong>");
    	    }
    	});
    	
        function resetData(){
        	1;
        	$("#libName").val("");
        	$("#libType").val("");
        }
    }
	
})