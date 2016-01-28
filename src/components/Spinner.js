import React from 'react'
import BaseComponent from './BaseComponent'
import CssModules from 'react-css-modules'
import styles from '../../public/css/spinner.css'

const Spinner = props => (
	<div styleName='container'>
		<div styleName='spinner'>
			<div styleName='rect1' />
			<div styleName='rect2' />
			<div styleName='rect3' />
			<div styleName='rect4' />
			<div styleName='rect5' />
		</div>
	</div>
)

export default CssModules(Spinner, styles)