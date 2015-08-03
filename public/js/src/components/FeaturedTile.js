var React = require('react')

var FeaturedTile = React.createClass({
	handleMouseOver: function(){
		console.log('mouseOver');
		$('.featured-info', '.featured-tile').addClass('slideInUp');
	},
	handleMouseOut: function(){
		$('.featured-info', '.featured-tile').removeClass('slideInUp');
		console.log('mouseOut');
	},
	render: function() {
		return (
			<div className="flex-column flex featured-tile event overlay-container click view-trigger" onClick={this.handleMouseOver}>
			    <div className="overlay"></div>
			    <div className="flex-column featured-info animated">
			        <div className="event-name">{this.props.event.event}</div>
			        <div className="event-date">{this.props.event.start_date}</div>
			        <div className="featured-type">{this.props.event.type}</div>
			    </div>
			</div>
		);
	}
});

module.exports = FeaturedTile