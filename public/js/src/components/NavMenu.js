var React = require('react');

var NavMenu = React.createClass({

	getInitialState: function() {
		return {
			focused: 0,
			hidden: true
		};
	},
	clicked: function(index) {
		this.setState({
			focused: index 
		});
	},
	render: function() {
		if(this.state.hidden) {
			var style = {
				display: 'none'
			};
		} else {
			var style = undefined;
		}
		return (
			<div id="nav-menu" className='flex-column' style={style}>
				{this.props.items.map(function(m, index){
					return <div className='nav-list-item click flex flex-row' onClick={this.clicked.bind(this, index)}>{m}</div>
				})}
			</div>
		);
	}

});

module.exports = NavMenu;