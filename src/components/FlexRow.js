import React, {PropTypes} from 'react'
import CssModules from 'react-css-modules'
import styles from '../../public/css/FlexRow.css'

function FlexRow(props) {
	// return (
	// 	<div styleName='flex-row' className={props.style}>
	// 		{props.children}
	// 	</div>
	// )

	// TODO
		// filter through props & create string with classNames
	let fixed, wrap, reverse
	switch(true) {
		case props.fixed:
			fixed = 'fixed'
		case props.wrap:
			wrap = 'wrap'
		case props.reverse:
			reverse = 'reverse'
	}
	return (
		<div className={`flex-row ${fixed} ${wrap} ${reverse}`}>
			{props.children}
		</div>
	)
}

FlexRow.propTypes = {
	fixed: PropTypes.bool,
	wrap: PropTypes.bool,
	reverse: PropTypes.bool,
	around: PropTypes.bool
}

export default CssModules(FlexRow, styles)