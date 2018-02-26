var app = angular.module('collection', []);

app.controller('addMovie', function($scope,$http) {
	$scope.search = 'movies';
	$scope.libraryName = localStorage.getItem("name");
	$scope.showAlertDiv = false;
	$scope.alertSuccess = false;
	$scope.alertDanger = false;
	$scope.responseResult = false;
	$scope.showSearchBar = true;
	$scope.showManualEntry = false;
	var myMovies = [];
	//$scope.LibraryName = localStorage.getItem("libraryId");
	//$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");
	
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
	
	$scope.searchMovie = function(){
		
		if($scope.search == 'movies'){
			url = "https://api.themoviedb.org/3/search/movie?api_key=188771a883b3cc1762e81ae2666c52fc&query=";
			performMovieSerach(url);
		}else if($scope.search == 'tvShows'){
			url = "https://api.themoviedb.org/3/search/tv?api_key=188771a883b3cc1762e81ae2666c52fc&query="
			performTvShowSerach(url);
		}
	}
	
	performMovieSerach = function(url){
	
		myMovies = [];
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
				myMovies.push(movie);
				
			});
			showResult();
		}, function errorCallback(response) {
			showError();
		});

	}

	
	performTvShowSerach = function(url){
		
		myMovies = [];
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
		  $scope.alertSuccess = false;
		  $scope.alertDanger = false;
		  $scope.$apply();
	}
	
	function showError(){
		$scope.movies = myMovies;
		$scope.nothingFound = true;
		$scope.searchResult = false;
		$scope.$apply();
	}
	
	$scope.addMovie = function(movie){
		console.log(movie);
		var id = localStorage.getItem("libraryId");
		if(movie.title != null){
			var movie = {
				moviesLibraryId : id,
				title : movie.title,
				upc : movie.upc,
				actors : movie.actors,
				owns : movie.owns,
				wantsToOwn : movie.wantsToOwn,
				complete : movie.complete,
				wantsToComplete: movie.wantsToComplete,
				posterUrl: movie.posterUrl
			}

			$http({
				method: "POST",
				url: "/manage/addmovie",
				data : angular.toJson(movie),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				$scope.showAlertDiv = true;
				$scope.response = check
				$scope.alertSuccess = true
				$scope.alertDanger = false
				clearFields();
			}, function errorCallback(check) {
				$scope.showAlertDiv = true;
				$scope.response = check
				$scope.alertDanger = true
				$scope.alertSuccess = false
			});
		}else{
			$scope.showAlertDiv = true;
			$scope.response = "Title must not be empty";
			$scope.alertDanger = true;
			$scope.alertSuccess = false;
		}
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
				$scope.showAlertDiv = true;
				$scope.alertSuccess = true
				$scope.alertDanger = false
				clearFields();
			}, function errorCallback(check) {
				//$scope.responseResult = true;
				//$scope.response = check;
				$scope.showAlertDiv = true;
				$scope.alertDanger = true
				$scope.alertSuccess = false
			});

		}else{
			//$scope.response = "Title must not be empty";
			$scope.showAlertDiv = true;
			$scope.alertDanger = true;
			$scope.alertSuccess = false;
		}
		
	}
	
	$scope.closeAlert = function() {
		$scope.alertSuccess = false;
		$scope.alertDanger = false;
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