
var splice = {
	 bigArray: function(array, cutoff) {
	    if(array.length > cutoff) {
			return array.splice(cutoff, array.length-cutoff);
	    } else {
	    	return array;
	    }
	}
};

module.exports = splice;