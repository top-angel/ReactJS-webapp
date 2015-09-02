import React from 'react';

import TrackContainer from './TrackContainer';

var TestVieW = React.createClass({

	render: function() {
		var containerClass = 'flex-row flex view';
		var sampleTrack = [
			{
				"songname": "Take Me Over ft. SAFIA",
				"artistname": "Peking Duk",
				"starttime": "31:09",
				"set_length": "44:12",
				"event": "Magnetic Mag Podcast - Ardency",
				"artist": "Ardency",
				"artistimageURL": "e2d624b6e6ed1ac57741762142e37e1c.jpg",
				"main_eventimageURL": "9035732e64139dda6675caed60c5f5ff.jpg"
			}
		];

		return (
			<TrackContainer containerClass={containerClass} data={sampleTrack}/>
		);
	}

});

module.exports = TestVieW;