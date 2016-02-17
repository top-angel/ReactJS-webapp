import R from 'ramda';

export function spliceArray(array, cutoff) {
	if(array.length > cutoff) {
		return array.splice(cutoff, array.length-cutoff);
	} else {
		return array;
	}
}

export function convertMMSSToMilliseconds(time) {
	return (parseInt(time.split(':')[0])*60 +
		parseInt(time.split(':')[1]))*1000;
}

export function convertMillisecondsToMMSS(ms) {
	let secs = ms / 1000;
	let minutes = Math.floor(secs / 60);
	let seconds = Math.floor(secs - (minutes * 60));
	if (minutes < 10) {minutes = '0'+minutes;}
	if (seconds < 10) {seconds = '0'+seconds;}
	let time = minutes+':'+seconds;
	return time;
}

export function filterWithoutSets(array) {
	const hasSets = set => {
		return set.set_count != 0;
	}
	return R.filter(hasSets, array);
}