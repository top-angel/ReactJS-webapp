import React, {PropTypes} from 'react'
import Base from './Base'
import SnackBar from 'material-ui/lib/snackbar'

class Boof extends Base {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}
	render() {
		return (
			<Snackbar
				open={this.state.open}
				message={this.props.message}
				autoHideDuration={2000} />
		)
	}
}

const SnackBarNotification = (props, context) => (
	<SnackBar
		open={props.snackbar}
		message={props.message}
		onRequestClose={() => context.push({
			type: 'SHALLOW_MERGE',
			data: {
				snackbar: false
			}
		})}
		autoHideDuration={2000} />
)

SnackBarNotification.propTypes = {
	open: PropTypes.bool.isRequired,
	message: PropTypes.string
}
