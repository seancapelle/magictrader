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

		var yourArray = JSON.parse(localStorage.getItem('yourCards'));

		//Populate your card and value arrays
		yourArray.forEach(function(element){
			yourCards.push(element);
		})

		this.your = yourCards;
		
		//Card you want from the trade
		var wantCards = [];

		var wantArray = JSON.parse(localStorage.getItem('wantCards'));

		//Populate want card and value arrays
		wantArray.forEach(function(element){
			wantCards.push(element);
		})


		this.want = wantCards;

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

		$scope.findValue = function(your){

			console.log(your);
		}

	});

	// 		products: 'products',
	// 		product: 'product',
	// 		id: 'id',
	// 		hiprice: 'hiprice',
	// 		lowprice: 'lowprice',
	// 		avgprice: 'avgprice',
	// 		link: 'link'


	//function to add up all prices and ng-show to toggle showing good, bad, or equal trade value

	
})();