var app = angular.module('collection', []);

app.controller('navigationController', function($scope,$http) {
	var libs = [];
    var selectedLibraryItems = [];
    var selectedLibraryName = "";
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
            	var libItems = initItems(element.libraryId, element.type);
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
                	itemBook.LibraryId = element.booksLibraryId;
                	itemBook.title = element.title;
                	itemBook.isbn13 = element.isbn13;
                	itemBook.isbn10 = element.isbn10;
                	itemBook.authors = element.authors;
                	itemBook.owns = element.owns;
                	itemBook.wantsToOwn = element.wantsToOwn;
                	itemBook.complete = element.complete;
                	itemBook.wantsToComplete = element.wantsToComplete;
                	itemBook.type = type;
                	items.push(itemBook);
                	//libItems.push(itemBook);
            	}else if(type == "movies"){
                	var itemMovie = new Object();
                	itemMovie.itemId = element.itemId;
                	itemMovie.LibraryId = element.moviesLibraryId;
                	itemMovie.title = element.title;
                	itemMovie.upc = element.upc;
                	itemMovie.actors = element.actors;
                	itemMovie.owns = element.owns;
                	itemMovie.wantsToOwn = element.wantsToOwn;
                	itemMovie.complete = element.complete;
                	itemMovie.wantsToComplete = element.wantsToComplete;
                	itemMovie.type = type;
                	items.push(itemMovie);
                	//libItems.push(itemMovie);
                }else{
                	var itemGeneric = new Object();
                	itemGeneric.itemId = element.itemId;
                	itemGeneric.LibraryId = element.genericLibraryId;
                	itemGeneric.title = element.title;
                	itemGeneric.description = element.description;
                	itemGeneric.owns = element.owns;
                	itemGeneric.wantsToOwn = element.wantsToOwn;
                	itemGeneric.complete = element.complete;
                	itemGeneric.wantsToComplete = element.wantsToComplete;
                	itemGeneric.type = type;
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
    	
    	$scope.libs = libs
    	$scope.items = libs[0].items;
        $scope.status = libs[0].name;
        selectedLibraryName = libs[0].name;
		$scope.libraries = {
			options: libs,
		    selected: libs[0]
		};
		localStorage.setItem("libraryId",libs[0].libraryId)
		localStorage.setItem("name", libs[0].name);
		localStorage.setItem("type", libs[0].type);
		if(libs[0].type == "books"){
			$scope.addLibrary = "addBook";
		}else if(libs[0].type == "movies"){
			$scope.addLibrary = "addMovie";
		}else{
			$scope.addLibrary = "addGeneric";
		}
    }
     
     $scope.selectedItemChanged =  function(){
 		localStorage.setItem("libraryId", $scope.libraries.selected.libraryId)
		localStorage.setItem("name", $scope.libraries.selected.name);
		localStorage.setItem("type", $scope.libraries.selected.type);

    	$scope.status = $scope.libraries.selected.libraryId + " "+ $scope.libraries.selected.name;
     	for (var i in libs){
     		if(libs[i].libraryId == $scope.libraries.selected.libraryId){
     	    	if(libs[i].type == "books"){
         			$scope.items  = libs[i].items;
         			selectedLibraryItems = libs[i].items;
     	    		$scope.typeIsBook = true;
     	    		$scope.typeIsMovie = false;
     	    		$scope.typeIsGeneric = false;
     	    		$scope.addLibrary = "addBook";
     	    	}else if (libs[i].type == "movies"){
     	    		$scope.typeIsBook = false;
         			$scope.items  = libs[i].items;
         			selectedLibraryItems = libs[i].items;
     	    		$scope.typeIsMovie = true;
     	    		$scope.typeIsGeneric = false;
     				$scope.addLibrary = "addMovie";

     	    	}else{
     	    		$scope.typeIsBook = false;
     	    		$scope.typeIsMovie = false;
         			$scope.items  = libs[i].items;
         			selectedLibraryItems = libs[i].items;
     	    		$scope.typeIsGeneric = true;
     				$scope.addLibrary = "addGeneric";

     	    	}


     		}
    	}
     }
     
     $scope.viewItem = function (id) {

     }
     
     $scope.editItem = function (id) {

     }
     
     $scope.deleteItem = function (id, libId) {
         $.ajax({
     		type : "DELETE",
    		contentType : "application/json",
    	    url : "http://localhost:8080/manage/deleteItem?libraryId=" + libId + "&itemId=" + id,
    	    dataType : 'json',
    	    success : function(result) {
    	    	console.log("Success: " + result);
    	    },
    	    error : function(e) {
    	    	console.log("FAILURE: " + id + libId);
    	    	$("#postResultDiv").html("<strong>Error</strong>");
    	    }
         });
     }
    
});