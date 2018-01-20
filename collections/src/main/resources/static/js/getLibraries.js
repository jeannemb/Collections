$( document ).ready(function() {
	
	ajaxGet();

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
					    btn.setAttribute("class", "btn btn-primary btn-md");
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
		var oldBtn = document.getElementById("newItem");
		if (oldBtn != null){
			oldBtn.parentNode.removeChild(oldBtn);
		}
		var URL = "http://localhost:8080/manage/items?libraryId=" + libId + "&libraryType=" + libType;
		$.ajax({
			type : "GET",
			url : URL,
			success: function(result){
				$('#getResultDiv ul').empty();
				var Values = new Array();
				var x = 0;
				result.forEach(function(element){
					if (element.description != null){
						Values[x] = [element.title, element.description];
					} else {
						Values[x] = [element.title, ""];
					}
					x = x + 1;
				});
				console.log("Success: ", URL);	
				
				var table = document.getElementById("itemTable");
				var tbody = document.createElement("tbody");
		        for (var i = 0 ; i < Values.length; i++) {
		        	var tr = document.createElement("tr");

					// for each inner array cell create td then text, append checkbox to end
		        	var l = Values[i].length;
					for (var j = 0; j <= l; j++) {
						var td = document.createElement("td");
					    if (j != l) {
						    var txt = document.createTextNode(Values[i][j]);
						    td.appendChild(txt);
					    } else {
					    	var checkbox = document.createElement("INPUT");
					    	checkbox.type = "checkbox";
					    	td.appendChild(checkbox);
					    }
					    tr.appendChild(td);
					}

					// append row to table
					tbody.appendChild(tr);
					table.appendChild(tbody);
		        }
				
				//create new button to add items
				console.log("Creating new add item button?");
				var button = document.createElement("button");
				button.innerHTML = "Add An Item";
				button.setAttribute("id", "newItem");
				button.setAttribute("class", "btn btn-primary btn-md");
				document.getElementById("itemDisplay").appendChild(button);
				button.href = "itemCreation";
				button.addEventListener ("click", function() {
					window.location.href = "itemCreation" + '#' + libId + "#" + libType;
				});
			},
			error : function(e){
				$("#getResultDiv").html("<strong>Error3</strong>");
				console.log("ERROR: Couldn't retrieve Items", URL);
			}
		});

	}
})