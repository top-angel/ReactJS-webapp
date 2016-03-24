import React, {PropTypes} from 'react';
import Loader from 'react-loader';
import R from 'ramda/dist/ramda.min';
import api from '../services/api';
import Base from './Base';
import SetContainer from './SetContainer';
import EventContainer from './EventContainer';
import Recent from './Recent';

export default class Stream extends Base {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            sets: [],
            events: [],
            offers: [],
            page: 1
        };
    }
    componentWillMount() {
        if(this.context.loginStatus) {
            this.fetchStream(this.context.user.id);
            // this.getNewSets(this.context.user.id);
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextContext.loginStatus != this.context.loginStatus) {
            this.setState({ loaded: false });
            this.getNewSets(nextContext.user.id); 
        }
    }
    fetchStream(userId) {
        api.get(`setmineuser/${userId}/stream`).then(payload => {
            // payload.setmineuser_stream.forEach(object => console.log(object.model_type));
            let stream = payload.setmineuser_stream;
            const offers = R.filter(n => n.model_type === 'offer', stream);
            const sets = R.filter(n => n.model_type === 'set', stream);
            const events = R.filter(n => n.model_type === 'event', stream);

            this.setState({
                loaded: true,
                sets: sets,
                events: events,
                offers: offers
            });
        });
    }
    getNewSets(userId) {
        api.get(`setmineuser/${userId}/stream?filter=sets`).then(payload => {
            this.setState({
                sets: payload.setmineuser_stream,
                loaded: true
            });
        });
    }
    getRecentSets(page=this.state.page) {
        api.get(`sets/recent?limit=48&page=${page}`).then(payload => {
            // TODO merge recent sets with recommended
        });
    }
    renderSets() {
        // if(!this.context.loginStatus) {
        //  return <Recent />
        // }

        return (
            <Loader loaded={this.state.loaded}>
                <SetContainer sets={this.state.sets} />
            </Loader>
        );
    }
    sortByDate(array) {
        console.log(array);

    }
    render() {
        return this.renderSets();
    }
}

Stream.contextTypes = {
    user: PropTypes.object,
    push: PropTypes.func,
    loginStatus: PropTypes.bool
};