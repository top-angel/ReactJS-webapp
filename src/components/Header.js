import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import SearchBar from './SearchBar';
import Avatar from './Avatar';

const Header = ({currentPage}, {push, loginStatus}) => {
	return (
		<nav id='Header' className='flex-row'>
			<Link to='/' className='icon-setmine' />
			<div className='flex-fixed' style={{ margin: '0 3rem' }}>
				<h4 onClick={() => push({ loginStatus: true })}>{currentPage}</h4>
			</div>
			<SearchBar />
			<Avatar />
		</nav>
	)
}

Header.contextTypes = {
	push: PropTypes.func,
	loginStatus: PropTypes.bool
};

Header.propTypes = {
	currentPage: PropTypes.string.isRequired
};

export default Header;