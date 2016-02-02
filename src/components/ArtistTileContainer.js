import React, {PropTypes} from 'react'
import ArtistTile from './ArtistTile'
import BaseComponent from './BaseComponent'
import InfiniteScrollify from './InfiniteScrollify'

class ArtistTileContainer extends BaseComponent {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='flex-row'>
				{
					this.props.artists.map((artist, index) => {
						return React.createElement(ArtistTile, {
							artist: artist.artist,
							key: index,
							imageURL: artist.icon_image.imageURL,
							set_count: artist.set_count,
							event_count: artist.event_count
						})
					})
				}
			</div>
		)
	}
}

ArtistTileContainer.propTypes = {
	artists: PropTypes.array.isRequired,
	onScroll: PropTypes.func
}

export default InfiniteScrollify(ArtistTileContainer)