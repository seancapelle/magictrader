//Card search
$("form").on('submit', function(e) {

    e.preventDefault();

    //Grab user input
    var formData = new FormData();
    formData.append("name", $('#yourCardInput').val().trim());

    var url = window.location.origin + "/test";
    
    var setBlank = "#";

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
    
        console.log(data.responseJSON);
    
        //Add card title and img
        $('.card-view').append('<h3>' + data.responseJSON.name + '</h3>');         
        $('.card-view').append('<img src="' + data.responseJSON.imageUrl + '"><br>');
            
        //Append all sets the card appears in
        for(var i=0; i < data.responseJSON.printings.length; i++){
            var setPrinting = $('<a href="' + setBlank + '">' + data.responseJSON.printings[i] + '</a>');
            setPrinting.attr("data-id", data.responseJSON.printings[i]);
            setPrinting.addClass('set');
            $('.sets').append(setPrinting);
            $('.sets').append(" ");   
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
   $('.sets').empty();
});