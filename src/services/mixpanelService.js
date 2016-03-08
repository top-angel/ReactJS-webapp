// import Mixpanel from 'mixpanel';

// var mixpanel = Mixpanel.init('1ca22a505d480d37964aa10f8954b4a4');
// console.log(mixpanel);

module.exports = {
	trackArtist(artist) {
		mixpanel.track("Artist Clicked", {
			"artist": artist.artist,
			"source": artist.source
		});
	},
	trackSetPlay(setId, setName, setArtist, setEvent) {
		mixpanel.track("Set Play", {
			set_id: setId,
			set_name: setName,
			set_artist: setArtist,
			set_event: setEvent,
		});
		mixpanel.people.append("sets_played_ids", setId);
		mixpanel.people.append("sets_played_names", setName);
		mixpanel.people.append("sets_played_artists", setArtist);
		mixpanel.people.append("sets_played_events", setEvent);
		console.log('set play tracked on mixpanel');
	}
};