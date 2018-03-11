var app = angular.module('collection', []);

app.controller('addMovie', function($scope,$http) {
	$scope.search = 'movies';
	$scope.libraryName = localStorage.getItem("name");
	$scope.responseResult = false;
	$scope.showSearchBar = true;
	$scope.showManualEntry = false;
	var myMovies = [];
	//$scope.LibraryName = localStorage.getItem("libraryId");
	//$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");
	
	$scope.movieClick = function(){
		$scope.searchText = null;
		$scope.showBarcode = false;
		$scope.$apply();
	}
	
	$scope.tvShowClick = function(){
		$scope.searchText = null;
		$scope.$apply();
	}
	
	$scope.upcClick = function(){
		$scope.searchText = null;
		$scope.$apply();
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
	
	$scope.lookUpClicked =  function(){
		//$scope.response = "LookUp Clicked";
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
	}
	
	$scope.manualClicked =  function(){
		$scope.showSearchBar = false;
		$scope.showManualEntry = true;
		//$scope.response = "Manual Clicked";
	}
	
	$scope.onScanClick = function(){
		myMovies = [];
		$scope.search = 'upc';
		$scope.movies = myMovies;
//		$scope.$apply();
		ScanditSDK.configure("AcILBSO7OOVwFfAGKzYHTugBWCFSANJ7S0ufXlZOxaDefBf9TATcGcIfrUdjW4bLr0x7lJRc49ZFL0ndo27Vqkti+mSsS1uyx36It3VhWc28GJoF2UZ3TeE1uP9GUUOs/0qpskRFnkxAURCh/2MxtVsnGyxmwemk2DgZ2dS0OOg97t/cVwyAs5OeWkCnJwB65WrkfBhZpwdtqYK27G7ArZKZ1lYRDgkrR6qYb1cfg8MEldEMCVCHr2gy8hqUGvVfpd3coeR9nEdMYb9rR4L1u8kRLcYlfdzpzptmBKrvqAD+AAcuDdZlt/lwnzb9MVKvX4W6FddvWPAXgvJKHVP4odtbZg/7XQdLSWNKtaTEc2DUO4vZVRuYQmymXUSkZZeWUHprCWObP+i252q3TQkQIfWxdoSjTd2IGiv7sjHojnaor4hKUuFpce9d/MZG0MztPRi+gtB68NxhHzH7x8X2G8O0j2wvpBiK+/8rxIVZVvthQNW8L177GN1EIxP/nLWvmQsAN+h3maSZgteXnTrJhn2t4ef/nZZHNfwoS7oJfoddW+fl9YGBWYLbtLKoL/uTfv8F8lkyJYBXCgjC/W5C3lRy6KvBxv6qN/hSIHgXnw0eNJIvPQhii7nX/FVh3rqjxosENZ6fLBSBARgP4xqynoh5vII8Htnhoyr+JXmUMBfBITBaIpmeAnqxgjMI+bT7in382QVJ3wEPOea1hLIyG3M8+huU99kuqnC0PSlgLosKY2SsTWBD0CYdB4zFLvnT3Jp5+uaIFDjXppgnMsvM1gMm0tQXuU5aSt81rSQN75ZVAxh5qJ0WPTZyr5RMCFjH7B2n2w==", {
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
	
	$scope.searchMovie = function(){
		
		if($scope.search == 'movies'){
			url = "https://api.themoviedb.org/3/search/movie?api_key=188771a883b3cc1762e81ae2666c52fc&query=";
			performMovieSerach(url);
		}else if($scope.search == 'tvShows'){
			url = "https://api.themoviedb.org/3/search/tv?api_key=188771a883b3cc1762e81ae2666c52fc&query="
			performTvShowSerach(url);
		}else if($scope.search == 'upc'){
			console.log("UPC");
			performUPCSearch();
		}
	}
	
	performUPCSearch =  function(){
		myMovies = [];
		var searchText = $scope.searchText;
		console.log(searchText);
		var url = "https://barcodelookup.com/restapi?category=Film&Television&barcode="+searchText+"&key=m9wpyat2ufk8k9kxtwq4o423k0oho7";
		var settings = {
				  "async": true,
				  "crossDomain": true,
				  "url": url,
				  "method": "GET",
				  "headers": {},
				  "data": "{}"
		}
		$http({
			method : "GET",
			url: url,
			data : settings
		}).then(function successCallback(response) {
			console.log(response);
			response.data.result.forEach(function(element){
				if(element.details.prod_details != "Media > Books"){
					console.log(element);
					var movie = new Object();
					movie.title = element.details.product_name;
					movie.upc = searchText;
					movie.posterUrl = element.images[0];
					movie.owns = false;
					movie.wantsToOwn = false;
					movie.complete = false;
					movie.wantsToComplete = false;
					console.log(movie);
					myMovies.push(movie);
				}
			});
			$scope.nothingFound = false;
			$scope.searchResult = true;
			//$scope.result = true;
			$scope.movies = myMovies;
			$scope.showSearchBar = true;
			$scope.showManualEntry = false;
			$scope.$apply();
		}, function errorCallback(response) {
			//showError();
		});
	}
	
	performMovieSerach = function(url){
	
		myMovies = [];
		var index = 0;
		var searchText = encodeURI($scope.searchText);
		url = url + searchText;
		var settings = {
				  "async": true,
				  "crossDomain": true,
				  "url": url,
				  "method": "GET",
				  "headers": {},
				  "data": "{}"
		}
		
		$http({
			method : "GET",
			url: url,
			data : settings
		}).then(function successCallback(response) {
			response.data.results.forEach(function(element){
				//console.log(element)
				var movie = new Object();
				movie.id = element.id;
				if (typeof element.original_title !== 'undefined'){
					movie.title = element.original_title;
				}
						  
				if (typeof element.poster_path !== 'undefined'){
					movie.posterUrl = "https://image.tmdb.org/t/p/w500"+element.poster_path;	
				}else{
					movie.posterUrl = "/images/placeholderImageItem.png";
				}
				movie.actors = "";
				var url = "https://api.themoviedb.org/3/movie/"+movie.id+"/credits?api_key=188771a883b3cc1762e81ae2666c52fc";
				var settings = {
						  "async": true,
						  "crossDomain": true,
						  "url": url,
						  "method": "GET",
						  "headers": {},
						  "data": "{}"
						}
				$http({
					method : "GET",
					url: url,
					data : settings
				}).then(function successCallback(response) {
					for (j=0; j<response.data.cast.length; j++){
						//console.log(element)
						movie.actors = movie.actors + response.data.cast[j].name;
						if(j==5){
							break;
						}
						movie.actors = movie.actors + ", ";
					}
					
				}, function errorCallback(response) {
					
				});
				//console.log(movie.actors);
				movie.owns = false;
				movie.wantsToOwn = false;
				movie.complete = false;
				movie.wantsToComplete = false;
				movie.index = index;
				index++;
				myMovies.push(movie);
				
			});
			showResult();
		}, function errorCallback(response) {
			showError();
		});

	}

	
	performTvShowSerach = function(url){
		
		myMovies = [];
		var index = 0;
		var searchText = encodeURI($scope.searchText);
		url = url + searchText;
		var settings = {
				  "async": true,
				  "crossDomain": true,
				  "url": url,
				  "method": "GET",
				  "headers": {},
				  "data": "{}"
		}
		
		$http({
			method : "GET",
			url: url,
			data : settings
		}).then(function successCallback(response) {
			response.data.results.forEach(function(element){
				//console.log(element)
				var movie = new Object();
				movie.id = element.id;
				if (typeof element.original_name !== 'undefined'){
						movie.title = element.original_name;
				}
						  
				if (typeof element.poster_path !== 'undefined'){
					movie.posterUrl = "https://image.tmdb.org/t/p/w500"+element.poster_path;	
				}else{
					movie.posterUrl = "/images/placeholderImageItem.png";
				}
				movie.actors = "";
				var url = "https://api.themoviedb.org/3/tv/"+movie.id+"/credits?api_key=188771a883b3cc1762e81ae2666c52fc";
				var settings = {
						  "async": true,
						  "crossDomain": true,
						  "url": url,
						  "method": "GET",
						  "headers": {},
						  "data": "{}"
						}
				$http({
					method : "GET",
					url: url,
					data : settings
				}).then(function successCallback(response) {
					for (j=0; j<response.data.cast.length; j++){
						//console.log(element)
						movie.actors = movie.actors + response.data.cast[j].name;
						if(j==5){
							break;
						}
						movie.actors = movie.actors + ", ";
					}
				}, function errorCallback(response) {
					
				});
				//console.log(movie.actors);
				movie.owns = false;
				movie.wantsToOwn = false;
				movie.complete = false;
				movie.wantsToComplete = false;
				movie.index = index;
				index++;
				myMovies.push(movie);
				
			});
			showResult();
		}, function errorCallback(response) {
			showError();
		});
		  
	}
	
	function showResult(){
		$scope.nothingFound = false;
		$scope.searchResult = true;
		$scope.result = true;
		$scope.movies = myMovies;
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
		$scope.response = "LookUp Clicked";
		$scope.$apply();
	}
	
	function showError(){
		$scope.movies = myMovies;
		$scope.nothingFound = true;
		$scope.searchResult = false;
		$scope.$apply();
	}
	
	$scope.addMovie = function(movieToAdd){
		console.log(movieToAdd);
		var id = localStorage.getItem("libraryId");
		if(movieToAdd.title != null){
			var movie = {
				moviesLibraryId : id,
				title : movieToAdd.title,
				upc : movieToAdd.upc,
				actors : movieToAdd.actors,
				owns : movieToAdd.owns,
				wantsToOwn : movieToAdd.wantsToOwn,
				complete : movieToAdd.complete,
				wantsToComplete: movieToAdd.wantsToComplete,
				posterUrl: movieToAdd.posterUrl
			}

			$http({
				method: "POST",
				url: "/manage/addmovie",
				data : angular.toJson(movie),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				showSuccessSnakbar();
				remove(movieToAdd);
				clearFields();
			}, function errorCallback(check) {
				showFailSnakbar();
			});
		}else{
			//$scope.response = "Title must not be empty";
			showFailSnakbar();
		}
	}
	function remove(movie){
		for (i = 0; i< myMovies.length; i++){
			if(myMovies[i].index == movie.index){
				myMovies.splice(i, 1);
			}
		}
		$scope.movies = myMovies;
		$scope.$apply();
	}
	
	$scope.create = function(){
		//$scope.clicked = true;
		var id = localStorage.getItem("libraryId");
		if($scope.title != null){
			var movie = {
					moviesLibraryId : id,
					title : $scope.title,
					upc : $scope.UPC,
					actors : $scope.actors,
					owns : $scope.owns,
					wantsToOwn : $scope.wantsToOwn,
					complete : $scope.complete,
					wantsToComplete: $scope.wantsToComplete
			}
			
			$http({
				method: "POST",
				url: "/manage/addmovie",
				data : angular.toJson(movie),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				//$scope.response = check;
				showSuccessSnakbar();
				clearFields();
			}, function errorCallback(check) {
				//$scope.responseResult = true;
				//$scope.response = check;
				showFailSnakbar();
			});

		}else{
			//$scope.response = "Title must not be empty";
			showFailSnakbar();
		}
		
	}
	

	
	clearFields = function(){
		$scope.title = null;
		$scope.UPC = null;
		$scope.actors = null;
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}
	
    $('[data-toggle=offcanvas]').click(function() {
	    $('.row-offcanvas').toggleClass('active');
    });
});