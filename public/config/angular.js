(function(){
	
	// var app = angular.module('cardTrade', []);

	// app.controller('TradeController', function($scope, $http){	
	angular.module('cardTrade', [])
				.controller( 'TradeController', TradeController)//added

				TradeController.$inject = ['$scope', '$http'];//added

	function TradeController( $scope, $http ){
	

		//Pull localStorage
		// var yourArray = JSON.parse(localStorage.getItem('yourCards'));
		var yourArray = [];
		var wantArray = [];

		$http.get('/pullYourCards')
		.then(function(response){
			console.log( "calling your response ")
			console.log(response.data);
			$scope.yourCards = response.data;
			
			response.data.forEach(function(element){
				yourArray.push(element);
			})
		})

		//Card you have to trade
		var yourCards = [];
		
		$scope.yourCards = yourArray;
		// console.log($scope.yourCards);
		
		//Pull localStorage
		// var wantArray = JSON.parse(localStorage.getItem('wantCards'));

		$http.get('/pullWantCards')
		.then(function(response){
			console.log( "calling want response ")
			console.log(response.data);
			$scope.wantCards = response.data;
			
			response.data.forEach(function(element){
				wantArray.push(element);
			})
		})
		//Card you want from the trade
		var wantCards = [];

		// //Populate want card and value arrays
		// wantArray.forEach(function(element){
		// 	wantCards.push(element);
		// })

		$scope.wantCards = wantCards;


		$scope.yourDelete = function(card){
		
			$scope.yourCards.splice($scope.yourCards.indexOf(card), 1);
		}

		//Total price of your cards
		$scope.yourTotal = function(){
			
			// var yourCurrent = $scope.yourCards;

			var yourValue = [];

			$scope.yourCards.forEach(function(element){
				var yourParse = parseFloat(element.price);
				yourValue.push(yourParse);
			})
		
			var yourSum = yourValue.reduce(add, 0);
			function add(a, b){
				return a + b;
			}
			console.log(yourSum);
			return yourSum;
		}

		$scope.wantDelete = function(card){
		
			$scope.wantCards.splice($scope.wantCards.indexOf(card), 1);
		}

		//Total price of your cards
		$scope.wantTotal = function(){
			
			// var wantCurrent = $scope.wantCards;

			var wantValue = [];

			$scope.wantCards.forEach(function(element){
				wantValue.push(element.price);
			})

			var wantSum = wantValue.reduce(add, 0);

			function add(a, b){
				return a + b;
			}
			console.log(wantSum);
			return wantSum;
		}

	// });
	}
})();