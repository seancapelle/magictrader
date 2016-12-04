
//Ajax call that takes the cardSearch object for search params, and func for function when done
function ajaxCall(cardSearch, func){
        
    var url = window.location.origin + "/search";
            
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(cardSearch), 
            async: true,
            complete: func, 
            cache: false,
            contentType: "application/json",
            processData: false

        }); 
}

//Card search if button clicked
$("#cardSearchButton").on('click', function(e) {
    e.preventDefault();
console.log("in app.js");
    //Grab user input
    var card = $('#cardInput').val().trim();
        
    //Object with card info for the Ajax call
    var cardSearch = {
            name: card
        }
    //Grab the initial card
    ajaxCall(cardSearch, dataReceived);

}) 

//Card search if Enter key pressed
$("#cardInput").keyup(function(event) {

    if(event.keyCode == 13){
        $("#cardSearchButton").click();
    }
}) 

//After first call
function dataReceived(data){
        
    console.log(data.responseJSON);

    //currentSet will grab the most recent printing of the card
    var currentSet = data.responseJSON.printings[data.responseJSON.printings.length - 1];

    //Object with card and set info for the Ajax call
    var cardSearch = {
            name: data.responseJSON.name,
            set: currentSet 
        }
        
    //Make second call to display the card printing from the most recent set    
    ajaxCall(cardSearch, currentCard);
}   

//Displays the selected card printing         
function currentCard(data){

    //Clear the modal
    $('.card-view').empty();
    $('.prices').empty();
    $('#printingsDropdown').empty();

    //Add card title and img to modal
    $('.card-view').append('<h3>' + data.responseJSON.name + '</h3>'); 
    $('.card-view').append('<p>' + data.responseJSON.setName + '</p>');         
    $('.card-view').append('<img src="' + data.responseJSON.imageUrl + '"><br>');

    //Create bogus pricing
    var lowPrice = (Math.random() * 2);
    var highPrice = lowPrice + 1;
    var avgPrice = (highPrice + lowPrice) / 2;

    //Append said bogus pricing, fixed to two decimals
    $('.prices').append("Low Price: $" + lowPrice.toFixed(2) + " Average Price: $" + avgPrice.toFixed(2) + " High Price: $" + highPrice.toFixed(2));
                
    //Append to dropdown all sets card printed in
    for(var i = 0; i < data.responseJSON.printings.length; i++){  
            var setPrinting = $('<li><a href="#">' + data.responseJSON.printings[i] + '</a></li>');
            setPrinting.attr("data-id", data.responseJSON.printings[i]);
            setPrinting.addClass('set');
            $('#printingsDropdown').append(setPrinting);
        }

    //User clicks setPrinting to select a different set
    $('.set').on('click', function() {

        //Take user input 
        setPick = $(this).data('id');

        //Object with card and set info for the Ajax call
        var cardSearch = {
                name: data.responseJSON.name,
                set: setPick 
            }
                
        ajaxCall(cardSearch, currentCard);
                
    });

    $('.yourCardsAdd').on('click', function(){
        
        //Set the side for the cards to go on and add run addCard
        var side = "yourCard";  
        addCard(side); 
    
    });

    $('.wantCardsAdd').on('click', function(){
        
        //Set the side for the cards to go on and add run addCard
        var side = "wantCard";  
        addCard(side); 

    });

    //Determines which side to add the selected card into localStorage
    function addCard(side){

    // var exisitingCards = JSON.parse(localStorage.getItem(side)) || [];
      
       var newEntry = {
            "name": data.responseJSON.name,
            "price": avgPrice,
            "pic": data.responseJSON.imageUrl
        }

        //Determine which route to send to
        if (side == 'yourCard'){
            console.log(side);
            search(side, newEntry);

        }
        else {
            console.log(side);
            search(side, newEntry);
        }

        //Send card info on route
        function search(side, newEntry){

            var url = "/" + side;

                $.ajax({
                    method: "POST",
                    data: newEntry,
                    url: url
                })
                .done(function(data){
                     console.log(data);
                })
        }
      
    }
}

//Modal close
$('.modal').on('hidden.bs.modal', function () {
   $('.card-view').empty(); 
   $('.prices').empty();
   $('#printingsDropdown').empty();
});

// module.exports(side);