// //Angular module
// (function(){
// 	// var app = angular.module('cardTrade', ['ngstorage']);
// 	var app = angular.module('cardTrade', []);

// 	// app.controller('TradeController', function($scope, $localStorage, $sessionStorage){
// 	app.controller('TradeController', function($scope){	
	
// 			this.your = [];
// 			this.want = [];	
			
// 		//Save to local storage	
// 		// $scope.save = function(){

// 		// 	$localStorage.cards = "Your Cards and Want Cards";
// 		// }

// 		// //Get from local storage
// 		// $scope.load = function(){

// 		// 	$scope.data = $localStorage.cards;
// 		// }

// // YOUR CARDS
// 		//Card you have to trade
// 		var yourCards = [];

// 		var yourArray = JSON.parse(localStorage.getItem('yourCards'));

// 		//Populate array with objects
// 		yourArray.forEach(function(element){
// 			yourCards.push(element);
// 		})

// 		//Populate card objects in this.your array
// 		this.your = yourCards;

		//$scope.yourCards = yourCards;

// // WANT CARDS
// 		//Card you want from the trade
// 		var wantCards = [];

// 		var wantArray = JSON.parse(localStorage.getItem('wantCards'));

// 		//Populate array with objects
// 		wantArray.forEach(function(element){
// 			wantCards.push(element);
// 		})

// 		//Populate card objects in this.want array
// 		this.want = wantCards;

// 		// //Remove card from want
// 		// $scope.wantDelete = function(card){

// 		// 	$scope.wantCards.splice($scope.wantCards.indexOf(card), 1);	
// 		// }
// 		// //Total price of your cards
// 		// $scope.wantTotal = function(){
			
// 		// 	// var wantCurrent = $scope.wantCards;

// 		// 	// var wantValue = [];

// 		// 	// wantCurrent.forEach(function(element){
// 		// 	// 	wantValue.push(element.price);
// 		// 	// })

// 		// 	// var wantSum = wantValue.reduce(add, 0);

// 		// 	// function add(a, b){
// 		// 	// 	return a + b;
// 		// 	// }

// 		// 	// return wantSum;
// 		// }
// 		// $scope.yourAdd = function(){
// 		// 	$scope.yourCards.push($scope.yourCards.indexOf(card));
// 		// }


// 		// //Remove card from your
// 		$scope.yourDelete = function(card){
// 			$scope.yourCards.splice($scope.yourCards.indexOf(card), 1);	
// 		}
// 		//Total price of your cards
// 		$scope.yourTotal = function(){
			
// 			var yourCurrent = $scope.yourCards;

// 			var yourValue = [];

// 			yourCurrent.forEach(function(element){
// 				yourValue.push(element.price);
// 			})

// 			var yourSum = yourValue.reduce(add, 0);

// 			function add(a, b){
// 				return a + b;
// 			}

// 			return yourSum;
// 		}
// 	});

// 	// 		products: 'products',
// 	// 		product: 'product',
// 	// 		id: 'id',
// 	// 		hiprice: 'hiprice',
// 	// 		lowprice: 'lowprice',
// 	// 		avgprice: 'avgprice',
// 	// 		link: 'link'



// 	// var model = [
// 	// 	card1, card2, card3, card4
// 	// ]
// 	// function clicked(cardName) {
		
// 	// }

// 	//function to add up all prices and ng-show to toggle showing good, bad, or equal trade value

// 	//ng-show for + and - buttons

// 	//if multiple cards for trade, apply a +1 class to css style differently?
	
// })();
//Angular module
(function(){
	// var app = angular.module('cardTrade', ['ngstorage']);
	var app = angular.module('cardTrade', []);

	// app.controller('TradeController', function($scope, $localStorage, $sessionStorage){
	app.controller('TradeController', function($scope){	
	
			this.your = [];
			this.want = [];	

		//Card you have to trade
		var yourCards = [];
		// var yourValue = []

		var yourArray = JSON.parse(localStorage.getItem('yourCards'));

		//Populate your card and value arrays
		yourArray.forEach(function(element){
			yourCards.push(element);
			// yourValue.push(element.price);
		})

		//Adds up prices of yourCards
		// var yourSum = yourValue.reduce(add, 0);

		// function add(a, b){
		// 	return a + b;
		// }

		this.your = yourCards;
		


		//Card you want from the trade
		var wantCards = [];
		// var wantValue = [];

		var wantArray = JSON.parse(localStorage.getItem('wantCards'));

		//Populate want card and value arrays
		wantArray.forEach(function(element){
			wantCards.push(element);
			// wantValue.push(element.price)
		})

		//Adds up prices of wantCards
		// var wantSum = wantValue.reduce(add, 0);

		// function add(a, b){
		// 	return a + b;
		// }

		this.want = wantCards;
		// this.wantValue = wantSum;

		$scope.yourCards = yourCards;

		$scope.yourDelete = function(card){
		
			$scope.yourCards.splice($scope.yourCards.indexOf(card), 1);
		}

		//Total price of your cards
		$scope.yourTotal = function(){
			
			var yourCurrent = $scope.yourCards;

			var yourValue = [];

			yourCurrent.forEach(function(element){
				yourValue.push(element.price);
			})

			var yourSum = yourValue.reduce(add, 0);

			function add(a, b){
				return a + b;
			}

			return yourSum;
		}

		$scope.wantCards = wantCards;

		$scope.wantDelete = function(card){
		
			$scope.wantCards.splice($scope.wantCards.indexOf(card), 1);
		}

		//Total price of your cards
		$scope.wantTotal = function(){
			
			var wantCurrent = $scope.wantCards;

			var wantValue = [];

			wantCurrent.forEach(function(element){
				wantValue.push(element.price);
			})

			var wantSum = wantValue.reduce(add, 0);

			function add(a, b){
				return a + b;
			}

			return wantSum;
		}



	});

	// 		products: 'products',
	// 		product: 'product',
	// 		id: 'id',
	// 		hiprice: 'hiprice',
	// 		lowprice: 'lowprice',
	// 		avgprice: 'avgprice',
	// 		link: 'link'



	// var model = [
	// 	card1, card2, card3, card4
	// ]
	// function clicked(cardName) {
		
	// }

	//function to add up all prices and ng-show to toggle showing good, bad, or equal trade value

	//ng-show for + and - buttons

	//if multiple cards for trade, apply a +1 class to css style differently?
	
})();