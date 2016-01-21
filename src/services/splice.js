export function bigArray(array, cutoff) {
	if(array.length > cutoff) {
		return array.splice(cutoff, array.length-cutoff);
	} else {
		return array;
	}
}