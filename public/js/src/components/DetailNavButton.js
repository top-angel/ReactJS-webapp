var React = require('react');

var DetailNavButton = React.createClass({

	render: function() {
		return (
			<div className={'center click flex-fixed '+this.props.title}>
				{this.props.title}
			</div>
		);
	}

});

module.exports = DetailNavButton;