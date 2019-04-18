// require('es6-promise').polyfill();

var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

app.use(express.static(__dirname + '/public'));

// deep linking
app.use(function( req, res, next ) {
    for(var prop in req.query) {
        res.redirect('https://www.setmine.com/' + prop);
        return;
    }
    next();
});

// setmusic.co 
app.use(function( req, res, next ) {
    var prop = req.path; 
    if(prop.substring(prop.length-1) == '/') {
        prop = prop.substring(0, prop.length-1);
        res.redirect('https://www.setmine.com' + prop);
        return;
    }
    next();
});

app.get('/setrecords', function( req, res ) {
    res.redirect('https://setrecords.setmine.com');
});

app.get('*', function( req, res, next ) {
    // For facebook metatags, HTML is read first then the og url is inserted before sending it as the response
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
        var ogurl = '<meta property=\"og:url\" content=\"https://api.setmine.com/v/10/metadata/facebook/?path=' + encodeURIComponent(req.path.substring(1)) + '\">';
        var textWithOGUrl = text.replace('</head>',  ogurl + '</head>');
        console.log(req.path);
        console.log(textWithOGUrl);

        res.send(textWithOGUrl);
    });
});


app.listen(port, function () {
    console.log('Server running on port ' + port);
});