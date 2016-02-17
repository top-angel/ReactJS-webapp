import React, {PropTypes} from 'react';
import Base from './Base';
import CopyToClipboard from 'react-copy-to-clipboard';
import { favoriteSet } from '../services/favoriteSet';
import { shareToFacebook, shareToTwitter } from '../services/share';

export default class SetShare extends Base {
	constructor(props) {
		super(props);
		this.autoBind('handleCopy', 'favoriteSet', 'shareToFacebook', 'shareToTwitter');
	}
	handleCopy() {
		this.context.push({
			snackbar: {
				open: true,
				message: 'Copied to Clipboard!'
			}
		});
	}
	favoriteSet() {
		var {user, loginStatus, push} = this.context;
		if(!loginStatus) {
			push({ showLogin: true });
			return;
		}

		favoriteSet(this.props.id, user.id, push);
		this.context.push({
			snackbar: {
				open: true,
				message: 'Set added to your favorites'
			}
		});
	}
	shareToFacebook() {
		shareToFacebook(this.props.id, this.props.artistImage);
	}
	shareToTwitter() {
		shareToTwitter(this.props.id);
	}
	render() {
		let favorite = this.props.favorited ? 'fa fa-fw fa-star' : 'fa fa-fw fa-star-o';
		let playURL = `https://setmine.com/play/${this.props.id}`;

		return (
			<div id='SetShare' className='share flex-row'>
				<i className={favorite} onClick={this.favoriteSet} title='Favorite Set' />
				<CopyToClipboard text={playURL} onCopy={this.handleCopy}>
					<i className='fa fa-fw fa-clipboard' title='Copy to Clipboard' />
				</CopyToClipboard>
				<i className='fa fa-fw fa-facebook' title='Share on Facebook' onClick={this.shareToFacebook} />
				<i className='fa fa-fw fa-twitter' title='Share on Twitter' onClick={this.shareToTwitter} />
			</div>
		);
	}
}

SetShare.contextTypes = {
	push: PropTypes.func,
	user: PropTypes.object,
	loginStatus: PropTypes.bool
};

SetShare.propTypes = {
	favorited: PropTypes.bool,
	id: PropTypes.number,
	artistImage: PropTypes.string
};