var randomChannelButton = document.getElementById("randomChannelButton");

// global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)
  player = new YT.Player('ytplayer', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady
    }
  });
}

function randomSearch(){
    gapi.client.setApiKey('AIzaSyDFKsljUSUP16hwsBH7OOgb0JZY6RpUqmA');
    gapi.client.load('youtube', 'v3', function() {
        makeRandomRequest();
        removeGreeting();
        randomChannelButton.blur();
    });
}

function makeRandomRequest() {
	
		$.get('data/nounlist.txt', function(data) {
	        var words = data.split("\n");
	        var idx = Math.floor(words.length * Math.random());
	        word = words[idx];
	        
	        var request = gapi.client.youtube.search.list({
        		q: word,
        		type: 'video',
        		videoEmbeddable: 'true',
                order: 'viewCount',
                maxResults: 50,
        		part: 'snippet'                        
    		});
    
    		request.execute(function(response) {

                var min = 30;
                var max = 45;
               
        		var videoId1 = (response.result.items[(randomNumber(min,max))].id["videoId"]);
                var videoId2 = (response.result.items[(randomNumber(min,max))].id["videoId"]);
                var videoId3 = (response.result.items[(randomNumber(min,max))].id["videoId"]);
                var videoId4 = (response.result.items[(randomNumber(min,max))].id["videoId"]);
                var videoId5 = (response.result.items[(randomNumber(min,max))].id["videoId"]);

                var videoArray = [videoId2, videoId3, videoId4, videoId5];

                playlistVideos = videoArray.toString();

                var preURL = 'src="//www.youtube.com/embed/';
                var postURL = '&autoplay=1&iv_load_policy=3&controls=0&enablejsapi=1&modestbranding=1&showinfo=0&start=8&loop=0"';
                var fullURL = preURL + videoId1 + '?playlist=' + playlistVideos + postURL;

        		var desc = (response.result.items[0].snippet["description"]);

        		$('#video-container').removeClass('intro-vid');

        		$('#video-container').html('<iframe id="ytplayer" type="text/html" ' + fullURL + ' frameborder="0" allowfullscreen></iframe>');
    		});

    		var formattedChannelName = titleCase(word);
            channelLabel.innerHTML = "<h5>This is <strong>" + formattedChannelName + "</strong> TV</h5>";

	    });
}

function removeGreeting (){
	$('#greeting').hide();
}

function randomNumber(min,max)
{
    for (i = 0; i < 6; i++) {
        var randomNum = Math.floor(Math.random()*(max-min+1)+min);
    }
    return randomNum;
}
