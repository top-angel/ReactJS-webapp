var React = require('react');
var constants = require('./constants/constants');
var todoStore = require('./stores/mainStore');
var todoActions = require('./actions/mainActions');

var SetTile = require('./components/SetTile');
var TrackTile = require('./components/TrackTile');
var EventTile = require('./components/EventTile');
var FeaturedTile = require('./components/FeaturedTile');

var Player = require('./components/Player');
var Footer = require('./components/Footer');
var Header = require('./components/Header');
var Buffer = require('./components/Buffer');
var NavMenu = require('./components/NavMenu');
var ViewContainer = require('./components/ViewContainer');

var FeaturedView = require('./components/FeaturedView');
var BrowseView = require('./components/BrowseView');
var LandingView = require('./components/LandingView');
var DetailView = require('./components/DetailView');

// <Header searchInput={this.state.searchInput} />
// <NavMenu items={['Home', 'Featured', 'Artists', 'Festivals', 'Mixes', 'Genres']} />
// <SearchView searchInput={this.state.searchInput} />
// <DetailView detailData={} detailType=''/>

var App = React.createClass({
	getInitialState: function() {
		return {
			searchInput: '' 
		};
	},
	render: function() {
		return (
			<div className="main-container flex-column">
				<FeaturedView data={landing}/>
				<Footer />
			</div>
		);
	}
})

var landing = [];
$.ajax({
	type: "GET",
	url: 'http://setmine.com'+constants.API_ROOT + "landing",
	success: function(response) {
		if(response.status == "success") {
			var landingModels = response.payload.landing;
			for(var l in landingModels) {
				landing.push(landingModels[l]);
			}
		}
	}
});

var upcoming = [];

//TODO make request for upcoming events within featured view
	//upcoming.soonestEvents
	//upcoming.closestEvents
	//upcoming.soonestEventsAroundMe


//works for passing to set tile as data={...}
var sampleSet = {
	"artist": "Calvin Harris",
	"event": "Lollapalooza Chicago 2014",
	"main_eventimageURL": "8035464a1f8870cce06b320fbab09a73d4994b54.jpg",
	"artistimageURL": "b7debba3662c51696aa361f98c923893.jpg",
	"popularity": 7652,
	"set_length": "48:49"
}

//works for passing to event tile as data={...} and detail view as detailData={...}
var sampleEvent = {
	"id": 705,
	"event": "MDBP Philadelphia 2015",
	"bio": "Artists: \r\n     • ILOVEMAKONNEN\r\n     • JACK U\r\n     • Jauz\r\n     • Nadus\r\n     • SwizzyMack\r\n     • What So Not\r\n     • Dirty South Joe\r\n     • Giraffage\r\n     • Keys N Krates\r\n     • Major Lazer\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n     • ?????\r\n     • ?????",
	"fb_link": "https://www.facebook.com/Maddecentblockparty",
	"twitter_link": "https://twitter.com/MDblockparty",
	"web_link": "http://maddecentblockparty.com/",
	"ticket_link": "https://tickets.songkick.com/events/23445668",
	"imageURL": "2ab1bf07e8311ab942f30232f9b7547f.jpg",
	"main_imageURL": "a44299cda5f130dfbced179e4dd6d6ab.jpg",
	"start_date": "2015-08-06T12:00:00.000Z",
	"end_date": "2015-08-07T12:00:00.000Z",
	"paid": 1,
	"days": 2,
	"venue": "Festival Pier at Penn's Landing",
	"latitude": 39.960016,
	"longitude": -75.137109,
	"address": "601 N Columbus Blvd, Philadelphia, PA 19123",
	"source_id": null,
	"price": "$ - ",
	"formattedDate": "Aug 6th - 7th, 2015",
	"type": "upcoming",
	"lineup": [
		{
			"artist": "ILOVEMAKONNEN",
			"id": "2008",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "207ebc6e2a3ba22d26ec9901ee269e28.jpg",
			"imageURL": "207ebc6e2a3ba22d26ec9901ee269e28.jpg",
			"set_count": 1,
			"event_count": 7
		},
		{
			"artist": "Jack U",
			"id": "281",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": "https://twitter.com/diplo",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "7437af0472119a89bb67d74ba510a75f.jpg",
			"imageURL": "7437af0472119a89bb67d74ba510a75f.jpg",
			"set_count": 5,
			"event_count": 3
		},
		{
			"artist": "Jauz",
			"id": "1417",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "3742b8415fa1c90c3f707f6df44eecfb.jpg",
			"imageURL": "3742b8415fa1c90c3f707f6df44eecfb.jpg",
			"set_count": 2,
			"event_count": 8
		},
		{
			"artist": "Nadus",
			"id": "2285",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 1
		},
		{
			"artist": "SwizzyMack",
			"id": "1146",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 1
		},
		{
			"artist": "What So Not",
			"id": "396",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": "https://www.facebook.com/whatsonot",
			"twitter_link": "https://twitter.com/whatsonot",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "acb39588e0caa88e0dfbb0094ff74896.jpg",
			"imageURL": "acb39588e0caa88e0dfbb0094ff74896.jpg",
			"set_count": 7,
			"event_count": 10
		},
		{
			"artist": "Dirty South Joe",
			"id": "1173",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 1
		},
		{
			"artist": "Giraffage",
			"id": "762",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": null,
			"twitter_link": null,
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"imageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
			"set_count": 0,
			"event_count": 3
		},
		{
			"artist": "Keys N Krates",
			"id": "526",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": "https://www.facebook.com/keysnkrates",
			"twitter_link": "https://twitter.com/keysnkrates",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "11db2bd27fc62f1e9aad04bfb43d5e63.jpg",
			"imageURL": "11db2bd27fc62f1e9aad04bfb43d5e63.jpg",
			"set_count": 5,
			"event_count": 9
		},
		{
			"artist": "Major Lazer",
			"id": "161",
			"time": "TBA",
			"day": "1",
			"event": "MDBP Philadelphia 2015",
			"fb_link": "https://www.facebook.com/majorlazer",
			"twitter_link": "https://twitter.com/majorlazer",
			"soundcloud_link": null,
			"youtube_link": null,
			"instagram_link": null,
			"artistimageURL": "0f59646e614d539af6eff00a55e97037.jpg",
			"imageURL": "0f59646e614d539af6eff00a55e97037.jpg",
			"set_count": 5,
			"event_count": 13
		}
		],
	"hasSets": false
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

//works for passing to detail page as detailData={...}
var sampleArtist = {
	"id": 574,
	"artist": "Kygo",
	"bio": "No Biography Available",
	"fb_link": "https://www.facebook.com/kygoofficial",
	"twitter_link": "https://twitter.com/kygomusic",
	"web_link": "https://www.google.com/",
	"instagram_link": null,
	"soundcloud_link": null,
	"youtube_link": null,
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"musicbrainz_id": null,
	"set_count": 6,
	"event_count": 3,
	"sets": [
	{
	"id": 2314,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Diplo & Friends",
	"event_id": 44,
	"episode": "",
	"genre": "Deep House",
	"episode_imageURL": null,
	"eventimageURL": "6e85b515644e0ec38e115142656004e8.jpg",
	"main_eventimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "9980d7213c9eb692b44c2c0572282753ad1a196c.mp3",
	"datetime": "2014-09-20T04:03:04.000Z",
	"popularity": 5148,
	"is_radiomix": 1,
	"set_length": "59:58",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/46356_diplo-kygo-zebra-katz-diplo-friends-2014-03-23.html",
	"imageURL": "6e85b515644e0ec38e115142656004e8.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Pharrell Williams - Happy (Neus Remix), Ed Sheeran - I See Fire (Kygo Remix), Marvin Gaye - Sexual Healing (Kygo Remix), TLC - Waterfalls (Bixel Boys Remix) , Israel Kamakawiwo ole - Somewhere Over The Rainbow (Thomas Jack Remix), Gnarls Barkley - Crazy (TEEMID & Joie Tan Cover), ZZ Ward - 365 Days (Jerry Folk Remix) , Londonbeat - I've Been Thinking About You (Dilemmachine Remix), Benjamin Francis Leftwich - Shine (Kygo Remix) , Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), The Knocks feat. X Ambassadors - Comfortable (Oliver Nelson Remix), Else - Her Movie , Seinabo Sey - Younger (Kygo Remix)",
	"starttimes": "00:00, 04:36, 09:13, 13:50, 18:27, 23:03, 27:40, 32:17, 36:54, 41:30, 46:07, 50:44, 55:21",
	"model_type": "set"
	},
	{
	"id": 2682,
	"artist_id": [
		574
	],
	"artist": "Kygo",
	"event": "Thomas Jack Presents Tropical House",
	"event_id": 124,
	"episode": "Vol 6",
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "01928d9ef549e2346520dda566452c74.jpg",
	"main_eventimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "790fa39c9682195875466031b99a8f333e1ad67f.mp3",
	"datetime": "2014-11-20T20:04:32.000Z",
	"popularity": 1138,
	"is_radiomix": 1,
	"set_length": "56:41",
	"tracklistURL": null,
	"imageURL": "01928d9ef549e2346520dda566452c74.jpg",
	"artist_preview": [
	{
		"id": 574,
		"artist": "Kygo",
		"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
		"set_count": 6,
		"event_count": 3
	}
	],
	"tracklist": "Bob Marley - Bad Boys, Jabberwonky - Pola (The Geek & Vrv Remix), Dawn Golden - All I Want (Manila Killa Remix), Christina Perri - Burning Gold (Autograf Remix), The Police - Walking On The Moon (J-art & Madan Remix), Of Monsters & Men - Dirty Paws (Kygo Remix), San Holo - Hiding (Kav Verhouzer Remix), Kungs feat. Molly - West Coast, Dawa - Roll The Dice (Urban Contact Remix), ZHU - Faded (Delcroix & Delatour Remix), Dickystixxx - Make Me Feel Better (Club Mix), Labrinth feat. Avelino - Let It Be (The Grades Money Mix), Julian Le Play - Rollercoaster (Filous Remix), Finnebassen - If You Only Knew, Touch & Go - Gotta Have U",
	"starttimes": "00:00, 03:46, 07:33, 11:20, 15:06, 18:53, 22:40, 26:27, 30:13, 34:00, 37:47, 41:34, 45:20, 49:07, 52:54",
	"model_type": "set"
	},
	{
	"id": 1903,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Tomorrowland 2014 W2",
	"event_id": 116,
	"episode": "",
	"genre": "Progressive House",
	"episode_imageURL": null,
	"eventimageURL": "dbd5bd7900531575c9bbfaba0ae434c4.jpg",
	"main_eventimageURL": "12141ddad8636c5804c86dc685550ee1.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "8bf16c6bb2609bcbb7a00940d65038a9e992c98b.mp3",
	"datetime": "2014-07-28T19:53:38.000Z",
	"popularity": 1014,
	"is_radiomix": 0,
	"set_length": "10:32",
	"tracklistURL": null,
	"imageURL": "dbd5bd7900531575c9bbfaba0ae434c4.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Unknown, Unknown, Unknown, Unknown, Unknown, Unknown, Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Seinabo Sey - Younger (Kygo Remix), Gnarls Barkley - Crazy (TEEMID & Joie Tan Cover), Ben Pearce - What I Might Do (Kilter Remix)",
	"starttimes": "00:00, 01:00, 06:00, 07:00, 08:00, 09:00, 02:00, 03:00, 04:00, 05:00",
	"model_type": "set"
	},
	{
	"id": 3003,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Ultra Music Festival 2015",
	"event_id": 452,
	"episode": null,
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"main_eventimageURL": "e724ff1860cfcbd557bd688d041d2935.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "5206135c0e3e6f14db6d6abd2ae8e6f38457cf88.mp3",
	"datetime": "2015-04-01T02:04:53.000Z",
	"popularity": 397,
	"is_radiomix": 0,
	"set_length": "13:37",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/73040_kygo-at-live-stage-ultra-music-festival-miami-united-states-2015-03-30.html",
	"imageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Seinabo Sey - Younger (Kygo Remix), Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Kygo feat. Parson James - Stole The Show, ID - ID, ID - ID",
	"starttimes": "00:00, 02:43, 05:26, 08:10, 10:53",
	"model_type": "set"
	},
	{
	"id": 2924,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "SiriusXM Music Lounge MMW @ W Hotel",
	"event_id": 511,
	"episode": null,
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "f98bd80aea1347ad253134ed53edd5fa.jpg",
	"main_eventimageURL": "d31547cc7c5dc6fbc5591d58465ed8bd.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "5707e59ff0822e098d98ae0cfbc7a6d28c77f9ac.mp3",
	"datetime": "2015-03-27T18:10:23.000Z",
	"popularity": 226,
	"is_radiomix": 0,
	"set_length": "25:44",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/72781_kygo-at-siriusxm-music-lounge-miami-music-week-united-states-2015-03-25.html",
	"imageURL": "f98bd80aea1347ad253134ed53edd5fa.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Vance Joy - Riptide (FlicFlac Edit), ZHU - Faded (Delcroix & Delatour Remix), Kungs feat. Molly - West Coast, Bakermat - Teach Me, Klingande feat. Broken Back - RIVA (Restart The Game), Nico & Vinz - Am I Wrong (TEEMID Bootleg)",
	"starttimes": "00:00, 03:40, 07:20, 11:00, 14:40, 18:20, 22:00",
	"model_type": "set"
	},
	{
	"id": 3424,
	"artist_id": [
	574
	],
	"artist": "Kygo",
	"event": "Ultra Music Festival 2015",
	"event_id": 452,
	"episode": null,
	"genre": "Tropical House",
	"episode_imageURL": null,
	"eventimageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"main_eventimageURL": "e724ff1860cfcbd557bd688d041d2935.jpg",
	"artistimageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"songURL": "40ae5653a3e12c5751b092af982bc2d136a35bf3.mp3",
	"datetime": "2015-06-19T18:45:45.000Z",
	"popularity": 92,
	"is_radiomix": 0,
	"set_length": "59:13",
	"tracklistURL": "http://www.1001tracklists.com/tracklist/73040_kygo-at-live-stage-ultra-music-festival-miami-united-states-2015-03-30.html",
	"imageURL": "1b4657404c6ec5aeb02ff98b07d9e0d7.jpg",
	"artist_preview": [
	{
	"id": 574,
	"artist": "Kygo",
	"imageURL": "a7f7aaec8ecd0cdec444b8abb06dbc66.jpg",
	"set_count": 6,
	"event_count": 3
	}
	],
	"tracklist": "Seinabo Sey - Younger (Kygo Remix), Syn Cole feat. Madame Buttons - Miami 82 (Kygo Remix), Kygo feat. Parson James - Stole The Show, Ed Sheeran - I See Fire (Kygo Remix), Unknown, The Weeknd - Often (Kygo Remix), Kygo & Dillon Francis feat. James Hersey - Coming Over, Unknown, Ed Sheeran & Passenger - No Diggity vs. Thrift Shop (Kygo Remix), Marvin Gaye - Sexual Healing (Kygo Remix), Kyla La Grange - Cut Your Teeth (Kygo Remix), M83 - Wait (Kygo Remix), Sia - Oasis (Kygo Remix) (Working Title), Kygo feat. Conrad - Firestone",
	"starttimes": "00:00, 04:13, 08:27, 12:41, 16:55, 21:08, 25:22, 29:36, 33:50, 38:04, 42:17, 46:31, 50:45, 54:59",
	"model_type": "set"
	}
	],
	"upcomingEvents": [],
	"links": {
	"facebook": "https://www.facebook.com/kygoofficial",
	"twitter": "https://twitter.com/kygomusic",
	"instagram": null,
	"soundcloud": null,
	"youtube": null
	}
}

React.render(<App />, document.getElementById('app'));