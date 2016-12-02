//Gather all card sets for the dropdown
// $(document).ready(function(){
    
//     //Array to push all set names
//     var setBank = [];

//     //Ajax call to get all sets
//     $.ajax({
//         url: 'https://api.magicthegathering.io/v1/sets/',
//         method: 'GET',
//     })

//     //Ajax response
//     .done(function(response) {

//         //Push all sets into setBank array
//         for (var i = 0; i < response.sets.length; i++){

//             //Grab set name and set code and attach together with a period     
//             setBank.push(response.sets[i].name + "." + response.sets[i].code);
//         }

//         //Sort setBank alphabetically
//         setBank.sort();

//         //Append sets to dropdown element
//         for (var i = 0; i < setBank.length; i++){

//             //Separate set name from set code for each
//             var splitter = setBank[i];
//             var splitSet = splitter.split('.');
            
//             //Set code is the data-id for each set name
//             var setName = $('<li><a href="#">' + splitSet[0] + '</a></li>');
//             setName.attr("data-set", splitSet[0]);
//             setName.attr("data-code", splitSet[1]);
//             setName.addClass('set');
//             $('#setsDropdownMenu').append(setName);
//         }  

//         //User selects set
//         $('.set').on('click', function() {

//             var setName = $(this).data('set');
//             var setCode = $(this).data('code');
     
//             //Clear the input and append selected set
//             $('#setInput').empty();
//             $('#setInput').val(setName);

//             //Make setCode available for using as a search parameter 
//             searchSetup(setCode);
//         });

//     });
// })

// function searchSetup(setCode){

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

//Card search
$("#cardSearchButton").on('click', function(e) {
    e.preventDefault();

    //Grab user input
    var card = $('#cardInput').val().trim();
        
    //Object with card info for the Ajax call
    var cardSearch = {
            name: card
        }
    //Grab the initial card
    ajaxCall(cardSearch, dataReceived);

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

    $('.glyphicon-menu-left').on('click', function(){
        
        //Set the side for the cards to go on and add run addCard
        var side = "yourCards";  
        addCard(side); 

    });

    $('.glyphicon-menu-right').on('click', function(){
        
        //Set the side for the cards to go on and add run addCard
        var side = "wantCards";  
        addCard(side); 

    });

    //Determines which side to add the selected card into localStorage
    function addCard(side){

        var exisitingCards = JSON.parse(localStorage.getItem(side)) || [];
        var cardName = data.responseJSON.name;
        var cardPrice = avgPrice;
        var cardPic = data.responseJSON.imageUrl;
        var newEntry = {
            "name": cardName,
            "price": cardPrice,
            "pic": cardPic 
        };
        localStorage.setItem("newEntry", JSON.stringify(newEntry));
        exisitingCards.push(newEntry);
        localStorage.setItem(side, JSON.stringify(exisitingCards));

    }
}

//Modal close
$('.modal').on('hidden.bs.modal', function () {
   $('.card-view').empty(); 
   $('.prices').empty();
   $('#printingsDropdown').empty();
});