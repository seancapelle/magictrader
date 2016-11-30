//Gather all card sets for the dropdown
$(document).ready(function(){
    
    //Array to push all set names
    var setBank = [];

    //Ajax call to get all sets
    $.ajax({
        url: 'https://api.magicthegathering.io/v1/sets/',
        method: 'GET',
    })

    //Ajax response
    .done(function(response) {

        //Push all sets into setBank array
        for (var i = 0; i < response.sets.length; i++){

            //Grab set name and set code and attach together with a period     
            setBank.push(response.sets[i].name + "." + response.sets[i].code);
        }

        //Sort setBank alphabetically
        setBank.sort();

        //Append sets to dropdown element
        for (var i = 0; i < setBank.length; i++){

            //Separate set name from set code for each
            var splitter = setBank[i];
            var splitSet = splitter.split('.');
            
            //Set code is the data-id for each set name
            var setName = $('<li><a href="#">' + splitSet[0] + '</a></li>');
            setName.attr("data-set", splitSet[0]);
            setName.attr("data-code", splitSet[1]);
            setName.addClass('set');
            $('#setsDropdownMenu').append(setName);
        }  

        //User selects set
        $('.set').on('click', function() {

            var setName = $(this).data('set');
            var setCode = $(this).data('code');
     
            //Clear the input and append selected set
            $('#setInput').empty();
            $('#setInput').val(setName);

            //Make setCode available for using as a search parameter 
            searchSetup(setCode);
        });

    });
})

function searchSetup(setCode){

    //Card search
    $("#cardSearchButton").on('click', function(e) {
        e.preventDefault();

//NEED TO TOGGLE FOR IF SET CODE SELECTED OR NOT!!! (CURRENTLY SET IS REQUIRED FOR SEARCH)

        //Grab user input
        var card = $('#cardInput').val().trim();

        console.log(card + " " + setCode);
        
        //Object with card and set info for the Ajax call
        var cardSearch = {
            name: card,
            set: setCode 
        }

        var url = window.location.origin + "/search";
        
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(cardSearch),
            async: true,
            complete: dataReceived, 
            cache: false,
            contentType: "application/json",
            processData: false

        }); // End AJAX

        //Populates modal when call completed
        function dataReceived(data){
        
            console.log(data.responseJSON);

            //Clear everything
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

            //User clicks setPrinting
            $('.set').on('click', function() {

                //Take user input 
                setPick = $(this).data('id');

               //Object with card and set info for the Ajax call
                var cardSearch = {
                    name: data.responseJSON.name,
                    set: setPick 
                }

                var url = window.location.origin + "/search";
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(cardSearch),
                    async: true,
                    complete: dataReceived, 
                    cache: false,
                    contentType: "application/json",
                    processData: false

                }); // End AJAX
            });
        $('.glyphicon-menu-left').on('click', function(){
            //Add your card to localstorage
            localStorage.setItem('yourCard', JSON.stringify(data.responseJSON.name));
        });

        $('.glyphicon-menu-right').on('click', function(){
            //Add want card to localstorage
            localStorage.setItem('wantCard', JSON.stringify(data.responseJSON.name));
        });


        }

    })
}


//Modal close
$('.modal').on('hidden.bs.modal', function () {
   $('.card-view').empty(); 
   $('.prices').empty();
   $('#printingsDropdown').empty();
});