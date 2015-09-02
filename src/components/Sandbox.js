import React from 'react';

import TrackContainer from './TrackContainer';
import SetContainer from './SetContainer';
import EventContainer from'./EventContainer';

var Sandbox = React.createClass({

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

		var sampleEvent = [
			{
				"id": 1447,
				"event": "Audien @ Necto Nightclub",
				"bio": "No Description Available",
				"fb_link": "https://www.facebook.com/NectoNightclub",
				"twitter_link": "https://twitter.com/Necto",
				"web_link": "http://www.necto.com/",
				"ticket_link": "http://www.shareasale.com/r.cfm?B=234786&U=1121425&M=27601&urllink=www.ticketfly.com/purchase/event/836807/tfly?utm_medium=946393",
				"imageURL": "772dec24f421fef69d51ddebb6d4e840.jpg",
				"main_imageURL": "f7f9697d36502c454ce8dab0cf10d77d.jpg",
				"start_date": "2015-09-02T12:00:00.000Z",
				"end_date": "2015-09-02T12:00:00.000Z",
				"paid": 1,
				"days": 1,
				"venue": "Necto Nightclub",
				"latitude": 42.279179,
				"longitude": -83.742439,
				"address": "516 E Liberty St, Ann Arbor, MI 48104",
				"source_id": null,
				"price": "$ - ",
				"formattedDate": "Sep 2nd, 2015",
				"type": "upcoming",
				"lineup": [
					{
						"artist": "Audien",
						"id": "24",
						"time": "TBA",
						"day": "1",
						"event": "Audien @ Necto Nightclub",
						"fb_link": "https://www.facebook.com/AudienMusic",
						"twitter_link": "https://twitter.com/Audien",
						"soundcloud_link": null,
						"youtube_link": null,
						"instagram_link": null,
						"artistimageURL": "db0641a0bad94b8f305c88f838384a31.jpg",
						"imageURL": "db0641a0bad94b8f305c88f838384a31.jpg",
						"set_count": 14,
						"event_count": 9
					}
				],
				"hasSets": false
			}
		];

		var sampleSet = [
			{
				"id": 4398,
				"artist_id": [
					3532
				],
				"artist": "Parov Stelar",
				"event": "Parov Stelar Mixes",
				"event_id": 1967,
				"episode": "Megamix",
				"genre": "Chill",
				"episode_imageURL": null,
				"eventimageURL": "448ea44b9330c87b30848263a75c99b95ebb9190.jpg",
				"main_eventimageURL": "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png",
				"artistimageURL": "b1666ae9fbba30a99081f8c922c27c4bf728c7ab.jpg",
				"songURL": "4c82722abf170c9c009eff9565752fc95983ae77.mp3",
				"datetime": "2015-08-28T06:41:07.000Z",
				"popularity": 17,
				"is_radiomix": 1,
				"set_length": "61:30",
				"tracklistURL": "null",
				"imageURL": "448ea44b9330c87b30848263a75c99b95ebb9190.jpg",
				"artist_preview": [
					{
						"id": 3532,
						"artist": "Parov Stelar",
						"imageURL": "b1666ae9fbba30a99081f8c922c27c4bf728c7ab.jpg",
						"set_count": 1,
						"event_count": 9
					}
				],
				"model_type": "set"
			}
		];

		return (
			<SetContainer containerClass={containerClass} sets={sampleSet}/>
		);
	}

});

module.exports = Sandbox;