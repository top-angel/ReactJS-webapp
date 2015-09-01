import React from 'react';
import {DefaultRoute, Route, Router, RouteHandler} from 'react-router';
import App from './index';

import LandingView from './components/LandingView';
import FeaturedView from './components/FeaturedView';
import HomeView from './components/HomeView';
import SetsView from './components/SetsView';
import SearchResultsView from './components/SearchResultsView';

import ArtistDetail from './components/ArtistDetail';
import FestivalDetail from './components/FestivalDetail';
import ActivityDetail from './components/ActivityDetail';
// import EventDetail from './components/EventDetail';

import Favorites from './components/Favorites';
import NewSets from './components/NewSets';
import NewEvents from './components/NewEvents';

import Artists from './components/Artists';
import Festivals from './components/Festivals';
import Mixes from './components/Mixes';
import Activities from './components/Activities';

var Routes = (
	<Route path='/' handler={App}>
		<DefaultRoute name='landing' handler={LandingView}/>
		<Route name='user' path='user' handler={HomeView}>
			<DefaultRoute name='user-favorites' handler={Favorites}/>
			<Route name='user-sets' path='sets' handler={NewSets}/>
			<Route name='user-events' path='events' handler={NewEvents}/>
		</Route>
		<Route name='sets' path='sets' handler={SetsView}>
			<Route name='mixes' path='mixes' handler={Mixes}/>
			<Route name='festivals' path='festivals' handler={Festivals}/>
			<Route name='activities' path='activities' handler={Activities}/>
		</Route>
		<Route name='events' path='events' handler={FeaturedView}/>
		<Route name='artists' path='artists' handler={Artists}/>
		<Route name='search' path='search' handler={SearchResultsView}/>
		<Route name='artist' path='artist' handler={ArtistDetail}>
			{/*TODO add routes for sets & events*/}
		</Route>
		<Route name='festival' path='festival' handler={FestivalDetail}/>
		<Route name='activity' path='activity' handler={ActivityDetail}/>
	</Route>
);

module.exports = {
	Routes: Routes,
	Router: Router,
	DefaultRoute: DefaultRoute,
	RouteHandler: RouteHandler
};