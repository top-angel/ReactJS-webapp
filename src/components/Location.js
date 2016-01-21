import React from 'react';
import Geosuggest from 'react-geosuggest';
import {Link} from 'react-router';
import {API_ROOT} from '../constants/constants';
import history from '../services/history';

const Location = React.createClass({

	contextTypes: {
		push: React.PropTypes.func
	},

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(this.getDefaultCoordinates);
		this.getClosestEvents();
	},

	getInitialState() {
		return {
			location: {
				label: 'DEFAULT LOCATION',
				location: {
					lat: 29.652175,
					lng: -82.325856
				}
			}
		}
	},

	getDefaultCoordinates(location) {
		var coordinates = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			time: location.coords.timestamp
		};

		console.log(coordinates)

		// set state of location?
		// this.setState({
		// 	location: {
		// 		label: 'USER LOCATION',
		// 		location: {
		// 			lat: coordinates.latitude,
		// 			lng: coordinates.longitude
		// 		}
		// 	}
		// });
	},

	getClosestEvents() {
		var push = this.context.push;
		// var location = this.props.appState.get('location');
		var location = this.state.location
		console.log(location);

		var coordinates = location.location;
		console.log(coordinates);

		$.ajax({
			url: `${API_ROOT}events/upcoming`,
			type: 'get',
			data: {
				latitude: coordinates.lat,
				longitude: coordinates.lng
			}
		}).done(res => {
			if(res.status === 'success') {
				push({
					type: 'SHALLOW_MERGE',
					data: {
						closestEvents: res.payload.upcoming
					}
				});
			} else {
				console.log('Could not load events');
			}
		})
	},

	onSuggestSelect(suggest) {
		this.context.push({
			type: 'SHALLOW_MERGE',
			data: {
				location: suggest
			}
		});

		this.getClosestEvents();
		history.pushState(null, '/events/closest');
		mixpanel.track("Event Search Active", {
			"search": suggest
		});
	},

	render() {
		// var defaultLocation = this.props.appState.get('location');
		var location = this.state.location
		return (
			<div id='LocationModule' className='flex-row flex-zero'>
				<Link className='flex click' to='/events' onlyActiveOnIndex={true} activeClassName='active'>Upcoming</Link>
				<Link className='flex click' to='/events/closest' activeClassName='active'>Around</Link>
				<div className='buffer-lg'/>
				<i className='flex fa fa-map-marker'/>
				<Geosuggest
					className='flex'
					location={new google.maps.LatLng(location.latitude, location.longitude)}
					radius={25}
					onSuggestSelect={this.onSuggestSelect} />
			</div>
		);
	}

});

export default Location;