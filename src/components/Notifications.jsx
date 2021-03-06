import React, {PropTypes} from 'react';
import Base from './Base';
import SnackBar from 'material-ui/lib/snackbar';

export default class Notifications extends Base {
	constructor(props) {
		super(props);
		this.autoBind('closeSnackBar');
	}
	closeSnackBar() {
		this.context.push({
			snackbar: {
				open: false,
				message: undefined
			}
		});
	}
	render() {
		let snackbarStyle = {
			bottom: this.props.playerHidden ? 0 : 64,
		};
		
		return (
			<div id='Notifications'>
				<SnackBar
					open={this.props.snackbar.open}
					message={this.props.snackbar.message}
					onRequestClose={this.closeSnackBar}
					autoHideDuration={2000}
					className='snackbar'
					style={snackbarStyle} />
			</div>
		);
	}
}

Notifications.contextTypes = {
	push: PropTypes.func
};

Notifications.propTypes = {
	snackbar: PropTypes.object,
	modal: PropTypes.bool,
	playerHidden: PropTypes.bool
};