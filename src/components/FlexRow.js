import React from 'react'
import CssModules from 'react-css-modules'
import styles from '../../public/css/Row.css'

function FlexRow(props) {

	return (
		<div styleName='flex-row' className={props.style} >
			{props.children}
		</div>
	)
}

export default CssModules(FlexRow, styles)