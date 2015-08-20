var React = require('react');
var SearchBar = require('./SearchBar');
var LoginButton = require('./LoginButton');

var viewStream = require('../streams/viewStream');

var Header = React.createClass({
	getInitialState: function() {
		return {
			searchActive: false 
		};
	},
	componentDidMount: function() {
		this._attachStream();
	},
	_attachStream: function() {
		var _this = this;
	},
	render: function() {
		return (
			<header className="flex-row flex-zero">
          <i className="nav-button fa icon-setmine fa-2x click center" title="Setmine Home"></i>
          <div className='nav-button click center flex' onClick={undefined}>Home</div>
          <div className='nav-button click center flex' onClick={undefined}>Featured</div>
          <div className='nav-button click center flex' onClick={undefined}>Artists</div>
          <div className='nav-button click center flex' onClick={undefined}>Festivals</div>
          <div className='nav-button click center flex' onClick={undefined}>Mixes</div>
          <SearchBar searchInput={this.props.searchInput} onClick={this.toggleSearch} />
          <LoginButton />
      </header>
		);
	}
});

module.exports = {
	Header: Header,
	viewStream: viewStream
};