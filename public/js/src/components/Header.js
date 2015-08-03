var React = require('react');
var SearchBar = require('./SearchBar');
var LoginButton = require('./LoginButton');

var Header = React.createClass({

	render: function() {
		return (
			<header className="flex-row flex-zero">
	            <i className="nav-button fa fa-bars click center nav-toggle"></i>
	            <i className="nav-button fa icon-setmine fa-2x click center" title="Setmine Home"></i>
	            <SearchBar />
	            <LoginButton />
	        </header>
		);
	}

});

module.exports = Header;