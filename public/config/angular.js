(function() {

    angular.module('cardTrade', [])
        .controller('TradeController', TradeController)

    TradeController.$inject = ['$scope', '$http', '$window'];

    function TradeController($scope, $http) {

        // Global variables	
        var yourArray = [];
        var wantArray = [];
        var sessionID = 0;

        // Create a new session
        newSession();

        // Run functions to display cards
        // pullYourCards();
        // pullWantCards();

        // Creates a new session in DB and saves to localStorage
        function newSession() {
            
            $http.get('/session')
                .then(function(response) {

                    sessionID = response.data._id;

                    // Run functions to display cards
                    pullYourCards();
                    pullWantCards();
                })
                
        }

        // Grab yourCards from DB
        function pullYourCards() {
           
            var data = {
                session: sessionID
            }

            $http.post('/pullYourCards', data)
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

         // Grab wantCards from DB
        function pullWantCards() {

            var data = {
                session: sessionID
            }
           
            $http.post('/pullWantCards', data)
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
                var yourParse = parseFloat(element.price);
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
                var wantParse = parseFloat(element.price);
                wantValue.push(wantParse);
            })

            var wantSum = wantValue.reduce(add, 0);

            function add(a, b) {
                return a + b;
            }

            return wantSum;
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
                    .success(function(data) {
//data.card
//data.status
//data.message
                        // Selects the most current printing of the card
                        var set = data.printings[data.printings.length - 1];

                        // Sends to setPick() to search
                        $scope.setPick(set);

                    })

            }
            // Display the currently selected card
        $scope.currentCard = function(currentVersion) {
           
           var set = currentVersion.setName;
           var name = currentVersion.name;
           // Convert Magic API set naming into TCG format
           switch(set) {
                case 'Limited Edition Alpha':
                    set = 'Alpha Edition';
                    break;
                case 'Arena League':
                    set = 'Arena Promos';
                    break;
                case 'Limited Edition Beta':
                    set = 'Beta Edition';
                    break;
                case 'Champs and States':
                    set = 'Champs Promos';
                    break;
                case 'Commander 2013 Edition':
                    set = 'Commander 2013';
                    break;
                case 'Modern Masters 2015 Edition':
                    set = 'Modern Masters 2015';
                    break;
                case 'Planechase 2012 Edition':
                    set = 'Planechase 2012'
                    break;
                case 'Seventh Edition':
                    set = '7th Edition';
                    break;
                case 'Eighth Edition':
                    set = '8th Edition';
                    break;
                case 'Ninth Edition':
                    set = '9th Edition';
                    break;
                case 'Tenth Edition':
                    set = '10th Edition';
                    break;
                case 'Magic 2010':
                    set = 'Magic 2010 (M10)';
                    break;
                case 'Magic 2011':
                    set = 'Magic 2011 (M11)';
                    break;
                case 'Magic 2012':
                    set = 'Magic 2012 (M12)';
                    break;
                case 'Magic 2013':
                    set = 'Magic 2013 (M13)';
                    break;
                case 'Magic 2014':
                    set = 'Magic 2014 (M14)';
                    break;    
                case 'Magic 2015':
                    set = 'Magic 2015 (M15)'
            }

            var queryURL = 'https://partner.tcgplayer.com/x3/phl.asmx/p?pk=MagicTrader&s=' + set + '&p=' + name
            console.log(queryURL);

            $http.get(queryURL,
                {   
                    // Turn XML into JSON
                    transformResponse: function (cnv) {
                        var x2js = new X2JS();
                        var aftCnv = x2js.xml_str2json(cnv);
                        return aftCnv;
                    }
                })
                .success(function(response) {
                    console.log(response);
                    // Display card
                    $scope.cardName = currentVersion.name;
                    $scope.set = currentVersion.setName;
                    $scope.picURL = currentVersion.imageUrl;

                    // Attach TCG pricing
                    $scope.lowPrice = response.products.product.lowprice;
                    $scope.highPrice = response.products.product.hiprice;
                    $scope.avgPrice = response.products.product.avgprice;
                    $scope.foilPrice = response.products.product.foilavgprice;

                    $scope.buyLink = response.products.product.link;
                    // If no foil printing of card
                    // if (response.products.product.foilavgprice == "0"){
                      
                    //     $scope.foilPrice = "N/A";
                    // }
                    // else {
                    //     $scope.foilPrice = "$" + response.products.product.foilavgprice;
                    // }
                    

                    // Push all card printings to array		
                    var setArray = [];

                    currentVersion.printings.forEach(function(element) {
                        setArray.push(element);
                    })

                    $scope.setList = setArray;
                 })
        }

        // When user selects different set from modal dropdown
        $scope.setPick = function(set) {

            var data = {
                name: $scope.cardName,
                set: set
            }

            $http.post('/search', data)
                .success(function(data) {

                    // Send new card info into currentCard()
                    $scope.currentCard(data);
                })

        }

        // Pick which price to use on your cards
        $scope.yourPricePick = function(id, price) {

            var update = {
                id: id,
                price: price
            }
  
            $http.post('/updateYourPrice', update)
                .success(function(data, status) {
                    
                    pullYourCards();
                })  
        }

        // Pick which price to use on want cards
        $scope.wantPricePick = function(id, price) {
            
            var update = {
                id: id,
                price: price
            }

            $http.post('/updateWantPrice', update)
                .success(function(response) {

                    pullWantCards();
                })
        }

        // Add another card
        $scope.plusOne = function(side, name, lowPrice, highPrice, avgPrice, foilPrice, price, pic) {

            var data = {
                "name": name,
                "lowPrice": lowPrice,
                "highPrice": highPrice,
                "avgPrice": avgPrice,
                "foilPrice": foilPrice,
                "price": price,
                "pic": pic
            }

            search(side, data);
        }
        $scope.addCard = function(side) {

            var data = {
                    "session": sessionID,
                    "name": $scope.cardName,
                    "lowPrice": $scope.lowPrice,
                    "highPrice": $scope.highPrice,
                    "avgPrice": $scope.avgPrice,
                    "foilPrice": $scope.foilPrice,
                    "price": $scope.avgPrice,
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
                    
                    pullYourCards();
                    pullWantCards();
                })

        }
    }
})();
