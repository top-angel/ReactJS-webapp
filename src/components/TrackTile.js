import React from 'react';
import {API_ROOT, S3_ROOT_FOR_IMAGES} from '../constants/constants';
import {playSet, updatePlayCount} from '../services/playerService';
import history from '../services/history';

var TrackTile = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object
	},

	openArtistPage(e) {
		e.stopPropagation();
		var routePath = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openFestivalPage(e) {
		if(this.props.is_radiomix == 0) {
			history.pushState(null, `/festival/${this.props.id}`);
		} else {
			var routeId = this.props.id;
			history.pushState(null, `/mix/${this.props.id}`);
		}
	},

	playSet() {
		playSet(this.props.id, this.context.push, this.props.starttime)
		updatePlayCount(this.props.id, this.context.user.id)
		this.trackPlay()
	},

	trackPlay() {
		mixpanel.track("Track Played", {
			"Track Artist": this.props.artist_name,
			"Track Name": this.props.track_name,
			"Set Artist": this.props.artist,
			"Event": this.props.event
		});
	},

	render() {
		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.banner_image}')`,
			backgroundSize: '100% 100%'
		};
		var time = `${this.props.starttime} | ${this.props.set_length}`;

		return (
			<div className='track-tile flex-column click' style={image} onClick={this.playSet} >
			    <div className='flex-row track'>
			    	<img src={S3_ROOT_FOR_IMAGES+this.props.artist_image} />
			    	<p className='text'>
				    	{this.props.trackname}
				    	<br/>
				    	{time}
			    	</p>
			    </div>
			    <i className='fa fa-play'/>
			    <div className='set flex-column'>
					<span className='artist' onClick={this.openArtistPage}>{this.props.artist}</span>
					<span className='event' onClick={this.openFestivalPage}>{this.props.event}</span>
				</div>
			</div>
		);
	}

});

export default TrackTile;