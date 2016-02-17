import React from 'react';
import history from '../services/history';
// import LandingHome from './LandingHome';
// import LandingApp from './LandingApp';
// import LandingBeacon from './LandingBeacon';
// import Footer from './Footer';

// const LandingPage = (props) => {
// 	return (
// 		<div id='LandingPage'>
			
// 		</div>
// 	);
// }
class LandingPage extends React.Component {
	componentWillMount() {
		history.pushState(null, '/home');
	}
	render() {
		return (
			<div id='LandingPage'>
				
			</div>
		);
	}
}

export default LandingPage;