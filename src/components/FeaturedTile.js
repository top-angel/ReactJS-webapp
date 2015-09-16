import React from 'react';
import constants from '../constants/constants';
import {History} from 'react-router';

var FeaturedTile = React.createClass({

	mixins: [History],
	componentDidMount: function() {
		$('.featured-tile').hover(function() {
			$('.featured-info', $(this)).addClass('slideInUp')
		}, function() {
			$('.featured-info').removeClass('slideInUp');
		});
	},

	openDetailPage: function() {
		var routePath = this.props.event.split(' ').join('-');

		if(this.props.type == 'upcoming') {
			this.history.pushState(null, '/event/' + this.props.id);
		} else {
			this.history.pushState(null, '/festival/' + routePath);
		}
	},

	render: function() {
		var image = {
			backgroundImage: "url(" + constants.S3_ROOT_FOR_IMAGES + this.props.main_imageURL+")"
		};

		return (
			<div 
			className="featured-tile flex-column overlay-container click" 
			style={image} 
			onClick={this.openDetailPage} >
			    <div className="overlay"/>
			    <div className="flex-column featured-info animated">
			        <div className="event-name">{this.props.event}</div>
			        <div className="event-date">{this.props.formattedDate}</div>
			        <div className="featured-type">{this.props.type}</div>
			    </div>
			</div>
		);
	}

});

module.exports = FeaturedTile