import React from 'react';
import Link from 'react-router/lib/Link';

const ActionButton = ({to, children}) => (
    <div id='ActionButton'>
        <Link to={to}>
            <p>{children}</p>
        </Link>
    </div>
);

export default ActionButton;