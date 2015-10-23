import React from 'react'
import { Link, History } from 'react-router';
import SearchBar from './SearchBar';

var Header = React.createClass({

	mixins: [History],

	render: function() {
		
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
	          <div className='buffer-4x'/>
	          <Link className='search-bar flex-row flex-3x' to='/search'>
			       <SearchBar push={this.props.push} appState={this.props.appState}/>
				</Link>
				
			</header>
		);
	}
});

module.exports = Header;