var fullscreenButton = document.getElementById("fullscreenButton");

var controls = [document.getElementById("controlsChannelLabel"), document.getElementById("controlsButtons"), document.getElementById("gradientBackground")];

var controlBar = document.getElementById("mainControls");

var ghostWindow = document.getElementById("ghostWindow");

var channelSearch = document.getElementById("channelSearch");

var delay = 3000;

var timeout = null;

//hide controls 
function hideControls() {
	timeout = setTimeout(function() {
		$(controls).fadeOut('slow');
    	//console.log('Mouse idle for 3 sec');
	}, delay);
}

function showControls() {
	$(controls).fadeIn('slow');
}

$(ghostWindow).on('mousemove', function() {
	clearTimeout(timeout);
	showControls();
	hideControls();
});

$(controlBar).on('mouseover', function() {
	clearTimeout(timeout);
	showControls();
});

// channelSearch.onkeypress = function(myEvent) {
//     console.log(myEvent.which);
//     if (myEvent.which === 13) {
//     	hideControls();
//     }
// };

function fullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  fullscreenButton.innerHTML = "<button class='btn-default' onclick='exitFullscreen()''><i class='fa fa-compress'></i></button>";
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  fullscreenButton.innerHTML = "<button class='btn-default' onclick='fullscreen(document.documentElement)''><i class='fa fa-expand'></i></button>";
}