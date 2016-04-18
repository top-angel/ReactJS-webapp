import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import Ink from 'react-ink';

const ActionButton = ({to, children}, {router}) => (
    <div id='ActionButton' onClick={() => setTimeout(() => router.push(to), 200)}>
        <p>{children}</p>
        <Ink/>
    </div>
);

ActionButton.contextTypes = {
    router: PropTypes.object
};

export default ActionButton;