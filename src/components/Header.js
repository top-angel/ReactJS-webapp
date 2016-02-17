import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Base from './Base';
import SearchBar from './SearchBar';
import IconMenu from './IconMenu';
import Icon from './FaIcon';
import LoginOverlay from './LoginOverlay';

export default class Header extends Base {
	constructor(props) {
		super(props);
		this.autoBind('toggleLogin');
	}
	toggleLogin() {
		this.context.push({ showLogin: !this.props.showLogin });
	}
	trackAndroid() {
		mixpanel.track("Android App Link Clicked");
	}
	trackIos() {
		mixpanel.track("iOS App Link Clicked");
	}
	render() {
		const {currentPage} = this.props;

		return (
			<nav id='Header' className='flex-row'>
				<Link to='/home' className='icon-setmine' />
				<div className='flex-fixed' style={{ margin: '0 3rem' }}>
					<h4>{currentPage}</h4>
				</div>
				<SearchBar />
				<IconMenu icon={<Icon>ellipsis-h</Icon>}>
					<Link to='/about'>
						<p>About</p>
					</Link>
					<a href='http://bit.ly/SetmineiOS' title='view on App Store' className='click'>
						<p>iOS</p>
					</a>
					<a href='http://bit.ly/SetmineAndroid' title='view on Google Play' className='click'>
						<p>Android</p>
					</a>
					{/*<Link to='/setstory'>
						<p>Setstory</p>
					</Link>*/}
					<Link to='/legal'>
						<p>DMCA Notice</p>
					</Link>
				</IconMenu>
				<Icon onClick={this.toggleLogin} style={{cursor: 'pointer'}}>user</Icon>
				{/*<IconMenu icon={<Icon>user</Icon>}>
					<p onClick={this.toggleLogin}>Login</p>
				</IconMenu>*/}
			</nav>
		);
	}
}

Header.contextTypes = {
	push: PropTypes.func,
	loginStatus: PropTypes.bool
};

Header.propTypes = {
	currentPage: PropTypes.string.isRequired
};

export default Header;