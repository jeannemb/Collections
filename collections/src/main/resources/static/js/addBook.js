var app = angular.module('collection', []);
app.controller('addBook', function($scope,$http) {
	$scope.libraryName = localStorage.getItem("name");
	$scope.showAlertDiv = false;
	$scope.responseResult = false;
	$scope.showSearchBar = false;
	$scope.showManualEntry = true;
	//$scope.LibraryName = localStorage.getItem("libraryId");
	//$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");

	
	$scope.lookUpClicked = function(){
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
		//$scope.responseResult = "LookUp Clicked";
		$scope.alertSuccess = false;
		$scope.alertDanger = false;
	}
	
	$scope.manualClicked = function(){
		$scope.showSearchBar = false;
		$scope.showManualEntry = true;
		//$scope.responseResult = "Manual Clicked";
		$scope.alertSuccess = false;
		$scope.alertDanger = false;
	}
	
	
	$scope.searchBook = function(){
	
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
				url: "http://localhost:8080/manage/addbook",
				data : angular.toJson(book),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				//$scope.responseResult = check
				$scope.showAlertDiv = true;
				$scope.alertSuccess = true;
				$scope.alertDanger = false;
				clearFields();
			}, function errorCallback(check) {
				$scope.showAlertDiv = true;
				$scope.responseResult = true;
				$scope.responseResult = check
				$scope.alertDanger = true;
				$scope.alertSuccess = false;
			});

		}else{
			//$scope.responseResult = true;
			//$scope.responseResult = "Title must not be empty";
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
		$scope.ISBN13 = null;
		$scope.ISBN10 = null;
		$scope.authors = null;
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}
});