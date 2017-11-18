$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#itemForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    function ajaxPost(){
        var formData = {
        	genericLibraryId : window.location.hash.substring(1),
           	title            : $("#itemName").val()
        }
    	$.ajax({
    		type : "POST",
    		contentType : "application/json",
    	    url : "http://localhost:8080/manage/addgeneric",
    	    data : JSON.stringify(formData),
    	    dataType : 'json',
    	    success : function(result) {
    	    	console.log("Success: ");
				$("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" + 
					"Post Successfully! <br>" +
					"---> Customer's Info: userId = " + 
					result.data.genericLibraryId + " ,name = " + result.data.title + " ,type = " + result.data.description + "</p>");
    	    },
    	    error : function(e) {
    	    	console.log("FAILURE: ");
    	    	$("#postResultDiv").html("<strong>Error</strong>");
    	    }
    	});
    	
        function resetData(){
        	1;
        	$("#itemName").val("");
        }
    }
	
})