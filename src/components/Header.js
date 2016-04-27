import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Base from './Base';
import SearchBar from './SearchBar';
import IconMenu from './IconMenu';
import Icon from './FaIcon';
import LoginOverlay from './LoginOverlay';
import colors from '../constants/colors';
import Ink from 'react-ink';
import Button from './Button';

const scrollStyle = {
    backgroundColor: colors.white,
    color: colors.darkGray,
    boxShadow: '0 3px 6px rgba(49, 53, 66, 0.16), 0 3px 6px rgba(49, 53, 66, 0.23)'
};

export default class Header extends Base {
    constructor(props) {
        super(props);
        this.autoBind(
            'handleScroll',
            'login'
        );
        this.state = {
            switchHeader: false
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.location.pathname !== '/') {
            window.removeEventListener('scroll', this.handleScroll, false);
            return;
        }

        if(this.landingPageActive()) {
            window.addEventListener('scroll', this.handleScroll, false);
        }
    }
    login() {
        this.context.push({ showLogin: !this.props.showLogin });
    }
    trackAndroid() {
        mixpanel && mixpanel.track("Android App Link Clicked");
    }
    trackIos() {
        mixpanel && mixpanel.track("iOS App Link Clicked");
    }
    landingPageActive() {
        return this.props.location.pathname === '/';
    }
    handleScroll() {
        if(!this.landingPageActive()) {
            return;
        }

        if(window.scrollY >= (window.innerHeight - 260)) {
            this.setState({ switchHeader: true });
        } else {
            this.setState({ switchHeader: false });
        }
    }
    render() {
        const {currentPage} = this.props;
        const headerType = this.landingPageActive() ? 'Header--landing' : 'Header--main';

        const style = this.state.switchHeader ? scrollStyle : null;

        return (
            <div className={headerType} style={style}>
                <Link to='/' className='icon-setmine' />
                <div className='flex-fixed' style={{ margin: '0 3rem' }}>
                    <h4>{currentPage}</h4>
                </div>
                <SearchBar />
                {
                    !this.context.loginStatus && (
                        <Button solid className='Header__login-button' onClick={this.login}>Login</Button>
                    )
                }
                <IconMenu icon={<Icon>ellipsis-h</Icon>}>
                    <Link to='/about'>
                        <p>About</p>
                    </Link>
                    <a href='http://bit.ly/SetmineiOS' title='view on App Store' className='click'>
                        <p>iOS</p>
                    </a>
                    <a href='http://bit.ly/SetmineAndroid' title='view on Google Play' className='click'>
                        <p>Android</p>
                    </a>
                    <Link to='/setstory'>
                        <p>Setstory</p>
                    </Link>
                    <Link to='/legal'>
                        <p>DMCA Notice</p>
                    </Link>
                </IconMenu>
            </div>
        );
    }
}

const {func, object, bool, string} = PropTypes;
Header.contextTypes = {
    push: func,
    loginStatus: bool
};

Header.propTypes = {
    currentPage: string.isRequired,
    location: object
};

export default Header;