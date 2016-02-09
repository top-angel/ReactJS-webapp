import React, {PropTypes} from 'react';
import {S3_ROOT_FOR_IMAGES} from '../constants/constants';
// import {Motion, spring, presets} from 'react-motion';
import history from '../services/history';
import Base from './Base';

export default class FeaturedTile extends Base {
	constructor(props) {
		super(props);
	}
	openDetailPage() {
		mixpanel.track('Featured Event Clicked', {
			'event': this.props.event
		});
	}
	render() {
		return (
			<div className='festival-tile' 
				style={{ backgroundImage: `url(${S3_ROOT_FOR_IMAGES + this.props.bannerImage})` }}>

			</div>
		);	
	}
}

FeaturedTile.propTypes = {
	event: PropTypes.string,
	bannerImage: PropTypes.string,
	setCount: PropTypes.number,
	formattedDate: PropTypes.string,
	id: PropTypes.number
};

// var FeaturedTile = React.createClass({
// 	render() {
// 		var image = {
// 			backgroundImage: `url(${S3_ROOT_FOR_IMAGES + this.props.banner_image})`
// 		}

// 		return (
// 			<div className='featured-tile flex-column overlay-container click' 
// 				style={image} 
// 				onClick={this.openDetailPage} >
// 				<div className='featured-info flex-column animated'>
// 					<h3 style={{margin: 0}}>{this.props.event}</h3>
// 					{this.props.formattedDate}
// 					{`${this.props.set_count} sets`}
// 				</div>
// 			</div>
// 		)
// 	}
// })