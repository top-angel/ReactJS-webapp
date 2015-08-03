var fadeTransition = function(toHide, toShow, callback) {
	toHide = $(toHide);
	toShow = $(toShow);
	$.each(toHide, function(index, value) {
		var delay = $(value).css("transition-duration");
		delay = delay.substring(0, delay.length - 1);
		delay = parseFloat(delay)*1000;
		$(value).addClass("hidden-fade");
		window.setTimeout(function() {
			$(value).addClass("hidden");
			if(toShow != null) {
				toShow.removeClass("hidden");
				window.setTimeout(function() {
					toShow.removeClass("hidden-fade");
					if(callback) {
						var showDelay = toShow.css("transition-duration");
						showDelay = showDelay.substring(0, showDelay.length - 1);
						showDelay = parseInt(showDelay)*1000;
						window.setTimeout(function() {
							callback();
						}, showDelay);
					}
				},10);
			}
		}, delay);
	});
}

var convert = {
	MMSSToMilliseconds: function(time) {
		return totalSecs = (parseInt(time.split(":")[0])*60 + parseInt(time.split(":")[1]))*1000;
	},
	millisecondsToMMSS: function(secs) {
    	var minutes = Math.floor(secs / 60);
    	var seconds = Math.floor(secs - (minutes * 60));
    	if (minutes < 10) {minutes = "0"+minutes;}
    	if (seconds < 10) {seconds = "0"+seconds;}
    	var time = minutes+':'+seconds;
    	return time;
    }
}