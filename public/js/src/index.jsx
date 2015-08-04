var React = require('react');
var constants = require('./constants/constants.js');
var todoStore = require('./stores/mainStore');
var todoActions = require('./actions/mainActions');

var SetTile = require('./components/SetTile');
var TrackTile = require('./components/TrackTile');
var EventTile = require('./components/EventTile');

var Player = require('./components/Player');
var Footer = require('./components/Footer');
var Header = require('./components/Header');
var Buffer = require('./components/Buffer');
var NavMenu = require('./components/NavMenu');

var FeaturedView = require('./components/FeaturedView');
var BrowseView = require('./components/BrowseView');
var LandingView = require('./components/LandingView');


var App = React.createClass({
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<NavMenu items={['Home', 'Sets', 'Upcoming', 'Artists', 'Festivals', 'Mixes', 'Genres']} />
				<LandingView type={this.props.type} />
				<Footer />
				<Player set={sampleSet} />
			</div>
		);
	}
})

var sampleSet = {
	"id": 2163,
	"artist_id": [40],
	"artist": "Calvin Harris",
	"event": "Lollapalooza Chicago 2014",
	"event_id": 125,
	"episode": "",
	"genre": "Progressive House",
	"episode_imageURL": null,
	"eventimageURL": "31005125a020c86fe8f16f00925338ea9604a0b5.jpg",
	"main_eventimageURL": "8035464a1f8870cce06b320fbab09a73d4994b54.jpg",
	"artistimageURL": "b7debba3662c51696aa361f98c923893.jpg",
	"songURL": "850123b85fd2246c014fc6f9ce427708b72a97da.mp3",
	"datetime": "2014-08-06T03:31:35.000Z",
	"popularity": 7652,
	"is_radiomix": 0,
	"set_length": "48:49",
	"tracklistURL": null,
	"imageURL": "31005125a020c86fe8f16f00925338ea9604a0b5.jpg",
	"artist_preview": [
		{
			"id": 40,
			"artist": "Calvin Harris",
			"imageURL": "b7debba3662c51696aa361f98c923893.jpg"
		}],
	"model_type": "set"
}

var MainViewController = React.createClass({
	render: function() {
		return (
			<div id="main-container">
				<LandingView />
				<SearchResultsView />
				<BrowseView />
				<HomeView />
				<FeaturedView />
				<DetailView data={this.props.data} />
			</div>
		);
	}
});

//testing environment

	var TestView = React.createClass({
		render: function() {
			return (
				<div className="flex-row flex">
					<SetTile data={this.props.data} />
				</div>
			);
		}
	});

React.render(<App/>, document.getElementById('app'));