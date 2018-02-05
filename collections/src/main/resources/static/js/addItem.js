var app = angular.module('collection', []);

app.controller('addItem', function($scope,$http) {
	$scope.showAlertDiv = false;
	$scope.alertSuccess = false;
	$scope.alertDanger = false;
	$scope.showManualEntry = true;
	$scope.responseResult = false;
	//$scope.LibraryName = localStorage.getItem("libraryId");
	$scope.LibraryName = localStorage.getItem("name");
	//$scope.LibraryName = $scope.LibraryName + " " + localStorage.getItem("type");	

	$scope.create = function(){
		//$scope.clicked = true;
		var id = localStorage.getItem("libraryId");
		if($scope.title != null){
			var item = {
					genericLibraryId : id,
					title : $scope.title,
					description : $scope.description,
					owns : $scope.owns,
					wantsToOwn : $scope.wantsToOwn,
					complete : $scope.complete,
					wantsToComplete: $scope.wantsToComplete
			}
			
			$http({
				method: "POST",
				url: "http://localhost:8080/manage/addgeneric",
				data : angular.toJson(item),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				//$scope.response = check
				$scope.showAlertDiv = true;
				$scope.alertSuccess = true
				$scope.alertDanger = false
				clearFields();
			}, function errorCallback(check) {
				//$scope.response = check
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
		$scope.description = null;
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}

});