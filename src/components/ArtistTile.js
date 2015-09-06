import React from 'react';
import constants from '../constants/constants';
import {Navigation} from 'react-router';

var ArtistTile = React.createClass({

	displayName: 'ArtistTile',
	mixins: [Navigation],
	getDefaultProps: function() {
		return {
			artists: {
				imageURL: null
			}
		};
	},
	openArtistPage: function() {
		var dataId = this.props.dataId;
		console.log(dataId);

		var push = this.props.push;
		console.log(dataId);
		console.log(this.props.firstLetter);

		push({
			type: 'SHALLOW_MERGE',
			data: {
				detailId: dataId
			}
		});

		this.transitionTo('artist');
	},
	render: function() {
		var image = {
			backgroundImage: "url('"+constants.S3_ROOT_FOR_IMAGES + 'small_'+this.props.imageURL+"')"
		}

		return (
			<div className='artist-tile flex-column click'
				style={image}
				onClick={this.openArtistPage}
				dataId={this.props.dataId}
			>
				<div className='center'>{this.props.children}</div>
			</div>
		);
	}
	
});

// <div className='browse-tile flex-column overlay-container click' 
// 				onClick={this.openArtistPage}
// 				dataId={this.props.id}
// 				firstLetter={this.props.firstLetter}
// 				style={image}
// 			>
// 				<div className="overlay set-flex">
// 					<div className="browse-name center">{this.props.text}</div>
// 				</div>
// 				<img className="browse-tile-image hidden" src={constants.S3_ROOT_FOR_IMAGES + 'small_'+this.props.image} />
// 			</div>

module.exports = ArtistTile;
