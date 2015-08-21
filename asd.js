var sourceStream = ...;

var searchInputs = sourceStream.filter(function(x) {
  return x.type === 'SEARCH_INPUT';
});

var playingSet = sourceStream.filter(function(x) {
  return x.type === 'PLAYING_SET';
});

serachInputs.onValue((text) => text.toUpperCase());

