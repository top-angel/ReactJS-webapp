import React from 'react'
import { S3_ROOT_FOR_IMAGES } from '../constants/constants'
import Moment from 'moment'
import history from '../services/history'

var FestivalTile = React.createClass({
	openFestivalPage() {
		var routePath = this.props.event.split(' ').join('-')
		history.pushState(null, '/festival/' + routePath)
	},
	render() {
		var image = { backgroundImage: `url('${S3_ROOT_FOR_IMAGES + this.props.main_imageURL}')` }
		var date = Moment(this.props.start_date).format('MMM DD YYYY')
		var setCount = this.props.set_count != 1 ? `${this.props.set_count} sets`: `${this.props.set_count} set`

		return (
			<div className='festival-tile flex-column click'
				onClick={this.openFestivalPage} 
				style={image}>
				<div className='detail flex-column'>
					<span className='info'>{`${setCount} | ${date}`}</span>
					<span className='festival'>{this.props.event}</span>
				</div>
			</div>
		)
	}
})

export default FestivalTile