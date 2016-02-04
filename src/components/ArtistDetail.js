import React from 'react'
import Loader from 'react-loader'
import {Link} from 'react-router'
import R from 'ramda'
import api from '../services/api'
import {DEFAULT_IMAGE} from '../constants/constants'

import Base from './Base'
import SetContainer from './SetContainer'
import EventContainer from './EventContainer'
import DetailImageContainer from './DetailImageContainer'
import LinkButtonContainer from './LinkButtonContainer'

export default class ArtistDetail extends Base {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			sets: [],
			upcomingEvents: [],
			artistImage: DEFAULT_IMAGE,
			fb_link: null,
			twitter_link: null,
			instagram_link: null,
			soundcloud_link: null,
			youtube_link: null
		}
		this.autoBind('getArtistData')
		this.getArtistData()
	}
	getArtistData() {
		var artist = this.props.params.artist
		var query = artist.split('_').join('%20')

		api.get(`artists/search/${query}`).then(res => {
			var artist = res.artists_search
			this.setState({
				artist: artist.artist,
				sets: artist.sets,
				upcomingEvents: artist.upcoming_events,
				artistImage: artist.icon_image.imageURL,
				fb_link: artist.fb_link,
				twitter_link: artist.twitter_link,
				instagram_link: artist.instagram_link,
				soundcloud_link: artist.soundcloud_link,
				youtube_link: artist.youtube_link,
				setCount: artist.set_count,
				eventCount: artist.event_count
			})
		}).then(() => {
			this.setState({ loaded: true })
		})
	}
	render() {
		var setText = this.state.setCount != 1 ? 'sets' : 'set'
		var eventText = this.state.eventCount != 1 ? 'events' : 'event'
		var artistInfo = `${this.state.setCount} ${setText} | ${this.state.eventCount} ${eventText}`

		var detailInfo = {
			sets: R.pluck('id', this.state.sets),
			title: this.state.artist,
			buttonText: 'Shuffle',
			imageURL: this.state.artistImage,
			info: artistInfo
		}

		var links = [
			{
				type: 'facebook',
				url: this.state.fb_link
			},
			{
				type: 'twitter',
				url: this.state.twitter_link
			},
			{
				type: 'instagram',
				url: this.state.instagram_link
			},
			{
				type: 'soundcloud',
				url: this.state.soundcloud_link
			},
			{
				type: 'youtube',
				url: this.state.youtube_link
			}
		]

		return (
			<Loader loaded={this.state.loaded}>
				<div id='detail' className='view detail-page'>
					<DetailImageContainer {...detailInfo} />
					<LinkButtonContainer links={links}/>
					<div className='divider'/>
					<div className='flex-row links-container'>
						<Link className='click flex-fixed flex-container'
							to={`/artist/${this.props.params.artist}`}
							onlyActiveOnIndex={true}
							activeClassName='active'>
							<div className='center'>SETS</div>
						</Link>
						<Link className='click flex-fixed flex-container'
							to={`/artist/${this.props.params.artist}/events`}
							activeClassName='active'>
							<div className='center'>EVENTS</div>
						</Link>
					</div>
					{
						React.cloneElement(this.props.children, {
							sets: this.state.sets,
							events: this.state.upcomingEvents
						})
					}
				</div>
			</Loader>
		)
	}
}