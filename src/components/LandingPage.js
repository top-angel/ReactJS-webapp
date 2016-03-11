import React, {PropTypes} from 'react';
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
		this.context.router.push('/home');
	}
	render() {
		return (
			<div id='LandingPage'>
				
			</div>
		);
	}
}

LandingPage.contextTypes = {
	router: PropTypes.object.isRequired
}

export default LandingPage;