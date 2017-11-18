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
					result.forEach(function(element){
						var library = library + " " + element.name;
						var t = document.createTextNode(element.name);
					    var btn = document.createElement("BUTTON");
					    btn.appendChild(t);
					    btn.setAttribute("id", element.libraryId);
					    btn.setAttribute("type", "button");
					    document.getElementById("libraryGroup").appendChild(btn);
						$("#" + element.libraryId).click(function(event){
							event.preventDefault();
							ajaxGetItems(element.libraryId, element.type);
						});
					});
					console.log("Success: ", result[0].name);
			},
			error : function(e){
				$("#getResultDiv").html("<strong>Error2</strong>");
				console.log("ERROR: ", e);
			}
		});
	}
	
	// GET Items
	function ajaxGetItems(libId, libType){
		var URL = "http://localhost:8080/manage/items?libraryId=" + libId + "&libraryType=" + libType;
		$.ajax({
			type : "GET",
			url : URL,
			success: function(result){
				$('#getResultDiv ul').empty();
				var itemList = "";
				result.forEach(function(element){
					itemList += element.title + "\n";
				});
				console.log("Success: ", URL);
				$("#getResultDiv").html(itemList);
				console.log("Creating new add item button?");
				var button = document.createElement("button");
				button.innerHTML = "Add An Item";
				button.setAttribute("id", "newItem");
				document.getElementById("buttonGroup").appendChild(button);
				button.href = "itemCreation";
				button.addEventListener ("click", function() {
					window.location.href = "itemCreation" + '#' + libId;
				});
			},
			error : function(e){
				$("#getResultDiv").html("<strong>Error3</strong>");
				console.log("ERROR: Couldn't retrieve Items", URL);
			}
		});

	}
})