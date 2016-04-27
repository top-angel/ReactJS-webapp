import React, {PropTypes} from 'react';
import Base from './Base';
import DetailHeader from './DetailHeader';
import EventContainer from './EventContainer';
import Loader from './Loader';
import api from '../services/api';

const {func} = PropTypes;
const sethau5 = 1285;

export default class VenueDetail extends Base {
    static contextTypes = {
        push: func
    }
    constructor(props) {
        super(props);
        this.autoBind(
            'fetchVenue',
            'openMapLink'
        );
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
        api.get(`venues/id/${venueId}?events=true`).then(payload => {
            console.log(payload);
            this.setState({
                venue: payload.venue,
                address: payload.address,
                bannerImage: payload.banner_image.imageURL,
                iconImage: payload.icon_image.imageURL,
                beacon: payload.beacon,
                events: payload.events,
                loaded: true
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
                    <DetailHeader image={this.state.bannerImage}>
                        <h3>{this.state.venue}</h3>
                        <p>{this.state.address}</p>
                        <p id='DetailButton' onClick={this.openMapLink} title='Open in Google Maps'>Directions</p>
                    </DetailHeader>
                    <div className='tab'>
                        <p>EVENTS</p>
                    </div>
                    <EventContainer events={this.state.events} />
                </div>
            </Loader>
        );
    }
}