var app = angular.module('app', []);

app.controller('angular-typeahead', function($scope) {
    $scope.input = "";
    $scope.first_term = "";
    $scope.filteredTerms = [];
    $scope.data = [
        'Youtube',
        'Twitter',
        'Linkedin',
        'Github',
        'Soundcloud',
        'Twitch',
        'Vimeo',
        'Facebook',
        'Google'
    ];

    $scope.autocomplete = function() {
        if ($scope.filteredTerms[0]) {
        	var first = $scope.filteredTerms[0];
        	var input = $scope.input;
            if (first.substr(0,input.length).toLowerCase() == input.toLowerCase()) {
            	$scope.first_term = first.replace(first.substr(0,input.length), input);
            } else {
            	$scope.first_term = "";
            }
        } else {
            $scope.first_term = "";
        }
    }

    $scope.$watch('input', function(newval, oldval) {

        $scope.autocomplete();

    });

    $scope.$watchCollection('filteredTerms', function(newval, oldval) {

        $scope.autocomplete();

    });

});

app.filter('highlight', function($sce) {
    return function(text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="highlighted">$1</span>');
        return $sce.trustAsHtml(text);
    }
});
