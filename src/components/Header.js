var React = require('react');
var Navigation = require('react-router').Navigation;
var SearchBar = require('./SearchBar');
var LoginButton = require('./LoginButton');

var Header = React.createClass({
	mixins: [Navigation],
	componentDidMount: function() {
		this._attachStream();
	},
	_attachStream: function() {
		var _this = this;
	},
	render: function() {
		return (
			<header className="flex-row flex-zero">
	          <i className="nav-button fa icon-setmine fa-2x click center" 
	          	title="Setmine Home"
	          	onClick={() => this.transitionTo('landing')}>
          	</i>
	          <div className='nav-button click center flex' 
	          	onClick={() => this.transitionTo('user')}>Home</div>
	          <div className='nav-button click center flex' 
	          	onClick={() => this.transitionTo('featured')}>Featured</div>
	          <div className='nav-button click center flex' 
	          	onClick={() => this.transitionTo('browse')}>Artists</div>
	          <div className='nav-button click center flex' 
	          	onClick={() => this.transitionTo('browse')}>Festivals</div>
	          <div className='nav-button click center flex' 
	          	onClick={() => this.transitionTo('browse')}>Mixes</div>
	          <SearchBar searchInput={this.props.searchInput} onClick={this.toggleSearch} />
	          <LoginButton />
	      </header>
		);
	}
});

module.exports = Header;