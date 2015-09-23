var detectMobileService = {
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
        return (Android() || BlackBerry() || iOS() || Opera() || Windows());
    },
    detectMobileBrowser: function() {
        console.log(window.location.pathname);

        if(this.iOS()) {
            console.log(window.location.pathname);
            if(window.location.pathname.length > 0) {

                // window.location = "setmine://setmine.com/" + window.location.pathname.substring(1);
            } else {
                // window.location = "setmine://setmine.com/bugfix";
            }
        }
    }
};

module.exports = detectMobileService;