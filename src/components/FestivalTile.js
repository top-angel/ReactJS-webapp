import React from 'react'
import { S3_ROOT_FOR_IMAGES } from '../constants/constants'
import Moment from 'moment'
import history from '../services/history'

var FestivalTile = React.createClass({
	openFestivalPage() {
		// var routePath = this.props.event.split(' ').join('-')
		history.pushState(null, '/festival/' + this.props.id)
	},
	render() {
		var image = { backgroundImage: `url('${S3_ROOT_FOR_IMAGES + this.props.bannerImage}')` }
		var setCount = this.props.setCount != 1 ? `${this.props.setCount} sets`: `${this.props.setCount} set`

		return (
			<div className='festival-tile flex-column click'
				onClick={this.openFestivalPage} 
				style={image}>
				<div className='detail flex-column'>
					<span className='info'>{`${setCount} | ${this.props.formattedDate}`}</span>
					<span className='festival'>{this.props.festival}</span>
				</div>
			</div>
		)
	}
})

export default FestivalTile