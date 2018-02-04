var app = angular.module('collection', []);
app.controller('accountCreation', function($scope, $http) {
		
	$scope.create = function(){
		$scope.clicked = true
		if($scope.password == $scope.confirmPassword && $scope.firstName != null 
			&& $scope.lastName != null && $scope.email != null && $scope.password != null){
			
			
			var user = {
					firstName : $scope.firstName,
					lastName : $scope.lastName,
					email : $scope.email,
					password: $scope.password
			}
				

			$http({
				method: "POST",
				url: "http://localhost:8080/user/createUser",
				data : angular.toJson(user),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(_success, _error);
			
			
			function _success(response){
				$scope.response = response.data
				$scope.success = true
			}
			
			function _error(response){
				$scope.response = response.statusText

			}

		}else{
			$scope.response = "Fields mush not be empty and password must match confirm Password"

		}
		

	};
	
	
});