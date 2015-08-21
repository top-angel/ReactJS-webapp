var React = require('react');
var Rx = require('rx');

var views = {
	browse: 'BrowseView',
	detail: 'DetailView',
	featured: 'FeaturedView',
	home: 'HomeView',
	landing: 'LandingView',
	search: 'SearchResultsView'
}

var viewStream = Rx.Observable.just(views);

var responseStream = viewStream.flatMap(function(view) {
	return Rx.Observable
})

module.exports = viewStream;