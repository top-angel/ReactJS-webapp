var React = require('react');
var SearchBar = require('./SearchBar');
var LoginButton = require('./LoginButton');
var MenuController = requrie('./MenuController');

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
	}
	render: function() {
		return (
			<header className="flex-row flex-zero">
	            <MenuController onClick={this.toggleMenu} />
	            <i className="nav-button fa icon-setmine fa-2x click center" title="Setmine Home"></i>
	            <SearchBar onClick={this.toggleSearch} />
	            <LoginButton />
	        </header>
		);
	}

});

module.exports = Header;