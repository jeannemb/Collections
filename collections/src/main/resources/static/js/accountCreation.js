var app = angular.module('collection', []);
app.controller('accountCreation', function($scope, $http) {
		
	$scope.create = function(){
		if($scope.password == $scope.confirmPassword){
			
		
			var user = {
					firstName : $scope.firstName,
					lastName : $scope.lastName,
					email : $scope.email,
			}
			

			$http({
				method: "POST",
				url: "http://localhost:8080//user/createUser",
				data : angular.toJson(user),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(_success, _error);
		
		
			function _success(response){
				$scope.response = response.data
			}
		
			function _error(response){
				$scope.response = response.statusText

			}

		}else{
			$scope.response = "Password must match confirm Password"
		}
	};
	
	
});
