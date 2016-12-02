//Angular module
(function(){
	// var app = angular.module('cardTrade', ['ngstorage']);
	var app = angular.module('cardTrade', []);

	// app.controller('TradeController', function($scope, $localStorage, $sessionStorage){
	app.controller('TradeController', function(){	
	
		this.your = [];
		this.want = wantCards;	

		
	//Save to local storage	
	// $scope.save = function(){

	// 	$localStorage.cards = "Your Cards and Want Cards";
	// }

	// //Get from local storage
	// $scope.load = function(){

	// 	$scope.data = $localStorage.cards;
	// }


	//Card you have to trade
	var yourCards = []
	var cardsArray = JSON.parse(localStorage.getItem('yourCards'));

	cardsArray.forEach(function(element){
		yourCards.push(element);
	})

	
	this.your = yourCards;


	});
	//console.log( this.your )
	//console.log( this.your[0].price )


	// [
	// 	{
	// 		products: 'products',
	// 		product: 'product',
	// 		id: JSON.parse(localStorage.getItem('yourCardName')),
	// 		hiprice: 'hiprice',
	// 		lowprice: 'lowprice',
	// 		avgprice: JSON.parse(localStorage.getItem('yourCardPrice')),
	// 		link: 'link',
	// 		image: JSON.parse(localStorage.getItem('yourCardPic'))
	// 	},
	// 	{
	// 		products: 'products',
	// 		product: 'product',
	// 		id: 'id',
	// 		hiprice: 'hiprice',
	// 		lowprice: 'lowprice',
	// 		avgprice: 'avgprice',
	// 		link: 'link'
	// 	}

	// ];
	//Card you want from trade
	var wantCards = [
		{
			products: 'products',
			product: 'product',
			id: JSON.parse(localStorage.getItem('wantCardName')),
			hiprice: 'hiprice',
			lowprice: 'lowprice',
			avgprice: JSON.parse(localStorage.getItem('wantCardPrice')),
			link: 'link',
			image: JSON.parse(localStorage.getItem('wantCardPic'))
		}
	];

	// var model = [
	// 	card1, card2, card3, card4
	// ]
	// function clicked(cardName) {
		
	// }

	//function to add up all prices and ng-show to toggle showing good, bad, or equal trade value

	//ng-show for + and - buttons

	//if multiple cards for trade, apply a +1 class to css style differently?
	
})();