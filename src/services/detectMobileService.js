export default {
    Android() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any() {
        return (Android() || BlackBerry() || iOS() || Opera() || Windows());
    },
    detectMobileBrowser() {
        // console.log(window.location.pathname);
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
                        window.location = 'setmine://setmine.com/browse/' + value.split('+').join('%20') + '/artist'; break;
                    case 'festival':
                        window.location = 'setmine://setmine.com/browse/' + value.split('+').join('%20') + '/festival'; break;
                    case 'mix':
                        window.location = 'setmine://setmine.com/browse/' + value.split('+').join('%20') + '/mix'; break;
                    case 'event':
                        window.location = 'setmine://setmine.com/' + pathWithoutLeadingSlash; break;
                    case 'offer':
                        window.location = 'setmine://setmine.com/' + pathWithoutLeadingSlash; break;
                    case 'setstory':
                        window.location = 'setstory://setmine.com/' + pathWithoutLeadingSlash; break;
                }

            } else {
                window.location = 'setmine://setmine.com/bugfix';
            }
        }

    }
};
