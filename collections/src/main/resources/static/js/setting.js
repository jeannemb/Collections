var app = angular.module('collection', []);
app.controller('setting', function($scope,$http) {
	
	
    $('[data-toggle=offcanvas]').click(function() {
	    $('.row-offcanvas').toggleClass('active');
    });
});