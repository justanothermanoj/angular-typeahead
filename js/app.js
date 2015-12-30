// Main Module
var app = angular.module('app', []);

$(document).mouseup(function(e) {

    var container = $("#angular-typehead-search-box");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $("#angular-typehead-results").hide();
        $('#pre-term').hide();
    } else {
        $("#angular-typehead-results").show();
    }
});

app.directive('angularTypeahead', function() {
    var link = function(scope, element, attrs) {
        // main inpput
        scope.input = "";
        // the first result
        scope.first_term = "";
        // array to contain results
        scope.filteredTerms = [];
        scope.recent = -1;
        scope.pre_term = '';
        // array of data to search from
        scope.data = [
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

        element.bind("keydown keypress", function(event) {
            if (event.which === 40) {
                scope.$apply(function() {
                    if (scope.recent >= scope.filteredTerms.length - 1) {
                        scope.recent = -1;
                    }
                    $('#pre-term').show();
                    scope.recent = scope.recent + 1;
                    scope.pre_term = scope.filteredTerms[scope.recent];
                    console.log(scope.recent);
                });
                event.preventDefault();
            } else if (event.which === 38) {
                scope.$apply(function() {
                    if (scope.recent <= 0) {
                        $('#pre-term').hide();
                            scope.recent = -1;
                        
                    } else {
                        $('#pre-term').show();
                        scope.recent = scope.recent - 1;
                        scope.pre_term = scope.filteredTerms[scope.recent];
                        console.log(scope.recent);
                    }
                });
                event.preventDefault();
            }
        });

        // main autocomplete function 

        scope.autocomplete = function() {
            if (scope.input.length != 0) {
                if (scope.filteredTerms[0]) {
                    var first = scope.filteredTerms[0];
                    var input = scope.input;
                    if (first.substr(0, input.length).toLowerCase() == input.toLowerCase()) {
                        scope.first_term = first.replace(first.substr(0, input.length), input);
                    } else {
                        scope.first_term = "";
                    }
                } else {
                    scope.first_term = "";
                }
            } else {
                scope.first_term = "";
            }
        }

        // watch for input changes 

        scope.$watch('input', function(newval, oldval) {

            $('#angular-typehead-autocomplete-term').show();
            $('#pre-term').hide();
            scope.autocomplete();

        });

        // watch filteredTerms for changes

        scope.$watchCollection('filteredTerms', function(newval, oldval) {

            scope.autocomplete();

        });
    }

    return {
        restrict: 'E',
        link: link,
        scope: {},
        templateUrl: 'templates/default.html'
    }
});


// Main Controller

app.controller('typeahead-controller', function($scope) {

});

// filter to highlight results

app.filter('highlight', function($sce) {
    return function(text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="highlighted">$1</span>');
        return $sce.trustAsHtml(text);
    }
});

// sorting algorithm

app.filter('sort', function() {

    function CustomOrder(term, input) {
        var value = 0;

        if (term.substr(0, input.length).toLowerCase() == input.toLowerCase()) {
            value = 1;
        }

        return value;
    }

    return function(items, field) {
        var filtered = [];
        if (field[2] == 'true') {
            angular.forEach(items, function(item) {
                if (item.substr(0, field[1].length).toLowerCase() == field[1].toLowerCase()) {
                    filtered.push(item);
                }
            });
        } else {
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
        }
        filtered.sort(function(a, b) {

            if (CustomOrder(a, field[1]) > CustomOrder(b, field[1])) {
                return -1;
            }
            if (CustomOrder(a, field[1]) < CustomOrder(b, field[1])) {
                return 1;
            }
            return 0;
        });
        return filtered;
    };
});
