var app = angular.module('collection', []);

app.controller('navigationController', function($scope,$http) {
	var libs = [];
    var selectedLibraryItems = [];
    var selectedLibraryName = "";
	$scope.statusResult = false;
	$scope.init = function () {
		$scope.DeleteLibrary = false;
		//$scope.clicked1 = true;
		//$scope.clicked2 = true;
		//LibraryService.load();
		$http({
			method : "GET",
			url: "/manage/library"
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
			$scope.statusResult = true;
			$scope.status = response.statusText;
		});
	}

     function initItems(libraryId,type){
    	var items = [];
    	$http({
			method : "GET",
			url: "/manage/items?libraryId=" + libraryId + "&libraryType=" + type
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
                	if (element.posterUrl == null){
                		itemBook.posterUrl = "/images/placeholderImageItem.png";
                	}else{
                		itemBook.posterUrl = element.posterUrl;	
                	}
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
                	if (element.posterUrl == null){
                		itemMovie.posterUrl = "/images/placeholderImageItem.png";
                	}else{
                		itemMovie.posterUrl = element.posterUrl;	
                	}
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
			$scope.statusResult = true;
			$scope.status = response.statusText;
		});
    	
    	return items;
    }
    
     function loadInHtml(){
    	if(libs.length > 0){
    		$scope.welcomeMessage = false;
    		$scope.libraryMessage = false;
    		$scope.DeleteLibrary = true;
    		$scope.usable = true;
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
        	$scope.libraryName = libs[0].name;
        	$scope.libs = libs;
        	$scope.items = libs[0].items;
            selectedLibraryName = libs[0].name;
    		$scope.libraries = {
    			options: libs,
    		    selected: libs[0]
    		};
    		localStorage.setItem("libraryId",libs[0].libraryId);
    		localStorage.setItem("name", libs[0].name);
    		localStorage.setItem("type", libs[0].type);
    		if(libs[0].type == "books"){
    			$scope.addLibrary = "addBook";
    		}else if(libs[0].type == "movies"){
    			$scope.addLibrary = "addMovie";
    		}else{
    			$scope.addLibrary = "addGeneric";
    		}
    	}else{
    		$scope.DeleteLibrary = false;
    		$scope.welcomeMessage = true;
    		$scope.libraryMessage = true;
    		$scope.condition = true;
    		$scope.usable = false;
    		$scope.addLibrary = "#";
    		$scope.typeIsBook = false;
    		$scope.typeIsMovie = false;
    		$scope.typeIsGeneric = false;
    	}
    	
    }
     
     $scope.selectedItemChanged =  function(){
        $scope.status  = false;
 		localStorage.setItem("libraryId", $scope.libraries.selected.libraryId)
		localStorage.setItem("name", $scope.libraries.selected.name);
		localStorage.setItem("type", $scope.libraries.selected.type);
    	$scope.libraryName = $scope.libraries.selected.name;
    	$scope.status = $scope.libraries.selected.libraryId + " "+ $scope.libraries.selected.name;
     	for (var i in libs){
     		if(libs[i].libraryId == $scope.libraries.selected.libraryId){
     	    	if(libs[i].type == "books"){
         			$scope.items  = libs[i].items;
         	    	if(libs[i].items.length == 0){
             	    	$scope.itemMessage = true;
         	    	}else{
             	    	$scope.itemMessage = false;
         	    	}
         			selectedLibraryItems = libs[i].items;
     	    		$scope.typeIsBook = true;
     	    		$scope.typeIsMovie = false;
     	    		$scope.typeIsGeneric = false;
     	    		$scope.addLibrary = "addBook";
     	    	}else if (libs[i].type == "movies"){
     	    		$scope.typeIsBook = false;
         			$scope.items  = libs[i].items;
         	    	if(libs[i].items.length == 0){
             	    	$scope.itemMessage = true;
             		 }else{
             	    	$scope.itemMessage = false;
         	    	}
         			selectedLibraryItems = libs[i].items;
     	    		$scope.typeIsMovie = true;
     	    		$scope.typeIsGeneric = false;
     				$scope.addLibrary = "addMovie";

     	    	}else{
     	    		$scope.typeIsBook = false;
     	    		$scope.typeIsMovie = false;
         			$scope.items  = libs[i].items;
         	    	if(libs[i].items.length == 0){
         	    		$scope.itemMessage = true;
         	    	}else{
         	    		$scope.itemMessage = false;
         	    	}
         			selectedLibraryItems = libs[i].items;
     	    		$scope.typeIsGeneric = true;
     				$scope.addLibrary = "addGeneric";

     	    	}
     		}
    	}
     }
     
     $scope.doOperation = function(e){
    	 
    	 if ($scope.usable != true) {
    	    	e.preventDefault();
    	    } else {
    	      //alert('Anchor element is enabled.');
    	    }
     }
     
     $scope.viewItem = function (id) {

     }
     
     $scope.editItem = function (id) {

     }
     
     $scope.deleteItem = function (id, libId) {
    	 var txt;
    	 var r = confirm("Do you want to delete this item?");
    	 if (r == true) {
    		 $.ajax({
    			 type : "DELETE",
    	    	 url : "/manage/deleteItem?libraryId=" + libId + "&itemId=" + id,
    	    	 success : function(result) {
    	    	    console.log("Success: " + result);
    	    	    reloadData();
    	    	 },
    	    	 error : function(e) {
    	    	    console.log("FAILURE: " + id + libId);
    	    	    $("#postResultDiv").html("<strong>Error</strong>");
    	    	    reloadData();
    	    	 }
    	     })
         } else {
    	     
    	 }
     }
    
     
     function reloadData(){
    	libs = [];
 		$http({
			method : "GET",
			url: "/manage/library"
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
			$scope.statusResult = true;
			$scope.status = response.statusText;
		});
     }
     
     
     $scope.deleteLibrary = function(library){
    	 console.log(library);
    	 var r = confirm("All Items within the library will be deleted. Are you sure you wnat to continue?");
    	 if (r == true) {
    		 
    		 $.ajax({
    			 type : "DELETE",
    	    	 url : "/manage/deleteLibrary?libraryId=" + library.libraryId,
    	    	 success : function(result) {
    	    	    console.log("Success");
    	    	    reloadData();
    	    	    libs = [];
    	    	    $scope.libs = libs;
    	    	    $scope.libraries.options = libs;
    	    	    $scope.libraries.selected = "";
    	    	    $scope.$apply();
    	    	 },
    	    	 error : function(e) {
    	    	    console.log("FAILURE");
    	    	 }
    	     })
         } else {
    	     
    	 } 
     }
     
     $('[data-toggle=offcanvas]').click(function() {
 	    $('.row-offcanvas').toggleClass('active');
     });
  
     
});