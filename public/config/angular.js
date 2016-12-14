(function() {

    angular.module('cardTrade', [])
        .controller('TradeController', TradeController)

    TradeController.$inject = ['$scope', '$http', '$window'];

    function TradeController($scope, $http) {

        // Global variables	
        var yourArray = [];
        var wantArray = [];

        // Run functions to display cards
        pullYourCards();
        pullWantCards();

        //Main page display

        function pullYourCards() {

            // Grab yourCards from DB
            $http.get('/pullYourCards')
                .then(function(response) {

                    $scope.yourCards = response.data;

                    // Push to yourArray to make global
                    response.data.forEach(function(element) {
                        yourArray.push(element);
                    })
                })
        }


        // Attach $scope to yourArray
        $scope.yourCards = yourArray;

        function pullWantCards() {
            // Grab wantCards from DB
            $http.get('/pullWantCards')
                .then(function(response) {

                    $scope.wantCards = response.data;

                    // Push to wantArray to make global
                    response.data.forEach(function(element) {
                        wantArray.push(element);
                    })
                })
        }


        // Attach $scope to wantArray
        $scope.wantCards = wantArray;

        // Remove yourCards from display
        $scope.yourDelete = function(card) {

            $scope.yourCards.splice($scope.yourCards.indexOf(card), 1);

            var id = card._id;

            $http.delete('/removeYourCard/:' + id)
                .then(function(response) {
                    console.log(response.data.message);
                })

        }

        // Total price of your cards
        $scope.yourTotal = function() {

            var yourValue = [];

            $scope.yourCards.forEach(function(element) {
                var yourParse = parseFloat(element.avgPrice);
                yourValue.push(yourParse);
            })

            var yourSum = yourValue.reduce(add, 0);

            function add(a, b) {
                return a + b;
            }

            return yourSum;
        }

        // Remove wantCards from display
        $scope.wantDelete = function(card) {

            $scope.wantCards.splice($scope.wantCards.indexOf(card), 1);

            var id = card._id;

            $http.delete('/removeWantCard/:' + id)
                .then(function(response) {

                    console.log(response.data.message);
                })

        }

        // Total price of want cards
        $scope.wantTotal = function() {

            var wantValue = [];

            $scope.wantCards.forEach(function(element) {
                var wantParse = parseFloat(element.avgPrice);
                wantValue.push(wantParse);
            })

            var wantSum = wantValue.reduce(add, 0);

            function add(a, b) {
                return a + b;
            }

            return wantSum;
        }

        // Pick which price to use
        // $scope.pricePick = function(price){
        // 	console.log($scope.card);
        // }

        // Add another card
        $scope.plusOne = function(side, name, lowPrice, highPrice, avgPrice, pic) {

            var data = {
                "name": name,
                "lowPrice": lowPrice,
                "highPrice": highPrice,
                "avgPrice": avgPrice,
                "pic": pic
            }

            search(side, data);
        }

        // MODAL FUNCTIONS 
        $scope.test = function(){
        	angular.element('#cardSearchButton').trigger('click');
        }
		

        // Initial search to find card
        $scope.search = function() {

                var data = {
                    name: $scope.cardName
                }
                $http.post('/search', data)
                    .success(function(data, status) {

                        // Selects the most current printing of the card
                        var set = data.printings[data.printings.length - 1];

                        // Sends to setPick() to search
                        $scope.setPick(set);

                    })

            }
            // Display the currently selected card
        $scope.currentCard = function(currentVersion) {
            console.log(currentVersion);
            // Display card
            $scope.cardName = currentVersion.name;
            $scope.set = currentVersion.setName;
            $scope.picURL = currentVersion.imageUrl;

            // Create bogus pricing
            $scope.lowPrice = (Math.random() * 2);
            $scope.highPrice = $scope.lowPrice + 1;
            $scope.avgPrice = ($scope.highPrice + $scope.lowPrice) / 2;

            // Push all card printings to array		
            var setArray = [];

            currentVersion.printings.forEach(function(element) {
                setArray.push(element);
            })

            $scope.setList = setArray;
        }

        // When user selects different set from modal dropdown
        $scope.setPick = function(set) {

            var data = {
                name: $scope.cardName,
                set: set
            }

            $http.post('/search', data)
                .success(function(data, status) {

                    // Send new card info into currentCard()
                    $scope.currentCard(data);
                })

        }

        $scope.addCard = function(side) {

            var data = {
                    "name": $scope.cardName,
                    "lowPrice": $scope.lowPrice,
                    "highPrice": $scope.highPrice,
                    "avgPrice": $scope.avgPrice,
                    "pic": $scope.picURL
                }
                // Determine which route to send to
            if (side == 'yourCard') {

                search(side, data);

            } else {

                search(side, data);
            }
        }

        // Send card info on route
        function search(side, data) {

            var url = "/" + side;

            $http.post(url, data)
                .success(function(data, status) {
                    console.log(data);
                    pullYourCards();
                    pullWantCards();
                })

        }
    }
})();
