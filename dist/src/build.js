(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/oscarlafarga/setmine-web/src/js/index.js":[function(require,module,exports){
/** @jsx React.DOM */

var API_VERSION = 7;
var S3_ROOT = "http://stredm.s3-website-us-east-1.amazonaws.com/namecheap/";
var S3_ROOT_FOR_IMAGES = "http://d1wbxby8dwa4u.cloudfront.net/namecheap/";
var DEFAULT_IMAGE = "ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png";
var API_ROOT = 'http://setmine.com/api/v/' + API_VERSION + '/';
var IMAGE_ROOT = '/images/';
var ANDROID_URL = "https://play.google.com/store/apps/details?id=com.setmine.android"
var IOS_URL = "https://itunes.apple.com/us/app/setmine/id921325688?mt=8";

// Models

var modelsReady = false;
var requiredModels = 6;

var models = {
	artists : [],
	festivals : [],
	mixes : [],
	genres : [],
	activities : [],
	landing : []
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$.holdReady(true);

// Do not fire the documents ready listener until all models are loaded

function getModels(callback) {
	var readyModelsCount = 0;

	//  Get and store only artists with sets

	$.ajax({
		type: "GET",
		url: API_ROOT + "artist",
		success: function(response) {
			if(response.status == "success") {

				// Split artists into subgroups of 50 to be loaded one at a time in Browse list
				var artistModels = response.payload.artist;
				for(var a in artistModels) {
					models.artists[a] = artistModels[a];
					if(models.artists.length == artistModels.length) {
						
						readyModelsCount++;
						// updateProgressBar();
						callback(readyModelsCount);

					}
				}
			}
		}
	});

	// Get and store festivals

	$.ajax({
		type: "GET",
		url: API_ROOT + "festival",
		success: function(response) {
			if(response.status == "success") {
				var festivalModels = response.payload.festival;
				for(var f in festivalModels) {
					models.festivals[f] = festivalModels[f];
					if(models.festivals.length == festivalModels.length) {
						readyModelsCount++;
						// updateProgressBar();
						callback(readyModelsCount);

					}
				}
			}
		}
	});

	// Get and store all mixes

	$.ajax({
		type: "GET",
		url: API_ROOT + "mix",
		success: function(response) {
			if(response.status == "success") {
				var mixModels = response.payload.mix;
				for(var m in mixModels) {
					models.mixes[m] = mixModels[m];
					if(models.mixes.length == mixModels.length) {
						readyModelsCount++;
						// updateProgressBar();
						callback(readyModelsCount);

					}
				}
			}
		}
	});

	// Get and store all genres

	$.ajax({
		type: "GET",
		url: API_ROOT + "genre",
		success: function(response) {
			if(response.status == "success") {
				var genreModels = response.payload.genre;
				for(var g in genreModels) {
					models.genres[g] = genreModels[g];
					if(models.genres.length == genreModels.length) {
						readyModelsCount++;
						// updateProgressBar();
						callback(readyModelsCount);

					}
				}
			}
		}
	});

	// Get and store all activities

	$.ajax({
		type: "GET",
		url: API_ROOT + "activity",
		success: function(response) {
			if(response.status == "success") {
				var activityModels = response.payload.activity;
				for(var a in activityModels) {
					models.activities[a] = activityModels[a];
					if(models.activities.length == activityModels.length) {
						readyModelsCount++;
						// updateProgressBar();
						callback(readyModelsCount);

					}
				}
			}
		}
	});

	// Get and store landing events

	$.ajax({
		type: "GET",
		url: API_ROOT + "landing",
		success: function(response) {
			if(response.status == "success") {
				var landingModels = response.payload.landing;
				for(var l in landingModels) {
					models.landing[l] = landingModels[l];
					if(models.landing.length == landingModels.length) {
						readyModelsCount++;
						// updateProgressBar();
						callback(readyModelsCount);
					}
					
				}
			}
		}
	});

	// function updateProgressBar() {
	// 	document.getElementsByClassName("loader-bar-progress")[0].style.width = (readyModelsCount/requiredModels*100).toString() + "%";
	// }
}

// onModelsReady gets fired when all 5 ajax requests have completed

function onModelsReady(readyModelsCount) {
	if(readyModelsCount == requiredModels) {
		console.log("models ready")
		modelsReady = true;
		console.log(models)
		initializeReact()
	}
	
}

function validateApiResponse(response) {
	if(response.status == "success") { return true; } else { return false; }
}

function detectMobileBrowser() {
	if(isMobile.any()) {
		console.log("Mobile");
		$("#slide-2").detach().insertAfter(".user.header-wrapper")
		$("#slide-2 .app-parallax").css("margin", 0)
		if(isMobile.iOS()) {
			console.log("iOS")
			console.log("setmine://setmine.com/" + window.location.search.substring(1))
			window.location = "setmine://setmine.com/" + window.location.search.substring(1)
		}
	}
}

// Global Objects

var convert = {
	MMSSToMilliseconds: function(time) {
		return totalSecs = (parseInt(time.split(":")[0])*60 + parseInt(time.split(":")[1]))*1000;
	},
	millisecondsToMMSS: function(secs) {
    	var minutes = Math.floor(secs / 60);
    	var seconds = Math.floor(secs - (minutes * 60));
    	if (minutes < 10) {minutes = "0"+minutes;}
    	if (seconds < 10) {seconds = "0"+seconds;}
    	var time = minutes+':'+seconds;
    	return time;
    }
}

getModels(onModelsReady);

detectMobileBrowser();

function initializeReact() {

	console.log("initializeReact")

	//set tile

		var SetTile = React.createClass({displayName: "SetTile",
			//for testing
			getDefaultProps: function() {
				return {
					set: null,
					artist: null,
					playCount: null,
					setLength: null,
					imageUrl: null
				}
			},
			handlePlay: function() {
				console.log('set playing');
			},
			render: function() {
				return (
					React.createElement("div", {className: "flex-column overlay-container set-tile"}, 
						React.createElement("img", {className: "event-image", src: S3_ROOT_FOR_IMAGES + this.props.set.main_eventimageURL}), 
					    React.createElement("div", {className: "overlay"}), 
					    React.createElement("div", {className: "buffer-4x"}), 
					    React.createElement("div", {className: "flex-column flex tile-controls"}, 
					        React.createElement("div", {className: "flex-row flex"}, 
					            React.createElement("div", {className: "flex-column flex overlay-container"}, 
					                React.createElement("img", {className: "artist-image", src: this.props.set.artistimageURL})
					            ), 
					            React.createElement("div", {className: "flex-column flex set-info"}, 
					                React.createElement("div", {className: "center click flex"}, this.props.set.set), 
					                React.createElement("div", {className: "center click flex"}, this.props.set.artist), 
					                React.createElement("div", {className: "flex-row flex-2x"}, 
					                    React.createElement("i", {className: "fa fa-fw fa-star center click flex"}), 
					                    React.createElement("i", {className: "fa fa-fw fa-share-o center click flex"})
					                )
					            )
					        ), 
					        React.createElement("div", {className: "divider"}), 
					        React.createElement("div", {className: "flex-row flex-2x"}, 
					            React.createElement("div", {className: "flex-fixed set-flex play-count click tile-button", onClick: this.hanldePlay}, 
					                React.createElement("i", {className: "fa fa-play center"}, this.props.set.popularity)
					            ), 
					            React.createElement("div", {className: "divider"}), 
					            React.createElement("div", {className: "flex-fixed set-flex set-length"}, 
					                React.createElement("i", {className: "fa fa-clock-o center"}, this.props.set.set_ength)
					            )
					        )
					    )
					)
				)
			}
		})

	//browse page

		var BrowseView = React.createClass({displayName: "BrowseView",
			render: function() {
				return (
					React.createElement("div", {id: "browse", className: "view overlay-container hidden"}, 
						React.createElement(ViewTitleContainer, {type: this.props.type}), 
						React.createElement(ResultsContainer, {results: this.props.results})
					)
				);
			}
		})
		
	//detail page

		var DetailView = React.createClass({displayName: "DetailView",
			getInitialState: function() {
				return {
					data: [],
					pageType: null 
				};
			},
			render: function() {
				//TEST determine if artist or event detail
				var detailType = 'artist'; // state
				if(detailType == 'artist') {
					title = this.props.detailData.artist
					button_text = "Follow"
					info = this.props.detailData.set_count + " sets | " + this.props.detailData.event_count + " events"
					imageURL = this.props.detailData.imageURL
					navTitles = ["sets","events"]
				} else {
					title = this.props.detailData.event
					button_text = "Tickets"
					
					info = this.props.detailData.start_date + " - " + this.props.detailData.end_date

					imageURL = this.props.detailData.main_eventimageURL
					navTitles = ["lineup"]
				}
				content = this.props.detailData
				var links = [
					{
						type: 'facebook',
						url: this.props.detailData.fb_link
					},
					{
						type: 'twitter',
						url: this.props.detailData.twitter_link
					},
					{
						type: 'instagram',
						url: this.props.detailData.instagram_link
					},
					{
						type: 'soundcloud',
						url: this.props.detailData.soundcloud_link
					},
					{
						type: 'youtube',
						url: this.props.detailData.youtube_link
					},
					{
						type: 'web',
						url: this.props.detailData.web_link
					}
				]
				console.log(this.props.detailData)
				console.log(links)
				return (
					React.createElement("div", {id: "detail", className: "view detail-page"}, 
						React.createElement(DetailImageContainer, {title: title, button_text: button_text, imageURL: imageURL, info: info}), 
						React.createElement(LinkButtonsContainer, {links: links}), 
						React.createElement("div", {className: "divider"}), 
						React.createElement(DetailContentContainer, {navTitles: navTitles, content: content})
					)
				);
			}
		});

		var DetailImageContainer = React.createClass({displayName: "DetailImageContainer",	// Displays key detail information
			render: function() {
				return (
					React.createElement("div", {className: "flex-column flex image-container overlay-container", style: {background: "url('" + S3_ROOT_FOR_IMAGES + imageURL + "')"}}, 
                        React.createElement("div", {className: "overlay"}), 
                        React.createElement("div", {className: "buffer"}), 
                        React.createElement("div", {className: "header center artist-name"}, title), 
                        React.createElement("div", {className: "header-small center"}, info), 
                        React.createElement("div", {className: "buffer"}), 
                        React.createElement("div", {className: "header-small center click", id: "detail-button"}, button_text), 
                        React.createElement("div", {className: "buffer"})
                    )
				);
			}
		});

		var LinkButtonsContainer = React.createClass({displayName: "LinkButtonsContainer",	// Displays links in a row
			render: function() {
				var linkItems = []
				for(var i in this.props.links) {

				}
				this.props.links.map(function(link) {
					linkItems.push(React.createElement(LinkButton, {type: link.type, url: link.url}))
				})
				return (
					React.createElement("div", {className: "flex-row links-container"}, linkItems)
				);
			}
		});

		var LinkButton = React.createClass({displayName: "LinkButton", // Displays a button to an external link
			render: function() {
				return (
					React.createElement("a", {href: this.props.url}, React.createElement("i", {className: 'fa fa-fw fa-2x click fa-'+this.props.type}))
				);
			}
		})

		var DetailContentContainer = React.createClass({displayName: "DetailContentContainer",	// Displays the titles of a results container
			render: function() {
				return (
					React.createElement("div", null, 
						React.createElement(DetailNavContainer, {navTitles: this.props.navTitles}), 
						React.createElement(DetailContent, {content: this.props.content})
					)
				);
			}
		})

		var DetailNavContainer = React.createClass({displayName: "DetailNavContainer",	// Displays the titles of a results container
			render: function() {
				var titles = []
				this.props.navTitles.map(function(navTitle) {
					titles.push(React.createElement(DetailNavButton, {title: navTitle}))
				})
				return (
					React.createElement("div", {className: "flex-row links-container"}, titles)
				);
			}
		})

		var DetailNavButton = React.createClass({displayName: "DetailNavButton", // Changes the results of a container
			render: function() {
				return (
					React.createElement("div", {className: 'center click flex-fixed '+this.props.title}, 
						this.props.title
					)
				);
			}
		})

		var DetailContent = React.createClass({displayName: "DetailContent",	// Displays a tile for each detail set, lineup, or event
			render: function() {
				var tiles = []
				// if(true) {
				// 	this.props.content.sets.forEach(function(contentItem) {
				// 		tiles.push(<SetTile/>) // Set tiles
				// 	});
				// } else if(true) {
				// 	this.props.content.upcomingEvents.forEach(function(contentItem) {
				// 		tiles.push(<EventTile/>) // Event tiles
				// 	});
				// } else {
				// 	this.props.content.lineup.forEach(function(contentItem) {
				// 		tiles.push(<BrowseTile/>) // Browse tiles
				// 	});
				// }
				
				return (
					React.createElement("div", {className: "results-container flex-row flex"}, 
						tiles
					)
				);
			}
		})

	//event tile

		var EventTile = React.createClass({displayName: "EventTile",
			getInitialState: function() {
				return {
					event: null
				}
			},
			//for testing
			getDefaultProps: function() {
				return {
					event: 'Coachella 2015',
					image: 'images/coachella.jpg',
					month: 'APR',
					day: '20',
					location: 'Indio, CA',
					ticketLink: null,
				};
			},
			render: function() {
				return (
					React.createElement("div", {className: "flex-column overlay-container event-tile"}, 
					    React.createElement("img", {className: "event-image", src: this.props.event.main_imageURL}), 
					    React.createElement("div", {className: "overlay"}), 
					    React.createElement(EventDate, {event: this.props.event}), 
					    React.createElement("div", {className: "divider"}), 
					    React.createElement(EventController, null)
					)
				);
			}
		})
		
		var EventDate = React.createClass({displayName: "EventDate",
		    render: function () {
		    	var month = moment(this.props.event.start_date).format('MMM')
		    	var day = moment(this.props.event.start_date).format('D')

		        return (
		        	React.createElement("div", {className: "event-date-container flex-5x flex-column"}, 
				        React.createElement("div", {className: "month"}, month), 
				        React.createElement("div", {className: "divider"}), 
				        React.createElement("div", {className: "day"}, day)
				    )
		        );
		    }
		})

		var EventController = React.createClass({displayName: "EventController",
			render: function() {
				return (
					React.createElement("div", {className: "tile-controls flex-row flex"}, 
				        React.createElement("a", {href: this.props.ticketLink, className: "set-flex flex click ticket-link tile-button"}, 
				            React.createElement("i", {className: "fa fa-fw fa-ticket center"})
				        ), 
				        React.createElement("div", {className: "flex-3x flex-column event-info"}, 
				            React.createElement("div", {className: "click center"}, this.props.event), 
				            React.createElement("div", {className: "click center"}, this.props.location)
				        ), 
				        React.createElement("div", {className: "set-flex flex click event view-trigger tile-button"}, 
				            React.createElement("i", {className: "fa fa-fw fa-long-arrow-right center"})
				        )
				    )
				);
			}
		})

	//track tile

		var TrackTile = React.createClass({displayName: "TrackTile",
			render: function() {
				return (
					React.createElement("div", {className: "track-tile flex-column flex overlay-container"}, 
					    React.createElement("div", {className: "overlay"}), 
					    React.createElement("div", {className: "flex-column flex"}, 
					        React.createElement("div", {className: "track-name"}, this.props.track.songname), 
					        React.createElement("div", {className: "track-artist"}, this.props.track.artistname), 
					        React.createElement("i", {className: "fa fa-play fa-2x click animated"}), 
					        React.createElement("div", {className: "track-time center"}, this.props.track.starttime+' | '+this.props.track.set_length)
					    ), 
					    React.createElement("div", {className: "tile-controls flex-column"}, 
					        React.createElement("div", {className: "set-name click view-trigger"}, this.props.track.event), 
					        React.createElement("div", {className: "artist-name click view-trigger"}, this.props.track.artist)
					    )
					)
				);
			}
		})

	//activity tile

		// var ActivityTile = React.createClass({
		// 	render: function() {
		// 		return (
		// 			<div>
		// 				<div className="activity-tile flex-column overlay-container" style={{background: "url('" + S3_ROOT_FOR_IMAGES + this.props.activity.imageURL + "')"}}>
		// 				<div className="activity-tile flex-column overlay-container">
		// 				    <div className="overlay"></div>
		// 				    <div className="flex-row flex-3x">
		// 				        <i className="fa fa-fw fa-random center click"></i>
		// 				        <i className="fa fa-4x center"></i>
		// 				        <i className="fa fa-fw fa-bars center click"></i>
		// 				    </div>
		// 				    <div className="set-flex flex actvity-name center">{this.props.activity.activity}</div>
		// 				</div>
		// 			</div>
		// 		);
		// 	}
		// });

	//browse tile
		
		var BrowseTile = React.createClass({displayName: "BrowseTile",
			render: function() {
				return (
					React.createElement("div", {className: "browse-tile flex-column overlay-container click view-trigger"}, 
					    React.createElement("div", {className: "overlay"}, 
					        React.createElement("div", {className: "browse-name center"}, this.props.name)
					    ), 
					    React.createElement("img", {className: "browse-tile-image", src: S3_ROOT_FOR_IMAGES + this.props.object.imageURL})
					)
				);
			}
		
		});

	//featured view

		var FeaturedView = React.createClass({displayName: "FeaturedView",
			render: function() {
				return (
					React.createElement("div", {id: "featured", className: "view flex-column hidden"}, 
						React.createElement(ViewTitleContainer, null), 
						React.createElement(FeaturedContainer, null), 
		                React.createElement(FeaturedResultsHeader, null), 
		                React.createElement(ResultsContainer, null)
	                )
				);
			}
		});

		var FeaturedContainer = React.createClass({displayName: "FeaturedContainer",
			render: function() {
				return (
					React.createElement("div", {className: "flex-row flex featured-container overlay-container"}, 
	                    React.createElement("div", {className: "overlay flex-column left-arrow click"}, 
	                        React.createElement("i", {className: "fa fa-2x fa-chevron-left center"})
	                    ), 
	                    React.createElement("div", {className: "overlay flex-column right-arrow click"}, 
	                        React.createElement("i", {className: "fa fa-2x fa-chevron-right center"})
	                    ), 
	                    React.createElement(FeaturedTile, null)
	                )
				);
			}
		})

		var FeaturedResultsHeader = React.createClass({displayName: "FeaturedResultsHeader",
			render: function() {
				return (
					React.createElement("div", {className: "flex-row featured-results-header"}, 
	                    React.createElement("div", {className: "flex center"}, "Upcoming Events"), 
	                    React.createElement("div", {className: "buffer-2x"}), 
	                    React.createElement("div", {className: "flex center flex-row"}, 
	                        React.createElement("i", {className: "flex fa fa-map-marker"}), 
	                        React.createElement("div", {className: "flex user-location"}, "Dania Beach, FL, USA"), 
	                        React.createElement("div", {className: "flex change-location"}, "Change")
	                    )
	                )
				);
			}
		});

		var FeaturedTile = React.createClass({displayName: "FeaturedTile",
			handleMouseOver: function(){
				console.log('mouseOver');
				$('.featured-info', '.featured-tile').addClass('slideInUp');
			},
			handleMouseOut: function(){
				$('.featured-info', '.featured-tile').removeClass('slideInUp');
				console.log('mouseOut');
			},
			render: function() {
				return (
					React.createElement("div", {className: "flex-column flex featured-tile event overlay-container click view-trigger", onClick: this.handleMouseOver}, 
					    React.createElement("div", {className: "overlay"}), 
					    React.createElement("div", {className: "flex-column featured-info animated"}, 
					        React.createElement("div", {className: "event-name"}, this.props.event.event), 
					        React.createElement("div", {className: "event-date"}, this.props.event.start_date), 
					        React.createElement("div", {className: "featured-type"}, this.props.event.type)
					    )
					)
				);
			}
		});

	//footer
		
		var Footer = React.createClass({displayName: "Footer",
			scrollToTop: function() {
				$(window).scrollTo(0, 400);
			},
			render: function() {
				return (
					React.createElement("footer", {className: "flex-row"}, 
			            React.createElement("div", {className: "buffer"}), 
			            React.createElement("div", {className: "flex-column flex-zero"}, 
			                React.createElement("a", {className: "click", id: "contact"}, "Contact Us"), 
			                React.createElement("a", {className: "click", href: "http://setmine.com/invest"}, "Invest"), 
			                React.createElement("a", {className: "click", id: "dmca"}, "DMCA Notice"), 
			                React.createElement("br", null), 
			                React.createElement("a", {className: "click", onClick: this.scrollToTop}, "Back To Top")
			            ), 
			            React.createElement("div", {className: "buffer-lg"}), 
			            React.createElement("div", {className: "flex-column flex"}, 
			                React.createElement("div", {className: "flex-row center"}, 
			                    React.createElement("a", {href: "https://www.facebook.com/SetmineApp"}, React.createElement("i", {className: "fa fa-2x fa-facebook fa-fw"})), 
			                    React.createElement("a", {href: "https://twitter.com/setmineapp"}, React.createElement("i", {className: "fa fa-2x fa-twitter fa-fw"})), 
			                    React.createElement("a", {href: "https://instagram.com/setmine/"}, React.createElement("i", {className: "fa fa-2x fa-instagram fa-fw"}))
			                ), 
			                React.createElement("div", {className: "divider"}), 
			                React.createElement("div", {className: "center"}, React.createElement("i", {className: "fa fa-copyright"}), " Setmine. 2015")
			            ), 
			            React.createElement("div", {className: "buffer-lg"}), 
			            React.createElement("div", {className: "flex-column flex-zero"}, 
			                React.createElement("a", {className: "center", href: "https://teamtreehouse.com"}, React.createElement("img", {src: "images/treehouse.png"})), 
			                React.createElement("a", {className: "center", href: "https://mixpanel.com/f/partner"}, React.createElement("img", {src: "//cdn.mxpnl.com/site_media/images/partner/badge_light.png", alt: "Mobile Analytics"}))
			            ), 
			            React.createElement("div", {className: "buffer"})
			        )
				);
			}
		});

	//Header

		var Header = React.createClass({displayName: "Header",
			render: function() {
				return (
					React.createElement("header", {className: "flex-row"}, 
			            React.createElement("i", {className: "nav-button fa fa-bars click center nav-toggle"}), 
			            React.createElement("i", {className: "nav-button fa icon-setmine fa-2x click center", title: "Setmine Home"}), 
			            React.createElement(SearchBar, null), 
			            React.createElement(LoginButton, null)
			        )
				);
			}
		});

		var MenuController = React.createClass({displayName: "MenuController",
			render: function() {
				React.createElement("i", {className: "nav-button fa fa-bars click center nav-toggle"})
			}
		})

		var LoginButton = React.createClass({displayName: "LoginButton",
			render: function() {
				return (
					React.createElement("div", {className: "nav-button click center login", id: "login"}, loginAction)
				);
			}
		});

		var SearchBar = React.createClass({displayName: "SearchBar",
			getInitialState: function() {
				return {
					searchInput: ''
				};
			},
			search: function(query) {
				var results = null;
				$(".search-loader").removeClass("hidden")
				$(".search-loader").removeClass("hidden-fade")
				if(activeSearchAjax != null) {
					activeSearchAjax.abort();
					activeSearchAjax = null;
				}
				activeSearchAjax = $.ajax({
					type: "GET",
					url: API_ROOT + "search/" + query,
					success: function(response) {
						console.log(response)
						if(response.status == "success") {
							results = response.payload.search;
							spliceBigArray(results.sets)
							spliceBigArray(results.upcomingEvents)
							spliceBigArray(results.tracks)
							
							var allResults = 0;

							$('.search-results .search-section').empty();

							// Generate search containers

							var setsContainer = $(".search-results .search-section.sets");
							setsContainer.parents(".search-results-container").find(".item-number.sets").text(results.sets.length);
							var uEventsContainer= $(".search-results .search-section.upcoming-events");
							uEventsContainer.parents(".search-results-container").find(".item-number.upcoming-events").text(results.upcomingEvents.length);
							var tracksContainer = $(".search-results .search-section.tracks");
							tracksContainer.parents(".search-results-container").find(".item-number.tracks").text(results.tracks.length);

							// Populate search containers

							for(var s in results.sets) {
								createSetTile(results.sets[s], setsContainer);
								allResults++
								if(allResults == (results.sets.length + results.upcomingEvents.length + results.tracks.length)) {
									displaySearchSections()
								}
							}
							for(var u in results.upcomingEvents) {
								createUpcomingEventTile(results.upcomingEvents[u], uEventsContainer);
								allResults++
								if(allResults == (results.sets.length + results.upcomingEvents.length + results.tracks.length)) {
									displaySearchSections()
								}
							}
							for(var t in results.tracks) {
								createTrackTile(results.tracks[t], tracksContainer);
								allResults++
								if(allResults == (results.sets.length + results.upcomingEvents.length + results.tracks.length)) {
									displaySearchSections()
								}
							}
						} else {
							results = null;
						}
					}
				});
				
			},
			handleChange: function(e) {
				this.setState({
					searchInput: e.target.value
				});
				search();
			},
			render: function() {
				return (
					React.createElement("div", {className: "search-bar flex-fixed-5x flex-row"}, 
						React.createElement("i", {className: "nav-button fa fa-search center click"}), 
		                React.createElement("input", {id: "search", className: "nav-button flex-zero", placeholder: "search an artist, festival, radio mix or track", value: this.state.searchInput, onChange: this.handleChange})
		            )
				);
			}
		})

		var NavMenu = React.createClass({displayName: "NavMenu",
			getInitialState: function() {
				return {
					focused: 0,
					hidden: true
				};
			},
			clicked: function(index) {
				this.setState({
					focused: index 
				});
			},
			render: function() {
				if(this.state.hidden) {
					var style = {
						display: 'none'
					};
				} else {
					var style = undefined;
				}
				return (
					React.createElement("div", {id: "nav-menu", className: "flex-column", style: style}, 
						this.props.items.map(function(m, index){
							return React.createElement("div", {className: "nav-list-item click flex flex-row", onClick: this.clicked.bind(this, index)}, m)
						})
					)
				);
			}
		})

	//home view

		var HomeView = React.createClass({displayName: "HomeView",
			render: function() {
				return (
					React.createElement("div", {id: "home", className: "view flex-row overlay-container hidden"}, 
						React.createElement(HomeSidebar, null), 
						React.createElement(HomeResultsContainer, null)
					)
				);
			}
		});

		var HomeSidebar = React.createClass({displayName: "HomeSidebar",
			render: function() {
				return (
					React.createElement("div", {className: "flex-column flex-fixed sidebar"}, 
	                    React.createElement("div", {className: "flex flex-column overlay-container user-background"}, 
	                        React.createElement("img", {className: "user-image center", src: "images/website/userImage.jpg"})
	                    ), 
	                    React.createElement("div", {className: "flex-2x flex-column user-nav"}, 
	                        React.createElement("div", {className: "view-trigger click flex flex-row active", name: "my-sets"}, 
	                            React.createElement("div", null, "My Sets")
	                        ), 
	                        React.createElement("div", {className: "view-trigger click flex flex-row", name: "new"}, 
	                            React.createElement("div", null, "New")
	                        ), 
	                        React.createElement("div", {className: "view-trigger click flex flex-row", name: "activities"}, 
	                            React.createElement("div", null, "Activities")
	                        )
	                    )
	                )
				);
			}
		});

		var HomeResultsContainer = React.createClass({displayName: "HomeResultsContainer",
			render: function() {
				return (
					React.createElement("div", {className: "flex-row flex-fixed-3x results-container"})
				);
			}
		});

	//landing view

		var LandingView = React.createClass({displayName: "LandingView",
			render: function() {
				return (
					React.createElement("div", {id: "landing", className: "flex-column view"}, 
						React.createElement(LandingHome, null), 
						React.createElement(LandingApp, null), 
						React.createElement(LandingEvents, null)
					)
				);
			}
		});
		
		var LandingHome = React.createClass({displayName: "LandingHome",
			scroll: function() {
				setTimeout(function(){
					$(window).scrollTo($('#landing-2'), 400, {
						offset: - $('header').height()
					});
				}, 200);
			},
			render: function() {
				return (
					React.createElement("div", {className: "flex-column overlay-container landing-view", id: "landing-1"}, 
	                    React.createElement("div", {className: "overlay"}), 
	                    React.createElement("div", {className: "buffer"}), 
	                    React.createElement("div", {className: "header center wow zoomIn"}, "Setmine"), 
	                    React.createElement("div", {className: "center wow zoomIn"}, "Relive your favorite events"), 
	                    React.createElement("div", {className: "buffer"}), 
	                    React.createElement("div", {className: "flex-row center"}, 
	                        React.createElement("a", {href: "http://bit.ly/SetmineiOS", title: "view on App Store", className: "fa fa-apple fa-fw fa-4x wow fadeInLeft click"}), 
	                        React.createElement("a", {href: "http://bit.ly/SetmineAndroid", title: "view on Google Play", className: "fa fa-android fa-fw fa-4x wow fadeInRight click"})
	                    ), 
	                    React.createElement("div", {className: "buffer-5x"}), 
	                    React.createElement("div", {className: "header-small nav-button center click wow fadeInUp", id: "listen-now"}, "Listen Now"), 
	                    React.createElement("div", {className: "buffer"}), 
	                    React.createElement("i", {className: "fa fa-chevron-down center click wow slideInUp", onClick: this.scroll}), 
	                    React.createElement("div", {className: "buffer"})
	                )
				);
			}
		});

		var LandingApp = React.createClass({displayName: "LandingApp",
			render: function() {
				return (
					React.createElement("div", {className: "flex-column landing-view overlay-container", id: "landing-2"}, 
	                    React.createElement("div", {className: "flex-row overlay-container slide slide-1 hidden"}, 
	                        React.createElement("div", {className: "flex-column flex-fixed text-container"}, 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "header-medium center wow bounceInLeft"}, "Unlock exclusive content from your favorite artists"), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "center wow bounceInLeft"}, 
	                                'We\'re no strangers to love'
                                ), 
	                            React.createElement("div", {className: "buffer-5x"})
	                        ), 
	                        React.createElement("div", {className: "flex-column flex-fixed image-container"}, 
	                            React.createElement("img", {className: "center wow slideInUp", src: "images/website/slide-2.jpg"})
	                        )
	                    ), 
	                    React.createElement("div", {className: "flex-row overlay-container slide slide-2 hidden"}, 
	                        React.createElement("div", {className: "flex-column flex-fixed text-container"}, 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "header-medium center animated bounceInLeft"}, "Say goodbye to missing a live performance"), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "center animated bounceInLeft"}, 'Setmine lets you listen any live set or recorded mix completely free, allowing you to relive your favorite events, or catch up on the ones you missed.'), 
	                            React.createElement("div", {className: "buffer-5x"})
	                        ), 
	                        React.createElement("div", {className: "flex-column flex-fixed image-container"}, 
	                            React.createElement("img", {className: "center animated slideInUp", src: "images/website/slide-2.jpg"})
	                        )
	                    ), 
	                    React.createElement("div", {className: "flex-row overlay-container slide slide-3"}, 
	                        React.createElement("div", {className: "flex-column flex-fixed text-container"}, 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "header-medium center animated bounceInLeft"}, "See which song is playing with interactive tracklists"), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "center animated bounceInLeft"}, 'Search for your favorite tracks and hear the results in live set form. We\'ll fast-forward you right where the artist drops the track'), 
	                            React.createElement("div", {className: "buffer-5x"})
	                        ), 
	                        React.createElement("div", {className: "flex-column flex-fixed image-container"}, 
	                            React.createElement("img", {className: "center animated fadeIn", src: "images/website/slide-3.jpg"})
	                        )
	                    ), 
	                    React.createElement("div", {className: "flex-row overlay-container slide slide-4 hidden"}, 
	                        React.createElement("div", {className: "flex-column flex-fixed text-container"}, 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "animated bounceInLeft"}, "Setmine's Activities feature makes it easy to find the perfect set for whatever you're doing."), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "animated bounceInLeft"}, "Get pumped to workout to Skrillex. Relax and chill with Kygo and Thomas Jack. Zone into a study sesh with Above & Beyond."), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "divider center animated zoomIn"}), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "animated bounceInLeft"}, "Save your favorite sets for quick and easy listening with My Sets"), 
	                            React.createElement("div", {className: "buffer"}), 
	                            React.createElement("div", {className: "animated bounceInLeft"}, "You can enjoy these features with a quick one-time facebook login."), 
	                            React.createElement("div", {className: "buffer"})
	                        ), 
	                        React.createElement("div", {className: "flex-column flex-fixed image-container"}, 
	                            React.createElement("img", {className: "center animated slideInUp", src: "images/website/slide-4.jpg"})
	                        )
	                    ), 
	                    React.createElement(LandingSlideControls, null)
	                )
				);
			}
		});

		var LandingSlideControls = React.createClass({displayName: "LandingSlideControls",
			getInitialState: function() {
				return {
					active: true
				}
			},
			transitionSlide: function() {
				console.log('bruh');
			},
			render: function() {
				return (
					React.createElement("div", {className: "flex-row slide-controls"}, 
                        React.createElement(LandingSlideButton, null), 
                        React.createElement(LandingSlideButton, null), 
                        React.createElement(LandingSlideButton, null), 
                        React.createElement(LandingSlideButton, null)
                    )
				);
			}
		})

		var LandingSlideButton = React.createClass({displayName: "LandingSlideButton",
			getInitialState: function() {
				return {
					active: false,
					icon: "fa fa-fw click fa-circle-o"
				};
			},
			activeSlide: function() {
				this.setState({
					active: !this.state.active,
					icon: this.state.active ? "fa fa-fw click fa-circle" : "fa fa-fw click fa-circle-o"
				});
			},
			render: function() {
				return (
					React.createElement("i", {className: this.state.icon, onClick: this.activeSlide})
				);
			}
		})

		var LandingEvents = React.createClass({displayName: "LandingEvents",
			render: function() {
				return (
					React.createElement("div", {className: "flex-column landing-view", id: "landing-3"}, 
	                    React.createElement("div", {className: "flex-column flex-3x image-container overlay-container"}, 
	                        React.createElement("div", {className: "overlay"}), 
	                        React.createElement("div", {className: "header-medium wow bounceInLeft"}, "Discover upcoming events near you.")
	                    ), 
	                    React.createElement("div", {className: "flex-column flex text-container"}, 
	                        React.createElement("div", {className: "buffer"}), 
	                        React.createElement("div", {className: "wow fadeInUp"}, "Our streamlined event discovery feature allows you to find local events, view lineups, and purchase tickets within the app."), 
	                        React.createElement("div", {className: "buffer"}), 
	                        React.createElement("div", {className: "divider center wow zoomIn"}), 
	                        React.createElement("div", {className: "buffer"}), 
	                        React.createElement("div", {className: "wow fadeInUp"}, "You can see whos playing around the world, or in your hometown."), 
	                        React.createElement("div", {className: "buffer"})
	                    )
	                )
				);
			}
		});

	//player

		var Player = React.createClass({displayName: "Player",
			getInitialState: function() {
				return {
					playing: false,
					hidden: true,
					currentPosition: 0,
					currentTime: "00:00"
				}
			},
			getDefaultProps: function () {
				return {
					setName: 'TomorrowLand 2015',
					artist: 'Deadmau5',
					currentTrack: 'Animals - Martin Garrix',
					setLength: 0,
				}
			},
			render: function() {
				return (
					React.createElement("div", {className: "player flex-row hidden"}, 
					    React.createElement(PlayerControl, null), 
					    React.createElement("div", {className: "flex-column flex"}, 
					        React.createElement(PlayerSeek, null), 
					        React.createElement("div", {className: "flex-row flex"}, 
					            React.createElement(PlayerSetInfo, {set: this.props.set.name, artist: this.props.artist}), 
					            React.createElement(PlayerTrackInfo, {track: this.props.set})
					        )
					    )
					)
				);
			}
		});

		var PlayerControl = React.createClass({displayName: "PlayerControl",
			getInitialState: function() {
				return {
					playing: false, 
				};
			},
			togglePlay: function() {
				this.setState({
					playing: !this.state.playing
				});
			},
			populatePlayer: function() {
				if(this.state.playing) {

				}
			},
			render: function() {
				return (
					React.createElement("div", {className: "player-image-container overlay-container click", onClick: this.togglePlay}, 
				        React.createElement("div", {className: "overlay set-flex"}, 
				            React.createElement("i", {className: this.state.playing ? "fa fa-pause center" : "fa fa-play center", id: "play-button"})
				        ), 
				        React.createElement("img", null)
				    )
				);
			}
		});

		var PlayerSetInfo = React.createClass({displayName: "PlayerSetInfo",
			render: function() {
				return (
					React.createElement("div", {className: "player-set-info flex-column flex-fixed"}, 
		                React.createElement("div", {className: "set-name flex"}, this.props.set.artist + ' - ' + this.props.set.event), 
		                React.createElement("div", {className: "set-time flex"}, this.props.set.set_length)
		            )
				);
			}
		});

		var PlayerTrackInfo = React.createClass({displayName: "PlayerTrackInfo",
			render: function() {
				return (
					React.createElement("div", {className: "player-track-info flex-row flex-fixed"}, 
		                React.createElement("div", {className: "current-track center flex"}, this.props.track.trackname), 
		                React.createElement("i", {className: "fa fa-fw fa-bars click flex-zero"}), 
		                React.createElement("i", {className: "fa fa-fw fa-share click flex-zero"})
		            )
				);
			}
		});

		var PlayerTrack = React.createClass({displayName: "PlayerTrack",
			render: function() {
				return (
					React.createElement("div", {className: "tracklist-item flex-row"}, 
						React.createElement("div", {className: "center"}, this.props.track.trackname)
					)
				);
			}
		});

		var PlayerTrackList = React.createClass({displayName: "PlayerTrackList",
			render: function() {
				return (
					React.createElement("div", {className: "player-tracklist"}, 
						React.createElement(PlayerTrack, {track: ""})
					)
				);
			}
		})

		var PlayerSeek = React.createClass({displayName: "PlayerSeek",
			render: function() {
				return (
					React.createElement("div", {className: "player-seek-container"}, 
			            React.createElement("div", {className: "player-seek-position"})
			        )
				);
			}
		})

	//search view

		var SearchResultsView = React.createClass({displayName: "SearchResultsView",
			getInitialState: function() {
				return {
					type: 'sets' 
				};
			},
			render: function() {
				return (
					React.createElement("div", {id: "search-results", className: "view overlay-container hidden"}, 
		                React.createElement("div", {className: "flex-row view-title-container sets"}, 
		                    React.createElement("div", {className: "view-title sets results-filter flex set-flex"}, 
		                        React.createElement("div", {className: "center"}, "Sets")
		                    ), 
		                    React.createElement("div", {className: "view-title events results-filter flex set-flex"}, 
		                        React.createElement("div", {className: "center"}, "Events")
		                    ), 
		                    React.createElement("div", {className: "view-title tracks results-filter flex set-flex"}, 
		                        React.createElement("div", {className: "center"}, "Tracks")
		                    ), 
		                    React.createElement("div", {className: "divider"})
		                ), 
		                React.createElement("div", {className: "search-results"})
		            )
				);
			}
		});

	//misc conponents

		var ResultsContainer = React.createClass({displayName: "ResultsContainer",
			render: function() {
				return (
					React.createElement("div", {className: "results-container flex-row flex"}, 
						React.createElement(SetTile, null)
					)
				);
			}
		});

		var ViewTitleContainer = React.createClass({displayName: "ViewTitleContainer",
			getInitialState: function() {
				return {
					title: 'Featured' //default
				};
			},
			render: function() {
				return (
					React.createElement("div", {className: "flex-column view-title-container flex-zero"}, 
	                    React.createElement("div", {className: "center view-title"}, this.state.title), 
	                    React.createElement("div", {className: "divider"})
	                )
				);
			}
		});

	//main view controller
		var MainViewController = React.createClass({displayName: "MainViewController",
			render: function() {
				return (
					React.createElement("div", {id: "main-container"}, 
						React.createElement(LandingView, null), 
						React.createElement(SearchResultsView, null), 
						React.createElement(BrowseView, null), 
						React.createElement(HomeView, null), 
						React.createElement(FeaturedView, null), 
						React.createElement(DetailView, {data: this.props.data})
					)
				);
			}
		});

	//top level component container
		var Content = React.createClass({displayName: "Content",
			render: function() {
				return (
					React.createElement("div", {id: "content"}, 
						React.createElement(Header, null), 
						React.createElement(NavMenu, {items: ['Home', 'Sets', 'Upcoming', 'Artists', 'Festivals', 'Mixes', 'Genres']}), 
						React.createElement(MainViewController, {data: this.props.data}), 
						React.createElement(Player, null), 
						React.createElement(Footer, null)
					)
				);
			}
		});

	//testing environment

		var TestView = React.createClass({displayName: "TestView",
			render: function() {
				return (
					React.createElement("div", {className: "flex-row flex"}, 
						React.createElement(SetTile, {data: this.props.data})
					)
				);
			}
		});

	React.render(React.createElement(Header, null), document.body);
};

},{}]},{},["/Users/oscarlafarga/setmine-web/src/js/index.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvb3NjYXJsYWZhcmdhL3NldG1pbmUtd2ViL3NyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFCQUFxQjs7QUFFckIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLElBQUksT0FBTyxHQUFHLDZEQUE2RCxDQUFDO0FBQzVFLElBQUksa0JBQWtCLEdBQUcsZ0RBQWdELENBQUM7QUFDMUUsSUFBSSxhQUFhLEdBQUcsOENBQThDLENBQUM7QUFDbkUsSUFBSSxRQUFRLEdBQUcsMkJBQTJCLEdBQUcsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUMvRCxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBSSxXQUFXLEdBQUcsbUVBQW1FO0FBQ3JGLElBQUksT0FBTyxHQUFHLDBEQUEwRCxDQUFDOztBQUV6RSxTQUFTOztBQUVULElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN4QixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7O0FBRXZCLElBQUksTUFBTSxHQUFHO0NBQ1osT0FBTyxHQUFHLEVBQUU7Q0FDWixTQUFTLEdBQUcsRUFBRTtDQUNkLEtBQUssR0FBRyxFQUFFO0NBQ1YsTUFBTSxHQUFHLEVBQUU7Q0FDWCxVQUFVLEdBQUcsRUFBRTtDQUNmLE9BQU8sR0FBRyxFQUFFO0FBQ2IsQ0FBQzs7QUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEksSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUs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VztJQUNsQjtLQUNDLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsRUFBQSxFQUFFLENBQUMsU0FBVSxDQUFBLEVBQUE7TUFDakIsb0JBQUMsTUFBTSxFQUFBLElBQUEsQ0FBRyxDQUFBLEVBQUE7TUFDVixvQkFBQyxPQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFFLENBQUEsQ0FBRyxDQUFBLEVBQUE7TUFDM0Ysb0JBQUMsa0JBQWtCLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSyxDQUFBLENBQUcsQ0FBQSxFQUFBO01BQzdDLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO01BQ1Ysb0JBQUMsTUFBTSxFQUFBLElBQUEsQ0FBRyxDQUFBO0tBQ0wsQ0FBQTtNQUNMO0lBQ0Y7QUFDSixHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0E7O0VBRUUsSUFBSSw4QkFBOEIsd0JBQUE7R0FDakMsTUFBTSxFQUFFLFdBQVc7SUFDbEI7S0FDQyxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGVBQWdCLENBQUEsRUFBQTtNQUM5QixvQkFBQyxPQUFPLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSyxDQUFBLENBQUcsQ0FBQTtLQUM3QixDQUFBO01BQ0w7SUFDRjtBQUNKLEdBQUcsQ0FBQyxDQUFDOztDQUVKLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsTUFBTSxFQUFBLElBQUUsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN2QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEFQSV9WRVJTSU9OID0gNztcbnZhciBTM19ST09UID0gXCJodHRwOi8vc3RyZWRtLnMzLXdlYnNpdGUtdXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vbmFtZWNoZWFwL1wiO1xudmFyIFMzX1JPT1RfRk9SX0lNQUdFUyA9IFwiaHR0cDovL2Qxd2J4Ynk4ZHdhNHUuY2xvdWRmcm9udC5uZXQvbmFtZWNoZWFwL1wiO1xudmFyIERFRkFVTFRfSU1BR0UgPSBcImNhNmEyNTBmYzg0ZjMwZTU3MWE2MjI4NmZjOGMyYzE2YzdjZTY0YjQucG5nXCI7XG52YXIgQVBJX1JPT1QgPSAnaHR0cDovL3NldG1pbmUuY29tL2FwaS92LycgKyBBUElfVkVSU0lPTiArICcvJztcbnZhciBJTUFHRV9ST09UID0gJy9pbWFnZXMvJztcbnZhciBBTkRST0lEX1VSTCA9IFwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5zZXRtaW5lLmFuZHJvaWRcIlxudmFyIElPU19VUkwgPSBcImh0dHBzOi8vaXR1bmVzLmFwcGxlLmNvbS91cy9hcHAvc2V0bWluZS9pZDkyMTMyNTY4OD9tdD04XCI7XG5cbi8vIE1vZGVsc1xuXG52YXIgbW9kZWxzUmVhZHkgPSBmYWxzZTtcbnZhciByZXF1aXJlZE1vZGVscyA9IDY7XG5cbnZhciBtb2RlbHMgPSB7XG5cdGFydGlzdHMgOiBbXSxcblx0ZmVzdGl2YWxzIDogW10sXG5cdG1peGVzIDogW10sXG5cdGdlbnJlcyA6IFtdLFxuXHRhY3Rpdml0aWVzIDogW10sXG5cdGxhbmRpbmcgOiBbXVxufVxuXG52YXIgbW9udGhzID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl07XG52YXIgd2Vla0RheXMgPSBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXTtcblxudmFyIGlzTW9iaWxlID0ge1xuICAgIEFuZHJvaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcbiAgICB9LFxuICAgIEJsYWNrQmVycnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKTtcbiAgICB9LFxuICAgIGlPUzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpO1xuICAgIH0sXG4gICAgT3BlcmE6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9pKTtcbiAgICB9LFxuICAgIFdpbmRvd3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvSUVNb2JpbGUvaSk7XG4gICAgfSxcbiAgICBhbnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKGlzTW9iaWxlLkFuZHJvaWQoKSB8fCBpc01vYmlsZS5CbGFja0JlcnJ5KCkgfHwgaXNNb2JpbGUuaU9TKCkgfHwgaXNNb2JpbGUuT3BlcmEoKSB8fCBpc01vYmlsZS5XaW5kb3dzKCkpO1xuICAgIH1cbn07XG5cbiQuaG9sZFJlYWR5KHRydWUpO1xuXG4vLyBEbyBub3QgZmlyZSB0aGUgZG9jdW1lbnRzIHJlYWR5IGxpc3RlbmVyIHVudGlsIGFsbCBtb2RlbHMgYXJlIGxvYWRlZFxuXG5mdW5jdGlvbiBnZXRNb2RlbHMoY2FsbGJhY2spIHtcblx0dmFyIHJlYWR5TW9kZWxzQ291bnQgPSAwO1xuXG5cdC8vICBHZXQgYW5kIHN0b3JlIG9ubHkgYXJ0aXN0cyB3aXRoIHNldHNcblxuXHQkLmFqYXgoe1xuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0dXJsOiBBUElfUk9PVCArIFwiYXJ0aXN0XCIsXG5cdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuXG5cdFx0XHRcdC8vIFNwbGl0IGFydGlzdHMgaW50byBzdWJncm91cHMgb2YgNTAgdG8gYmUgbG9hZGVkIG9uZSBhdCBhIHRpbWUgaW4gQnJvd3NlIGxpc3Rcblx0XHRcdFx0dmFyIGFydGlzdE1vZGVscyA9IHJlc3BvbnNlLnBheWxvYWQuYXJ0aXN0O1xuXHRcdFx0XHRmb3IodmFyIGEgaW4gYXJ0aXN0TW9kZWxzKSB7XG5cdFx0XHRcdFx0bW9kZWxzLmFydGlzdHNbYV0gPSBhcnRpc3RNb2RlbHNbYV07XG5cdFx0XHRcdFx0aWYobW9kZWxzLmFydGlzdHMubGVuZ3RoID09IGFydGlzdE1vZGVscy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0cmVhZHlNb2RlbHNDb3VudCsrO1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKHJlYWR5TW9kZWxzQ291bnQpO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBHZXQgYW5kIHN0b3JlIGZlc3RpdmFsc1xuXG5cdCQuYWpheCh7XG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHR1cmw6IEFQSV9ST09UICsgXCJmZXN0aXZhbFwiLFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcblx0XHRcdFx0dmFyIGZlc3RpdmFsTW9kZWxzID0gcmVzcG9uc2UucGF5bG9hZC5mZXN0aXZhbDtcblx0XHRcdFx0Zm9yKHZhciBmIGluIGZlc3RpdmFsTW9kZWxzKSB7XG5cdFx0XHRcdFx0bW9kZWxzLmZlc3RpdmFsc1tmXSA9IGZlc3RpdmFsTW9kZWxzW2ZdO1xuXHRcdFx0XHRcdGlmKG1vZGVscy5mZXN0aXZhbHMubGVuZ3RoID09IGZlc3RpdmFsTW9kZWxzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0cmVhZHlNb2RlbHNDb3VudCsrO1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKHJlYWR5TW9kZWxzQ291bnQpO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBHZXQgYW5kIHN0b3JlIGFsbCBtaXhlc1xuXG5cdCQuYWpheCh7XG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHR1cmw6IEFQSV9ST09UICsgXCJtaXhcIixcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XG5cdFx0XHRcdHZhciBtaXhNb2RlbHMgPSByZXNwb25zZS5wYXlsb2FkLm1peDtcblx0XHRcdFx0Zm9yKHZhciBtIGluIG1peE1vZGVscykge1xuXHRcdFx0XHRcdG1vZGVscy5taXhlc1ttXSA9IG1peE1vZGVsc1ttXTtcblx0XHRcdFx0XHRpZihtb2RlbHMubWl4ZXMubGVuZ3RoID09IG1peE1vZGVscy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHJlYWR5TW9kZWxzQ291bnQrKztcblx0XHRcdFx0XHRcdC8vIHVwZGF0ZVByb2dyZXNzQmFyKCk7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayhyZWFkeU1vZGVsc0NvdW50KTtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gR2V0IGFuZCBzdG9yZSBhbGwgZ2VucmVzXG5cblx0JC5hamF4KHtcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdHVybDogQVBJX1JPT1QgKyBcImdlbnJlXCIsXG5cdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xuXHRcdFx0XHR2YXIgZ2VucmVNb2RlbHMgPSByZXNwb25zZS5wYXlsb2FkLmdlbnJlO1xuXHRcdFx0XHRmb3IodmFyIGcgaW4gZ2VucmVNb2RlbHMpIHtcblx0XHRcdFx0XHRtb2RlbHMuZ2VucmVzW2ddID0gZ2VucmVNb2RlbHNbZ107XG5cdFx0XHRcdFx0aWYobW9kZWxzLmdlbnJlcy5sZW5ndGggPT0gZ2VucmVNb2RlbHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRyZWFkeU1vZGVsc0NvdW50Kys7XG5cdFx0XHRcdFx0XHQvLyB1cGRhdGVQcm9ncmVzc0JhcigpO1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2socmVhZHlNb2RlbHNDb3VudCk7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8vIEdldCBhbmQgc3RvcmUgYWxsIGFjdGl2aXRpZXNcblxuXHQkLmFqYXgoe1xuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0dXJsOiBBUElfUk9PVCArIFwiYWN0aXZpdHlcIixcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XG5cdFx0XHRcdHZhciBhY3Rpdml0eU1vZGVscyA9IHJlc3BvbnNlLnBheWxvYWQuYWN0aXZpdHk7XG5cdFx0XHRcdGZvcih2YXIgYSBpbiBhY3Rpdml0eU1vZGVscykge1xuXHRcdFx0XHRcdG1vZGVscy5hY3Rpdml0aWVzW2FdID0gYWN0aXZpdHlNb2RlbHNbYV07XG5cdFx0XHRcdFx0aWYobW9kZWxzLmFjdGl2aXRpZXMubGVuZ3RoID09IGFjdGl2aXR5TW9kZWxzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0cmVhZHlNb2RlbHNDb3VudCsrO1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKHJlYWR5TW9kZWxzQ291bnQpO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBHZXQgYW5kIHN0b3JlIGxhbmRpbmcgZXZlbnRzXG5cblx0JC5hamF4KHtcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdHVybDogQVBJX1JPT1QgKyBcImxhbmRpbmdcIixcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09IFwic3VjY2Vzc1wiKSB7XG5cdFx0XHRcdHZhciBsYW5kaW5nTW9kZWxzID0gcmVzcG9uc2UucGF5bG9hZC5sYW5kaW5nO1xuXHRcdFx0XHRmb3IodmFyIGwgaW4gbGFuZGluZ01vZGVscykge1xuXHRcdFx0XHRcdG1vZGVscy5sYW5kaW5nW2xdID0gbGFuZGluZ01vZGVsc1tsXTtcblx0XHRcdFx0XHRpZihtb2RlbHMubGFuZGluZy5sZW5ndGggPT0gbGFuZGluZ01vZGVscy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHJlYWR5TW9kZWxzQ291bnQrKztcblx0XHRcdFx0XHRcdC8vIHVwZGF0ZVByb2dyZXNzQmFyKCk7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayhyZWFkeU1vZGVsc0NvdW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8vIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuXHQvLyBcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2FkZXItYmFyLXByb2dyZXNzXCIpWzBdLnN0eWxlLndpZHRoID0gKHJlYWR5TW9kZWxzQ291bnQvcmVxdWlyZWRNb2RlbHMqMTAwKS50b1N0cmluZygpICsgXCIlXCI7XG5cdC8vIH1cbn1cblxuLy8gb25Nb2RlbHNSZWFkeSBnZXRzIGZpcmVkIHdoZW4gYWxsIDUgYWpheCByZXF1ZXN0cyBoYXZlIGNvbXBsZXRlZFxuXG5mdW5jdGlvbiBvbk1vZGVsc1JlYWR5KHJlYWR5TW9kZWxzQ291bnQpIHtcblx0aWYocmVhZHlNb2RlbHNDb3VudCA9PSByZXF1aXJlZE1vZGVscykge1xuXHRcdGNvbnNvbGUubG9nKFwibW9kZWxzIHJlYWR5XCIpXG5cdFx0bW9kZWxzUmVhZHkgPSB0cnVlO1xuXHRcdGNvbnNvbGUubG9nKG1vZGVscylcblx0XHRpbml0aWFsaXplUmVhY3QoKVxuXHR9XG5cdFxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdGlmKHJlc3BvbnNlLnN0YXR1cyA9PSBcInN1Y2Nlc3NcIikgeyByZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XG59XG5cbmZ1bmN0aW9uIGRldGVjdE1vYmlsZUJyb3dzZXIoKSB7XG5cdGlmKGlzTW9iaWxlLmFueSgpKSB7XG5cdFx0Y29uc29sZS5sb2coXCJNb2JpbGVcIik7XG5cdFx0JChcIiNzbGlkZS0yXCIpLmRldGFjaCgpLmluc2VydEFmdGVyKFwiLnVzZXIuaGVhZGVyLXdyYXBwZXJcIilcblx0XHQkKFwiI3NsaWRlLTIgLmFwcC1wYXJhbGxheFwiKS5jc3MoXCJtYXJnaW5cIiwgMClcblx0XHRpZihpc01vYmlsZS5pT1MoKSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJpT1NcIilcblx0XHRcdGNvbnNvbGUubG9nKFwic2V0bWluZTovL3NldG1pbmUuY29tL1wiICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpXG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcInNldG1pbmU6Ly9zZXRtaW5lLmNvbS9cIiArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpXG5cdFx0fVxuXHR9XG59XG5cbi8vIEdsb2JhbCBPYmplY3RzXG5cbnZhciBjb252ZXJ0ID0ge1xuXHRNTVNTVG9NaWxsaXNlY29uZHM6IGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRyZXR1cm4gdG90YWxTZWNzID0gKHBhcnNlSW50KHRpbWUuc3BsaXQoXCI6XCIpWzBdKSo2MCArIHBhcnNlSW50KHRpbWUuc3BsaXQoXCI6XCIpWzFdKSkqMTAwMDtcblx0fSxcblx0bWlsbGlzZWNvbmRzVG9NTVNTOiBmdW5jdGlvbihzZWNzKSB7XG4gICAgXHR2YXIgbWludXRlcyA9IE1hdGguZmxvb3Ioc2VjcyAvIDYwKTtcbiAgICBcdHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcihzZWNzIC0gKG1pbnV0ZXMgKiA2MCkpO1xuICAgIFx0aWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBcdGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG4gICAgXHR2YXIgdGltZSA9IG1pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgXHRyZXR1cm4gdGltZTtcbiAgICB9XG59XG5cbmdldE1vZGVscyhvbk1vZGVsc1JlYWR5KTtcblxuZGV0ZWN0TW9iaWxlQnJvd3NlcigpO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplUmVhY3QoKSB7XG5cblx0Y29uc29sZS5sb2coXCJpbml0aWFsaXplUmVhY3RcIilcblxuXHQvL3NldCB0aWxlXG5cblx0XHR2YXIgU2V0VGlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdC8vZm9yIHRlc3Rpbmdcblx0XHRcdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c2V0OiBudWxsLFxuXHRcdFx0XHRcdGFydGlzdDogbnVsbCxcblx0XHRcdFx0XHRwbGF5Q291bnQ6IG51bGwsXG5cdFx0XHRcdFx0c2V0TGVuZ3RoOiBudWxsLFxuXHRcdFx0XHRcdGltYWdlVXJsOiBudWxsXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRoYW5kbGVQbGF5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3NldCBwbGF5aW5nJyk7XG5cdFx0XHR9LFxuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIG92ZXJsYXktY29udGFpbmVyIHNldC10aWxlXCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT1cImV2ZW50LWltYWdlXCIgc3JjPXtTM19ST09UX0ZPUl9JTUFHRVMgKyB0aGlzLnByb3BzLnNldC5tYWluX2V2ZW50aW1hZ2VVUkx9IC8+XG5cdFx0XHRcdFx0ICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheVwiPjwvZGl2PlxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlci00eFwiPjwvZGl2PlxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXggdGlsZS1jb250cm9sc1wiPlxuXHRcdFx0XHRcdCAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBmbGV4XCI+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4IG92ZXJsYXktY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYXJ0aXN0LWltYWdlXCIgc3JjPXt0aGlzLnByb3BzLnNldC5hcnRpc3RpbWFnZVVSTH0gLz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXggc2V0LWluZm9cIj5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXIgY2xpY2sgZmxleFwiPnt0aGlzLnByb3BzLnNldC5zZXR9PC9kaXY+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyIGNsaWNrIGZsZXhcIj57dGhpcy5wcm9wcy5zZXQuYXJ0aXN0fTwvZGl2PlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtcm93IGZsZXgtMnhcIj5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXN0YXIgY2VudGVyIGNsaWNrIGZsZXhcIj48L2k+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1zaGFyZS1vIGNlbnRlciBjbGljayBmbGV4XCI+PC9pPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdCAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9kaXY+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtcm93IGZsZXgtMnhcIj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtZml4ZWQgc2V0LWZsZXggcGxheS1jb3VudCBjbGljayB0aWxlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuaGFubGRlUGxheX0+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXkgY2VudGVyXCI+e3RoaXMucHJvcHMuc2V0LnBvcHVsYXJpdHl9PC9pPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvZGl2PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1maXhlZCBzZXQtZmxleCBzZXQtbGVuZ3RoXCI+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNsb2NrLW8gY2VudGVyXCI+e3RoaXMucHJvcHMuc2V0LnNldF9lbmd0aH08L2k+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdFx0ICAgICAgICA8L2Rpdj5cblx0XHRcdFx0XHQgICAgPC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxuXG5cdC8vYnJvd3NlIHBhZ2VcblxuXHRcdHZhciBCcm93c2VWaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGlkPVwiYnJvd3NlXCIgY2xhc3NOYW1lPVwidmlldyBvdmVybGF5LWNvbnRhaW5lciBoaWRkZW5cIj5cblx0XHRcdFx0XHRcdDxWaWV3VGl0bGVDb250YWluZXIgdHlwZT17dGhpcy5wcm9wcy50eXBlfSAvPlxuXHRcdFx0XHRcdFx0PFJlc3VsdHNDb250YWluZXIgcmVzdWx0cz17dGhpcy5wcm9wcy5yZXN1bHRzfSAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0XG5cdC8vZGV0YWlsIHBhZ2VcblxuXHRcdHZhciBEZXRhaWxWaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRkYXRhOiBbXSxcblx0XHRcdFx0XHRwYWdlVHlwZTogbnVsbCBcblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvL1RFU1QgZGV0ZXJtaW5lIGlmIGFydGlzdCBvciBldmVudCBkZXRhaWxcblx0XHRcdFx0dmFyIGRldGFpbFR5cGUgPSAnYXJ0aXN0JzsgLy8gc3RhdGVcblx0XHRcdFx0aWYoZGV0YWlsVHlwZSA9PSAnYXJ0aXN0Jykge1xuXHRcdFx0XHRcdHRpdGxlID0gdGhpcy5wcm9wcy5kZXRhaWxEYXRhLmFydGlzdFxuXHRcdFx0XHRcdGJ1dHRvbl90ZXh0ID0gXCJGb2xsb3dcIlxuXHRcdFx0XHRcdGluZm8gPSB0aGlzLnByb3BzLmRldGFpbERhdGEuc2V0X2NvdW50ICsgXCIgc2V0cyB8IFwiICsgdGhpcy5wcm9wcy5kZXRhaWxEYXRhLmV2ZW50X2NvdW50ICsgXCIgZXZlbnRzXCJcblx0XHRcdFx0XHRpbWFnZVVSTCA9IHRoaXMucHJvcHMuZGV0YWlsRGF0YS5pbWFnZVVSTFxuXHRcdFx0XHRcdG5hdlRpdGxlcyA9IFtcInNldHNcIixcImV2ZW50c1wiXVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRpdGxlID0gdGhpcy5wcm9wcy5kZXRhaWxEYXRhLmV2ZW50XG5cdFx0XHRcdFx0YnV0dG9uX3RleHQgPSBcIlRpY2tldHNcIlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGluZm8gPSB0aGlzLnByb3BzLmRldGFpbERhdGEuc3RhcnRfZGF0ZSArIFwiIC0gXCIgKyB0aGlzLnByb3BzLmRldGFpbERhdGEuZW5kX2RhdGVcblxuXHRcdFx0XHRcdGltYWdlVVJMID0gdGhpcy5wcm9wcy5kZXRhaWxEYXRhLm1haW5fZXZlbnRpbWFnZVVSTFxuXHRcdFx0XHRcdG5hdlRpdGxlcyA9IFtcImxpbmV1cFwiXVxuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRlbnQgPSB0aGlzLnByb3BzLmRldGFpbERhdGFcblx0XHRcdFx0dmFyIGxpbmtzID0gW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6ICdmYWNlYm9vaycsXG5cdFx0XHRcdFx0XHR1cmw6IHRoaXMucHJvcHMuZGV0YWlsRGF0YS5mYl9saW5rXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiAndHdpdHRlcicsXG5cdFx0XHRcdFx0XHR1cmw6IHRoaXMucHJvcHMuZGV0YWlsRGF0YS50d2l0dGVyX2xpbmtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6ICdpbnN0YWdyYW0nLFxuXHRcdFx0XHRcdFx0dXJsOiB0aGlzLnByb3BzLmRldGFpbERhdGEuaW5zdGFncmFtX2xpbmtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6ICdzb3VuZGNsb3VkJyxcblx0XHRcdFx0XHRcdHVybDogdGhpcy5wcm9wcy5kZXRhaWxEYXRhLnNvdW5kY2xvdWRfbGlua1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogJ3lvdXR1YmUnLFxuXHRcdFx0XHRcdFx0dXJsOiB0aGlzLnByb3BzLmRldGFpbERhdGEueW91dHViZV9saW5rXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiAnd2ViJyxcblx0XHRcdFx0XHRcdHVybDogdGhpcy5wcm9wcy5kZXRhaWxEYXRhLndlYl9saW5rXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuZGV0YWlsRGF0YSlcblx0XHRcdFx0Y29uc29sZS5sb2cobGlua3MpXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBpZD1cImRldGFpbFwiIGNsYXNzTmFtZT1cInZpZXcgZGV0YWlsLXBhZ2VcIj5cblx0XHRcdFx0XHRcdDxEZXRhaWxJbWFnZUNvbnRhaW5lciB0aXRsZT17dGl0bGV9IGJ1dHRvbl90ZXh0PXtidXR0b25fdGV4dH0gaW1hZ2VVUkw9e2ltYWdlVVJMfSBpbmZvPXtpbmZvfSAvPlxuXHRcdFx0XHRcdFx0PExpbmtCdXR0b25zQ29udGFpbmVyIGxpbmtzPXtsaW5rc30gLz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvZGl2PlxuXHRcdFx0XHRcdFx0PERldGFpbENvbnRlbnRDb250YWluZXIgbmF2VGl0bGVzPXtuYXZUaXRsZXN9IGNvbnRlbnQ9e2NvbnRlbnR9Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHZhciBEZXRhaWxJbWFnZUNvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcdC8vIERpc3BsYXlzIGtleSBkZXRhaWwgaW5mb3JtYXRpb25cblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4IGltYWdlLWNvbnRhaW5lciBvdmVybGF5LWNvbnRhaW5lclwiIHN0eWxlPXt7YmFja2dyb3VuZDogXCJ1cmwoJ1wiICsgUzNfUk9PVF9GT1JfSU1BR0VTICsgaW1hZ2VVUkwgKyBcIicpXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyIGNlbnRlciBhcnRpc3QtbmFtZVwiPnt0aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXNtYWxsIGNlbnRlclwiPntpbmZvfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXNtYWxsIGNlbnRlciBjbGlja1wiIGlkPVwiZGV0YWlsLWJ1dHRvblwiPntidXR0b25fdGV4dH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIExpbmtCdXR0b25zQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1x0Ly8gRGlzcGxheXMgbGlua3MgaW4gYSByb3dcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBsaW5rSXRlbXMgPSBbXVxuXHRcdFx0XHRmb3IodmFyIGkgaW4gdGhpcy5wcm9wcy5saW5rcykge1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wcm9wcy5saW5rcy5tYXAoZnVuY3Rpb24obGluaykge1xuXHRcdFx0XHRcdGxpbmtJdGVtcy5wdXNoKDxMaW5rQnV0dG9uIHR5cGU9e2xpbmsudHlwZX0gdXJsPXtsaW5rLnVybH0vPilcblx0XHRcdFx0fSlcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtcm93IGxpbmtzLWNvbnRhaW5lclwiPntsaW5rSXRlbXN9PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR2YXIgTGlua0J1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHsgLy8gRGlzcGxheXMgYSBidXR0b24gdG8gYW4gZXh0ZXJuYWwgbGlua1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8YSBocmVmPXt0aGlzLnByb3BzLnVybH0+PGkgY2xhc3NOYW1lPXsnZmEgZmEtZncgZmEtMnggY2xpY2sgZmEtJyt0aGlzLnByb3BzLnR5cGV9PjwvaT48L2E+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHZhciBEZXRhaWxDb250ZW50Q29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1x0Ly8gRGlzcGxheXMgdGhlIHRpdGxlcyBvZiBhIHJlc3VsdHMgY29udGFpbmVyXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8RGV0YWlsTmF2Q29udGFpbmVyIG5hdlRpdGxlcz17dGhpcy5wcm9wcy5uYXZUaXRsZXN9IC8+XG5cdFx0XHRcdFx0XHQ8RGV0YWlsQ29udGVudCBjb250ZW50PXt0aGlzLnByb3BzLmNvbnRlbnR9IC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHZhciBEZXRhaWxOYXZDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHQvLyBEaXNwbGF5cyB0aGUgdGl0bGVzIG9mIGEgcmVzdWx0cyBjb250YWluZXJcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciB0aXRsZXMgPSBbXVxuXHRcdFx0XHR0aGlzLnByb3BzLm5hdlRpdGxlcy5tYXAoZnVuY3Rpb24obmF2VGl0bGUpIHtcblx0XHRcdFx0XHR0aXRsZXMucHVzaCg8RGV0YWlsTmF2QnV0dG9uIHRpdGxlPXtuYXZUaXRsZX0gLz4pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBsaW5rcy1jb250YWluZXJcIj57dGl0bGVzfTwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR2YXIgRGV0YWlsTmF2QnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3MoeyAvLyBDaGFuZ2VzIHRoZSByZXN1bHRzIG9mIGEgY29udGFpbmVyXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsnY2VudGVyIGNsaWNrIGZsZXgtZml4ZWQgJyt0aGlzLnByb3BzLnRpdGxlfT5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLnRpdGxlfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR2YXIgRGV0YWlsQ29udGVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcdC8vIERpc3BsYXlzIGEgdGlsZSBmb3IgZWFjaCBkZXRhaWwgc2V0LCBsaW5ldXAsIG9yIGV2ZW50XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgdGlsZXMgPSBbXVxuXHRcdFx0XHQvLyBpZih0cnVlKSB7XG5cdFx0XHRcdC8vIFx0dGhpcy5wcm9wcy5jb250ZW50LnNldHMuZm9yRWFjaChmdW5jdGlvbihjb250ZW50SXRlbSkge1xuXHRcdFx0XHQvLyBcdFx0dGlsZXMucHVzaCg8U2V0VGlsZS8+KSAvLyBTZXQgdGlsZXNcblx0XHRcdFx0Ly8gXHR9KTtcblx0XHRcdFx0Ly8gfSBlbHNlIGlmKHRydWUpIHtcblx0XHRcdFx0Ly8gXHR0aGlzLnByb3BzLmNvbnRlbnQudXBjb21pbmdFdmVudHMuZm9yRWFjaChmdW5jdGlvbihjb250ZW50SXRlbSkge1xuXHRcdFx0XHQvLyBcdFx0dGlsZXMucHVzaCg8RXZlbnRUaWxlLz4pIC8vIEV2ZW50IHRpbGVzXG5cdFx0XHRcdC8vIFx0fSk7XG5cdFx0XHRcdC8vIH0gZWxzZSB7XG5cdFx0XHRcdC8vIFx0dGhpcy5wcm9wcy5jb250ZW50LmxpbmV1cC5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnRJdGVtKSB7XG5cdFx0XHRcdC8vIFx0XHR0aWxlcy5wdXNoKDxCcm93c2VUaWxlLz4pIC8vIEJyb3dzZSB0aWxlc1xuXHRcdFx0XHQvLyBcdH0pO1xuXHRcdFx0XHQvLyB9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0cy1jb250YWluZXIgZmxleC1yb3cgZmxleFwiPlxuXHRcdFx0XHRcdFx0e3RpbGVzfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0Ly9ldmVudCB0aWxlXG5cblx0XHR2YXIgRXZlbnRUaWxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRldmVudDogbnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ly9mb3IgdGVzdGluZ1xuXHRcdFx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRldmVudDogJ0NvYWNoZWxsYSAyMDE1Jyxcblx0XHRcdFx0XHRpbWFnZTogJ2ltYWdlcy9jb2FjaGVsbGEuanBnJyxcblx0XHRcdFx0XHRtb250aDogJ0FQUicsXG5cdFx0XHRcdFx0ZGF5OiAnMjAnLFxuXHRcdFx0XHRcdGxvY2F0aW9uOiAnSW5kaW8sIENBJyxcblx0XHRcdFx0XHR0aWNrZXRMaW5rOiBudWxsLFxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBvdmVybGF5LWNvbnRhaW5lciBldmVudC10aWxlXCI+XG5cdFx0XHRcdFx0ICAgIDxpbWcgY2xhc3NOYW1lPVwiZXZlbnQtaW1hZ2VcIiBzcmM9e3RoaXMucHJvcHMuZXZlbnQubWFpbl9pbWFnZVVSTH0gLz5cblx0XHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVybGF5XCI+PC9kaXY+XG5cdFx0XHRcdFx0ICAgIDxFdmVudERhdGUgZXZlbnQ9e3RoaXMucHJvcHMuZXZlbnR9IC8+XG5cdFx0XHRcdFx0ICAgIDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvZGl2PlxuXHRcdFx0XHRcdCAgICA8RXZlbnRDb250cm9sbGVyIC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHRcblx0XHR2YXIgRXZlbnREYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdCAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHQgICAgXHR2YXIgbW9udGggPSBtb21lbnQodGhpcy5wcm9wcy5ldmVudC5zdGFydF9kYXRlKS5mb3JtYXQoJ01NTScpXG5cdFx0ICAgIFx0dmFyIGRheSA9IG1vbWVudCh0aGlzLnByb3BzLmV2ZW50LnN0YXJ0X2RhdGUpLmZvcm1hdCgnRCcpXG5cblx0XHQgICAgICAgIHJldHVybiAoXG5cdFx0ICAgICAgICBcdDxkaXYgY2xhc3NOYW1lPVwiZXZlbnQtZGF0ZS1jb250YWluZXIgZmxleC01eCBmbGV4LWNvbHVtblwiPlxuXHRcdFx0XHQgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9udGhcIj57bW9udGh9PC9kaXY+XG5cdFx0XHRcdCAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9kaXY+XG5cdFx0XHRcdCAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXlcIj57ZGF5fTwvZGl2PlxuXHRcdFx0XHQgICAgPC9kaXY+XG5cdFx0ICAgICAgICApO1xuXHRcdCAgICB9XG5cdFx0fSlcblxuXHRcdHZhciBFdmVudENvbnRyb2xsZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGlsZS1jb250cm9scyBmbGV4LXJvdyBmbGV4XCI+XG5cdFx0XHRcdCAgICAgICAgPGEgaHJlZj17dGhpcy5wcm9wcy50aWNrZXRMaW5rfSBjbGFzc05hbWU9XCJzZXQtZmxleCBmbGV4IGNsaWNrIHRpY2tldC1saW5rIHRpbGUtYnV0dG9uXCI+XG5cdFx0XHRcdCAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXRpY2tldCBjZW50ZXJcIj48L2k+XG5cdFx0XHRcdCAgICAgICAgPC9hPlxuXHRcdFx0XHQgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0zeCBmbGV4LWNvbHVtbiBldmVudC1pbmZvXCI+XG5cdFx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xpY2sgY2VudGVyXCI+e3RoaXMucHJvcHMuZXZlbnR9PC9kaXY+XG5cdFx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xpY2sgY2VudGVyXCI+e3RoaXMucHJvcHMubG9jYXRpb259PC9kaXY+XG5cdFx0XHRcdCAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXQtZmxleCBmbGV4IGNsaWNrIGV2ZW50IHZpZXctdHJpZ2dlciB0aWxlLWJ1dHRvblwiPlxuXHRcdFx0XHQgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1sb25nLWFycm93LXJpZ2h0IGNlbnRlclwiPjwvaT5cblx0XHRcdFx0ICAgICAgICA8L2Rpdj5cblx0XHRcdFx0ICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0Ly90cmFjayB0aWxlXG5cblx0XHR2YXIgVHJhY2tUaWxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRyYWNrLXRpbGUgZmxleC1jb2x1bW4gZmxleCBvdmVybGF5LWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJsYXlcIj48L2Rpdj5cblx0XHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4XCI+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYWNrLW5hbWVcIj57dGhpcy5wcm9wcy50cmFjay5zb25nbmFtZX08L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhY2stYXJ0aXN0XCI+e3RoaXMucHJvcHMudHJhY2suYXJ0aXN0bmFtZX08L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXkgZmEtMnggY2xpY2sgYW5pbWF0ZWRcIj48L2k+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYWNrLXRpbWUgY2VudGVyXCI+e3RoaXMucHJvcHMudHJhY2suc3RhcnR0aW1lKycgfCAnK3RoaXMucHJvcHMudHJhY2suc2V0X2xlbmd0aH08L2Rpdj5cblx0XHRcdFx0XHQgICAgPC9kaXY+XG5cdFx0XHRcdFx0ICAgIDxkaXYgY2xhc3NOYW1lPVwidGlsZS1jb250cm9scyBmbGV4LWNvbHVtblwiPlxuXHRcdFx0XHRcdCAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXQtbmFtZSBjbGljayB2aWV3LXRyaWdnZXJcIj57dGhpcy5wcm9wcy50cmFjay5ldmVudH08L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aXN0LW5hbWUgY2xpY2sgdmlldy10cmlnZ2VyXCI+e3RoaXMucHJvcHMudHJhY2suYXJ0aXN0fTwvZGl2PlxuXHRcdFx0XHRcdCAgICA8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdC8vYWN0aXZpdHkgdGlsZVxuXG5cdFx0Ly8gdmFyIEFjdGl2aXR5VGlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHQvLyBcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gXHRcdHJldHVybiAoXG5cdFx0Ly8gXHRcdFx0PGRpdj5cblx0XHQvLyBcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWN0aXZpdHktdGlsZSBmbGV4LWNvbHVtbiBvdmVybGF5LWNvbnRhaW5lclwiIHN0eWxlPXt7YmFja2dyb3VuZDogXCJ1cmwoJ1wiICsgUzNfUk9PVF9GT1JfSU1BR0VTICsgdGhpcy5wcm9wcy5hY3Rpdml0eS5pbWFnZVVSTCArIFwiJylcIn19PlxuXHRcdC8vIFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS10aWxlIGZsZXgtY29sdW1uIG92ZXJsYXktY29udGFpbmVyXCI+XG5cdFx0Ly8gXHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVybGF5XCI+PC9kaXY+XG5cdFx0Ly8gXHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBmbGV4LTN4XCI+XG5cdFx0Ly8gXHRcdFx0XHQgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXJhbmRvbSBjZW50ZXIgY2xpY2tcIj48L2k+XG5cdFx0Ly8gXHRcdFx0XHQgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLTR4IGNlbnRlclwiPjwvaT5cblx0XHQvLyBcdFx0XHRcdCAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtYmFycyBjZW50ZXIgY2xpY2tcIj48L2k+XG5cdFx0Ly8gXHRcdFx0XHQgICAgPC9kaXY+XG5cdFx0Ly8gXHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJzZXQtZmxleCBmbGV4IGFjdHZpdHktbmFtZSBjZW50ZXJcIj57dGhpcy5wcm9wcy5hY3Rpdml0eS5hY3Rpdml0eX08L2Rpdj5cblx0XHQvLyBcdFx0XHRcdDwvZGl2PlxuXHRcdC8vIFx0XHRcdDwvZGl2PlxuXHRcdC8vIFx0XHQpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0pO1xuXG5cdC8vYnJvd3NlIHRpbGVcblx0XHRcblx0XHR2YXIgQnJvd3NlVGlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJicm93c2UtdGlsZSBmbGV4LWNvbHVtbiBvdmVybGF5LWNvbnRhaW5lciBjbGljayB2aWV3LXRyaWdnZXJcIj5cblx0XHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVybGF5XCI+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJyb3dzZS1uYW1lIGNlbnRlclwiPnt0aGlzLnByb3BzLm5hbWV9PC9kaXY+XG5cdFx0XHRcdFx0ICAgIDwvZGl2PlxuXHRcdFx0XHRcdCAgICA8aW1nIGNsYXNzTmFtZT1cImJyb3dzZS10aWxlLWltYWdlXCIgc3JjPXtTM19ST09UX0ZPUl9JTUFHRVMgKyB0aGlzLnByb3BzLm9iamVjdC5pbWFnZVVSTH0gLz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcblx0XHR9KTtcblxuXHQvL2ZlYXR1cmVkIHZpZXdcblxuXHRcdHZhciBGZWF0dXJlZFZpZXcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgaWQ9XCJmZWF0dXJlZFwiIGNsYXNzTmFtZT1cInZpZXcgZmxleC1jb2x1bW4gaGlkZGVuXCI+XG5cdFx0XHRcdFx0XHQ8Vmlld1RpdGxlQ29udGFpbmVyIC8+XG5cdFx0XHRcdFx0XHQ8RmVhdHVyZWRDb250YWluZXIgLz5cblx0XHQgICAgICAgICAgICAgICAgPEZlYXR1cmVkUmVzdWx0c0hlYWRlciAvPlxuXHRcdCAgICAgICAgICAgICAgICA8UmVzdWx0c0NvbnRhaW5lciAvPlxuXHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR2YXIgRmVhdHVyZWRDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleC1yb3cgZmxleCBmZWF0dXJlZC1jb250YWluZXIgb3ZlcmxheS1jb250YWluZXJcIj5cblx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJsYXkgZmxleC1jb2x1bW4gbGVmdC1hcnJvdyBjbGlja1wiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS0yeCBmYS1jaGV2cm9uLWxlZnQgY2VudGVyXCI+PC9pPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheSBmbGV4LWNvbHVtbiByaWdodC1hcnJvdyBjbGlja1wiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS0yeCBmYS1jaGV2cm9uLXJpZ2h0IGNlbnRlclwiPjwvaT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8RmVhdHVyZWRUaWxlIC8+XG5cdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0dmFyIEZlYXR1cmVkUmVzdWx0c0hlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBmZWF0dXJlZC1yZXN1bHRzLWhlYWRlclwiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBjZW50ZXJcIj5VcGNvbWluZyBFdmVudHM8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlci0yeFwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBjZW50ZXIgZmxleC1yb3dcIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmxleCBmYSBmYS1tYXAtbWFya2VyXCI+PC9pPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggdXNlci1sb2NhdGlvblwiPkRhbmlhIEJlYWNoLCBGTCwgVVNBPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBjaGFuZ2UtbG9jYXRpb25cIj5DaGFuZ2U8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIEZlYXR1cmVkVGlsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdGhhbmRsZU1vdXNlT3ZlcjogZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ21vdXNlT3ZlcicpO1xuXHRcdFx0XHQkKCcuZmVhdHVyZWQtaW5mbycsICcuZmVhdHVyZWQtdGlsZScpLmFkZENsYXNzKCdzbGlkZUluVXAnKTtcblx0XHRcdH0sXG5cdFx0XHRoYW5kbGVNb3VzZU91dDogZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnLmZlYXR1cmVkLWluZm8nLCAnLmZlYXR1cmVkLXRpbGUnKS5yZW1vdmVDbGFzcygnc2xpZGVJblVwJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdtb3VzZU91dCcpO1xuXHRcdFx0fSxcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4IGZlYXR1cmVkLXRpbGUgZXZlbnQgb3ZlcmxheS1jb250YWluZXIgY2xpY2sgdmlldy10cmlnZ2VyXCIgb25DbGljaz17dGhpcy5oYW5kbGVNb3VzZU92ZXJ9PlxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJsYXlcIj48L2Rpdj5cblx0XHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmZWF0dXJlZC1pbmZvIGFuaW1hdGVkXCI+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV2ZW50LW5hbWVcIj57dGhpcy5wcm9wcy5ldmVudC5ldmVudH08L2Rpdj5cblx0XHRcdFx0XHQgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXZlbnQtZGF0ZVwiPnt0aGlzLnByb3BzLmV2ZW50LnN0YXJ0X2RhdGV9PC9kaXY+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZlYXR1cmVkLXR5cGVcIj57dGhpcy5wcm9wcy5ldmVudC50eXBlfTwvZGl2PlxuXHRcdFx0XHRcdCAgICA8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHQvL2Zvb3RlclxuXHRcdFxuXHRcdHZhciBGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRzY3JvbGxUb1RvcDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQod2luZG93KS5zY3JvbGxUbygwLCA0MDApO1xuXHRcdFx0fSxcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGZvb3RlciBjbGFzc05hbWU9XCJmbGV4LXJvd1wiPlxuXHRcdFx0ICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cblx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1jb2x1bW4gZmxleC16ZXJvXCI+XG5cdFx0XHQgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xpY2tcIiBpZD1cImNvbnRhY3RcIj5Db250YWN0IFVzPC9hPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImNsaWNrXCIgaHJlZj1cImh0dHA6Ly9zZXRtaW5lLmNvbS9pbnZlc3RcIj5JbnZlc3Q8L2E+XG5cdFx0XHQgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2xpY2tcIiBpZD1cImRtY2FcIj5ETUNBIE5vdGljZTwvYT5cblx0XHRcdCAgICAgICAgICAgICAgICA8YnIgLz5cblx0XHRcdCAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJjbGlja1wiIG9uQ2xpY2s9e3RoaXMuc2Nyb2xsVG9Ub3B9PkJhY2sgVG8gVG9wPC9hPlxuXHRcdFx0ICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHQgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlci1sZ1wiPjwvZGl2PlxuXHRcdFx0ICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4XCI+XG5cdFx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBjZW50ZXJcIj5cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9TZXRtaW5lQXBwXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtMnggZmEtZmFjZWJvb2sgZmEtZndcIj48L2k+PC9hPlxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9zZXRtaW5lYXBwXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtMnggZmEtdHdpdHRlciBmYS1md1wiPjwvaT48L2E+XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2luc3RhZ3JhbS5jb20vc2V0bWluZS9cIj48aSBjbGFzc05hbWU9XCJmYSBmYS0yeCBmYS1pbnN0YWdyYW0gZmEtZndcIj48L2k+PC9hPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvZGl2PlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY29weXJpZ2h0XCI+PC9pPiBTZXRtaW5lLiAyMDE1PC9kaXY+XG5cdFx0XHQgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyLWxnXCI+PC9kaXY+XG5cdFx0XHQgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXgtemVyb1wiPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImNlbnRlclwiIGhyZWY9XCJodHRwczovL3RlYW10cmVlaG91c2UuY29tXCI+PGltZyBzcmM9XCJpbWFnZXMvdHJlZWhvdXNlLnBuZ1wiIC8+PC9hPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImNlbnRlclwiIGhyZWY9XCJodHRwczovL21peHBhbmVsLmNvbS9mL3BhcnRuZXJcIj48aW1nIHNyYz1cIi8vY2RuLm14cG5sLmNvbS9zaXRlX21lZGlhL2ltYWdlcy9wYXJ0bmVyL2JhZGdlX2xpZ2h0LnBuZ1wiIGFsdD1cIk1vYmlsZSBBbmFseXRpY3NcIiAvPjwvYT5cblx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0ICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cblx0XHRcdCAgICAgICAgPC9mb290ZXI+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0Ly9IZWFkZXJcblxuXHRcdHZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiZmxleC1yb3dcIj5cblx0XHRcdCAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm5hdi1idXR0b24gZmEgZmEtYmFycyBjbGljayBjZW50ZXIgbmF2LXRvZ2dsZVwiPjwvaT5cblx0XHRcdCAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm5hdi1idXR0b24gZmEgaWNvbi1zZXRtaW5lIGZhLTJ4IGNsaWNrIGNlbnRlclwiIHRpdGxlPVwiU2V0bWluZSBIb21lXCI+PC9pPlxuXHRcdFx0ICAgICAgICAgICAgPFNlYXJjaEJhciAvPlxuXHRcdFx0ICAgICAgICAgICAgPExvZ2luQnV0dG9uIC8+XG5cdFx0XHQgICAgICAgIDwvaGVhZGVyPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIE1lbnVDb250cm9sbGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0PGkgY2xhc3NOYW1lPVwibmF2LWJ1dHRvbiBmYSBmYS1iYXJzIGNsaWNrIGNlbnRlciBuYXYtdG9nZ2xlXCI+PC9pPlxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR2YXIgTG9naW5CdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibmF2LWJ1dHRvbiBjbGljayBjZW50ZXIgbG9naW5cIiBpZD1cImxvZ2luXCI+e2xvZ2luQWN0aW9ufTwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIFNlYXJjaEJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c2VhcmNoSW5wdXQ6ICcnXG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0c2VhcmNoOiBmdW5jdGlvbihxdWVyeSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0cyA9IG51bGw7XG5cdFx0XHRcdCQoXCIuc2VhcmNoLWxvYWRlclwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKVxuXHRcdFx0XHQkKFwiLnNlYXJjaC1sb2FkZXJcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW4tZmFkZVwiKVxuXHRcdFx0XHRpZihhY3RpdmVTZWFyY2hBamF4ICE9IG51bGwpIHtcblx0XHRcdFx0XHRhY3RpdmVTZWFyY2hBamF4LmFib3J0KCk7XG5cdFx0XHRcdFx0YWN0aXZlU2VhcmNoQWpheCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0YWN0aXZlU2VhcmNoQWpheCA9ICQuYWpheCh7XG5cdFx0XHRcdFx0dHlwZTogXCJHRVRcIixcblx0XHRcdFx0XHR1cmw6IEFQSV9ST09UICsgXCJzZWFyY2gvXCIgKyBxdWVyeSxcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT0gXCJzdWNjZXNzXCIpIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3BvbnNlLnBheWxvYWQuc2VhcmNoO1xuXHRcdFx0XHRcdFx0XHRzcGxpY2VCaWdBcnJheShyZXN1bHRzLnNldHMpXG5cdFx0XHRcdFx0XHRcdHNwbGljZUJpZ0FycmF5KHJlc3VsdHMudXBjb21pbmdFdmVudHMpXG5cdFx0XHRcdFx0XHRcdHNwbGljZUJpZ0FycmF5KHJlc3VsdHMudHJhY2tzKVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0dmFyIGFsbFJlc3VsdHMgPSAwO1xuXG5cdFx0XHRcdFx0XHRcdCQoJy5zZWFyY2gtcmVzdWx0cyAuc2VhcmNoLXNlY3Rpb24nKS5lbXB0eSgpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIEdlbmVyYXRlIHNlYXJjaCBjb250YWluZXJzXG5cblx0XHRcdFx0XHRcdFx0dmFyIHNldHNDb250YWluZXIgPSAkKFwiLnNlYXJjaC1yZXN1bHRzIC5zZWFyY2gtc2VjdGlvbi5zZXRzXCIpO1xuXHRcdFx0XHRcdFx0XHRzZXRzQ29udGFpbmVyLnBhcmVudHMoXCIuc2VhcmNoLXJlc3VsdHMtY29udGFpbmVyXCIpLmZpbmQoXCIuaXRlbS1udW1iZXIuc2V0c1wiKS50ZXh0KHJlc3VsdHMuc2V0cy5sZW5ndGgpO1xuXHRcdFx0XHRcdFx0XHR2YXIgdUV2ZW50c0NvbnRhaW5lcj0gJChcIi5zZWFyY2gtcmVzdWx0cyAuc2VhcmNoLXNlY3Rpb24udXBjb21pbmctZXZlbnRzXCIpO1xuXHRcdFx0XHRcdFx0XHR1RXZlbnRzQ29udGFpbmVyLnBhcmVudHMoXCIuc2VhcmNoLXJlc3VsdHMtY29udGFpbmVyXCIpLmZpbmQoXCIuaXRlbS1udW1iZXIudXBjb21pbmctZXZlbnRzXCIpLnRleHQocmVzdWx0cy51cGNvbWluZ0V2ZW50cy5sZW5ndGgpO1xuXHRcdFx0XHRcdFx0XHR2YXIgdHJhY2tzQ29udGFpbmVyID0gJChcIi5zZWFyY2gtcmVzdWx0cyAuc2VhcmNoLXNlY3Rpb24udHJhY2tzXCIpO1xuXHRcdFx0XHRcdFx0XHR0cmFja3NDb250YWluZXIucGFyZW50cyhcIi5zZWFyY2gtcmVzdWx0cy1jb250YWluZXJcIikuZmluZChcIi5pdGVtLW51bWJlci50cmFja3NcIikudGV4dChyZXN1bHRzLnRyYWNrcy5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFBvcHVsYXRlIHNlYXJjaCBjb250YWluZXJzXG5cblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBzIGluIHJlc3VsdHMuc2V0cykge1xuXHRcdFx0XHRcdFx0XHRcdGNyZWF0ZVNldFRpbGUocmVzdWx0cy5zZXRzW3NdLCBzZXRzQ29udGFpbmVyKTtcblx0XHRcdFx0XHRcdFx0XHRhbGxSZXN1bHRzKytcblx0XHRcdFx0XHRcdFx0XHRpZihhbGxSZXN1bHRzID09IChyZXN1bHRzLnNldHMubGVuZ3RoICsgcmVzdWx0cy51cGNvbWluZ0V2ZW50cy5sZW5ndGggKyByZXN1bHRzLnRyYWNrcy5sZW5ndGgpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5U2VhcmNoU2VjdGlvbnMoKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIHUgaW4gcmVzdWx0cy51cGNvbWluZ0V2ZW50cykge1xuXHRcdFx0XHRcdFx0XHRcdGNyZWF0ZVVwY29taW5nRXZlbnRUaWxlKHJlc3VsdHMudXBjb21pbmdFdmVudHNbdV0sIHVFdmVudHNDb250YWluZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGFsbFJlc3VsdHMrK1xuXHRcdFx0XHRcdFx0XHRcdGlmKGFsbFJlc3VsdHMgPT0gKHJlc3VsdHMuc2V0cy5sZW5ndGggKyByZXN1bHRzLnVwY29taW5nRXZlbnRzLmxlbmd0aCArIHJlc3VsdHMudHJhY2tzLmxlbmd0aCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXlTZWFyY2hTZWN0aW9ucygpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGZvcih2YXIgdCBpbiByZXN1bHRzLnRyYWNrcykge1xuXHRcdFx0XHRcdFx0XHRcdGNyZWF0ZVRyYWNrVGlsZShyZXN1bHRzLnRyYWNrc1t0XSwgdHJhY2tzQ29udGFpbmVyKTtcblx0XHRcdFx0XHRcdFx0XHRhbGxSZXN1bHRzKytcblx0XHRcdFx0XHRcdFx0XHRpZihhbGxSZXN1bHRzID09IChyZXN1bHRzLnNldHMubGVuZ3RoICsgcmVzdWx0cy51cGNvbWluZ0V2ZW50cy5sZW5ndGggKyByZXN1bHRzLnRyYWNrcy5sZW5ndGgpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5U2VhcmNoU2VjdGlvbnMoKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cyA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0aGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdHNlYXJjaElucHV0OiBlLnRhcmdldC52YWx1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2VhcmNoKCk7XG5cdFx0XHR9LFxuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1iYXIgZmxleC1maXhlZC01eCBmbGV4LXJvd1wiPlxuXHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwibmF2LWJ1dHRvbiBmYSBmYS1zZWFyY2ggY2VudGVyIGNsaWNrXCI+PC9pPlxuXHRcdCAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJzZWFyY2hcIiBjbGFzc05hbWU9XCJuYXYtYnV0dG9uIGZsZXgtemVyb1wiIHBsYWNlaG9sZGVyPVwic2VhcmNoIGFuIGFydGlzdCwgZmVzdGl2YWwsIHJhZGlvIG1peCBvciB0cmFja1wiIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaElucHV0fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG5cdFx0ICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHZhciBOYXZNZW51ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRmb2N1c2VkOiAwLFxuXHRcdFx0XHRcdGhpZGRlbjogdHJ1ZVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdGNsaWNrZWQ6IGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGZvY3VzZWQ6IGluZGV4IFxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZih0aGlzLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRcdHZhciBzdHlsZSA9IHtcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdub25lJ1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIHN0eWxlID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBpZD1cIm5hdi1tZW51XCIgY2xhc3NOYW1lPSdmbGV4LWNvbHVtbicgc3R5bGU9e3N0eWxlfT5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbihtLCBpbmRleCl7XG5cdFx0XHRcdFx0XHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbmF2LWxpc3QtaXRlbSBjbGljayBmbGV4IGZsZXgtcm93JyBvbkNsaWNrPXt0aGlzLmNsaWNrZWQuYmluZCh0aGlzLCBpbmRleCl9PnttfTwvZGl2PlxuXHRcdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHQvL2hvbWUgdmlld1xuXG5cdFx0dmFyIEhvbWVWaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGlkPVwiaG9tZVwiIGNsYXNzTmFtZT1cInZpZXcgZmxleC1yb3cgb3ZlcmxheS1jb250YWluZXIgaGlkZGVuXCI+XG5cdFx0XHRcdFx0XHQ8SG9tZVNpZGViYXIgLz5cblx0XHRcdFx0XHRcdDxIb21lUmVzdWx0c0NvbnRhaW5lciAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIEhvbWVTaWRlYmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXgtZml4ZWQgc2lkZWJhclwiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbHVtbiBvdmVybGF5LWNvbnRhaW5lciB1c2VyLWJhY2tncm91bmRcIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJ1c2VyLWltYWdlIGNlbnRlclwiIHNyYz1cImltYWdlcy93ZWJzaXRlL3VzZXJJbWFnZS5qcGdcIiAvPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0yeCBmbGV4LWNvbHVtbiB1c2VyLW5hdlwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZXctdHJpZ2dlciBjbGljayBmbGV4IGZsZXgtcm93IGFjdGl2ZVwiIG5hbWU9XCJteS1zZXRzXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pk15IFNldHM8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlldy10cmlnZ2VyIGNsaWNrIGZsZXggZmxleC1yb3dcIiBuYW1lPVwibmV3XCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pk5ldzwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3LXRyaWdnZXIgY2xpY2sgZmxleCBmbGV4LXJvd1wiIG5hbWU9XCJhY3Rpdml0aWVzXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkFjdGl2aXRpZXM8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHZhciBIb21lUmVzdWx0c0NvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBmbGV4LWZpeGVkLTN4IHJlc3VsdHMtY29udGFpbmVyXCI+PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0Ly9sYW5kaW5nIHZpZXdcblxuXHRcdHZhciBMYW5kaW5nVmlldyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBpZD1cImxhbmRpbmdcIiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiB2aWV3XCI+XG5cdFx0XHRcdFx0XHQ8TGFuZGluZ0hvbWUgLz5cblx0XHRcdFx0XHRcdDxMYW5kaW5nQXBwIC8+XG5cdFx0XHRcdFx0XHQ8TGFuZGluZ0V2ZW50cyAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHZhciBMYW5kaW5nSG9tZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHNjcm9sbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG8oJCgnI2xhbmRpbmctMicpLCA0MDAsIHtcblx0XHRcdFx0XHRcdG9mZnNldDogLSAkKCdoZWFkZXInKS5oZWlnaHQoKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LCAyMDApO1xuXHRcdFx0fSxcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBvdmVybGF5LWNvbnRhaW5lciBsYW5kaW5nLXZpZXdcIiBpZD1cImxhbmRpbmctMVwiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheVwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXIgY2VudGVyIHdvdyB6b29tSW5cIj5TZXRtaW5lPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXIgd293IHpvb21JblwiPlJlbGl2ZSB5b3VyIGZhdm9yaXRlIGV2ZW50czwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyBjZW50ZXJcIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9iaXQubHkvU2V0bWluZWlPU1wiIHRpdGxlPVwidmlldyBvbiBBcHAgU3RvcmVcIiBjbGFzc05hbWU9XCJmYSBmYS1hcHBsZSBmYS1mdyBmYS00eCB3b3cgZmFkZUluTGVmdCBjbGlja1wiPjwvYT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9iaXQubHkvU2V0bWluZUFuZHJvaWRcIiB0aXRsZT1cInZpZXcgb24gR29vZ2xlIFBsYXlcImNsYXNzTmFtZT1cImZhIGZhLWFuZHJvaWQgZmEtZncgZmEtNHggd293IGZhZGVJblJpZ2h0IGNsaWNrXCI+PC9hPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyLTV4XCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItc21hbGwgbmF2LWJ1dHRvbiBjZW50ZXIgY2xpY2sgd293IGZhZGVJblVwXCIgaWQ9XCJsaXN0ZW4tbm93XCI+TGlzdGVuIE5vdzwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1kb3duIGNlbnRlciBjbGljayB3b3cgc2xpZGVJblVwXCIgb25DbGljaz17dGhpcy5zY3JvbGx9PjwvaT5cblx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR2YXIgTGFuZGluZ0FwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBsYW5kaW5nLXZpZXcgb3ZlcmxheS1jb250YWluZXJcIiBpZD1cImxhbmRpbmctMlwiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1yb3cgb3ZlcmxheS1jb250YWluZXIgc2xpZGUgc2xpZGUtMSBoaWRkZW5cIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4LWZpeGVkIHRleHQtY29udGFpbmVyXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItbWVkaXVtIGNlbnRlciB3b3cgYm91bmNlSW5MZWZ0XCI+VW5sb2NrIGV4Y2x1c2l2ZSBjb250ZW50IGZyb20geW91ciBmYXZvcml0ZSBhcnRpc3RzPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXIgd293IGJvdW5jZUluTGVmdFwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnV2VcXCdyZSBubyBzdHJhbmdlcnMgdG8gbG92ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXItNXhcIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1jb2x1bW4gZmxleC1maXhlZCBpbWFnZS1jb250YWluZXJcIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY2VudGVyIHdvdyBzbGlkZUluVXBcIiBzcmM9XCJpbWFnZXMvd2Vic2l0ZS9zbGlkZS0yLmpwZ1wiIC8+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1yb3cgb3ZlcmxheS1jb250YWluZXIgc2xpZGUgc2xpZGUtMiBoaWRkZW5cIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4LWZpeGVkIHRleHQtY29udGFpbmVyXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItbWVkaXVtIGNlbnRlciBhbmltYXRlZCBib3VuY2VJbkxlZnRcIj5TYXkgZ29vZGJ5ZSB0byBtaXNzaW5nIGEgbGl2ZSBwZXJmb3JtYW5jZTwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyIGFuaW1hdGVkIGJvdW5jZUluTGVmdFwiPnsnU2V0bWluZSBsZXRzIHlvdSBsaXN0ZW4gYW55IGxpdmUgc2V0IG9yIHJlY29yZGVkIG1peCBjb21wbGV0ZWx5IGZyZWUsIGFsbG93aW5nIHlvdSB0byByZWxpdmUgeW91ciBmYXZvcml0ZSBldmVudHMsIG9yIGNhdGNoIHVwIG9uIHRoZSBvbmVzIHlvdSBtaXNzZWQuJ308L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyLTV4XCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXgtZml4ZWQgaW1hZ2UtY29udGFpbmVyXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNlbnRlciBhbmltYXRlZCBzbGlkZUluVXBcIiBzcmM9XCJpbWFnZXMvd2Vic2l0ZS9zbGlkZS0yLmpwZ1wiIC8+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1yb3cgb3ZlcmxheS1jb250YWluZXIgc2xpZGUgc2xpZGUtM1wiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXgtZml4ZWQgdGV4dC1jb250YWluZXJcIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1tZWRpdW0gY2VudGVyIGFuaW1hdGVkIGJvdW5jZUluTGVmdFwiPlNlZSB3aGljaCBzb25nIGlzIHBsYXlpbmcgd2l0aCBpbnRlcmFjdGl2ZSB0cmFja2xpc3RzPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXIgYW5pbWF0ZWQgYm91bmNlSW5MZWZ0XCI+eydTZWFyY2ggZm9yIHlvdXIgZmF2b3JpdGUgdHJhY2tzIGFuZCBoZWFyIHRoZSByZXN1bHRzIGluIGxpdmUgc2V0IGZvcm0uIFdlXFwnbGwgZmFzdC1mb3J3YXJkIHlvdSByaWdodCB3aGVyZSB0aGUgYXJ0aXN0IGRyb3BzIHRoZSB0cmFjayd9PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlci01eFwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBmbGV4LWZpeGVkIGltYWdlLWNvbnRhaW5lclwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjZW50ZXIgYW5pbWF0ZWQgZmFkZUluXCIgc3JjPVwiaW1hZ2VzL3dlYnNpdGUvc2xpZGUtMy5qcGdcIiAvPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtcm93IG92ZXJsYXktY29udGFpbmVyIHNsaWRlIHNsaWRlLTQgaGlkZGVuXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1jb2x1bW4gZmxleC1maXhlZCB0ZXh0LWNvbnRhaW5lclwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZWQgYm91bmNlSW5MZWZ0XCI+U2V0bWluZSdzIEFjdGl2aXRpZXMgZmVhdHVyZSBtYWtlcyBpdCBlYXN5IHRvIGZpbmQgdGhlIHBlcmZlY3Qgc2V0IGZvciB3aGF0ZXZlciB5b3UncmUgZG9pbmcuPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlZCBib3VuY2VJbkxlZnRcIj5HZXQgcHVtcGVkIHRvIHdvcmtvdXQgdG8gU2tyaWxsZXguIFJlbGF4IGFuZCBjaGlsbCB3aXRoIEt5Z28gYW5kIFRob21hcyBKYWNrLiBab25lIGludG8gYSBzdHVkeSBzZXNoIHdpdGggQWJvdmUgJiBCZXlvbmQuPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGVyIGNlbnRlciBhbmltYXRlZCB6b29tSW5cIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGVkIGJvdW5jZUluTGVmdFwiPlNhdmUgeW91ciBmYXZvcml0ZSBzZXRzIGZvciBxdWljayBhbmQgZWFzeSBsaXN0ZW5pbmcgd2l0aCBNeSBTZXRzPC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlZCBib3VuY2VJbkxlZnRcIj5Zb3UgY2FuIGVuam95IHRoZXNlIGZlYXR1cmVzIHdpdGggYSBxdWljayBvbmUtdGltZSBmYWNlYm9vayBsb2dpbi48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnVmZmVyXCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXgtZml4ZWQgaW1hZ2UtY29udGFpbmVyXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImNlbnRlciBhbmltYXRlZCBzbGlkZUluVXBcIiBzcmM9XCJpbWFnZXMvd2Vic2l0ZS9zbGlkZS00LmpwZ1wiIC8+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxMYW5kaW5nU2xpZGVDb250cm9scyAvPlxuXHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR2YXIgTGFuZGluZ1NsaWRlQ29udHJvbHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFjdGl2ZTogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dHJhbnNpdGlvblNsaWRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2JydWgnKTtcblx0XHRcdH0sXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleC1yb3cgc2xpZGUtY29udHJvbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYW5kaW5nU2xpZGVCdXR0b24gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYW5kaW5nU2xpZGVCdXR0b24gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYW5kaW5nU2xpZGVCdXR0b24gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYW5kaW5nU2xpZGVCdXR0b24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHZhciBMYW5kaW5nU2xpZGVCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGFjdGl2ZTogZmFsc2UsXG5cdFx0XHRcdFx0aWNvbjogXCJmYSBmYS1mdyBjbGljayBmYS1jaXJjbGUtb1wiXG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0YWN0aXZlU2xpZGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRhY3RpdmU6ICF0aGlzLnN0YXRlLmFjdGl2ZSxcblx0XHRcdFx0XHRpY29uOiB0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiZmEgZmEtZncgY2xpY2sgZmEtY2lyY2xlXCIgOiBcImZhIGZhLWZ3IGNsaWNrIGZhLWNpcmNsZS1vXCJcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaWNvbn0gb25DbGljaz17dGhpcy5hY3RpdmVTbGlkZX0+PC9pPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHR2YXIgTGFuZGluZ0V2ZW50cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4LWNvbHVtbiBsYW5kaW5nLXZpZXdcIiBpZD1cImxhbmRpbmctM1wiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1jb2x1bW4gZmxleC0zeCBpbWFnZS1jb250YWluZXIgb3ZlcmxheS1jb250YWluZXJcIj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVybGF5XCI+PC9kaXY+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLW1lZGl1bSB3b3cgYm91bmNlSW5MZWZ0XCI+RGlzY292ZXIgdXBjb21pbmcgZXZlbnRzIG5lYXIgeW91LjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1jb2x1bW4gZmxleCB0ZXh0LWNvbnRhaW5lclwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndvdyBmYWRlSW5VcFwiPk91ciBzdHJlYW1saW5lZCBldmVudCBkaXNjb3ZlcnkgZmVhdHVyZSBhbGxvd3MgeW91IHRvIGZpbmQgbG9jYWwgZXZlbnRzLCB2aWV3IGxpbmV1cHMsIGFuZCBwdXJjaGFzZSB0aWNrZXRzIHdpdGhpbiB0aGUgYXBwLjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlclwiPjwvZGl2PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXIgY2VudGVyIHdvdyB6b29tSW5cIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3b3cgZmFkZUluVXBcIj5Zb3UgY2FuIHNlZSB3aG9zIHBsYXlpbmcgYXJvdW5kIHRoZSB3b3JsZCwgb3IgaW4geW91ciBob21ldG93bi48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidWZmZXJcIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdC8vcGxheWVyXG5cblx0XHR2YXIgUGxheWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRwbGF5aW5nOiBmYWxzZSxcblx0XHRcdFx0XHRoaWRkZW46IHRydWUsXG5cdFx0XHRcdFx0Y3VycmVudFBvc2l0aW9uOiAwLFxuXHRcdFx0XHRcdGN1cnJlbnRUaW1lOiBcIjAwOjAwXCJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNldE5hbWU6ICdUb21vcnJvd0xhbmQgMjAxNScsXG5cdFx0XHRcdFx0YXJ0aXN0OiAnRGVhZG1hdTUnLFxuXHRcdFx0XHRcdGN1cnJlbnRUcmFjazogJ0FuaW1hbHMgLSBNYXJ0aW4gR2Fycml4Jyxcblx0XHRcdFx0XHRzZXRMZW5ndGg6IDAsXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGxheWVyIGZsZXgtcm93IGhpZGRlblwiPlxuXHRcdFx0XHRcdCAgICA8UGxheWVyQ29udHJvbCAvPlxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIGZsZXhcIj5cblx0XHRcdFx0XHQgICAgICAgIDxQbGF5ZXJTZWVrIC8+XG5cdFx0XHRcdFx0ICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtcm93IGZsZXhcIj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8UGxheWVyU2V0SW5mbyBzZXQ9e3RoaXMucHJvcHMuc2V0Lm5hbWV9IGFydGlzdD17dGhpcy5wcm9wcy5hcnRpc3R9IC8+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPFBsYXllclRyYWNrSW5mbyB0cmFjaz17dGhpcy5wcm9wcy5zZXR9Lz5cblx0XHRcdFx0XHQgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdCAgICA8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHZhciBQbGF5ZXJDb250cm9sID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRwbGF5aW5nOiBmYWxzZSwgXG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0dG9nZ2xlUGxheTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdHBsYXlpbmc6ICF0aGlzLnN0YXRlLnBsYXlpbmdcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0cG9wdWxhdGVQbGF5ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZih0aGlzLnN0YXRlLnBsYXlpbmcpIHtcblxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBsYXllci1pbWFnZS1jb250YWluZXIgb3ZlcmxheS1jb250YWluZXIgY2xpY2tcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVBsYXl9PlxuXHRcdFx0XHQgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmxheSBzZXQtZmxleFwiPlxuXHRcdFx0XHQgICAgICAgICAgICA8aSBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGxheWluZyA/IFwiZmEgZmEtcGF1c2UgY2VudGVyXCIgOiBcImZhIGZhLXBsYXkgY2VudGVyXCJ9IGlkPVwicGxheS1idXR0b25cIj48L2k+XG5cdFx0XHRcdCAgICAgICAgPC9kaXY+XG5cdFx0XHRcdCAgICAgICAgPGltZyAvPlxuXHRcdFx0XHQgICAgPC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR2YXIgUGxheWVyU2V0SW5mbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwbGF5ZXItc2V0LWluZm8gZmxleC1jb2x1bW4gZmxleC1maXhlZFwiPlxuXHRcdCAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNldC1uYW1lIGZsZXhcIj57dGhpcy5wcm9wcy5zZXQuYXJ0aXN0ICsgJyAtICcgKyB0aGlzLnByb3BzLnNldC5ldmVudH08L2Rpdj4gXG5cdFx0ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0LXRpbWUgZmxleFwiPnt0aGlzLnByb3BzLnNldC5zZXRfbGVuZ3RofTwvZGl2PlxuXHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIFBsYXllclRyYWNrSW5mbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwbGF5ZXItdHJhY2staW5mbyBmbGV4LXJvdyBmbGV4LWZpeGVkXCI+XG5cdFx0ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VycmVudC10cmFjayBjZW50ZXIgZmxleFwiPnt0aGlzLnByb3BzLnRyYWNrLnRyYWNrbmFtZX08L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtYmFycyBjbGljayBmbGV4LXplcm9cIj48L2k+XG5cdFx0ICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXNoYXJlIGNsaWNrIGZsZXgtemVyb1wiPjwvaT5cblx0XHQgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHZhciBQbGF5ZXJUcmFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0cmFja2xpc3QtaXRlbSBmbGV4LXJvd1wiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj57dGhpcy5wcm9wcy50cmFjay50cmFja25hbWV9PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR2YXIgUGxheWVyVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBsYXllci10cmFja2xpc3RcIj5cblx0XHRcdFx0XHRcdDxQbGF5ZXJUcmFjayB0cmFjaz0nJy8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHZhciBQbGF5ZXJTZWVrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBsYXllci1zZWVrLWNvbnRhaW5lclwiPlxuXHRcdFx0ICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5ZXItc2Vlay1wb3NpdGlvblwiPjwvZGl2PlxuXHRcdFx0ICAgICAgICA8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KVxuXG5cdC8vc2VhcmNoIHZpZXdcblxuXHRcdHZhciBTZWFyY2hSZXN1bHRzVmlldyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogJ3NldHMnIFxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBpZD1cInNlYXJjaC1yZXN1bHRzXCIgY2xhc3NOYW1lPVwidmlldyBvdmVybGF5LWNvbnRhaW5lciBoaWRkZW5cIj5cblx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXJvdyB2aWV3LXRpdGxlLWNvbnRhaW5lciBzZXRzXCI+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZXctdGl0bGUgc2V0cyByZXN1bHRzLWZpbHRlciBmbGV4IHNldC1mbGV4XCI+XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJcIj5TZXRzPC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlldy10aXRsZSBldmVudHMgcmVzdWx0cy1maWx0ZXIgZmxleCBzZXQtZmxleFwiPlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyXCI+RXZlbnRzPC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlldy10aXRsZSB0cmFja3MgcmVzdWx0cy1maWx0ZXIgZmxleCBzZXQtZmxleFwiPlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyXCI+VHJhY2tzPC9kaXY+XG5cdFx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvZGl2PlxuXHRcdCAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHQgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0c1wiPjwvZGl2PlxuXHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdC8vbWlzYyBjb25wb25lbnRzXG5cblx0XHR2YXIgUmVzdWx0c0NvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzLWNvbnRhaW5lciBmbGV4LXJvdyBmbGV4XCI+XG5cdFx0XHRcdFx0XHQ8U2V0VGlsZSAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIFZpZXdUaXRsZUNvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRcdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dGl0bGU6ICdGZWF0dXJlZCcgLy9kZWZhdWx0XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY29sdW1uIHZpZXctdGl0bGUtY29udGFpbmVyIGZsZXgtemVyb1wiPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyIHZpZXctdGl0bGVcIj57dGhpcy5zdGF0ZS50aXRsZX08L2Rpdj5cblx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2Rpdj5cblx0ICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdC8vbWFpbiB2aWV3IGNvbnRyb2xsZXJcblx0XHR2YXIgTWFpblZpZXdDb250cm9sbGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGlkPVwibWFpbi1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxMYW5kaW5nVmlldyAvPlxuXHRcdFx0XHRcdFx0PFNlYXJjaFJlc3VsdHNWaWV3IC8+XG5cdFx0XHRcdFx0XHQ8QnJvd3NlVmlldyAvPlxuXHRcdFx0XHRcdFx0PEhvbWVWaWV3IC8+XG5cdFx0XHRcdFx0XHQ8RmVhdHVyZWRWaWV3IC8+XG5cdFx0XHRcdFx0XHQ8RGV0YWlsVmlldyBkYXRhPXt0aGlzLnByb3BzLmRhdGF9IC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0Ly90b3AgbGV2ZWwgY29tcG9uZW50IGNvbnRhaW5lclxuXHRcdHZhciBDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGlkPVwiY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHRcdFx0PE5hdk1lbnUgaXRlbXM9e1snSG9tZScsICdTZXRzJywgJ1VwY29taW5nJywgJ0FydGlzdHMnLCAnRmVzdGl2YWxzJywgJ01peGVzJywgJ0dlbnJlcyddfSAvPlxuXHRcdFx0XHRcdFx0PE1haW5WaWV3Q29udHJvbGxlciBkYXRhPXt0aGlzLnByb3BzLmRhdGF9IC8+XG5cdFx0XHRcdFx0XHQ8UGxheWVyIC8+XG5cdFx0XHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0Ly90ZXN0aW5nIGVudmlyb25tZW50XG5cblx0XHR2YXIgVGVzdFZpZXcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleC1yb3cgZmxleFwiPlxuXHRcdFx0XHRcdFx0PFNldFRpbGUgZGF0YT17dGhpcy5wcm9wcy5kYXRhfSAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFJlYWN0LnJlbmRlcig8SGVhZGVyLz4sIGRvY3VtZW50LmJvZHkpO1xufTsiXX0=
