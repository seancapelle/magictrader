(function(){
	var app = angular.module('cardTrade', []);

	app.controller('TradeController', function(){
		this.your = yourCard;
		this.want = wantCard;	
	});
		
	//Card you have to trade
	var yourCard =
		{
			products: 'products',
			product: 'product',
			id: 'id',
			hiprice: 'hiprice',
			lowprice: 'lowprice',
			avgprice: 'avgprice',
			link: 'link'
		};

	//Card you want from trade
	var wantCard = 
		{
			products: 'products',
			product: 'product',
			id: 'id',
			hiprice: 'hiprice',
			lowprice: 'lowprice',
			avgprice: 'avgprice',
			link: 'link'
		};



	// var model = [
	// 	card1, card2, card3, card4
	// ]
	// function clicked(cardName) {
		
	// }



	
})();