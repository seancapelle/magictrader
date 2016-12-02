//Angular module
(function(){
	// var app = angular.module('cardTrade', ['ngstorage']);
	var app = angular.module('cardTrade', []);

	// app.controller('TradeController', function($scope, $localStorage, $sessionStorage){
	app.controller('TradeController', function(){	
	
			this.your = [];
			this.want = [];	
			
		//Save to local storage	
		// $scope.save = function(){

		// 	$localStorage.cards = "Your Cards and Want Cards";
		// }

		// //Get from local storage
		// $scope.load = function(){

		// 	$scope.data = $localStorage.cards;
		// }


		//Card you have to trade
		var yourCards = [];
		var yourArray = JSON.parse(localStorage.getItem('yourCards'));

		yourArray.forEach(function(element){
			yourCards.push(element);
		})

		var yourValue = []

		for (var i = 0; i < yourCards.length; i++){
			yourValue.push(yourCards[i].price);
		}
		var yourSum = yourValue.reduce(add, 0);

		function add(a, b){
			return a + b;
		}

		this.yourValue = yourSum;

		this.your = yourCards;


		//Card you want
		var wantCards = [];
		var wantArray = JSON.parse(localStorage.getItem('wantCards'));

		wantArray.forEach(function(element){
			wantCards.push(element);
		})

		var wantValue = []

		for (var i = 0; i < wantCards.length; i++){
			wantValue.push(wantCards[i].price);
		}
		var wantSum = wantValue.reduce(add, 0);

		function add(a, b){
			return a + b;
		}

		this.wantValue = wantSum;

		this.want = wantCards;

		// //Value
		// var value = [];
		// var priceArray = JSON.parse(localStorage.getItem('price'));

		// priceArray.forEach(function(element){
		// 	value.push(element);
		// })

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