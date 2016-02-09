import React from 'react';
import {render} from 'react-dom';

import Router from 'react-router/lib/Router';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';

import App from './components/App';
import Footer from './components/Footer';
import LandingView from './components/LandingView';
import EventsPage from './components/EventsPage';
import Home from './components/Home';
import SetsPage from './components/SetsPage';
import SearchResultsView from './components/SearchResultsView';

import FeaturedEvents from './components/FeaturedEvents';
import UpcomingEvents from './components/UpcomingEvents';
import ClosestEvents from './components/ClosestEvents';

import ArtistDetail from './components/ArtistDetail';
import FestivalDetail from './components/FestivalDetail';
import ActivityDetail from './components/ActivityDetail';
import MixDetail from './components/MixDetail';
import EventDetail from './components/EventDetail';

import Favorites from './components/Favorites';
import NewSets from './components/NewSets';
import NewEvents from './components/NewEvents';

import Recent from './components/Recent';
import Popular from './components/Popular';
import Artists from './components/Artists';
import Festivals from './components/Festivals';
import Mixes from './components/Mixes';
import Activities from './components/Activities';

import SetContainer from './components/SetContainer';
import EventContainer from './components/EventContainer';
import ArtistTileContainer from './components/ArtistTileContainer';

import DMCA from './components/DMCA';
import Setmusic from './components/Setmusic';
import SetstoryLandingPage from './components/SetstoryLandingPage';
import About from './components/About';

// styling
require('./styles/index.less');
// import './styles/index.less';

let bodyMount = document.getElementById('body-mount-point');
import history from './services/history';

render(
	<Router history={history}>
		<Route path='/' component={App}>
			<IndexRoute component={LandingView}/>

			<Route path='play/:set' component={SetsPage}>
				<IndexRoute component={Recent}/>
				<Route path='mixes' component={Mixes}/>
				<Route path='popular' component={Popular}/>
				<Route path='festivals' component={Festivals}/>
				<Route path='activities' component={Activities}/>
			</Route>

			<Route path='sets' component={SetsPage}>
				<IndexRoute component={Recent}/>
				<Route path='mixes' component={Mixes}/>
				<Route path='popular' component={Popular}/>
				<Route path='festivals' component={Festivals}/>
				<Route path='activities' component={Activities}/>
			</Route>

			<Route path='home' component={Home}>
				<IndexRoute component={Favorites}/>
				<Route path='sets' component={NewSets}/>
				<Route path='events' component={NewEvents}/>
			</Route>

			<Route path='events' component={EventsPage}>
				<IndexRoute component={UpcomingEvents}/>
				<Route path='closest' component={ClosestEvents}/>
				<Route path='featured' component={FeaturedEvents} />
			</Route>

			<Route path='artists' component={Artists}/>
			<Route path='search' component={SearchResultsView}/>

			<Route path='artist/:artist' component={ArtistDetail}>
				<IndexRoute component={SetContainer}/>
				<Route path='events' component={EventContainer}/>
			</Route>
			<Route path='event/:event' component={EventDetail}/>
			<Route path='festival/:festival' component={FestivalDetail}/>
			<Route path='mix/:mix' component={MixDetail}/>
			<Route path='activity/:activity' component={ActivityDetail}/>
			<Route path='legal' component={DMCA} />

			{/*Redirects from Setmine v5.0*/}
			<Redirect from='/browse/:artist/artist' to='/artist/:artist' />
			<Redirect from='/browse/:festival/festival' to='/festival/:festival' />
			<Redirect from='/browse/:mix/mix' to='/mix/:mix' />
			<Redirect from='/event/:eventID' to='/event/:eventID' />
			<Redirect from='/offer/:offerId' to='/' />

			<Route path='about' component={About}/>
			<Route path='setstory' component={SetstoryLandingPage}/>
			{/*<Route path='blog' component={BlogWrapper}/>*/}
		</Route>
	</Router>
, bodyMount);

mixpanel.track("Page Load");