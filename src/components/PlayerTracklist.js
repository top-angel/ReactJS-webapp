import React from 'react';
import constants from '../constants/constants';

var PlayerTracklist = React.createClass({

	displayName: 'PlayerTrackInfo',

		getDefaultProps: function() {
			return {
				currentTrack: null,
				tracklist: []
			};
		},
		componentDidMount: function() {
			$('#open-tracklist').click(function() {
				if($('.tracklist').hasClass('tracklist-open')) {
					$('.tracklist').removeClass('tracklist-open')
						.animate({ bottom: '-50vh'}, 200);
				} else {
					$('.tracklist').addClass('tracklist-open')
						.animate({ bottom: '10vh' }, 200);
				}
			});
		},

		// preventScroll: function(ev) {
		// 	var $this = $(this),
		// 	    scrollTop = this.scrollTop,
		// 	    scrollHeight = this.scrollHeight,
		// 	    height = $this.height(),
		// 	    delta = (ev.type == 'DOMMouseScroll' ?
		// 	        ev.originalEvent.detail * -40 :
		// 	        ev.originalEvent.wheelDelta),
		// 	    up = delta > 0;

		// 	var prevent = function() {
		// 	    ev.stopPropagation();
		// 	    ev.preventDefault();
		// 	    ev.returnValue = false;
		// 	    return false;
		// 	}

		// 	if (!up && -delta > scrollHeight - height - scrollTop) {
		// 	    // Scrolling down, but this will take us past the bottom.
		// 	    $this.scrollTop(scrollHeight);
		// 	    return prevent();
		// 	} else if (up && delta > scrollTop) {
		// 	    // Scrolling up, but this will take us past the top.
		// 	    $this.scrollTop(0);
		// 	    return prevent();
		// 	}
		// },

		render: function() {
			//var track = this.props.appState.get('currentTrack').setSMObject.trackname;
			var favoriteClass = 'fa fa-fw click fa-star-o' || 'fa fa-fw fa-star';
			var tracklist = this.props.tracklist;

			var tracks = tracklist.map(function(track, index) {
				var props = {
					key: index,
					className: 'flex',
					trackname: track.trackname,
					starttime: track.starttime
				};

				return <div {...props}>
							{track.trackname}
						</div>
			});

			return (
				<div className='flex-row flex-fixed' id='PlayerTracklist'>
					<div className='active-track center flex-fixed-3x'>{this.props.currentTrack}</div>
					<div className='tracklist' onScroll={this.preventScroll}>
						{tracks}
					</div>
					<div className='flex-row flex-fixed'>
						<div className='set-flex flex click'>					
							<i className='fa fa-fw center fa-star-o'/>
						</div>
						<div className='set-flex flex click' id='open-tracklist'>
							<i className='fa fa-fw center fa-bars'/>
						</div>
						<div className='set-flex flex click'>
							<i className='fa fa-fw center fa-share'/>
						</div>
					</div>
				</div>
			);
		}

});

module.exports = PlayerTracklist;