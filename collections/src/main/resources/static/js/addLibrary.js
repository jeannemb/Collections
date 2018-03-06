	function display() {
		console.log("Display Triggered");
		if (document.getElementById("libType").value.toLowerCase() == "other" ){
			document.getElementById("customType").style.visibility = "visible";
			document.getElementById("customText").style.visibility = "visible";	
		} else {
			document.getElementById("customType").style.visibility = "hidden";
			document.getElementById("customText").style.visibility = "hidden";
		}
	}

$( document ).ready(function() {
	console.log("enters funtion ");
	
	// SUBMIT FORM
    $("#libraryForm").submit(function(event) {
    	console.log("enters submit ");

		// Prevent the form from submitting via the browser.
		event.preventDefault();
		var libName = document.getElementById("libName");
		var libType = document.getElementById("libType");
		var altType = document.getElementById("customType").value.toLowerCase();
		if (libName.value == null || libName.value == "" || libType.value == null || libType.value == "" || (libType.value == "other" && altType.value == "")){
			alert("Please Fill All Required Fields");
		} else {
			ajaxPost();
		}
	});
    
    function ajaxPost(){
    	var formData = {
        	name :  $("#libName").val(),
        	type :  $("#libType").val().toLowerCase()
        }
    	$.ajax({
    		type : "POST",
    		contentType : "application/json",
    	    url : "/manage/createlibrary",
    	    data : JSON.stringify(formData),
    	    dataType : 'json',
    	    success : function(result) {
    	    	console.log("Success: ", result.data.name);
				$("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" + 
					"Post Successfully! <br>" +
					"---> Customer's Info: userId = " + 
					result.data.userId + " ,name = " + result.data.name + " ,type = " + result.data.type + "</p>");
				resetData();
				redirect();
    	    },
    	    error : function(e) {
    	    	console.log("FAILURE ");
    	    	resetData();
    	    	redirect();
    	    	$("#postResultDiv").html("<strong>Error</strong>");
    	    }
    	});
    	
        function resetData(){
        	1;
        	$("#libName").val("");
        	$("#libType").val("");
        }
        
        function redirect(){
        	window.location="/libraryHome2";
        }
    }
    
    $('[data-toggle=offcanvas]').click(function() {
	    $('.row-offcanvas').toggleClass('active');
    });
	
})