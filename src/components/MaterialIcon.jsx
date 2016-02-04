import React, {PropTypes} from 'react'

const Icon = props => {
	let size

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
	}

	return <i className={`mdi mdi-${props.children}`} style={{ fontSize: size}}/>
}

Icon.propTypes = {
	size: PropTypes.oneOf([18, 24, 36, 48])
}

export default Icon