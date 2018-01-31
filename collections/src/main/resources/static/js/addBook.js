var app = angular.module('collection', []);
app.controller('addBook', function($scope,$http) {
	$scope.clicked = true;
	$scope.showSearchBar = false;
	$scope.showManualEntry = true;
	$scope.LibraryName = localStorage.getItem("libraryId");
	$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("name");
	$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");
	$scope.alertSuccess = false;
	$scope.alertDanger = false;
	
	$scope.lookUpClicked = function(){
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
		$scope.response = "LookUp Clicked";
		$scope.alertSuccess = false;
		$scope.alertDanger = false;
	}
	
	$scope.manualClicked = function(){
		$scope.showSearchBar = false;
		$scope.showManualEntry = true;
		$scope.response = "Manual Clicked";
		$scope.alertSuccess = false;
		$scope.alertDanger = false;
	}
	
	
	$scope.searchBook = function(){
		$scope.response = "Search Clicked"
	}
	
	$scope.create = function(){
		$scope.clicked = true;
		var id = localStorage.getItem("libraryId");
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
		$scope.ISBN13 = "";
		$scope.ISBN10 = "";
		$scope.authors = "";
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}
});