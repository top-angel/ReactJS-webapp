import React from 'react'
import { Link } from 'react-router';
import SearchBar from './SearchBar';

var Header = React.createClass({

	render() {
		return (
			<header className='flex-row'>
				<Link className='nav-button fa icon-setmine click center' to='/' onlyActiveOnIndex={true} />
				<Link className='nav-button click flex flex-container' to='/user' activeClassName='active'>
					<div className='center'>Home</div>
				</Link>
				<Link className='nav-button click flex flex-container' to='/sets' activeClassName='active'>
					<div className='center'>Sets</div>
				</Link>
				<Link className='nav-button click flex flex-container' to='/events' activeClassName='active'>
					<div className='center'>Events</div>
				</Link>
				<Link className='nav-button click flex flex-container' to='/artists' activeClassName='active'>
					<div className='center'>Artists</div>
				</Link>
				{/*<Link className='nav-button click flex flex-container' to='/blog' activeClassName='active'>
					<div className='center'>Blog</div>
				</Link>*/}
				<div className='buffer-4x'/>
				<div className='search-bar flex-row flex-3x'>
					<SearchBar push={this.props.push} appState={this.props.appState}/>
				</div>
			</header>
		);
	}
});

export default Header;