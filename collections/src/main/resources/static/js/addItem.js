$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#itemForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    function ajaxPost(){
        var formData = {
        	genericLibraryId : window.location.hash.substring(1).split('#')[0],
           	title            : $("#itemName").val()
        }
        var type = window.location.hash.substring(2);
        urlEnd = "addgeneric"
        if (type == "movies") {
        	urlEnd = "addmovie";
        } else if (type == "books") {
        	urlEnd = "addbook";
        }
    	$.ajax({
    		type : "POST",
    		contentType : "application/json",
    	    url : "http://localhost:8080/manage/" + urlEnd,
    	    data : JSON.stringify(formData),
    	    dataType : 'json',
    	    success : function(result) {
    	    	console.log("Success: " + window.location.hash.substring(1).split(':')[1]);
				$("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" + 
					"Post Successfully! <br>" +
					"---> Customer's Info: userId = " + 
					result.data.genericLibraryId + " ,name = " + result.data.title + " ,type = " + result.data.description + "</p>");
    	    },
    	    error : function(e) {
    	    	console.log("FAILURE: " + window.location.hash.substring(2));
    	    	$("#postResultDiv").html("<strong>Error</strong>");
    	    }
    	});
    	
        function resetData(){
        	1;
        	$("#itemName").val("");
        }
    }
	
})