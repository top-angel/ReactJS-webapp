import React from 'react'
import BaseComponent from './BaseComponent'
import CssModules from 'react-css-modules'
import styles from '../../public/css/SetShare.css'

import CopyToClipboard from 'react-copy-to-clipboard'
import { Motion } from 'react-motion'
import { favoriteSet } from '../services/favoriteSet'

class SetShare extends BaseComponent {
	constructor(props) {
		super(props)
		this.state = {
			copied: false,
			open: false,
			copyText: 'Copy to Clipboard'
		}
		this.autoBind('animate', 'copyURL', 'favoriteSet', 'shareToFacebook', 'shareToTwitter')
	}
	animate() {
		this.setState({
			open: !this.state.open,
			copyText: 'Copy to Clipboard'
		})
	}
	copyURL() {
		this.setState({
			copyText: 'Copied!'
		})
	}
	favoriteSet() {
		var {user, loginStatus, push} = this.context
		if(loginStatus) {
			favoriteSet(this.props.id, user.id, push)
		} else {
			history.pushState(null, '/user')
		}
	}
	shareToFacebook() {
		FB.ui({
			method: 'feed',
			link: 'https://setmine.com/play/' + this.props.id,
			caption: 'Share this Set',
			picture: S3_ROOT_FOR_IMAGES + this.props.artist_image
		}, function(response) {
			console.debug(response)
		})
	}
	shareToTwitter() {
		var parameters = 'url=' + encodeURIComponent('https://setmine.com/play/' + this.props.id + '&via=SetMineApp')
		window.open('https://twitter.com/intent/tweet?' + parameters, '_blank', 'height=420, width=550')
	}
	render() {
		var favorite = this.props.favorited ? 'fa fa-fw fa-star' : 'fa fa-fw fa-star-o'
		var playURL = `https://setmine.com/play/${this.props.id}`

		return (
			<div className='flex flex-row'>
				<Motion style={{ 
					y: this.state.open ? 'visible' : 'hidden'
				}}>
					{
						({y}) =>
						<div className={this.props.styles['modal']} style={{visibility: `${y}`}}>
							<p>{this.state.copyText}</p>
							<span/>
						</div>
					}
				</Motion>
				<i styleName='share' className={favorite} onClick={this.favoriteSet} />
				<CopyToClipboard text={playURL} onCopy={() => this.copyURL()}>
					<i styleName='share' className='fa fa-fw fa-clipboard'
						onMouseEnter={() => this.animate()}
						onMouseLeave={() => this.animate()} />
				</CopyToClipboard>
				<i styleName='share' className='fa fa-fw fa-facebook' onClick={this.shareToFacebook} />
				<i styleName='share' className='fa fa-fw fa-twitter' onClick={this.shareToTwitter}/>
			</div>
		)
	}
}

SetShare.contextTypes = {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
}

export default CssModules(SetShare, styles)