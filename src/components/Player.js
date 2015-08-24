import Q from 'q';
import R from 'ramda';
import $ from 'jquery';
import React from 'react';

import constants from '../constants/constants';

var PlayerControl = require('./PlayerControl');
var PlayerSeek = require('./PlayerSeek');
var PlayerSetInfo = require('./PlayerSetInfo');
var PlayerTrackInfo = require('./PlayerTrackInfo');


function errorPromise(jqXHR, textStatus, errorThrown) {
  console.log('ERROR MAKING AJAX CALL', jqXHR, textStatus, errorThrown);
  return  Q.reject(errorThrown);
}


function fetchTrackList(selectedSet) {
  var trackListUrl = constants.API_ROOT + 'tracklist/' + selectedSet.id;

  return $.ajax({
    url: trackListUrl,
    type: 'get'
  });
}


function fetchSong(selectedSet) {
  var songUrl = constants.S3_ROOT + selectedSet.songURL;

  return $.ajax({
    url: songUrl,
    type: 'get'
  });
}



function generateSound(loadStart) {
  //XXX

  var selectedSet = {
    id: 1903,
    artist_id: [
      574
    ],
    artist: 'Kygo',
    event: 'Tomorrowland 2014 W2',
    event_id: 116,
    episode: '',
    genre: 'Progressive House',
    episode_imageURL: null,
    eventimageURL: 'dbd5bd7900531575c9bbfaba0ae434c4.jpg',
    main_eventimageURL: '12141ddad8636c5804c86dc685550ee1.jpg',
    artistimageURL: 'a7f7aaec8ecd0cdec444b8abb06dbc66.jpg',
    songURL: '8bf16c6bb2609bcbb7a00940d65038a9e992c98b.mp3',
    datetime: '2014-07-28T19:53:38.000Z',
    popularity: 1017,
    is_radiomix: 0,
    set_length: '10:32',
    tracklistURL: null,
    imageURL: 'dbd5bd7900531575c9bbfaba0ae434c4.jpg',
    artist_preview: [
      {
        id: 574,
        artist: 'Kygo',
        imageURL: 'a7f7aaec8ecd0cdec444b8abb06dbc66.jpg',
        set_count: 6,
        event_count: 0
      }
    ],
    model_type: 'set'
  };

/*  if(loadStart) {*/
    //loadStart = convert.MMSSToMilliseconds(loadStart);
  //} else {
    //loadStart = 0;
  //}

  //// XXX TODO MOVE THIS
  //if(currentSet != null) {
    //soundManager.destroySound('currentSound');
  /*}*/


  return fetchTrackList(selectedSet)
    .then(function(response) {
      return response.payload;
    }, errorPromise)
    .then(function(trackList) {
      console.log(trackList);
    }, errorPromise);



  //$.ajax({
    //url: constants.API_ROOT + 'tracklist/' + selectedSet.id,
    //type: 'get',
    //success: function(response) {

      //var currentTrack = 0;
      //var tracklist = response.payload.tracks;
      //var currentTracks = response.payload.tracklist;
      //var currentStartTimes = response.payload.starttimes;

      //// XXX
      ////$('.current-track').text(currentTracks[currentTrack]);
      ////$.each(currentTracks, function(index,value) {
        ////var trackDiv = $("<div class='track-item'>"+value+"</div>").appendTo(".tracklist");
        ////trackDiv.click(function() {
          ////currentTrack = index;
          ////var newPosition = convert.MMSSToMilliseconds(currentStartTimes[index]);
          ////seek(newPosition, "tracklist");
        ////})
      ////});
      ////
      ////


      ////
      ////
      ////currentSet = soundManager.createSound({
        ////id: 'currentSound',
        ////url: songURL,
        ////load: loadStart,
        ////onload: function() {
          ////var totalTime = currentSet.durationEstimate;
          ////$('.player-total-time').text(convert.millisecondsToMMSS(totalTime/1000));
        ////},
        ////whileplaying: function() {
          ////var currentTime = currentSet.position;
          ////$('.player-current-time').text(convert.millisecondsToMMSS(currentTime/1000));
          ////$('.player-seek').css('width',currentTime*($('.player-seek-container').width())/currentSet.durationEstimate);
          ////if(tracklist.length > 9) {
            ////if(convert.MMSSToMilliseconds(currentStartTimes[currentTrack+1]) < currentSet.position) {
              ////currentTrack++;
              ////$(".tracklist").scrollTo(".track-item:eq("+currentTrack+")",100);
            ////}
            ////if(convert.MMSSToMilliseconds(currentStartTimes[currentTrack]) >= currentSet.position) {
              ////currentTrack--;
              ////$(".tracklist").scrollTo(".track-item:eq("+currentTrack+")",100);
            ////}
            ////$(".track-item:eq("+currentTrack+")").siblings().removeClass("background-red");
            ////$(".track-item:eq("+currentTrack+")").addClass("background-red");
            ////$('.current-track').text(currentTracks[currentTrack]);
          ////}
        ////}
      ////});
      ////playSet(loadStart);
    //}
  //});
}


var Player = React.createClass({

  displayName: 'Player',

	render: function() {
	  //var push = this.props.pushFn;
	  //console.log('player props', this.props);
	  //
	  //generateSound();

    return (
      <div className='player flex-row'>
          <PlayerControl />
          <div className='flex-column flex'>
              <PlayerSeek />
              <div className='flex-row flex'>
                  <PlayerSetInfo set={this.props.set}/>
                  <PlayerTrackInfo track={this.props.set}/>
              </div>
          </div>
      </div>
    );
	}
});

var PlayerWrapper = React.createClass({
  displayName: 'PlayerWrapper',

  render: function() {

    var push = this.props.pushFn;
    var appState = this.props.appState; // <- IMMUTABLE MAP
    var Rh = this.props.routeHandler;

    var currentSet = appState.get('currentSet'); // <- NOT IMMUTABLE MAP

    return (
      <div>
        <Rh />
        <Player set={currentSet} pushFn={push} />
      </div>
    );
  }
});

module.exports = PlayerWrapper;
