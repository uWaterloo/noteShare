angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('noteShareCtrl', ['$scope', '$http', '$q', 'noteShareFactory', function ($scope, $http, $q, noteShareFactory) {

    // Widget Configuration
    $scope.portalHelpers.config = {
        // make 'widgetMenu.html' the template for the top right menu
        "widgetMenu": "widgetMenu.html"
    };

    // Import variables and functions from service
    $scope.Dbdata = noteShareFactory.data;

    // initialize the service
    noteShareFactory.init($scope);

	// Show main view in the first column
	$scope.portalHelpers.showView('main.html', 1);
    
    // Show preview view   
    $scope.showPreview = function () {
        $scope.portalHelpers.showView('preview.html', 1);
    }
	
}])
// Factory maintains the state of the widget
.factory('noteShareFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {
		
	var initialized = {value: false};

	// Your variable declarations
	var data = {value: null};

	var init = function ($scope) {
		if (initialized.value)
			return;
		
		initialized.value = true;

		// Place your init code here:
		$scope.portalHelpers.invokeServerFunction('getData')
            .then(function(results){
            data = results   
            sourceLoaded();          
        });
		
	}
    
    function sourceLoaded() {
            sourcesLoaded++;
            if (sourcesLoaded > 0)
                loading.value = false;
        }

	// Expose init(), and variables
	return {
		init: init,
		data: data
	};

}])
// Custom directive example
.directive('noteShareDirectiveName', ['$http', function ($http) {
	return {
		link: function (scope, el, attrs) {

		}
	};
}])
// Custom filter example
.filter('noteShareFilterName', function () {
	return function (input, arg1, arg2) {
		// Filter your output here by iterating over input elements
		var output = input;
		return output;
	}
});