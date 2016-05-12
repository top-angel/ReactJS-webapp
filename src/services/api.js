import {API_ROOT} from '../constants/constants';

module.exports = {
	get(route) {
		return (
			fetch(API_ROOT+route)
				.then(res => res.json())
				.then(res => {
					if(res.status === 'success') {
						return res.payload;
					} else {
						console.error('API call failed');
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
			.then(res => {
				if(res.status === 'success') {
					return res.payload;
				} else {
					console.error('API call failed');
				}
			})
			.catch(err => console.error(err))
		)
	},
	graph(query) {
        console.log("graphql request");
        console.log('==query==');
        console.log(query);

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
			.catch(err => console.error(err))
		)
	}
};
