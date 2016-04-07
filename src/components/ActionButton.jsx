import React from 'react';
import Link from 'react-router/lib/Link';
import Ink from 'react-ink';

const ActionButton = ({to, children}) => (
    <div id='ActionButton'>
        <Link to={to}>
            <p>{children}</p>
        </Link>
        <Ink/>
    </div>
);

export default ActionButton;