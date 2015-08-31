import React from 'react'
import { Link } from 'react-router';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';

var Header = React.createClass({
	render: function() {
		return (
			<header className="flex-row flex-zero">
          	<Link className='nav-button fa icon-setmine fa-2x click center' to='landing'/>
	          <Link className='nav-button click center flex set-flex' to='user'>
	          	<div className='center'>Home</div>
	          </Link>
	          <Link className='nav-button click center flex set-flex' to='sets'>
	          	<div className='center'>Sets</div>
	          </Link>
	          <Link className='nav-button click flex set-flex' to='events'>
	          	<div className='center'>Events</div>
	          </Link>
	          <Link className='nav-button click flex set-flex' to='artists'>
	          	<div className='center'>Artists</div>
	          </Link>
	          <div className='buffer-4x'/>
	          <Link className='search-bar flex-row flex-3x' to='search'>
		          <SearchBar push={this.props.push} appState={this.props.appState}/>
		       </Link>   
	          <LoginButton push={this.props.push} appState={this.props.appState}/>
	      </header>
		);
	}
});

module.exports = Header;