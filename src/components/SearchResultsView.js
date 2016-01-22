import React from 'react'
import ArtistTileContainer from './ArtistTileContainer'
import SetContainer from './SetContainer'
import EventContainer from './EventContainer'
import TrackContainer from './TrackContainer'

export default class SearchResultsView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 'artists'
		}
	}
	componentDidMount() {
		var self = this
		$('.results-filter').click(function(e) {
			var scrollOffset = -$('header').height()*0.875*2
			var type = $(this).attr('data-type')
			//TODO make divider move when scrolling using react motion
			if($(this).is('.sets')) {
				self.setState({
					active: 'sets'
				})
				$(window).scrollTo($('.header-small.sets'), 200, {
					offset: scrollOffset
				})
			} else if($(this).is('.events')) {
				self.setState({
					active: 'events'
				})
				$(window).scrollTo($('.header-small.events'), 200, {
					offset: scrollOffset
				})
			} else if($(this).is('.tracks')) {
				self.setState({
					active: 'tracks'
				})
				$(window).scrollTo($('.header-small.tracks'), 200, {
					offset: scrollOffset
				})
			} else if($(this).is('.artists')) {
				self.setState({
					active: 'artists'
				})
				$(window).scrollTo($('.header-small.artists'), 200, {
					offset: scrollOffset
				})
			}
			// switch(true) {
			// 	case $(this).is('.artists'):
			// 		break
			// 	case $(this).is('.sets'):
			// 		break
			// 	case $(this).is('.events'):
			// 		break
			// 	case $(this).is('.tracks'):
			// 		break
			// }
		})
	}
	componentWillUnmount() {
		$('#search').val('')
		this.context.push({
			type: 'SHALLOW_MERGE',
			data: {
				searchResults: {
					sets: [],
					upcomingEvents: [],
					tracks: []
				}
			}
		})
	}
	render() {
		var searchResults = this.props.appState.get('searchResults')
		var {artists, sets, upcomingEvents, tracks} = searchResults

		var setClass = 'flex-row results sets'
		var eventClass = 'flex-row results events'
		var trackClass = 'flex-row results tracks'

		return (
			<div id='SearchResultsView' className='view overlay-container'>
				<div className='flex-row view-title-container search'>
					<div className={this.state.active == 'artists' ? 'view-title artists results-filter flex flex-container active':'view-title artists results-filter flex flex-container'}  data-type='artists'>
						<div className='center'>ARTISTS</div>
					</div>
					<div className={this.state.active == 'sets' ? 'view-title sets results-filter flex flex-container active':'view-title sets results-filter flex flex-container'}  data-type='sets'>
						<div className='center'>SETS</div>
					</div>
					<div className={this.state.active == 'events' ? 'view-title events results-filter flex flex-container active':'view-title events results-filter flex flex-container'} data-type='events'>
						<div className='center'>EVENTS</div>
					</div>
					<div className={this.state.active == 'tracks' ? 'view-title tracks results-filter flex flex-container active':'view-title tracks results-filter flex flex-container'} data-type='tracks'>
							<div className='center'>TRACKS</div>
					</div>
				</div>
				<div className='results-container flex-column'>
					<div className='header-small artists'>ARTISTS</div>
					<ArtistTileContainer artists={artists} />
					<div className='header-small sets'>SETS</div>
					<SetContainer
						sets={sets}
						className={setClass} />
					<div className='header-small events'>EVENTS</div>
					<EventContainer
						events={upcomingEvents}
						className={eventClass} />
					<div className='header-small tracks'>TRACKS</div>
					<TrackContainer
						tracks={tracks}
						className={trackClass} />
				</div>
			</div>
		)
	}
}

SearchResultsView.contextTypes = {
	push: React.PropTypes.func
}