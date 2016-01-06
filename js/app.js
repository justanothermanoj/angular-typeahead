// Main Module
var app = angular.module('app', []);

$(document).mouseup(function(e) {

    var container = $("#angular-autocomplete");

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
        if (typeof scope.data === 'undefined') {
            scope.data = [
                'Youtube',
                'Twitter',
                'Linkedin',
                'Github',
                'Soundcloud',
                'Twitch',
                'Vimeo',
                'Facebook',
                'Google',
                'Duckduckgo',
                'Spotify',
                'Google+'
            ];
        }

        if (typeof scope.limit === 'undefined') {
            scope.limit = 10;
        }

        element.bind("keydown keypress", function(event) {
            if (event.which === 40) {
                scope.$apply(function() {
                    if (scope.recent >= scope.filteredTerms.length - 1) {
                        scope.recent = -1;
                        scope.set_pre_term('');
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
                        scope.set_pre_term('');
                    } else {
                        $('#pre-term').show();
                        scope.recent = scope.recent - 1;
                        scope.pre_term = scope.filteredTerms[scope.recent];
                        console.log(scope.recent);
                    }
                });
                event.preventDefault();
            } else if (event.which === 39) {
                scope.$apply(function() {
                    var input = document.getElementById('angular-typehead-search-box');
                    var val = input.value;
                    var cur_pos = val.slice(0, input.selectionStart).length;
                    if (cur_pos == scope.input.length) {
                        if (scope.filteredTerms[0]) {
                            scope.input = scope.filteredTerms[0];
                        }
                    }
                });
            } else if (event.which === 13) {
                scope.$apply(function() {
                    if (scope.pre_term != '') {
                        scope.input = scope.pre_term;
                    } else if (scope.first_term != '') {
                        scope.set_term(scope.first_term);
                    }
                });
            }
        });

        $('#pre-term').click(function() {
            scope.$apply(function() {
                $('#pre-term').hide();
                $('#angular-typehead-search-box').focus();
                console.log(scope.pre_term);
                scope.input = scope.pre_term;
            });
        })

        // main autocomplete function 

        scope.autocomplete = function() {
            $("#angular-typehead-results").show();
            if (scope.first_term == scope.input && scope.input != '' && !(scope.filteredTerms.length > 1)) {
                $("#angular-typehead-results").hide();
            }
            scope.recent = -1;
            scope.set_pre_term('');
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

        scope.set_pre_term = function(text) {
            scope.pre_term = text;
        }

        scope.set_term = function(text) {
            scope.input = text;
        }

        // watch for input changes 

        scope.$watch('input', function(newval, oldval) {

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
        scope: {
            data: '=',
            limit: '='
        },
        templateUrl: 'templates/default.html'
    }
});


// Main Controller

app.controller('typeahead-controller', function($scope) {
    $scope.countries = [
        "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Barbuda", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Trty.", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Caicos Islands", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Futuna Islands", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard", "Herzegovina", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Jan Mayen Islands", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Korea (Democratic)", "Kuwait", "Kyrgyzstan", "Lao", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "McDonald Islands", "Mexico", "Micronesia", "Miquelon", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "Nevis", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Principe", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthelemy", "Saint Helena", "Saint Kitts", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre", "Saint Vincent", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia", "South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Grenadines", "Timor-Leste", "Tobago", "Togo", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Turks Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "US Minor Outlying Islands", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (US)", "Wallis", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
    ];
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
