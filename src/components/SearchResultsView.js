import React from 'react';

import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import TrackContainer from './TrackContainer';

var SearchResultsView = React.createClass({
	componentDidMount: function() {
		$('.results-filter').click(function(e){
			e.stopPropagation();
			var scrollOffset = -$('header').height()*2;
			var type = $(this).attr('data-type');
			//TODO make divider move when scrolling

			//search results scroll handlers
			if($(this).is('.sets')) {
				$('.divider', '#search-results .view-title-container').animate({
					left: '0'
				}, 200);
				$(window).scrollTo(0, 200);
			} else if($(this).is('.events')) {
				$('.divider', '#search-results .view-title-container').animate({
					left: '33%'
				}, 200);
				$(window).scrollTo($('.results.events'), 200, {
					offset: scrollOffset
				});
			} else if($(this).is('.tracks')) {
				$('.divider', '#search-results .view-title-container').animate({
					left: '66%'
				}, 200);
				$(window).scrollTo($('.results.tracks'), 200, {
					offset: scrollOffset
				});
			}
		});

		//TODO clear search results view on search click/empty input bar
		//line 2173 in master-original
	},
	render: function() {
		var data = this.props.appState.get('searchResults');
		var setClass = 'flex-row results sets';
		var eventClass = 'flex-row results events';
		var trackClass = 'flex-row results tracks';

		return (
			<div id="search-results" className="view overlay-container">
				<div className="flex-row view-title-container search">
					<div className="view-title sets results-filter flex set-flex" data-type='sets'>
						<div className="center">Sets</div>
					</div>
					<div className="view-title events results-filter flex set-flex" data-type='events'>
						<div className="center">Events</div>
					</div>
					<div className="view-title tracks results-filter flex set-flex" data-type='tracks'>
							<div className="center">Tracks</div>
					</div>
					<div className="divider"></div>
				</div>
				<div className="search-results flex-column">
					<div className='center'>SETS</div>
					<SetContainer
						sets={data.sets}
						push={this.props.push}
						containerClass={setClass}
					/>
					<EventContainer
						events={data.upcomingEvents}
						push={this.props.push}
						containerClass={eventClass}
					/>
					<TrackContainer
						data={data.tracks}
						push={this.props.push}
						containerClass={trackClass}
					/>
				</div>
			</div>
		);
	}
});

module.exports = SearchResultsView;