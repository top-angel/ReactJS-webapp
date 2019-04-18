import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';

import Base from './Base';
import Tabs from './Tabs';
import ArtistTileContainer from './ArtistTileContainer';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import TrackContainer from './TrackContainer';
import SearchTab from './SearchTab';

// import { Element, Events, animateScroll} from 'react-scroll';
// const scroll = animateScroll;
const scrollDuration = 200;

export default class SearchResults extends Base {
	constructor(props) {
		super(props);
		this.autoBind('handleSelect', 'onScroll', 'getNodeOffsets');
		this.state = {
			selectedIndex: null,
			// nodes: []
		};
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Search Results' });
	}
	componentDidMount() {
		// window.addEventListener('scroll', this.onScroll, false);
		// setTimeout(this.getNodeOffsets, 3000);

// 		Events.scrollEvent.register('begin', (to, element) => {
// 			console.log(to, element);
//             console.log('begin');
//         });
// 
//         Events.scrollEvent.register('end', () => {
//             console.log('end');
//         });
// 
//         scroll.scrollToTop();
	}
	componentWillReceiveProps(nextProps, nextState) {
		// if(nextProps.appState.get('searchResults') != this.props.appState.get('searchResults')) {
		// 	setTimeout(this.getNodeOffsets, 3000);
		// }
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
		this.context.push({
			searchResults: {
				sets: [],
				upcomingEvents: [],
				tracks: []
			}
		});
	}
	getNodeOffsets() {
		// let keys = R.keys(this.refs);
		// let nodes = keys.map((key, index) => {
		// 	let node = this.refs[key];
		// 	let nodePosition = node.offsetTop;
		// 	return {
		// 		node: keys[index],
		// 		position: nodePosition
		// 	};
		// });

		// this.setState({ nodes: nodes });
	}
	handleSelect(value, e, tab) {
		// let tabIndex = tab.props.tabIndex;
		// let nodes = this.state.nodes;
		// let scrollPosition = nodes[tabIndex].position;
		// window.scrollTo(0, scrollPosition);
	}
	onScroll() {
		// let keys = R.pluck('position', this.state.nodes);
		// let scroll = window.scrollY;
		// switch(true) {
		// 	case(scroll <= keys[0]):
		// 		// console.log('artists');
		// 		this.setState({ selectedIndex: 0 });
		// 		break;
		// 	case(scroll >= keys[1] && scroll < keys[2]):
		// 		// console.log('sets');
		// 		this.setState({ selectedIndex: 1 });
		// 		break;
		// 	case(scroll >= keys[2] && scroll < keys[3]):
		// 		// console.log('events');
		// 		this.setState({ selectedIndex: 2 });
		// 		break;
		// 	case(scroll >= keys[3]):
		// 		// console.log('tracks');
		// 		this.setState({ selectedIndex: 3 });
		// 		break;
		// }
	}
	render() {
		let searchResults = this.props.appState.get('searchResults');
		const {
			artists, 
			sets, 
			upcomingEvents, 
			tracks
		} = searchResults;

		return (
			<div className='SearchPage'>
				<Tabs>
					<SearchTab to='artists'>artists</SearchTab>
					<SearchTab to='sets'>sets</SearchTab>
					<SearchTab to='events'>events</SearchTab>
					<SearchTab to='tracks'>tracks</SearchTab>
				</Tabs>
				<div className='SearchPage__results'>
					{/* <Element name='artists'> */}
					{/* 	<h6 className='SearchPage__header'>ARTISTS</h6> */}
					{/* 	<ArtistTileContainer artists={artists} /> */}
					{/* </Element> */}
					{/* <Element name='sets'> */}
					{/* 	<h6 className='SearchPage__header'>SETS</h6> */}
					{/* 	<SetContainer sets={sets} /> */}
					{/* </Element> */}
					{/* <Element name='events'> */}
					{/* 	<h6 className='SearchPage__header'>EVENTS</h6> */}
					{/* 	<EventContainer events={upcomingEvents} /> */}
					{/* </Element> */}
					{/* <Element name='tracks'> */}
					{/* 	<h6 className='SearchPage__header'>TRACKS</h6> */}
					{/* 	<TrackContainer tracks={tracks} /> */}
					{/* </Element> */}
				</div>
			</div>
		);

		// return (
		// 	<div id='SearchResults' className='view'>
		// 		<Tabs selectedIndex={this.state.selectedIndex}>
		// 			<SearchTab onSelect={this.handleSelect}>ARTISTS</SearchTab>
		// 			<SearchTab onSelect={this.handleSelect}>SETS</SearchTab>
		// 			<SearchTab onSelect={this.handleSelect}>EVENTS</SearchTab>
		// 			<SearchTab onSelect={this.handleSelect}>TRACKS</SearchTab>
		// 		</Tabs>
		// 		<h6 ref='artists'>ARTISTS</h6>
		// 		<ArtistTileContainer artists={artists} />
		// 		<h6 ref='sets'>SETS</h6>
		// 		<SetContainer sets={sets} />
		// 		<h6 ref='events'>EVENTS</h6>
		// 		<EventContainer events={upcomingEvents} />
		// 		<h6 ref='tracks'>TRACKS</h6>
		// 		<TrackContainer tracks={tracks} />
		// 	</div>
		// );
	}
}

SearchResults.contextTypes = {
	push: React.PropTypes.func
};