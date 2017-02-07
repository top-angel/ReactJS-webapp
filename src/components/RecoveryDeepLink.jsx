import React, {PropTypes} from 'react';
import MobileDetect from 'mobile-detect';

import Base from './Base';
import Button from './Button';

export default class RecoveryDeepLink extends Base {
    constructor(props) {
        super(props);
        // this.autoBind();
        this.state = {
            deepLink: ''
        };
    }

    componentWillMount() {
        this.context.push({
            loginStatus: true
        });
        var md = new MobileDetect(window.navigator.userAgent);
        if(md.is('iPhone')) {
            this.setState({
                deepLink: 'https://apple.com'
            })
        } else {
            this.setState({
                deepLink: 'intent://www.setmine.com/#Intent;scheme=setstory;package=com.setmusic.setstory;S.action=recover;S.data=' + this.props.params.data + ';end'
            })
        }
    }

    render() {
        return (
            <div className='RecoveryDeepLink flex-column'>
                <img className='flex-center' src='/images/setstory-logo-white.png'/>
                <h2 className='flex-center'>Setstory</h2>
                <a className='sign-in flex-2x flex-column' href={this.state.deepLink}>
                    <div className='sign-in-text flex-center'>
                        One-Click Sign In
                    </div>
                </a>
                
            </div>
        )
    }
}

RecoveryDeepLink.contextTypes = {
    push: PropTypes.func
};