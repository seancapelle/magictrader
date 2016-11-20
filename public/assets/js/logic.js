//Card search
$("form").on('submit', function(e) {

    e.preventDefault();

    var formData = new FormData();
    formData.append("name", $('#yourCardInput').val().trim());

    var url = window.location.origin + "/test";
    var setSearch = window.location.origin + "/sets";

    // console.log(jsonData);
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        async: true,
        complete: function(data) {
        	console.log(data);

        	
        	$('.modal-body').append('<h3>' + data.responseJSON.name + '</h3>');
        	
    		$('.modal-body').append('<img src="' + data.responseJSON.imageUrl + '"><br>');
        	
            //Append all sets the card appears in
            for(var i=0; i < data.responseJSON.printings.length; i++){
        		
                var setPrinting = $('<a href="' + setSearch + '">' + data.responseJSON.printings[i] + '</a>');

                setPrinting.attr("data-id", data.responseJSON.printings[i]);

                $('.modal-body').append(setPrinting);

                $('.modal-body').append(" ");
        		
        	}


        	//console.log(data.responseJSON.printings.length);
        	// if(data.responseJSON.printings.length > 0){

        	// }

        },
        cache: false,
        contentType: false,
        processData: false

    }); // End AJAX

})