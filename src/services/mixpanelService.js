import Mixpanel from 'mixpanel';

// var mixpanel = Mixpanel.init('1ca22a505d480d37964aa10f8954b4a4');
// console.log(mixpanel);

var Analytics = {
	trackArtist: function(artist) {
		mixpanel.track("Artist Clicked", {
			"artist": artist.artist,
			"source": artist.source
		});
	},
	trackSetPlay: function(set) {
		mixpanel.track("Set Play", set);
		mixpanel.people.append("sets_played_ids", set.set_id);
		mixpanel.people.append("sets_played_names", set.set_name);
		mixpanel.people.append("sets_played_artists", set.set_artist);
		mixpanel.people.append("sets_played_events", set.set_event);
	}
};

module.exports = Analytics;