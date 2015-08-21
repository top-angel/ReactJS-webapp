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


module.exports = viewStream;