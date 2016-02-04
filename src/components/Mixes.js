import React from 'react'
import Base from './Base'
import Loader from 'react-loader'
import api from '../services/api'

import MixTile from './MixTile'

export default class Mixes extends Base {
	constructor(props) {
		super(props)
		this.autoBind('getMixes')
		this.state = {
			loaded: false,
			mixes: []
		}
		this.getMixes()
	}
	componentDidMount() {
		mixpanel.track("Mixes Page Open")
	}
	getMixes() {
		api.get('mixes?limit=5000').then(res => {
			this.setState({
				loaded: true,
				mixes: res.mixes
			})
		})
	}
	render() {
		var mixTiles = this.state.mixes.map((mix, index) => {
			return React.createElement(MixTile, {
				key: index,
				id: mix.id,
				event: mix.event,
				iconImage: mix.icon_image.imageURL_small
			})
		})

		return (
			<Loader loaded={this.state.loaded}>
				<div className='flex-row scrollable tile-container'>
					{mixTiles} 
				</div>
			</Loader>
		)
	}
}