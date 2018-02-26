var app = angular.module('collection', []);
app.controller('addBook', function($scope,$http) {
	$scope.search = 'keyword';
	$scope.libraryName = localStorage.getItem("name");
	$scope.responseResult = false;
	$scope.showSearchBar = true;
	$scope.showManualEntry = false;
	//$scope.LibraryName = localStorage.getItem("libraryId");
	//$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");

	function showSuccessSnakbar() {
	    var x = document.getElementById("snackbarGreen")
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
	}
	
	function showFailSnakbar() {
	    var x = document.getElementById("snackbarRed")
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
	}
	
	$scope.lookUpClicked = function(){
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
	}
	
	$scope.manualClicked = function(){
		$scope.showSearchBar = false;
		$scope.showManualEntry = true;
	}
	
	$scope.searchBook = function(){
		//$scope.response = "Search Clicked";
		if($scope.search == 'keyword'){
			url = "https://www.googleapis.com/books/v1/volumes?q=";
		}else if($scope.search == 'isbn'){
			url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
		}
		var myBooks = [];
		var searchText = $scope.searchText;
		//https://www.googleapis.com/books/v1/volumes?q=isbn:9780321573513
		$.get(url + searchText, function(response){
			console.log(response);
			if(typeof response.items !== 'undefined' || response.totalItems != 0){
				$scope.nothingFound = false;
				$scope.searchResult = true;
				for(i=0; i<response.items.length;i++){
					var book = new Object();
					if (typeof response.items[i].volumeInfo.title !== 'undefined'){
						book.title = response.items[i].volumeInfo.title;
					}
					if (typeof response.items[i].volumeInfo.industryIdentifiers !== 'undefined'){
						for(j=0; j<response.items[i].volumeInfo.industryIdentifiers.length; j++){
							if(response.items[i].volumeInfo.industryIdentifiers[j].type == "ISBN_13"){
								book.isbn13 = response.items[i].volumeInfo.industryIdentifiers[j].identifier;
							}else if(response.items[i].volumeInfo.industryIdentifiers[j].type == "ISBN_10"){
								book.isbn10 = response.items[i].volumeInfo.industryIdentifiers[j].identifier;
							}
						}
					}
					book.authors = "";
					if (typeof response.items[i].volumeInfo.authors !== 'undefined'){
						for (k=0; k<response.items[i].volumeInfo.authors.length; k++){
							book.authors = book.authors + response.items[i].volumeInfo.authors[k];
							if((k+1) != response.items[i].volumeInfo.authors.length){
								book.authors = book.authors+ ", ";
							}
						}
					}
		            book.owns = false;
		            book.wantsToOwn = false;
		            book.complete = false;
		            book.wantsToComplete = false;
					if (typeof response.items[i].volumeInfo.imageLinks !== 'undefined'){
						book.posterUrl = response.items[i].volumeInfo.imageLinks.thumbnail;	
					}else{
						book.posterUrl = "/images/placeholderImageItem.png";
					}
						
		            myBooks.push(book); 
				}
				
				$scope.result = true;
				$scope.books = myBooks;
				$scope.showSearchBar = true;
				$scope.showManualEntry = false;
				$scope.response = "LookUp Clicked";
				$scope.$apply();
			}else {
				
				$scope.books = myBooks;
				$scope.nothingFound = true;
				$scope.searchResult = false;
				$scope.$apply();
			}
		});
	}
	
		$scope.addBook = function(book){
		console.log(book);
		var id = localStorage.getItem("libraryId");
		if(book.title != null){
			var book = {
				booksLibraryId : id,
				title : book.title,
				isbn13 : book.isbn13,
				isbn10 : book.isbn10,
				authors : book.authors,
				owns : book.owns,
				wantsToOwn : book.wantsToOwn,
				complete : book.complete,
				wantsToComplete: book.wantsToComplete,
				posterUrl : book.posterUrl
			}

			$http({
				method: "POST",
				url: "/manage/addbook",
				data : angular.toJson(book),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				showSuccessSnakbar();
				clearFields();
			}, function errorCallback(check) {
				showFailSnakbar();
			});
		}else{
			showFailSnakbar();
		}
	}
	
	$scope.create = function(){
		$scope.clicked = true;
		var id = localStorage.getItem("libraryId");
		console.log($scope.title);
		if($scope.title != null){
			var book = {
					booksLibraryId : id,
					title : $scope.title,
					isbn13 : $scope.ISBN13,
					isbn10 : $scope.ISBN10,
					authors : $scope.authors,
					owns : $scope.owns,
					wantsToOwn : $scope.wantsToOwn,
					complete : $scope.complete,
					wantsToComplete: $scope.wantsToComplete
			}
			
			$http({
				method: "POST",
				url: "/manage/addbook",
				data : angular.toJson(book),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {

				showSuccessSnakbar();
				clearFields();
			}, function errorCallback(check) {
				showFailSnakbar();
			});

		}else{
			showFailSnakbar();
		}
		
	}
	
	
	clearFields = function(){
		$scope.title = null;
		$scope.ISBN13 = null;
		$scope.ISBN10 = null;
		$scope.authors = null;
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}
	
    $('[data-toggle=offcanvas]').click(function() {
	    $('.row-offcanvas').toggleClass('active');
    });
});