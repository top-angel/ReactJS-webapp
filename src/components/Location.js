import React, {PropTypes} from 'react';
import Geosuggest from 'react-geosuggest';
import {Link} from 'react-router';
import api from '../services/api';
import Base from './Base';
import Icon from './FaIcon';

export default class Location extends Base {
	constructor(props) {
		super(props)
		this.autoBind('getCurrentPosition', 'getClosestEvents', 'onSuggestSelect')
		this.state = {
			lat: 25.7753,
			lng: -80.2089
		}
	}
	componentWillMount() {
		navigator.geolocation.getCurrentPosition(this.getCurrentPosition);
		this.getClosestEvents();
	}
	getCurrentPosition(location, callback) {
		this.setState({
			lat: location.coords.latitude,
			lng: location.coords.longitude
		});
	}
	getClosestEvents() {
		api.get(`events/upcoming?latitude=${this.state.lat}&longitude=${this.state.lng}`).then(res => {
			this.context.push({ closestEvents: res.upcoming });
		}).then(() => {
			this.props.onLoaded();
		});
	}
	onSuggestSelect(suggest) {
		// console.log('react geosuggest coordinates', suggest);
		this.setState({
			lat: suggest.location.lat,
			lng: suggest.location.lng
		});

		this.getClosestEvents();
		this.context.router.push('/events/closest');
	}
	render() {
		return (
			<div id='Location' className='flex-row'>
				<Icon size={24}>location-arrow</Icon>
				<Geosuggest
					ref='location'
					location={new google.maps.LatLng(this.state.lat, this.state.lng)}
					radius={25}
					onSuggestSelect={this.onSuggestSelect} />
			</div>
		);
	}
};

Location.contextTypes = {
	push: PropTypes.func,
	router: PropTypes.object.isRequired
};

Location.propTypes = {
	onLoaded: PropTypes.func.isRequired
};