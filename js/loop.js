function keyWordsearch(){
    gapi.client.setApiKey('AIzaSyDFKsljUSUP16hwsBH7OOgb0JZY6RpUqmA');
    gapi.client.load('youtube', 'v3', function() {
        makeRequest();
        resetInput();
    });
}

function makeRequest() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        type: 'video',
        videoEmbeddable: 'true',
        part: 'snippet'                        
    });
    
    request.execute(function(response) {
        var videoArray = [];

        for (i = 0; i < 6; i++) {
            console.log(i);
            var videoId = (response.result.items[i].id["videoId"]);
            videoArray.push(videoId);

            console.log(videoArray);
        
            var preURL = 'src="https://www.youtube.com/embed/';
            var postURL = '?autoplay=1&iv_load_policy=3&controls=0&enablejsapi=1&modestbranding=1&showinfo=0&start=8"';
            var fullURL = preURL + videoArray[2] + postURL;

            var desc = (response.result.items[0].snippet["description"]);

            $('#video-container').removeClass('intro-vid');

            $('#video-container').html('<iframe id="ytplayer" type="text/html" ' + fullURL + ' frameborder="0" allowfullscreen></iframe>');

            $('#permalink').html('<a href="https://www.youtube.com/watch?v=' + videoId + '" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Watch on Youtube</a>');
        }
    });

    var formattedChannelName = q.toLowerCase().replace(/\b[a-z]/g, function(letter){
        return letter.toUpperCase();
    });

    $('#channelLabel').html('<p>You are watching <strong>' + formattedChannelName + ' TV</strong></p>');
}

function resetInput() {
    $("#query").val("");
    $("#query").blur();
}