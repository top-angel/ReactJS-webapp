// import Mixpanel from 'mixpanel';

// var mixpanel = Mixpanel.init('1ca22a505d480d37964aa10f8954b4a4');
// console.log(mixpanel);

export function trackArtist(artist) {
	mixpanel.track("Artist Clicked", {
		"artist": artist.artist,
		"source": artist.source
	});
}

export function trackSetPlay(set) {
	mixpanel.track("Set Play", {
		set_id: set.id,
		set_name: set.setName,
		set_artist: set.artist,
		set_event: set.event
	})

	// mixpanel user tracking
	mixpanel.people.increment("play_count");
	mixpanel.people.append("sets_played_ids", set.id);
	mixpanel.people.append("sets_played_names", setName);
	mixpanel.people.append("sets_played_artists", set.artist);
	mixpanel.people.append("sets_played_events", set.event);
}

export function trackTrackPlay(artist, track, setArtist, event) {
	mixpanel.track("Track Played", {
		"Track Artist": this.props.artistName,
		"Track Name": this.props.trackName,
		"Set Artist": this.props.artist,
		"Event": this.props.event
	});
}