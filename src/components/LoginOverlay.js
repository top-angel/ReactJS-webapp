import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import {login} from '../services/loginService';
import Icon from './FaIcon';
import Base from './Base';

const margin = {
	marginRight: '2rem'
};

// class LoginOverlay extends Base {
// 	constructor(props) {
// 		super(props);
// 		this.autoBind('handleLogin', 'close');
// 	}
// 	close() {
// 		console.log('closing login overlay');
// 		const {push} = this.context;
// 		push({ showLogin: false });
// 	}
// 	handleLogin() {
// 		const {push} = this.context;
// 		login(push);
// 		push({ showLogin: false });
// 	}
// 	render() {
// 		const {style, visible} = this.props;
// 		const {push} = this.context;
// 		let visibility = visible ? 'visible' : 'hidden';

// 		return (
// 			<Motion style={style}>
// 				{
// 					({y, o}) =>
// 					<div id='LoginOverlay' style={{ visibility: visibility }}>
// 						<section className='flex-column' style={{
// 							top: `${y}vh`
// 						}}>
// 							<h5>Create an account & enjoy these awesome features</h5>
// 							<ul>
// 								<li className='flex-row'>
// 									<Icon fixed style={margin}>star-o</Icon>
// 									<p>Save your favorite sets for easy listening</p>
// 								</li>
// 								<li className='flex-row'>
// 									<Icon fixed style={margin}>unlock-alt</Icon>
// 									<p>Unlock exclusive music at beacon locations</p>
// 								</li>
// 								<li className='flex-row'>
// 									<Icon fixed style={margin}>thumbs-up</Icon>
// 									<p>Recommended sets & events from your favorite artists</p>
// 								</li>
// 							</ul>
// 							<footer>
// 								<button className='facebook'  onClick={this.handleLogin}>
// 									<Icon size={18} style={{marginRight: '1rem'}}>facebook</Icon>
// 									<p>Sign Up</p>
// 								</button>
// 								<button className='nope' style={{marginRight: '1rem'}} onClick={this.close}>
// 									<p>No thanks</p>
// 								</button>
// 							</footer>
// 						</section>
// 					</div>
// 				}
// 			</Motion>
// 		);
// 	}
// }

const LoginOverlay = ({visible, style}, {push}) => {
	let visibility = visible ? 'visible' : 'hidden';
	const handleLogin = () => {
		login(push);
		push({ showLogin: false });
	}
	return (
		<Motion style={style}>
			{
				({y, o}) =>
				<div id='LoginOverlay' style={{ visibility: visibility }}>
					<section className='flex-column' style={{
						top: `${y}vh`
					}}>
						<h5>Create an account & enjoy these awesome features</h5>
						<ul>
							<li className='flex-row'>
								<Icon fixed style={margin}>star-o</Icon>
								<p>Save your favorite sets for easy listening</p>
							</li>
							<li className='flex-row'>
								<Icon fixed style={margin}>unlock-alt</Icon>
								<p>Unlock exclusive music at beacon locations</p>
							</li>
							<li className='flex-row'>
								<Icon fixed style={margin}>thumbs-up</Icon>
								<p>Recommended sets & events from your favorite artists</p>
							</li>
						</ul>
						<footer>
							<button className='facebook'  onClick={handleLogin}>
								<Icon size={18} style={{marginRight: '1rem'}}>facebook</Icon>
								<p>Sign Up</p>
							</button>
							<button className='nope' style={{marginRight: '1rem'}} onClick={() => push({ showLogin: false })}>
								<p>No thanks</p>
							</button>
						</footer>
					</section>
				</div>
			}
		</Motion>
	);
}

LoginOverlay.contextTypes = {
	push: PropTypes.func
};

LoginOverlay.propTypes = {
	// style: PropTypes.object.isRequired,
	visible: PropTypes.bool,
	close: PropTypes.func
};

export default LoginOverlay;