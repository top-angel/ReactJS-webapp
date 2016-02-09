import React, {PropTypes} from 'react'

const Icon = props => {
	// sets icons at fixed width
	let fixed = props.fixed ? 'fa-fw' : undefined
	let size = props.size || 24

	return (
		<i className={`fa fa-${props.children} ${fixed}`} style={{ fontSize: size }}/>
	)
}

Icon.propTypes = {
	size: PropTypes.oneOf([14, 18, 24, 36, 48]),
	children: PropTypes.string.isRequired
}

export default Icon