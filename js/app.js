var app = angular.module('app', []);

app.controller('angular-typeahead', function($scope) {
    $scope.input = "";
    $scope.first_term = "";
    $scope.filteredTerms = [];
    $scope.data = [
        'Youtube',
        'Twiiter',
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
            $scope.first_term = $scope.filteredTerms[0];
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
