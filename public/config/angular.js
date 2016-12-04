(function(){
	
	// var app = angular.module('cardTrade', []);

	// app.controller('TradeController', function($scope, $http){

	angular.module('cardTrade', [])
				.controller( 'TradeController', TradeController)//added

				TradeController.$inject = ['$scope', '$http'];//added

	function TradeController( $scope, $http ){
		//Global variables	
		var yourArray = [];
		var wantArray = [];

		//Grab yourCards from DB
		$http.get('/pullYourCards')
		.then(function(response){
			console.log( "calling your response ")
			console.log(response.data);
			$scope.yourCards = response.data;
			
			//Push to yourArray to make global
			response.data.forEach(function(element){
				yourArray.push(element);
			})
		})

		//Attach $scope to yourArray
		$scope.yourCards = yourArray;

		//Grab wantCards from DB
		$http.get('/pullWantCards')
		.then(function(response){
			console.log( "calling want response ")
			console.log(response.data);
			$scope.wantCards = response.data;
			
			//Push to wantArray to make global
			response.data.forEach(function(element){
				wantArray.push(element);
			})
		})

		//Attach $scope to wantArray
		$scope.wantCards = wantCards;

		//Remove yourCards from display
		$scope.yourDelete = function(card){


			$scope.yourCards.splice($scope.yourCards.indexOf(card), 1);
			// console.log(card._id);

			// var id = card._id;
			
		
			// $http.get('/removeYourCard/:id')
			// .then(function(response){
		
			// })
			
		}

		//Total price of your cards
		$scope.yourTotal = function(){

			var yourValue = [];

			$scope.yourCards.forEach(function(element){
				var yourParse = parseFloat(element.price);
				yourValue.push(yourParse);
			})
		
			var yourSum = yourValue.reduce(add, 0);
			function add(a, b){
				return a + b;
			}

			return yourSum;
		}

		//Remove wantCards from display
		$scope.wantDelete = function(card){
		
			$scope.wantCards.splice($scope.wantCards.indexOf(card), 1);
		}

		//Total price of your cards
		$scope.wantTotal = function(){

			var wantValue = [];

			$scope.wantCards.forEach(function(element){
				var wantParse = parseFloat(element.price);
				wantValue.push(wantParse);
			})

			var wantSum = wantValue.reduce(add, 0);

			function add(a, b){
				return a + b;
			}

			return wantSum;
		}
	}
})();