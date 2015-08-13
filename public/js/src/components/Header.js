var React = require('react');
var MenuController = require('./MenuController');
var SearchBar = require('./SearchBar');
var LoginButton = require('./LoginButton');
var MenuController = require('./MenuController');
var Buffer = require('./Buffer');

var Header = React.createClass({

	getInitialState: function() {
		return {
			menuActive: false,
			searchActive: false 
		};
	},
	toggleMenu: function() {
		this.setState({
			menuActive: true 
		});
	},
	toggleSearch: function() {
		this.setState({
			searchActive: true 
		});
	},
	render: function() {
		return (
			<header className="flex-row flex-zero">
	            <i className="nav-button fa icon-setmine fa-2x click center" title="Setmine Home"></i>
	            <div className='nav-button click center flex' onChange={undefined}>Home</div>
	            <div className='nav-button click center flex' onChange={undefined}>Featured</div>
	            <div className='nav-button click center flex' onChange={undefined}>Artists</div>
	            <div className='nav-button click center flex' onChange={undefined}>Festivals</div>
	            <div className='nav-button click center flex' onChange={undefined}>Mixes</div>
	            <SearchBar searchInput={this.props.searchInput} onClick={this.toggleSearch} />
	            <LoginButton />
	        </header>
		);
	}
});

module.exports = Header;