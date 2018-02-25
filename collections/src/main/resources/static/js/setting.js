var app = angular.module('collection', []);
app.controller('setting', function($scope,$http) {
	var libs = [];
	var user;
	$scope.init = function () {
		var index = 1;
		$scope.accountSetting  = true;
		$http({
			method : "GET",
			url: "/manage/library"
		}).then(function successCallback(response) {
            response.data.forEach(function(element){
            	var library = new Object();
            	library.index = index;
            	library.libraryId = element.libraryId;
            	library.name = element.name;
            	library.type = element.type;
            	libs.push(library);
            	index++;
            });
            $scope.libs = libs;
		}, function errorCallback(response) {
			$scope.statusResult = true;
			$scope.status = response.statusText;
		});
		
		$http({
			method : "GET",
			url: "/user/currentUser"
		}).then(function successCallback(response) {
				console.log(response.data);
            	user = new Object();
            	user.userId = response.data.userId;
            	user.firstName = response.data.firstName;
            	user.lastName = response.data.lastName;
            	user.email = response.data.email;
            	user.password = response.data.password;
            	console.log(user);
            	$scope.user = user;
		}, function errorCallback(response) {
			$scope.statusResult = true;
			$scope.status = response.statusText;
		});
	}
	
    $('[data-toggle=offcanvas]').click(function() {
	    $('.row-offcanvas').toggleClass('active');
    });
    
    $scope.accountClicked = function(){
		$scope.accountSetting = true;
		$scope.librarySetting = false;

	}
	
	$scope.libraryClicked = function(){
		$scope.accountSetting = false;
		$scope.librarySetting = true;
	}
	
	
	 $scope.deleteLibrary = function(library){
    	 console.log(library);
    	 var r = confirm("All Items within the library will be deleted. Are you sure you wnat to continue?");
    	 if (r == true) {
    		 
    		 $.ajax({
    			 type : "DELETE",
    	    	 url : "/manage/deleteLibrary?libraryId=" + library.libraryId,
    	    	 success : function(result) {
    	    	    console.log("Success");
    	    	    reloadData();
    	    	    $scope.libs = libs;
    	    	    $scope.$apply();
    	    	 },
    	    	 error : function(e) {
    	    	    console.log("FAILURE");
    	    	 }
    	     })
         } else {
    	     
    	 } 
     }
	 
     function reloadData(){
     	libs = [];
     	index = 1;
  		$http({
 			method : "GET",
 			url: "/manage/library"
 		}).then(function successCallback(response) {
             response.data.forEach(function(element){
             	var library = new Object();
             	library.index = index;
             	library.libraryId = element.libraryId;
             	library.name = element.name;
             	library.type = element.type;
             	libs.push(library);
             	index++;
             });
 		}, function errorCallback(response) {
 			$scope.statusResult = true;
 			$scope.status = response.statusText;
 		});
      }
     
     $scope.editLibrary  = function(lib){
    	 console.log(lib);
     }
	 
     $scope.UpdateName  = function(user){
    	 console.log(user);
     }
     
     $scope.UpdateEmail  = function(user, newEmail, confirmEmail){
    	 console.log(user);
    	 console.log(newEmail);
    	 console.log(confirmEmail);
     }
     
     $scope.UpdatePassword = function(user, newPassword, confirmPassword){
    	 console.log(user);
    	 console.log(newPassword);
    	 console.log(confirmPassword);
     }
     
     $scope.deleteAccount = function(user){
    	 console.log("Delete Account");
    	 console.log(user);
     }
     
	
});