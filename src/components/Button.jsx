import React, {PropTypes} from 'react';
import Ink from 'react-ink';
import classNames from 'classNames';
import Icon from './Icon';

const {func, string, bool, object} = PropTypes;

export default function Button({onClick, className, children, outline, icon, solid}, {router, push}) {
    const buttonClass = classNames('Button', className, {
        solid: solid,
        outline: outline
    });

    return (
        <div className={buttonClass} onClick={() => setTimeout(onClick, 100)}>
            {icon && <Icon style={{marginRight: '1rem' }}>{icon}</Icon>}
            <p>{children}</p>
            <Ink/>
        </div>
    );
}

Button.PropTypes = {
    onClick: func,
    className: string,
    // solid or outlined button
    outline: bool.isRequired,
    solid: bool.isRequired,
    // ionicons classname for adding an icon
    icon: string
}

Button.contextTypes = {
    router: object,
    push: func
};