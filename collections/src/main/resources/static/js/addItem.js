var app = angular.module('collection', []);

app.controller('addItem', function($scope,$http) {
	$scope.libraryName = localStorage.getItem("name");
	$scope.showManualEntry = true;
	$scope.responseResult = false;
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
				url: "/manage/addgeneric",
				data : angular.toJson(item),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				//$scope.response = check
				showSuccessSnakbar();
				clearFields();
			}, function errorCallback(check) {
				//$scope.response = check
				showFailSnakbar();
			});

		}else{
			//$scope.response = "Title must not be empty";
			showFailSnakbar();
		}
		
	}

	
	clearFields = function(){
		$scope.title = null;
		$scope.description = null;
		$scope.owns = false;
		$scope.wantsToOwn = false;
		$scope.complete = false;
		$scope.wantsToComplete = false;
	}
	
    $('[data-toggle=offcanvas]').click(function() {
	    $('.row-offcanvas').toggleClass('active');
    });

});