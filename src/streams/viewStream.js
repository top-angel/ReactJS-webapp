var React = require('react');
var Rx = require('rx');

var viewStream = Rx.Observable.create(function(observer) {

})

viewStream.subscribe(function(response) {
	//do something with response
})

module.exports = viewStream;