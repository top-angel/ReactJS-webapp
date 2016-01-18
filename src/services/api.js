import {API_ROOT} from '../constants/constants'

module.exports = {
	get(route) {
		return (
			fetch(API_ROOT+route)
				.then(res => res.json())
				.then(json => json)
				.then(res => {
					if(res.status === 'success') {
						return res.payload
					} else {
						console.error('API call failed')
					}
				})
				.catch(err => console.error(err))
		)
	},
	post(route, data) {
		return (
			fetch(API_ROOT+route, {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(json => json)
			.then(res => {
				if(res.status === 'success') {
					return res.payload
				} else {
					console.error('API call failed')
				}
			})
			.catch(err => console.error(err))
		)
	},
	graph(query) {
		return (
			fetch(`${API_ROOT}graphql`, {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(query)
			})
			.then(res => res.json())
			.then(json => json)
			.catch(err => console.error(err))
		)
	}
}