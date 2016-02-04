import React, {PropTypes} from 'react'

const Icon = props => {
	let size, fixed

	// dynamically change size
	switch(props.size) {
		case 18:
			size = 18; break;
		case 24:
			size = 24; break;
		case 36:
			size = 36; break;
		case 48:
			size = 48; break;
		default:
			size = 24; break;
	}

	// sets icons at fixed width
	fixed = props.fixed ? 'fa-fw' : undefined

	return (
		<i className={`fa fa-${props.children} ${fixed}`} style={{ fontSize: size }}/>
	)
}

Icon.propTypes = {
	size: PropTypes.oneOf([2, 3, 4, 5]),
	children: PropTypes.string.isRequired
}

export default Icon