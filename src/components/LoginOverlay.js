import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import {login} from '../services/loginService';
import Icon from './FaIcon';
import Base from './Base';

const margin = {
	marginRight: '2rem'
};

const LoginOverlay = ({style, visible, close}, {push}) => {
	let visibility = visible ? 'visible' : 'hidden';
	function handleLogin() {
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
							<button className='facebook'>
								<Icon size={18} style={{marginRight: '1rem'}}>facebook</Icon>
								<p onClick={handleLogin}>Sign Up</p>
							</button>
							<button className='nope' style={{marginRight: '1rem'}}>
								<p onClick={() => push({ showLogin: false })}>No thanks</p>
							</button>
						</footer>
					</section>
				</div>
			}
		</Motion>
	);
}

// class LoginOverlay extends Base {
// 	constructor(props) {

// 	}
// }

LoginOverlay.contextTypes = {
	push: PropTypes.func
}

LoginOverlay.propTypes = {
	// style: PropTypes.object.isRequired,
	visible: PropTypes.bool,
	close: PropTypes.func
}

export default LoginOverlay;