var app = angular.module('collection', []);

app.controller('navigationController', function($scope,$http) {
	var libs = [];
    var itemsLocal = [];
	//var libItems = [];
    var selectedName = "";
	$scope.init = function () {
		$scope.clicked1 = true;
		$scope.clicked2 = true;
		//LibraryService.load();
		$http({
			method : "GET",
			url: "http://localhost:8080/manage/library?userId=1"
		}).then(function successCallback(response) {
            response.data.forEach(function(element){
            	var library = new Object();
            	library.libraryId = element.libraryId;
            	library.name = element.name;
            	library.type = element.type;
//            	var library = { libraryId: element.libraryId, name: element.name, type:element.type};
            	//libs.push(library);
            	var libItems = initItems(element.libraryId, element.type);
//            	items.push(item);
            	library.items = libItems;
            	libs.push(library);
            });
            loadInHtml();
            //$scope.status = items;
		}, function errorCallback(response) {

			$scope.status = response.statusText;
		});
	}

     function initItems(libraryId,type){
    	var items = [];
    	$http({
			method : "GET",
			url: "http://localhost:8080/manage/items?libraryId=" + libraryId + "&libraryType=" + type
		}).then(function successCallback(response) {
            response.data.forEach(function(element){
            	if (type == "books"){
                	var itemBook = new Object();
                	itemBook.itemId = element.itemId;
                	itemBook.booksLibraryId = element.booksLibraryId;
                	itemBook.title = element.title;
                	itemBook.ISBN13 = element.ISBN13;
                	itemBook.ISBN10 = element.ISBN10;
                	itemBook.authors = element.authors;
                	itemBook.owns = element.owns;
                	itemBook.wantsToOwn = element.wantsToOwn;
                	itemBook.complete = element.complete;
                	itemBook.wantsToComplete = element.wantsToComplete;
                	items.push(itemBook);
                	//libItems.push(itemBook);
            	}else if(type == "movies"){
                	var itemMovie = new Object();
                	itemMovie.itemId = element.itemId;
                	itemMovie.moviesLibraryId = element.moviesLibraryId;
                	itemMovie.title = element.title;
                	itemMovie.UPC = element.UPC;
                	itemMovie.actors = element.actors;
                	itemMovie.owns = element.owns;
                	itemMovie.wantsToOwn = element.wantsToOwn;
                	itemMovie.complete = element.complete;
                	itemMovie.wantsToComplete = element.wantsToComplete;
                	items.push(itemMovie);
                	//libItems.push(itemMovie);
                }else{
                	var itemGeneric = new Object();
                	itemGeneric.itemId = element.itemId;
                	itemGeneric.genericLibraryId = element.genericLibraryId;
                	itemGeneric.title = element.title;
                	itemGeneric.description = element.description;
                	itemGeneric.owns = element.owns;
                	itemGeneric.wantsToOwn = element.wantsToOwn;
                	itemGeneric.complete = element.complete;
                	itemGeneric.wantsToComplete = element.wantsToComplete;
                	itemGeneric.push(itemGeneric); 
                	items.push(itemGeneric);
                	//libItems.push(itemGeneric);
            	}
            });
		}, function errorCallback(response) {
			$scope.status = response.statusText;
		});
    	
    	return items;
    }
    
     function loadInHtml(){
    	if(libs.length > 0){
    		 $scope.welcomeMessage = false;
    		 $scope.libraryMessage = false;
    	 }
    	var libsNames = [];
    	for (var i in libs){
    		libsNames.push(libs[i].name); 
    	}
    	
    	if(libs[0].type == "books"){
    		$scope.typeIsBook = true;
    		$scope.typeIsMovie = false;
    		$scope.typeIsGeneric = false;

    		
    	}else if (libs[0].type == "movies"){
    		$scope.typeIsBook = false;
    		$scope.typeIsMovie = true;
    		$scope.typeIsGeneric = false;
    	}else{
    		$scope.typeIsBook = false;
    		$scope.typeIsMovie = false;
    		$scope.typeIsGeneric = true;
    	}
    	
    	
    	$scope.items = libs[0].items;
        $scope.status = libs;
        selectedName = libs[0].name;
		$scope.libraries = {
			options: libsNames,
		    selected: selectedName
		};
    }
     
     $scope.selectedItemChanged =  function(){
    	$scope.status = $scope.libraries.selected;
     	for (var i in libs){
     		if(libs[i].name == $scope.libraries.selected){
     	    	if(libs[i].type == "books"){
         			$scope.items  = libs[i].items;
         			itemsLocal = libs[i].items;
     	    		$scope.typeIsBook = true;
     	    		$scope.typeIsMovie = false;
     	    		$scope.typeIsGeneric = false;    		
     	    	}else if (libs[0].type == "movies"){
     	    		$scope.typeIsBook = false;
         			$scope.items  = libs[i].items;
         			itemsLocal = libs[i].items;
     	    		$scope.typeIsMovie = true;
     	    		$scope.typeIsGeneric = false;
     	    	}else{
     	    		$scope.typeIsBook = false;
     	    		$scope.typeIsMovie = false;
         			$scope.items  = libs[i].items;
         			itemsLocal = libs[i].items;
     	    		$scope.typeIsGeneric = true;
     	    	}


     		}
    	}
     }
     
     $scope.view = function (id) {
    	$scope.details = true;
    	for (i in itemsLocal){
    		if(itemsLocal[i].itemId == id){
    			$scope.status = id;
    			$scope.info = id;
    		}
    	}
     }
    
});

//$( document ).ready(function() {
//
//	ajaxGet();
//
//	//GET Function
//	function ajaxGet(){
//		$.ajax({
//			type : "GET",
//			url : "http://localhost:8080/manage/library?userId=1",
//			success: function(result){
//					$('#getResultDiv ul').empty();
//					result.forEach(function(element){
//						var library = library + " " + element.name;
//						var t = document.createTextNode(element.name);
//					    var btn = document.createElement("BUTTON");
//					    btn.appendChild(t);
//					    btn.setAttribute("id", element.libraryId);
//					    btn.setAttribute("type", "button");
//					    btn.setAttribute("class", "btn btn-primary btn-md");
//					    document.getElementById("libraryGroup").appendChild(btn);
//						$("#" + element.libraryId).click(function(event){
//							event.preventDefault();
//							ajaxGetItems(element.libraryId, element.type);
//						});
//					});
//					console.log("Success: ", result[0].name);
//			},
//			error : function(e){
//				$("#getResultDiv").html("<strong>Error2</strong>");
//				console.log("ERROR: ", e);
//			}
//		});
//	}
//
//	// GET Items
//	function ajaxGetItems(libId, libType){
//		var oldBtn = document.getElementById("newItem");
//		if (oldBtn != null){
//			oldBtn.parentNode.removeChild(oldBtn);
//		}
//		var URL = "http://localhost:8080/manage/items?libraryId=" + libId + "&libraryType=" + libType;
//		$.ajax({
//			type : "GET",
//			url : URL,
//			success: function(result){
//				$('#getResultDiv ul').empty();
//				var Values = new Array();
//				var x = 0;
//				result.forEach(function(element){
//					if (element.description != null){
//						Values[x] = [element.title, element.description];
//					} else {
//						Values[x] = [element.title, ""];
//					}
//					x = x + 1;
//				});
//				console.log("Success: ", URL);
//
//				var table = document.getElementById("itemTable");
//				var tbody = document.createElement("tbody");
//		        for (var i = 0 ; i < Values.length; i++) {
//		        	var tr = document.createElement("tr");
//
//					// for each inner array cell create td then text, append checkbox to end
//		        	var l = Values[i].length;
//					for (var j = 0; j <= l; j++) {
//						var td = document.createElement("td");
//					    if (j != l) {
//						    var txt = document.createTextNode(Values[i][j]);
//						    td.appendChild(txt);
//					    } else {
//					    	var checkbox = document.createElement("INPUT");
//					    	checkbox.type = "checkbox";
//					    	td.appendChild(checkbox);
//					    }
//					    tr.appendChild(td);
//					}
//
//					// append row to table
//					tbody.appendChild(tr);
//					table.appendChild(tbody);
//		        }
//
//				//create new button to add items
//				console.log("Creating new add item button?");
//				var button = document.createElement("button");
//				button.innerHTML = "Add An Item";
//				button.setAttribute("id", "newItem");
//				button.setAttribute("class", "btn btn-primary btn-md");
//				document.getElementById("itemDisplay").appendChild(button);
//				button.href = "itemCreation";
//				button.addEventListener ("click", function() {
//					window.location.href = "itemCreation" + '#' + libId + "#" + libType;
//				});
//			},
//			error : function(e){
//				$("#getResultDiv").html("<strong>Error3</strong>");
//				console.log("ERROR: Couldn't retrieve Items", URL);
//			}
//		});
//
//	}
//})
//app.service('LibraryService', function ($http) {    
////libraries array to hold list of all libraries
//var libraries = [];
//this.load = function(){
//	$http({
//		method : "GET",
//		url: "http://localhost:8080/manage/library?userId=1"
//	}).then(function successCallback(response) {
//        response.data.forEach(function(element){
//        	var library = { id: element.libraryId, name: element.name, type:element.type};
//        	libraries.push(library);
//        });
//	}, function errorCallback(response) {
//
//		status = response.statusText;
//	});
//}
//
//this.allLibs = function(){
//	return libraries;
//}
//
//this.getAllNames = function(){
//	var allNames = []
//	for (i in libraries){
//		alert(i.name);
//		allNames.push(i.name);
//	}
//	return allNames;
//}
//
//});