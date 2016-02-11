import React, {PropTypes} from 'react';

import Base from './Base';
import SearchTabs from './SearchTabs';
import ArtistTileContainer from './ArtistTileContainer';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import TrackContainer from './TrackContainer';
import Tab from './Tab';

export default class SearchResults extends Base {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Search Results' });
	}
	// componentDidMount() {
	// 	let self = this
	// 	$('.results-filter').click(function(e) {
	// 		let scrollOffset = -$('header').height()*0.875*2
	// 		let type = $(this).attr('data-type')
	// 		//TODO make divider move when scrolling using react motion
	// 		if($(this).is('.sets')) {
	// 			self.setState({
	// 				active: 'sets'
	// 			})
	// 			$(window).scrollTo($('.header-small.sets'), 200, {
	// 				offset: scrollOffset
	// 			})
	// 		} else if($(this).is('.events')) {
	// 			self.setState({
	// 				active: 'events'
	// 			})
	// 			$(window).scrollTo($('.header-small.events'), 200, {
	// 				offset: scrollOffset
	// 			})
	// 		} else if($(this).is('.tracks')) {
	// 			self.setState({
	// 				active: 'tracks'
	// 			})
	// 			$(window).scrollTo($('.header-small.tracks'), 200, {
	// 				offset: scrollOffset
	// 			})
	// 		} else if($(this).is('.artists')) {
	// 			self.setState({
	// 				active: 'artists'
	// 			})
	// 			$(window).scrollTo($('.header-small.artists'), 200, {
	// 				offset: scrollOffset
	// 			})
	// 		}
	// 		// switch(true) {
	// 		// 	case $(this).is('.artists'):
	// 		// 		break
	// 		// 	case $(this).is('.sets'):
	// 		// 		break
	// 		// 	case $(this).is('.events'):
	// 		// 		break
	// 		// 	case $(this).is('.tracks'):
	// 		// 		break
	// 		// }
	// 	})
	// }
	componentWillUnmount() {
		this.context.push({
			searchResults: {
				sets: [],
				upcomingEvents: [],
				tracks: []
			}
		})
	}
	render() {
		let searchResults = this.props.appState.get('searchResults');
		let {
			artists, 
			sets, 
			upcomingEvents, 
			tracks} = searchResults;

		return (
			<div className='view flex-column'>
				<SearchTabs>
					<Tab>ARTISTS</Tab>
					<Tab>SETS</Tab>
					<Tab>EVENTS</Tab>
					<Tab>TRACKS</Tab>
				</SearchTabs>
				<ArtistTileContainer artists={artists} />
				<SetContainer sets={sets} />
				<EventContainer events={upcomingEvents} />
				<TrackContainer tracks={tracks} />
			</div>
		);
	}
	// render() {
	// 	let searchResults = this.props.appState.get('searchResults');
	// 	let {artists, sets, upcomingEvents, tracks} = searchResults;

	// 	let setClass = 'flex-row results sets';
	// 	let eventClass = 'flex-row results events';
	// 	let trackClass = 'flex-row results tracks';

	// 	return (
	// 		<div id='SearchResultsView' className='view overlay-container'>
	// 			<div className='flex-row view-title-container search'>
	// 				<div className={this.state.active == 'artists' ? 'view-title artists results-filter flex flex-container active':'view-title artists results-filter flex flex-container'}  data-type='artists'>
	// 					<div className='center'>ARTISTS</div>
	// 				</div>
	// 				<div className={this.state.active == 'sets' ? 'view-title sets results-filter flex flex-container active':'view-title sets results-filter flex flex-container'}  data-type='sets'>
	// 					<div className='center'>SETS</div>
	// 				</div>
	// 				<div className={this.state.active == 'events' ? 'view-title events results-filter flex flex-container active':'view-title events results-filter flex flex-container'} data-type='events'>
	// 					<div className='center'>EVENTS</div>
	// 				</div>
	// 				<div className={this.state.active == 'tracks' ? 'view-title tracks results-filter flex flex-container active':'view-title tracks results-filter flex flex-container'} data-type='tracks'>
	// 						<div className='center'>TRACKS</div>
	// 				</div>
	// 			</div>
	// 			<div className='results-container flex-column'>
	// 				<div className='header-small artists'>ARTISTS</div>
	// 				<ArtistTileContainer artists={artists} />
	// 				<div className='header-small sets'>SETS</div>
	// 				<SetContainer
	// 					sets={sets}
	// 					className={setClass} />
	// 				<div className='header-small events'>EVENTS</div>
	// 				<EventContainer
	// 					events={upcomingEvents}
	// 					className={eventClass} />
	// 				<div className='header-small tracks'>TRACKS</div>
	// 				<TrackContainer
	// 					tracks={tracks}
	// 					className={trackClass} />
	// 			</div>
	// 		</div>
	// 	);
	// }
}

SearchResults.contextTypes = {
	push: React.PropTypes.func
};