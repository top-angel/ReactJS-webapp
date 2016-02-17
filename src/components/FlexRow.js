import React, {PropTypes} from 'react'

function FlexRow(props) {
	let wrap, reverse, center, size
	switch(true) {
		case props.wrap:
			wrap = 'wrap'
		case props.reverse:
			reverse = 'reverse'
		case props.center:
			center = 'align'
	}

	switch(props.size) {
		case 1:
			size = 'flex'
		case 2:
			size = 'flex-2x'
		case 3:
			size = 'flex-3x'
		case 4:
			size = 'flex-4x'
		case 5:
			size = 'flex-5x'
	}
	return (
		<div className={`flex-row ${wrap} ${reverse} ${center} ${size}`} style={props.style}>
			{props.children}
		</div>
	)
}

FlexRow.defaultProps = {
	wrap: true
}

FlexRow.propTypes = {
	fixed: PropTypes.bool,
	wrap: PropTypes.bool,
	reverse: PropTypes.bool,
	around: PropTypes.bool,
	style: PropTypes.object
}

export default FlexRow