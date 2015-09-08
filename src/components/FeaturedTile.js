import React from 'react';
import constants from '../constants/constants';
import {Navigation} from 'react-router';

var FeaturedTile = React.createClass({

	mixins: [Navigation],
	componentDidMount: function() {
		$('.featured-tile').hover(function() {
			$('.featured-info', $(this)).addClass('slideInUp')
		}, function() {
			$('.featured-info').removeClass('slideInUp');
		});
	},
	openDetailPage: function() {
		var push = this.props.push;
		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: this.props.dataId
			}
		});

		if(this.props.data.type == 'upcoming') {
			this.transitionTo('event');
		} else {
			this.transitionTo('festival');
		}
	},
	render: function() {
		var image = {
			backgroundImage: "url(" + constants.S3_ROOT_FOR_IMAGES + this.props.data.main_imageURL+")"
		};

		return (
			<div 
			className="featured-tile flex-column overlay-container click" 
			style={image} 
			onClick={this.openDetailPage} >
			    <div className="overlay"/>
			    <div className="flex-column featured-info animated">
			        <div className="event-name">{this.props.data.event}</div>
			        <div className="event-date">{this.props.data.formattedDate}</div>
			        <div className="featured-type">{this.props.data.type}</div>
			    </div>
			</div>
		);
	}

});

module.exports = FeaturedTile