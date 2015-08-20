var React = require('react');
var SetTile = require('./SetTile')

var SetContainer = React.createClass({

	render: function() {
		return (
			<div className='results-container flex-row flex'>
				{
					this.props.data.map(function(set) {
						return(<SetTile data={set} key={set.id}/>)
					})
				}
			</div>
		);
	}

});

module.exports = SetContainer;