var app = angular.module('collection', []);
app.controller('setting', function($scope,$http) {
	var libs = [];
	var currentUser;
	var first;
	var last;
	
	$scope.initAccount = function () {
		$scope.librarySetting = false;
		$scope.accountSetting = true;
		init();
	}
	
	$scope.initLibrary = function(){
		$scope.accountSetting = false;
		$scope.librarySetting = true;
		init();
	}
	
	function init() {
		var index = 1;
		//$scope.accountSetting  = true;
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
            	currentUser = new Object();
            	currentUser.userId = response.data.userId;
            	currentUser.firstName = response.data.firstName;
            	first = response.data.firstName;
            	currentUser.lastName = response.data.lastName;
            	last = response.data.lastName;
            	currentUser.email = response.data.email;
            	currentUser.password = response.data.password;
            	console.log(currentUser);
            	$scope.user = currentUser;
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
	 
	 $scope.deleteAllItems = function(library){
    	 console.log(library);
    	 var r = confirm("All Items within the library will be deleted. Are you sure you wnat to continue?");
    	 if (r == true) {
    		 
    		 $.ajax({
    			 type : "DELETE",
    	    	 url : "/manage/deleteAllItems?libraryId=" + library.libraryId,
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
            	currentUser = new Object();
            	currentUser.userId = response.data.userId;
            	currentUser.firstName = response.data.firstName;
            	first = response.data.firstName;
            	currentUser.lastName = response.data.lastName;
            	last = response.data.lastName;
            	currentUser.email = response.data.email;
            	currentUser.password = response.data.password;
            	console.log(currentUser);
            	$scope.user = currentUser;
		}, function errorCallback(response) {
			$scope.statusResult = true;
			$scope.status = response.statusText;
		});
      }
     
     $scope.editLibrary  = function(lib){
    	 
    	 var updatedLibrary = {
    			libraryId : lib.libraryId,
    			name : lib.name,
				type : lib.type
			}
    	 var r = confirm("Are you sure you wnat to update the library?");
    	 if (r == true) {
    	 $http({
				method: "POST",
				url: "/manage/updateLibrary",
				data : angular.toJson(updatedLibrary),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(_success, _error);
			
			
			function _success(response){
				showSuccessSnakbar(lib.name+"Library");
	    	    reloadData();
	    	    $scope.$apply();
			}
			
			function _error(response){
				showFailSnakbar();
			}
    	 }
     }
	 
     $scope.updateName  = function(firstName,lastName){
    	 console.log(currentUser);
    	 console.log(firstName);
    	 console.log(lastName);
    	 if(first != firstName || last != lastName){
    		first = firstName;
    		last = lastName;
 			var updatedUser = {
					firstName : firstName,
					lastName : lastName,
					email : null,
					password: null
			}
 			updateInfo(updatedUser,"name");
    	 }else{
    		showFailSnakbar();
    	 }
    	 
     }
     
     $scope.updateEmail  = function(user, newEmail, confirmEmail){
    	 if(newEmail != null || confirmEmail != null){
    		 if(newEmail == confirmEmail){
    	    	 console.log(user);
    	    	 console.log(newEmail);
    	    	 console.log(confirmEmail);
    	    	 var updatedUser = {
    					firstName : null,
    					lastName : null,
    					email : newEmail,
    					password: null
    	    	 }
    	    	 updateInfo(updatedUser,"Email Address");
    		 }else{
    			 showFailSnakbar();
    		 }
    	 }else{
    		 showFailSnakbar();
    	 }
     }
     
     $scope.updatePassword = function(user, newPassword, confirmPassword){ 
    	 if(newPassword != null || confirmPassword != null){
    		 if(newPassword == confirmPassword){
    	    	 console.log(user);
    	    	 console.log(newPassword);
    	    	 console.log(confirmPassword);
    	    	 var updatedUser = {
     					firstName : null,
     					lastName : null,
     					email : null,
     					password: newPassword
     	    	 }
    	    	 updateInfo(updatedUser,"Password");
    		 }else{
    			 showFailSnakbar();
    		 }
    	 }else{
    		 showFailSnakbar();
    	 }
     }
     
     $scope.deleteAccount = function(user){
    	 console.log("Delete Account");
    	 console.log(user);
    	 //showSuccessSnakbar("");
     }
     
     function updateInfo(user,message){
    	 
    	 $http({
				method: "POST",
				url: "/user/updateUser",
				data : angular.toJson(user),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(_success, _error);
			
			
			function _success(response){
				showSuccessSnakbar(message);
	    	    reloadData();
	    	    $scope.$apply();
			}
			
			function _error(response){
				showFailSnakbar();
			}
    	 
     }
     
     function showSuccessSnakbar(message) {
    	$scope.message = message;
 	    var x = document.getElementById("snackbarGreen")
 	    x.className = "show";
 	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
 	}
 	
 	function showFailSnakbar() {
 	    var x = document.getElementById("snackbarRed")
 	    x.className = "show";
 	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
 	}
     
	
});