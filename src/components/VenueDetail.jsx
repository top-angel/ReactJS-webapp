import React, {PropTypes} from 'react';
import Base from './Base';
import DetailHeader from './DetailHeader';
import EventContainer from './EventContainer';
import Loader from 'react-loader';
import api from '../services/api';

const {func} = PropTypes;
const contextTypes = {
    push: func
};

const sethau5 = 1285;

export default class VenueDetail extends Base {
    constructor(props) {
        super(props);
        // this.autoBind();
        this.state = {
            loaded: false,
            venue: '',
            address: '',
            bannerImage: '',
            iconImage: '',
            beacon: 0,
            events: []
        }
    }
    componentWillMount() {
        this.fetchVenue(this.props.params.venue);
        this.context.push({ currentPage: 'Venues' });
    }
    fetchVenue(venueId) {
        api.get(`venues/id/${venueId}`).then(payload => {
            this.setState({
                venue: payload.venue,
                address: payload.address,
                bannerImage: payload.banner_image.imageURL,
                iconImage: banner.icon_image.imageURL,
                beacon: payload.beacon,
                events: []
            });
        });
    }
    openMapLink(e) {
        e.stopPropagation();
        window.open(`http://google.com/maps/place/${this.state.address}`);
    }
    render() {
        return (
            <Loader loaded={this.state.loaded}>
                <div className='detail-view'>
                    <DetailHeader image={this.state.venueImage}>
                        <h3>{this.state.venue}</h3>
                        <p>{}</p>
                    </DetailHeader>
                    <div className='tab'>
                        <p>EVENTS</p>
                    </div>
                </div>
            </Loader>
        );
    }
}

VenueDetail.contextTypes = contextTypes;
