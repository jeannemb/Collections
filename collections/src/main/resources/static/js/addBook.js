var app = angular.module('collection', []);
app.controller('addBook', function($scope,$http) {
	$scope.search = 'keyword';
	$scope.libraryName = localStorage.getItem("name");
	$scope.responseResult = false;
	$scope.showSearchBar = true;
	$scope.showManualEntry = false;
	$scope.responseResult  = false;
	var myBooks = [];
	//$scope.LibraryName = localStorage.getItem("libraryId");
	//$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");

	$scope.ISBNClick = function(){
		$scope.searchText = null;
		$scope.$apply();
	}
	
	$scope.keywordClick = function(){
		$scope.searchText = null;
		$scope.$apply();
	}
	
	
	$scope.onScanClick = function(){
		myBooks = [];
		$scope.search = 'isbn';
		$scope.books = myBooks;
//		$scope.$apply();
		ScanditSDK.configure("AVBrxQNdGAPiRWLNowlvS2k4Wd8rAfsiO3+ftc9lXFj9TqRgeET43tIi/QF7GJAgs3SE1WFGZW45d8ngJ0asZy0OPYD1YnIVL0YwnipOXX4Abi89zSpgg5oWHvrOoEubY8qakhc+ch56ujTqdo4/AvxNBV3NPkcQZqZl2JS/fz95HeKwkTs3GTsht4xL5N5TqwkJDIaqDAhNpDuEQHmKGNHzAKtGV2Jr/gXM+Hwydd+U6bf9eWeBDztH0/TFMyOnl6FjnAYqurXEd9zK82w5KwUA8FAy8owa1cIR8nEmfddys8egVbU06yfCAq/7Zkc3/DkaVwJJ5M2IJjQYh1zPGLxbWADHhlytoHYibgngt1Sn1YycKYnG8yl9n8R45Ums4H7MNkshZu4f/24KMNmoEvJ+fzCmdXdehP64VTUBUABbG1tsAKEWkDVrxK3oRTmQy0IwQyYFLOKfUHuJ7zVNp7Bbfo+H1e9MPMfYcKrhrfnTANryoDjlXl30uQrFnvA7g1lQYsSipRbl0Fq+uvGZsLkirmI0I6tHy0a6vUiK5IYtsBjVFr0hpX/7+/ROO5+HFMFprYzUSwhpl1z+Mcim774RNIXJp1O4huEmS/VLgaFvNp4XdTq2yoMX+z/y7hTwgN/yD2FJlAbfFOAzoufHW57xpzXV+3dxwI/YsV/AoXZsJBvRJw6c/wVL/M4cX6hkDpoOHk0YQRbUzkkgaWjQ6ogLZ4upi6H4aURWmreGQIk0B5FQSfhXQFRDqoWtv3pi5TfgA4QrakcoGJVsS7dEA4Arue6LFs5+BlA=", {
			engineLocation: "https://unpkg.com/scandit-sdk/build",
			preloadEngineLibrary: boolean = false,
			preloadCameras: boolean = false
		});
		
		ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
			playSoundOnScan: true,
			vibrateOnScan: true
			}).then(function(barcodePicker) {
				var scanSettings = new ScanditSDK.ScanSettings({
					  enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
					  codeDuplicateFilter: 1000
					});
					barcodePicker.applyScanSettings(scanSettings);
					$scope.responseResult = true;
					barcodePicker.onScan(function(scanResult) {
						
//						var i = scanResult.barcodes.reduce(function(string, barcode) {
//						    return string + ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
//						  }, "");
						
						var i = scanResult.barcodes.reduce(function(string, barcode) {
						    return barcode.data;
						  }, "");
						console.log(i);
						$scope.searchText = i;
						$scope.$apply();
						barcodePicker.destroy();
						barcodePicker.removeScanListeners();
						$('#searchButton').click();
					});
			});
	}
	
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
		myBooks = [];
		var index = 0;
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
					book.index = index;
					index++;
		            myBooks.push(book); 
				}
				
				$scope.result = true;
				$scope.books = myBooks;
				$scope.showSearchBar = true;
				$scope.showManualEntry = false;
//				$scope.response = "LookUp Clicked";
				$scope.$apply();
			}else {
				
				$scope.books = myBooks;
				$scope.nothingFound = true;
				$scope.searchResult = false;
				$scope.$apply();
			}
		});
	}
	
		$scope.addBook = function(bookToAdd){
		console.log(bookToAdd);
		var id = localStorage.getItem("libraryId");
		if(bookToAdd.title != null){
			var book = {
				booksLibraryId : id,
				title : bookToAdd.title,
				isbn13 : bookToAdd.isbn13,
				isbn10 : bookToAdd.isbn10,
				authors : bookToAdd.authors,
				owns : bookToAdd.owns,
				wantsToOwn : bookToAdd.wantsToOwn,
				complete : bookToAdd.complete,
				wantsToComplete: bookToAdd.wantsToComplete,
				posterUrl : bookToAdd.posterUrl
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
				remove(bookToAdd);
				clearFields();
			}, function errorCallback(check) {
				showFailSnakbar();
			});
		}else{
			showFailSnakbar();
		}
	}
		
	function remove(book){
		for (i = 0; i< myBooks.length; i++){
			if(myBooks[i].index == book.index){
				myBooks.splice(i, 1);
			}
		}
		$scope.books = myBooks;
		$scope.$apply();
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