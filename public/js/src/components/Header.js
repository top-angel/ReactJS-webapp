var React = require('react');
var MenuController = require('./MenuController');
var SearchBar = require('./SearchBar');
var LoginButton = require('./LoginButton');

var Header = React.createClass({
	render: function() {
		return (
			<header className="flex-row flex-zero">
				<MenuController />
	            <i className="nav-button fa icon-setmine fa-2x click center flex-zero" title="Setmine Home"></i>
	            <Buffer/>
	            <SearchBar />
	            <Buffer/>
	            <LoginButton />
	        </header>
		);
	}
});

module.exports = Header;