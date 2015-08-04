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
	            <MenuController onClick={this.toggleMenu} />
	            <i className="nav-button fa icon-setmine fa-2x click center" title="Setmine Home"></i>
	            <Buffer/>
	            <SearchBar onClick={this.toggleSearch} />
	            <Buffer/>
	            <LoginButton />
	        </header>
		);
	}
});

module.exports = Header;