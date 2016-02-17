import React, {PropTypes, Component} from 'react';
import InfiniteScrollify from './InfiniteScrollify';
import MixTile from './MixTile';

class MixContainer extends Component {
	constructor(props) {
		super(props);
		this.onScroll = this.onScroll.bind(this);
	}
	onScroll() {
		this.props.onScroll();
	}
	render() {
		return (
			<div className='tile-container'>
				{
					this.props.mixes.map((mix, index) => {
						return React.createElement(MixTile, {
							key: index,
							id: mix.id,
							event: mix.event,
							iconImage: mix.icon_image.imageURL_small,
							setCount: mix.set_count
						})
					})
				}
			</div>
		);
	}
}

MixContainer.propTypes = {
	onScroll: PropTypes.func.isRequired
};

export default InfiniteScrollify(MixContainer);