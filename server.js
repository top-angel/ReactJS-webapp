var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;
var fs = require('fs');
var app = express();

app.use(function( req, res, next ) {
    for(var prop in req.query) {
        res.redirect('https://www.setmine.com/' + prop);
        return;
    }
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('*', function( req, res, next ) {

    // For facebook metatags, HTML is read first then the og url is inserted before sending it as the response

    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
        console.log(text.indexOf('</head>'));
        var ogurl = '<meta property=\"og:url\" content=\"https://setmine.com/metadata/' + encodeURIComponent(req.path.substring(1)) + '\">';
        var textWithOGUrl = text.replace('</head>',  ogurl + '</head>');
        res.send(textWithOGUrl);
    });
});


app.listen(port, function () {
    console.log('Server running on port ' + port);
});