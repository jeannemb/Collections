var app = angular.module('collection', []);

app.controller('addItem', function($scope,$http) {
	$scope.libraryName = localStorage.getItem("name");
	$scope.showSearchBar = true;
	$scope.showManualEntry = false;
	$scope.responseResult = false;
	var items = [];
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
	
	$scope.lookUpClicked = function(){
		$scope.showSearchBar = true;
		$scope.showManualEntry = false;
	}
	
	$scope.manualClicked = function(){
		$scope.showSearchBar = false;
		$scope.showManualEntry = true;
	}
	
	$scope.onScanClick = function(){
		ScanditSDK.configure("AcILBSO7OOVwFfAGKzYHTugBWCFSANJ7S0ufXlZOxaDefBf9TATcGcIfrUdjW4bLr0x7lJRc49ZFL0ndo27Vqkti+mSsS1uyx36It3VhWc28GJoF2UZ3TeE1uP9GUUOs/0qpskRFnkxAURCh/2MxtVsnGyxmwemk2DgZ2dS0OOg97t/cVwyAs5OeWkCnJwB65WrkfBhZpwdtqYK27G7ArZKZ1lYRDgkrR6qYb1cfg8MEldEMCVCHr2gy8hqUGvVfpd3coeR9nEdMYb9rR4L1u8kRLcYlfdzpzptmBKrvqAD+AAcuDdZlt/lwnzb9MVKvX4W6FddvWPAXgvJKHVP4odtbZg/7XQdLSWNKtaTEc2DUO4vZVRuYQmymXUSkZZeWUHprCWObP+i252q3TQkQIfWxdoSjTd2IGiv7sjHojnaor4hKUuFpce9d/MZG0MztPRi+gtB68NxhHzH7x8X2G8O0j2wvpBiK+/8rxIVZVvthQNW8L177GN1EIxP/nLWvmQsAN+h3maSZgteXnTrJhn2t4ef/nZZHNfwoS7oJfoddW+fl9YGBWYLbtLKoL/uTfv8F8lkyJYBXCgjC/W5C3lRy6KvBxv6qN/hSIHgXnw0eNJIvPQhii7nX/FVh3rqjxosENZ6fLBSBARgP4xqynoh5vII8Htnhoyr+JXmUMBfBITBaIpmeAnqxgjMI+bT7in382QVJ3wEPOea1hLIyG3M8+huU99kuqnC0PSlgLosKY2SsTWBD0CYdB4zFLvnT3Jp5+uaIFDjXppgnMsvM1gMm0tQXuU5aSt81rSQN75ZVAxh5qJ0WPTZyr5RMCFjH7B2n2w==", {
			engineLocation: "https://unpkg.com/scandit-sdk/build",
			preloadEngineLibrary: boolean = false,
			preloadCameras: boolean = false
		});
		
		ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
			playSoundOnScan: true,
			vibrateOnScan: true
			}).then(function(barcodePicker) {
				var scanSettings = new ScanditSDK.ScanSettings({
					  enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
					  codeDuplicateFilter: 1000
					});
					barcodePicker.applyScanSettings(scanSettings);
					$scope.responseResult = true;
					barcodePicker.onScan(function(scanResult) {
						
//						var i = scanResult.barcodes.reduce(function(string, barcode) {
//						    return string + ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
//						  }, "");
						
						var i = scanResult.barcodes.reduce(function(string, barcode) {
						    return barcode.data;
						  }, "");
						console.log(i);
						$scope.searchText = i;
						$scope.$apply();
						barcodePicker.destroy();
						barcodePicker.removeScanListeners();
						$('#searchButton').click();
					});
			});
	}
	
	$scope.searchItem = function(){
		var searchText = $scope.searchText;
		console.log(searchText);
		var index = 0;
		var url = "https://barcodelookup.com/restapi?barcode="+searchText+"&key=m9wpyat2ufk8k9kxtwq4o423k0oho7";
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
			console.log(response);
			response.data.result.forEach(function(element){
				var item = new Object();
				item.title = element.details.product_name;
				item.description = element.details.long_description;
				item.posterUrl = element.images[0];
				item.owns = false;
				item.wantsToOwn = false;
				item.complete = false;
				item.wantsToComplete = false;
				item.index = index;
				index++;
				console.log(item);
				items.push(item);
			});
			$scope.nothingFound = false;
			$scope.searchResult = true;
			//$scope.result = true;
			$scope.items = items;
			$scope.showSearchBar = true;
			$scope.showManualEntry = false;
			$scope.$apply();
		}, function errorCallback(response) {
			//showError();
		});

		
		
	}
	
	$scope.addItem = function(itemToAdd){
		console.log(itemToAdd);
		var id = localStorage.getItem("libraryId");
		if(itemToAdd.title != null){
			var item = {
				genericLibraryId : id,
				title : itemToAdd.title,
				description : itemToAdd.description,
				owns : itemToAdd.owns,
				wantsToOwn : itemToAdd.wantsToOwn,
				complete : itemToAdd.complete,
				wantsToComplete: itemToAdd.wantsToComplete,
				posterUrl : itemToAdd.posterUrl
			}

			$http({
				method: "POST",
				url: "/manage/addgeneric",
				data : angular.toJson(item),
				headers : {
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(check) {
				showSuccessSnakbar();
				remove(itemToAdd);
				clearFields();
			}, function errorCallback(check) {
				showFailSnakbar();
			});
		}else{
			showFailSnakbar();
		}
	}
	
	function remove(item){
		for (i = 0; i< items.length; i++){
			if(items[i].index == item.index){
				items.splice(i, 1);
			}
		}
		$scope.items = items;
		$scope.$apply();
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