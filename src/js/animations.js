function animateShow(target, options, duration) {
	target = $(target);
	target.removeClass('hidden').animate(options, duration);
}

function animateHide(target, options, duration) {
	target = $(target);
	target.animate(options, duration);
	setTimeout(function(){
		target.addClass('hidden');
	}, duration);
}

function fadeOut(toHide, callback) {
	$(toHide).addClass("hidden-fade");
	var hideDelay = $(toHide).css("transition-duration");
	hideDelay = hideDelay.substring(0, hideDelay.length - 1);
	hideDelay = parseFloat(hideDelay)*1000;
	window.setTimeout(function() {
		$(toHide).addClass("hidden");
		if(callback) {
			callback();
		}
	}, hideDelay+100);
}

function fadeIn(toShow, callback) {
	$(toShow).removeClass("hidden");
	$(toShow).removeClass("hidden-fade");
	if(callback) {
		var showDelay = $(toShow).css("transition-duration");
		showDelay = showDelay.substring(0, showDelay.length - 1);
		showDelay = parseFloat(showDelay)*1000;
    	window.setTimeout(function() {
			callback();
		}, showDelay+100);
    }
}
function fadeTransition(toHide, toShow, callback) {
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