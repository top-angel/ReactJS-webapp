import React from 'react';
import { API_ROOT, S3_ROOT_FOR_IMAGES } from '../constants/constants';
import history from '../services/history'
import SetShare from './SetShare';

var SetTile = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			starttime: 0,
			// loginStatus: false,
			// user: {},
			favorited: false
		};
	},

	getSet() {
		return $.ajax({
			url: `${API_ROOT}sets/id/${this.props.id}`,
			type: 'get'
		})
	},

	openArtistPage() {
		var routePath = this.props.artist.split(' ').join('_');
		history.pushState(null, `/artist/${routePath}`);
		mixpanel.track("Artist Clicked", {
			"Artist": this.props.artist
		});
	},

	openFestivalPage() {
		if(this.props.is_radiomix == 0) {
			history.pushState(null, `/festival/${this.props.event_id}`);
		} else {
			history.pushState(null, `/mix/${this.props.event_id}`);
		}
	},

	playSet() {
		this.getSet().done((res) => {
			var tracklist = res.payload.sets_id.tracks;			
			var set = {
				artist: this.props.artist,
				event: this.props.setName,
				id: this.props.id,
				set_length: this.props.set_length,
				songURL: this.props.songURL,
				artist_image: this.props.artist_image,
				starttime: '00:00'
			};

			console.log(tracklist);
			console.log(set);

			this.context.push({
				type: 'SHALLOW_MERGE',
				data: {
					currentSet: set,
					tracklist: tracklist,
					currentTrack: tracklist[0].trackname,
					playing: true,
					timeElapsed: 0
				}
			});

			this.updatePlayCount(this.props.id);
		});
	},

	updatePlayCount(id) {
		$.ajax({
			type: 'post',
			url: `${API_ROOT}sets/play`,
			data: {
				set_id: id,
				user_id: this.context.user.id || null
			},
			success(data) {
				console.log('play count updated')
			}
		})
	},

	render() {
		var eventImage = {
			backgroundImage: `url(${S3_ROOT_FOR_IMAGES+this.props.banner_image})`
		};
		var artistImage = S3_ROOT_FOR_IMAGES+this.props.artist_image;

		return (
			<div className='flex-column set-tile' style={eventImage}>
				<div className='detail flex-column'>
					<div className='flex-row flex-fixed-2x'>
						<img src={artistImage} className='click' onClick={this.openArtistPage} />
						<div className='flex-column flex'>
							<div className='flex click link set-name' onClick={this.openFestivalPage}>{this.props.setName}</div>
							<div className='flex click link artist' to='artist' onClick={this.openArtistPage}>{this.props.artist}</div>
							<SetShare 
								id={this.props.id} 
								favorited={this.props.favorited} />
						</div>
					</div>
					<div className='divider center'/>
					<div className='flex-row flex-fixed'>
						<div className='flex-fixed click flex-container play'
						onClick={this.playSet}>
							<i className='fa fa-play center'>{'  '+this.props.popularity}</i>
						</div>
						<div className='divider'/>
						<div className='flex-fixed flex-container'>
							<i className='fa fa-clock-o center'>{'  '+this.props.set_length}</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default SetTile;