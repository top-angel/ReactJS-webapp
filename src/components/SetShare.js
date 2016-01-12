import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Motion } from 'react-motion';
import { favoriteSet } from '../services/favoriteSet';

const SetShare = React.createClass({

	contextTypes: {
		push: React.PropTypes.func,
		user: React.PropTypes.object,
		loginStatus: React.PropTypes.bool
	},

	getInitialState() {
		return {
			copied: false,
			open: false,
			copyText: 'Copy to Clipboard'
		};
	},

	animate() {
		this.setState({
			open: !this.state.open,
			copyText: 'Copy to Clipboard'
		});
	},

	copyURL() {
		this.setState({
			copyText: 'Copied!'
		});
	},

	favoriteSet() {
		var {user, loginStatus} = this.context;
		if(loginStatus) {
			favoriteSet(this.context.push, user, this.props.id);
		} else {
			history.pushState(null, '/user');
		}
	},

	shareToFacebook() {
		FB.ui({
			method: 'feed',
			link: 'https://setmine.com/play/' + this.props.id,
			caption: 'Share this Set',
			picture: S3_ROOT_FOR_IMAGES + this.props.artist_image
		}, function(response) {
			console.debug(response);
		});
	},

	shareToTwitter() {
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + this.props.id + '&via=SetMineApp');
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550');
	},

	render() {
		var favorite = this.props.favorited ? 'link fa fa-fw fa-star center click' : 'link fa fa-fw fa-star-o center click';
		var playURL = `https://setmine.com/play/${this.props.id}`;

		return (
			<div className='flex flex-row'>
				<Motion style={{ 
					y: this.state.open ? 'visible' : 'hidden'
				}}>
					{
						({y}) =>
						<div className='modal flex-container' style={{visibility: `${y}`}}>
							<div className='text'>{this.state.copyText}</div>
							<span/>
						</div>
					}
				</Motion>
				<i className={favorite} onClick={this.favoriteSet} />
				<CopyToClipboard text={playURL} onCopy={() => this.copyURL()}>
					<i className='link fa fa-fw fa-clipboard center click'
						onMouseEnter={() => this.animate()}
						onMouseLeave={() => this.animate()} />
				</CopyToClipboard>
				<i className='link fa fa-fw fa-facebook center click' onClick={this.shareToFacebook} />
				<i className='link fa fa-fw fa-twitter center click' onClick={this.shareToTwitter}/>
			</div>
		);
	}

});

export default SetShare;