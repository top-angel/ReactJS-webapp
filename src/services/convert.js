export function MMSSToMilliseconds(time) {
	return (parseInt(time.split(':')[0])*60 +
		parseInt(time.split(':')[1]))*1000;
}

export function millisecondsToMMSS(ms) {
	var secs = ms / 1000;
	var minutes = Math.floor(secs / 60);
	var seconds = Math.floor(secs - (minutes * 60));
	if (minutes < 10) {minutes = '0'+minutes;}
	if (seconds < 10) {seconds = '0'+seconds;}
	var time = minutes+':'+seconds;
	return time;
}