//Gather all card sets for the dropdown
$(document).ready(function(){
    
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
            setName.attr("data-id", splitSet[1]);
            setName.addClass('set');
            $('#setsDropdownMenu').append(setName);
        }  

        //User selects set
        $('.set').on('click', function() {
//NEED TO MAKE SET GLOBAL!!!
            var set = $(this).data('id');

            $('#setInput').val($('#setInput').val() + set);
            // $('#setInput').append(set);
            setID(set);
        });

    });
})

function setID(set){
    console.log("in test");
    console.log(set);

}

//Card search
$("#cardSearchButton").on('click', function(e) {
    e.preventDefault();
   

    //Grab user input
    var card = $('#cardInput').val().trim();
    var set = $('#setInput').val().trim();

    console.log(card + " " + set);
    
    //Object with card and set info for the Ajax call
    var cardSearch = {
        name: card,
        set: set 
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

    //When AJAX completed
    function dataReceived(data){
    
         // var setBlank = "#";

        console.log(data.responseJSON);
    
        //Add card title and img to modal
        $('.card-view').append('<h3>' + data.responseJSON.name + '</h3>');         
        $('.card-view').append('<img src="' + data.responseJSON.imageUrl + '"><br>');

        //Create bogus pricing
        var lowPrice = (Math.random() * 2);
        var highPrice = lowPrice + 1;
        var avgPrice = (highPrice + lowPrice) / 2;

        $('.prices').append("Low Price: $" + lowPrice.toFixed(2) + " Average Price: $" + avgPrice.toFixed(2) + " High Price: $" + highPrice.toFixed(2));
            
        //Append to dropdown all sets card printed in
        for(var i = 0; i < data.responseJSON.printings.length; i++){  
            var setPrinting = $('<li><a href="#">' + data.responseJSON.printings[i] + '</a></li>');
            setPrinting.attr("data-id", data.responseJSON.printings[i]);
            setPrinting.addClass('set');
            $('#printingsDropdown').append(setPrinting);
        }

        // //User clicks setPrinting
        // $('.set').on('click', function() {

        //     //Take user input 
        //     setPick = $(this).data('id');

        //     console.log(setPick);

        //     var url = window.location.origin + "/sets";

        //     var formData = new FormData();
        //     formData.append("name", data.responseJSON.name);
        //     formData.append("set", setPick);

        //         $.ajax({
        //             url: url,
        //             type: 'POST',
        //             data: formData,
        //             async: true,
        //             complete: dataReceived,
        //             cache: false,
        //             contentType: false,
        //             processData: false

        //             }); // End AJAX
        //     });

    }

})

//Modal close
$('.modal').on('hidden.bs.modal', function () {
   $('.card-view').empty(); 
   $('.prices').empty();
});