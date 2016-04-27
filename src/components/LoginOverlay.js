import React, {PropTypes} from 'react';
import {Motion, spring, presets} from 'react-motion';
import {login} from '../services/loginService';
import Icon from './FaIcon';
import Modal from './Modal';
import Button from './Button';

const margin = {
    marginRight: '2rem'
};

export default function LoginOverlay({open, style}, {push}) {
    const handleLogin = () => {
        login(push);
        push({ showLogin: false });
    }
    return (
        <Modal open={open}>
            <div className='LoginOverlay flex-column'>
                <h5>Create an account & enjoy these awesome features</h5>
                <ul>
                    <li className='flex-row'>
                        <Icon fixed style={margin}>star-o</Icon>
                        <p>Save your favorite sets for easy listening</p>
                    </li>
                    <li className='flex-row'>
                        <Icon fixed style={margin}>unlock-alt</Icon>
                        <p>Unlock exclusive music at beacon locations</p>
                    </li>
                    <li className='flex-row'>
                        <Icon fixed style={margin}>thumbs-up</Icon>
                        <p>Recommended sets & events from your favorite artists</p>
                    </li>
                </ul>
                <footer>
                    <Button 
                        className='facebook'
                        solid
                        icon='social-facebook'
                        onClick={handleLogin}
                    >
                        Sign Up With Facebook
                    </Button>
                    <Button 
                        className='nope' 
                        solid 
                        onClick={() => push({ showLogin: false })}
                    >
                        No Thanks
                    </Button>
                </footer>
            </div>
        </Modal>
    );
}

LoginOverlay.contextTypes = {
    push: PropTypes.func
};

LoginOverlay.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
};