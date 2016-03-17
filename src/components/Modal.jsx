import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import Base from './Base';

const {bool, object, func, string, node} = PropTypes;

const propTypes = {
	// modal contents. must be a single node
	children: node.isRequired,
	// show/hide the modal
	open: bool.isRequired,
	// instance-specific styling
	style: object,
	// modal width
	width: string
};

const defaultProps = {
	width: '420px'
};

const contextTypes = {
	push: func
};

const Modal = ({open, width, style, children}, {push}) => {
	const top = open ? 0 : -100;
	const motionStyle = {
		yShift: spring(top, presets.gentle)
	};

	return (
		<Motion style={motionStyle}>
			{
				({yShift}) => (
					<div className='Modal' style={Object.assign({}, style, {
						top: `${yShift}vh`
					})}>
						<section className='flex-column'>
							{children}
						</section>
					</div>
				)
			}
		</Motion>
	);
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.contextTypes = contextTypes;

export default Modal;