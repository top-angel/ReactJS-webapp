import React from 'react'
import Loader from 'react-loader'
import {API_ROOT} from '../constants/constants'
import api from '../services/api'

import FestivalTile from './FestivalTile'
import Base from './Base'

export default class Festivals extends Base {
	constructor(props) {
		super(props)
		this.autoBind('getFestivals')
		this.state = {
			loaded: false,
			festivals: []
		}
		this.getFestivals()
	}
	componentDidMount() {
		mixpanel.track("Festivals Page Open")
	}
	getFestivals() {
		api.get('events/festivals').then(res => {
			this.setState({
				loaded: true,
				festivals: res.events_festivals
			})
		})
	}
	render() {
		var festivalTiles = this.state.festivals.map((festival, index) => {
			return React.createElement(FestivalTile, {
				key: index,
				id: festival.id,
				festival: festival.event,
				bannerImage: festival.banner_image.imageURL,
				setCount: festival.set_count,
				formattedDate: festival.formatted_date
			})
		})

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row scrollable tile-container'>
					{festivalTiles}
				</div>
			</Loader>
		)
	}
}