var React = require('react');

var LandingSlideControls = React.createClass({

	getInitialState: function() {
		return {
			active: false,
			icon: "fa fa-fw click fa-circle-o"
		}
	},
	transitionSlide: function() {
		console.log('bruh');
	},
	activeSlide: function() {
		this.setState({
			active: !this.state.active,
			icon: this.state.active ? "fa fa-fw click fa-circle" : "fa fa-fw click fa-circle-o"
		});
	},
	render: function() {
		return (
			<div className="flex-row slide-controls">
				<i className={this.state.icon} onClick={this.activeSlide}></i>
				<i className={this.state.icon} onClick={this.activeSlide}></i>
				<i className={this.state.icon} onClick={this.activeSlide}></i>
				<i className={this.state.icon} onClick={this.activeSlide}></i>
            </div>
		);
	}

});

module.exports = LandingSlideControls;