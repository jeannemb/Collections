var app = angular.module('app', []);
var libJObj = new Packages.com.depaul.se491.dao.LibraryDAO();
var libById = new libJObj.getLibrariesByUser('user1');

app.controller('controller', function($scope, $filter) {
	
});


