var app = angular.module('collection', []);

app.controller('addMovie', function($scope,$http) {
	$scope.showSearchBar = false;
	$scope.showManualEntry = true;
	$scope.clicked = true;
	$scope.LibraryName = localStorage.getItem("libraryId");
	$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("name");
	$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");
	
	$scope.lookUpClicked =  function(){
		$scope.response = "LookUp Clicked";
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
	}
	
	$scope.manualClicked =  function(){
		$scope.showSearchBar = false;
		$scope.showManualEntry = true;
		$scope.response = "Manual Clicked";
	}
	
	$scope.searchMovie = function(){
		$scope.response = "Search Clicked";
	}
	
	$scope.create = function(){
		$scope.clicked = true;
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
				url: "http://localhost:8080/manage/addmovie",
				data : angular.toJson(movie),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				$scope.response = check
				$scope.alertSuccess = true
				$scope.alertDanger = false
				clearFields();
			}, function errorCallback(check) {
				$scope.response = check
				$scope.alertDanger = true
				$scope.alertSuccess = false
			});

		}else{
			$scope.response = "Title must not be empty";
			$scope.alertDanger = true;
			$scope.alertSuccess = false;
		}
		
	}
	
	$scope.closeAlert = function() {
		$scope.alertSuccess = false;
		$scope.alertDanger = false;

	}
	
	clearFields = function(){
		$scope.title = "";
		$scope.UPC = "";
		$scope.actors = "";
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}
	
});