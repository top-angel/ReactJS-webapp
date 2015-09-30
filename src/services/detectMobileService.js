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
            if(window.location.pathname.length > 0) {
                var pathWithoutLeadingSlash = window.location.pathname.substring(1);
                var parameters = pathWithoutLeadingSlash.split('/');
                var command = parameters[0];
                var value = parameters[1];
                switch(command) {
                    case 'play':
                        window.location = 'setmine://setmine.com/' + pathWithoutLeadingSlash; break;
                    case 'artist':
                        window.location = 'setmine://setmine.com/browse/' + value.split('_').join(' ') + '/artist'; break;
                    case 'festival':
                        window.location = 'setmine://setmine.com/browse/' + value.split('-').join(' ') + '/festival'; break;
                    case 'mix':
                        window.location = 'setmine://setmine.com/browse/' + value.split('-').join(' ') + '/mix'; break;
                    case 'event':
                        window.location = 'setmine://setmine.com/' + pathWithoutLeadingSlash; break;
                    case 'offer':
                        window.location = 'setmine://setmine.com/' + pathWithoutLeadingSlash; break;
                }

            } else {
                window.location = 'setmine://setmine.com/bugfix';
            }
        }
    }
};

module.exports = detectMobileService;