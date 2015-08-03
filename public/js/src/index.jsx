var React = require('react');
var constants = require('./constants/constants.js');
var todoStore = require('./stores/mainStore');
var todoActions = require('./actions/mainActions');

var SetTile = require('./components/SetTile');
var TrackTile = require('./components/TrackTile');
var EventTile = require('./components/EventTile');

var Player = require('./components/Player');
var Footer = require('./components/Footer');
var Header - require('./Header');
var Buffer = require('./components/Buffer')

var FeaturedView = require('./components/FeaturedView');
var BrowseView = require('./components/BrowseView');

var App = React.createClass({
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<NavMenu items={['Home', 'Sets', 'Upcoming', 'Artists', 'Festivals', 'Mixes', 'Genres']} />
				<LandingView type={this.props.type} />
				<Footer />
			</div>
		);
	}
})

//activity tile

	// var ActivityTile = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>
	// 				<div className="activity-tile flex-column overlay-container" style={{background: "url('" + S3_ROOT_FOR_IMAGES + this.props.activity.imageURL + "')"}}>
	// 				<div className="activity-tile flex-column overlay-container">
	// 				    <div className="overlay"></div>
	// 				    <div className="flex-row flex-3x">
	// 				        <i className="fa fa-fw fa-random center click"></i>
	// 				        <i className="fa fa-4x center"></i>
	// 				        <i className="fa fa-fw fa-bars center click"></i>
	// 				    </div>
	// 				    <div className="set-flex flex actvity-name center">{this.props.activity.activity}</div>
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// });


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