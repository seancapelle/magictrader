//Gather all card sets for the dropdown
$(document).ready(function(){
    
    var setBank = [];

    //Ajax call to get all sets
    $.ajax({
        url: 'https://api.magicthegathering.io/v1/sets/',
        method: 'GET'
    })

    //Ajax response
    .done(function(response) {

        //Push all sets into setBank array
        for (var i = 0; i < response.sets.length; i++){
                
            setBank.push(response.sets[i].name);
        }

        //Sort setBank alphabetically
        setBank.sort();

        //Append sets to dropdown element
        for (var i = 0; i < setBank.length; i++){
               
            $('#setsDropdownMenu').append('<li><a href="#">' + setBank[i] + '</a></li>');
        }       
    });
})


//Card search
$("#cardSearchButton").on('click', function(e) {
    e.preventDefault();
   
    //Grab user input
    var formData = new FormData();
    formData.append("name", $('#cardInput').val().trim());

    var url = window.location.origin + "/search";
    
    // console.log(jsonData);
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        async: true,
        complete: dataReceived, 
        cache: false,
        contentType: false,
        processData: false

    }); // End AJAX

    //When AJAX completed
    function dataReceived(data){
    
         var setBlank = "#";

        console.log(data.responseJSON);
    
        //Add card title and img to modal
        $('.card-view').append('<h3>' + data.responseJSON.name + '</h3>');         
        $('.card-view').append('<img src="' + data.responseJSON.imageUrl + '"><br>');

        //Create bogus pricing
        var lowPrice = (Math.random() * 2);
        var highPrice = lowPrice + 1;
        var avgPrice = (highPrice + lowPrice) / 2;

        $('.prices').append("Low Price: $" + lowPrice.toFixed(2) + " Average Price: $" + avgPrice.toFixed(2) + " High Price: $" + highPrice.toFixed(2));
            
        //Append all sets the card appears in
        for(var i = 0; i < data.responseJSON.printings.length; i++){
            // var setPrinting = $('<a href="' + setBlank + '">' + data.responseJSON.printings[i] + '</a>');
            // setPrinting.attr("data-id", data.responseJSON.printings[i]);
            // setPrinting.addClass('set');
            // $('.sets').append(setPrinting);
            // $('.sets').append(" ");   
            var setPrinting = $('<li><a href="' + setBlank + '">' + data.responseJSON.printings[i] + '</a></li>');
            setPrinting.attr("data-id", data.responseJSON.printings[i]);
            setPrinting.addClass('set');
            $('#printingsDropdown').append(setPrinting);
        }

        //User clicks setPrinting
        $('.set').on('click', function() {

            //Take user input 
            setPick = $(this).data('id');

            console.log(setPick);

            var url = window.location.origin + "/sets";

            var formData = new FormData();
            formData.append("name", data.responseJSON.name);
            formData.append("set", setPick);

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    async: true,
                    complete: dataReceived,
                    cache: false,
                    contentType: false,
                    processData: false

                    }); // End AJAX
            });

    }

})

//Modal close
$('.modal').on('hidden.bs.modal', function () {
    // $(this).find("input,textarea,select").val('').end();
   $('.card-view').empty(); 
   // $('.sets').empty();
   $('.prices').empty();
});