import React from 'react'
import { Link, History } from 'react-router';
import SearchBar from './SearchBar';

var Header = React.createClass({

	mixins: [History],

	//TODO DELETE FOR SHIPMENT
	dank () {
		var id = 420;
		console.log('dank/10');
		this.history.pushState(null, 'sandbox/' + id);
	},

	render () {
		return (
			<header className="flex-row flex-zero">
          	<Link className='nav-button fa icon-setmine fa-2x click center' to='/' onlyActiveOnIndex={true} />
	          <Link className='nav-button click flex set-flex' to='/user' activeClassName='active'>
	          	<div className='center'>Home</div>
	          </Link>
	          <Link className='nav-button click flex set-flex' to='/sets' activeClassName='active'>
	          	<div className='center'>Sets</div>
	          </Link>
	          <Link className='nav-button click flex set-flex' to='/events' activeClassName='active'>
	          	<div className='center'>Events</div>
	          </Link>
	          <Link className='nav-button click flex set-flex' to='/artists' activeClassName='active'>
	          	<div className='center'>Artists</div>
	          </Link>
	          <div className='buffer-4x' onClick={this.dank} />
	          <Link className='search-bar flex-row flex-3x' to='/search'>
		          <SearchBar push={this.props.push} appState={this.props.appState}/>
		       </Link>   
	      </header>
		);
	}
});

module.exports = Header;