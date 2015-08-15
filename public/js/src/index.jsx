var React = require('react')
var constants = require('./constants/constants')
var todoStore = require('./stores/mainStore')
var todoActions = require('./actions/mainActions')
// var classNames = require('classNames')

var SetTile = require('./components/SetTile')
var TrackTile = require('./components/TrackTile')
var EventTile = require('./components/EventTile')
var FeaturedTile = require('./components/FeaturedTile')

var Player = require('./components/Player')
var Footer = require('./components/Footer')
var Header = require('./components/Header')
var Buffer = require('./components/Buffer')
var NavMenu = require('./components/NavMenu')
var ViewContainer = require('./components/ViewContainer')

var FeaturedView = require('./components/FeaturedView')
var BrowseView = require('./components/BrowseView')
var LandingView = require('./components/LandingView')
var DetailView = require('./components/DetailView')

// <Header searchInput={this.state.searchInput} />
// <NavMenu items={['Home', 'Featured', 'Artists', 'Festivals', 'Mixes', 'Genres']} />
// <SearchView searchInput={this.state.searchInput} />
// <FeaturedView landingEvents={landing} currentEvents={sampleCurrentEvents}/>
// <BrowseView type='artist' />
// <DetailView artistId={574} detailType='artist'/>


var App = React.createClass({
	getInitialState: function() {
		return {
			searchInput: '',
			setPlayig: null,
			userLoggedIn: false
		};
	},
	render: function() {
		return (
			<div className="main-container flex-column">
				<Header />
				<FeaturedView />
				<Footer />
			</div>
		);
	}
})

//works for passing to eventbrowsecontainer as currentEvents={...}

//works for passing to set tile as data={...}
var sampleSet = {
	"artist": "Calvin Harris",
	"event": "Lollapalooza Chicago 2014",
	"main_eventimageURL": "8035464a1f8870cce06b320fbab09a73d4994b54.jpg",
	"artistimageURL": "b7debba3662c51696aa361f98c923893.jpg",
	"popularity": 7652,
	"set_length": "48:49"
}

//works for passing to track tile as data={...} 
var sampleTrack = {
	"artistname": "Syn Cole feat. Madame Buttons",
	"songname": "Miami 82 (Kygo Remix)",
	"starttime": "02:00",
	"artist": "Kygo",
	"event": "Tomorrowland 2014 W2",
	"main_eventimageURL": "12141ddad8636c5804c86dc685550ee1.jpg",
	"set_length": "10:32"
}

//works for passing to featured tile as data={...}
var sampleLandingEvent = {
	event: "Lollapalooza Chicago 2015",
	bio: "Lollapalooza 2015",
	main_imageURL: "64a0b0e7a80354ccc72812c98a0bd7d6.jpg",
	formattedDate: "Jul 31st - Aug 2nd, 2015",
	type: "recent"
}

React.render(<App />, document.getElementById('app'));