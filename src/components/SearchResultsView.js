import React from 'react';
import Loader from 'react-loader';

import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import TrackContainer from './TrackContainer';

var SearchResultsView = React.createClass({

	getInitialState() {
		return {
			activeTab: 'sets'
		};
	},

	componentDidMount: function() {
		$('#seach').click();
		
		$('.results-filter').click(function(e){
			// e.stopPropagation();
			var scrollOffset = -$('header').height()*0.875*2;
			var type = $(this).attr('data-type');
		// 	//TODO make divider move when scrolling using react motion

			//search results scroll handlers
			if($(this).is('.sets')) {
				// $('.view-title-container .divider').animate({
				// 	left: '0'
				// }, 200);
				$(window).scrollTo($('.header-small.sets'), 200, {
					offset: scrollOffset
				});
			} else if($(this).is('.events')) {
				// $('.view-title-container .divider').animate({
				// 	left: '33%'
				// }, 200);
				$(window).scrollTo($('.header-small.events'), 200, {
					offset: scrollOffset
				});
			} else if($(this).is('.tracks')) {
				// $('.view-title-container .divider').animate({
				// 	left: '66%'
				// }, 200);
				$(window).scrollTo($('.header-small.tracks'), 200, {
					offset: scrollOffset
				});
			}
		});

		//TODO clear search results view on search click/empty input bar
		//line 2173 in master-original
	},

	componentWillUnmount() {
		$('#search').val('');
	},

	render() {
		var searchResults = this.props.appState.get('searchResults');
		var loginStatus = this.props.appState.get('isUserLoggedIn');
		var user = this.props.appState.get('user');

		var setClass = 'flex-row results sets';
		var eventClass = 'flex-row results events';
		var trackClass = 'flex-row results tracks';

		return (
			<div id='SearchResultsView' className='view overlay-container'>
				<div className='flex-row view-title-container search'>
					<div className='view-title sets results-filter flex set-flex' data-type='sets'>
						<div className='center'>SETS</div>
					</div>
					<div className='view-title events results-filter flex set-flex' data-type='events'>
						<div className='center'>EVENTS</div>
					</div>
					<div className='view-title tracks results-filter flex set-flex' data-type='tracks'>
							<div className='center'>TRACKS</div>
					</div>
					<div className='divider hidden'/>
				</div>
				<Loader loaded={this.props.appState.get('loaded')}>
					<div className='results-container flex-column'>
						<div className='header-small sets'>SETS</div>
						<SetContainer
							sets={searchResults.sets}
							push={this.props.push}
							loginStatus={loginStatus}
							user={user}
							containerClass={setClass}
						/>
						<div className='header-small events'>EVENTS</div>
						<EventContainer
							events={searchResults.upcomingEvents}
							push={this.props.push}
							containerClass={eventClass}
						/>
						<div className='header-small tracks'>TRACKS</div>
						<TrackContainer
							tracks={searchResults.tracks}
							push={this.props.push}
							containerClass={trackClass}
						/>
					</div>
				</Loader>
			</div>
		);
	}
});

module.exports = SearchResultsView;