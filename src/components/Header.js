import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import SearchBar from './SearchBar'

// const Header = () => {
// 	return (
// 		<header className='flex-row'>
// 			<Link className='nav-button fa icon-setmine click center' to='/' onlyActiveOnIndex={true} />
// 			<Link className='nav-button click flex flex-container' to='/user' activeClassName='active'>
// 				<div className='center'>Home</div>
// 			</Link>
// 			<Link className='nav-button click flex flex-container' to='/sets' activeClassName='active'>
// 				<div className='center'>Sets</div>
// 			</Link>
// 			<Link className='nav-button click flex flex-container' to='/events' activeClassName='active'>
// 				<div className='center'>Events</div>
// 			</Link>
// 			<Link className='nav-button click flex flex-container' to='/artists' activeClassName='active'>
// 				<div className='center'>Artists</div>
// 			</Link>
// 			{/*<Link className='nav-button click flex flex-container' to='/blog' activeClassName='active'>
// 				<div className='center'>Blog</div>
// 			</Link>*/}
// 			<div className='buffer-4x'/>
// 			<div className='flex-row flex-3x' style={{marginRight: '1vw'}}>
// 				<SearchBar/>
// 			</div>
// 		</header>
// 	)
// }

const Header = (props) => {
	return (
		<nav id='Header' className='flex-row'>
			<Link to='/' className='icon-setmine' onlyActiveOnIndex={true} />
			<div className='flex-fixed'>
				<h4>{props.currentPage}</h4>
			</div>
			<SearchBar />
		</nav>
	)
}

Header.propTypes = {
	currentPage: PropTypes.string.isRequired
}

export default Header