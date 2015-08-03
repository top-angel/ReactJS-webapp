var React = require('react');

var LinkButton = React.createClass({

	render: function() {
		return (
			<a href={this.props.url}><i className={'fa fa-fw fa-2x click fa-'+this.props.type}></i></a>
		);
	}

});

module.exports = LinkButton;