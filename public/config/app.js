(function(){
	var app = angular.module('trade', [ ]);

	app.controller('TradeController', function(){
		this.have = haveCard;
		this.want = wantCard;

		this.trade.have.id = "Abiam";

		//Card you have to trade
	var haveCard = [
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
	var wantCard = [
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

	var model = [
		card1, card2, card3, card4
	]
	function clicked(cardName) {
		
	}



	});
})();