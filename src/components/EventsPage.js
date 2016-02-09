import React, {PropTypes} from 'react';
import Loader from 'react-loader';

import Base from './Base';
import Tabs from './Tabs';
import FeaturedEvents from './FeaturedEvents';
import Location from './Location';
import EventContainer from './EventContainer';

import TrackTile from './TrackTile';

const tabs = [
	{
		text: 'UPCOMING',
		to: '/events',
		index: true
	},
	{
		text: 'NEAR YOU',
		to: '/events/closest',
		index: false
	},
	{
		text: 'FEATURED',
		to: '/events/featured',
		index: false
	}
];

export default class EventsPage extends Base {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.context.push({ currentPage: 'Events' });
	}
	componentDidMount() {
		// mixpanel.track("Events Page Open");
	}
	render() {
		return (
			<div className='view'>
				<Tabs tabs={tabs} />
				<Location appState={this.props.appState} />

				{/*<div className='tile-container'>
				{
					React.createElement(TrackTile, {
						songName: 'Miami 82 (Kygo Remix)',
						artistName: 'Syn Cole feat. Madame Buttons',
						trackName: 'Miami 82 (Kygo Remix)',
						id: 1903,
						songUrl: '8bf16c6bb2609bcbb7a00940d65038a9e992c98b.mp3',
						startTime: '01:11',
						setLength: '45:42',
						event: 'TomorrowWorld 2069',
						artist: 'Kygo',
						isRadiomix: 0,
						eventId: 116,
						bannerImage: '12141ddad8636c5804c86dc685550ee1.jpg',
						artistImage: 'small_a7f7aaec8ecd0cdec444b8abb06dbc66.jpg'
					})
				}
				</div>*/}
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState
					})
				}
			</div>
		);
	}
}

EventsPage.contextTypes = {
	push: PropTypes.func
};