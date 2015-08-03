// var rest = require('restler');
// var async = require('async')
// var _ = require('underscore')

// var setmine = {};
// var api_version = "7"

// var socialmedia = require('../models/socialmedia')
// var artistModel = require('../models/artists')

// var settings = require('../config/settings');
// var mysql = require('mysql');
// var winston = require('winston');
// var connection = mysql.createPool(settings.db.main);

// var artists = []

// setmine.artists = []
// setmine.events = []
// setmine.lineups = []

// setmine.init = function(callback) {
//     async.parallel([
//         function(callback) {
//             rest.get('http://setmine.com/api/v/7/artist?all=true', {
//                 query : {}
//             }).on('complete', function(data) {
//                 setmine.artists = data.payload.artist;
//                 if(callback) {
//                     callback()
//                 }
//             });
//         },
//         function(callback) {
//             rest.get('http://setmine.com/api/v/7/lineup/762').on('complete', function(data) {
//                 setmine.events.push(data.payload.lineup);
//                 if(callback) {
//                     callback()
//                 }
//             });
//         }
//     ], function(err, results) {
//         callback()
//     })
// }

// setmine.getArtistByID = function(artistID, callback) {
// 	rest.get("http://setmine.com/api/v/7/artist/" + artistID).on('complete', function(response) {
// 		if(response.status == "success") {
//             callback(response.payload.artist)
//         } else {
//             callback()
//         }
// 	})
// }

// setmine.getArtistByName = function(artistName, callback) {
//     rest.get("http://setmine.com/api/v/7/artist/" + artistName).on('complete', function(response) {
//         if(response.status == "success") {
//             callback(response.payload.artist)
//         }
//     })
// }

// setmine.getArtistPopularity = function(artist, callback) {
//     var artistID = artist;
//     if(isNaN(artist)) {
//         var matchedArtist = _.findWhere(setmine.artists, {artist: artistID}).id
//         if(matchedArtist) {
//             artistID = matchedArtist.id
//         } else {
//             callback()
//             return
//         }
//     }
//     setmine.getArtistByID(artistID, function(artist) {
//         var totalSetPopularity = 0;
//         if(artist) {
//             for(var i in artist.sets) {
//                 totalSetPopularity += artist.sets[i].popularity
//             }
//         }
//         callback(totalSetPopularity)
//     })
// }

// setmine.getEventLineupByID = function(eventID, callback) {
//     rest.get("http://setmine.com/api/v/7/lineup/" + eventID).on('complete', function(response) {
//         if(response.status == "success") {

//             setmine.lineups.push(response.payload.lineup)

//             // For Demo Lineup
//             // TODO: Either do this for all lineups, generate booking values upon initialization

//             if(eventID == 762) {
//                 connection.query("SELECT * FROM booking_values", function(err, bookingValues) {
//                     if(err) winston.error(err)
//                     else {
//                         response.payload.lineup.lineup = _.filter(response.payload.lineup.lineup, function(artist) {
//                             var artist_booking_value = _.findWhere(bookingValues, {artist_id: +artist.id})
//                             if(artist_booking_value) {
//                                 artist = _.extend(artist, {booking_value: artist_booking_value.raw_score})
//                             } else {
//                                 artist = _.extend(artist, {booking_value: 0})
//                             }
//                             return artist
//                         })
//                         callback(response.payload.lineup)
//                     }
//                 })  
//             } else {
//                 callback(response.payload.lineup)
//             }
//         }
//     })
// }

// setmine.getEventLineupByName = function(eventName, callback) {

//     var matchedEvent = _.findWhere(setmine.events, {event:eventName})

//     if(matchedEvent) {
//         setmine.getEventLineupByID(matchedEvent.id, function(lineup) {
//             callback(lineup)
//         })
//     }
//     else {
//         callback()
//     } 
// }

// setmine.getSocialMediaMetrics = function(artistName, callback) {
//     rest.get("http://setmine.com/api/v/7/artist/social/" + artistName).on('complete', function(response) {
//         callback(response)
//     })
// }

// setmine.getLineupSocialMedia = function(lineupID, callback) {
//     rest.get("http://setmine.com/api/v/7/lineup/social/" + lineupID).on('complete', function(response) {
//         callback(response)
//     })
// }

// setmine.getDemoLineupBookingValues = function(callback) {
//     var ava = require('../controllers/ava')

//     setmine.getEventLineupByID(762, function(lineup) {
//         var demolineup = lineup.lineup
//         for(var i in demolineup) {
//             ava.calculateBookingValue(demolineup[i])
//         }
//     })
// }

// // First parameter 'data' must be an array with elements that look like this:
// // {
// //     "twitter_link": "https://twitter.com/Anonymuzkilla"
// // }

// setmine.socialmedia = socialmedia; // >> /models/socialmedia.js

// module.exports = setmine;
