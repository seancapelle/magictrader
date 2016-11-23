//Angular module
(function(){
	var app = angular.module('cardTrade', []);

	app.controller('TradeController', function(){
		this.your = yourCards;
		this.want = wantCards;	
	});
		
	//Card you have to trade
	var yourCards = [
		{
			products: 'products',
			product: 'product',
			id: 'id',
			hiprice: 'hiprice',
			lowprice: 'lowprice',
			avgprice: 'avgprice',
			link: 'link'
		},
		{
			products: 'products',
			product: 'product',
			id: 'id',
			hiprice: 'hiprice',
			lowprice: 'lowprice',
			avgprice: 'avgprice',
			link: 'link'
		}

	];
	//Card you want from trade
	var wantCards = [
		{
			products: 'products',
			product: 'product',
			id: 'id',
			hiprice: 'hiprice',
			lowprice: 'lowprice',
			avgprice: 'avgprice',
			link: 'link'
		}
	];

	// var model = [
	// 	card1, card2, card3, card4
	// ]
	// function clicked(cardName) {
		
	// }

	//function to add up all prices and ng-show to toggle showing good, bad, or equal trade value

	//ng-show for + and - buttons

	
})();