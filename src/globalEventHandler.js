import Rx from 'rx';
import Immutable from 'immutable';

var INITIALIZE_APP = 'INITIALIZE_APP';

function getInitialAppState(initState) {
  var newState = Immutable.Map(initState);
  return Rx.Observable.just(newState);
}

function eventDispatcher(msg, lastState) {
  var type = msg.type;
  var data = msg.data;

  var newStateObservable;

  /**
   * XXX
   *
   * Every function that assigns to the `newStateObservable`
   * MUST RETURN AN OBSERVABLE THAT WILL PUBLISH IMMUTABLEJS MAPS
   */
  switch(type) {
    case INITIALIZE_APP:
      newStateObservable = getInitialAppState(data, lastState);
      break;
  }

  return newStateObservable;
}

function getEventHandler(initialState) {

  // SHIIIIEEEEET DAS IT MAYNE
  var applicationState = Immutable.Map({});


  // All messages will be received by this
  var messageReceiver = new Rx.Subject();

  var push = (msg) => {
    if(!msg) { throw 'Push requires message'; }
    messageReceiver.onNext(msg);
  };


  var initializeMessage = {
    type: INITIALIZE_APP,
    data: initialState
  };

  var initialStateObservable = Rx.Observable.just(initializeMessage);

  var pushedMessagesObservable = initialStateObservable
                                    .merge(messageReceiver);

  // All state updates will come from here
  // TODO ensure no race-conditions
  var floodGate = pushedMessagesObservable.flatMap(msg => {
    return eventDispatcher(msg, applicationState);
  }).map(newState => {
    applicationState = newState;
    return applicationState;
  });

  return {
    push: push,
    floodGate: floodGate
  };
}

module.exports = getEventHandler;
