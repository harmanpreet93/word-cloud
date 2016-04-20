jQuery(document).ready(function() {
    $("#word-cloud").click(function() {
        get_word_cloud();
    });

    function get_word_cloud() {
        // alert( "Data get_word_cloud called");
        $.ajax({
                url: "php/word_cloud.php",
                type: "GET",
                crossDomain: true,
                dataType: "json"
            }).done(function(json) {
                // alert( "Data Loaded: " + json );
                create_word_cloud(json);
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function(xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            });
    }

    function create_word_cloud(json) {
        /*
         * Create an array of word objects, each representing a word in the cloud
         */
        var word_array = [];
        var listOfObjects = json.split(" ");
        listOfObjects.forEach(function(entry) {
            var single_word = {};
            var index;
            var do_exist;
            [index,do_exist] = isInArray(word_array,entry);
            if (do_exist) {
            	console.log(entry + " word present");
            	var already_present_word = {};
                already_present_word = word_array[index];
                already_present_word['weight'] += 5;
                // console.log(already_present_word);
            } 
            else {
            	console.log(entry + " word not present");
                single_word['text'] = entry.toLowerCase();
                single_word['weight'] = 5;
            	word_array.push(single_word);
            }
        });
        // console.log(word_array);
        // var word_array = [
        //     {text: "Lorem", weight: 15},
        //     {text: "Ipsum", weight: 9, link: "http://jquery.com/"},
        //     {text: "Dolor", weight: 6, html: {title: "I can haz any html attribute"}},
        //     {text: "Sit", weight: 7},
        //     {text: "Amet", weight: 5}
        //     // ...as many words as you want
        // ];
        $("#example").jQCloud(word_array);
    }

    function isInArray(array, word) {
    	for (var i = 0; i < array.length; i++) {
    		if(array[i]['text'] == word) {
    			return [i,true];
    		}
    	}
    	return [-1,false];
    }
});