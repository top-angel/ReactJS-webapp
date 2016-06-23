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
        console.log(window.location.pathname);

        if(this.iOS()) {
            console.log("iOS");

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
        } else if(this.Android()) {
            console.log("Android1");
            console.log(window.location.pathname);
            console.log(window.location.pathname.length);

            if(window.location.pathname.length > 0) {
                var pathWithoutLeadingSlash = window.location.pathname.substring(1);
                var parameters = pathWithoutLeadingSlash.split('/');
                var command = parameters[0];
                var action = parameters[1] || '';
                var data = parameters[2] || '';
                console.log(command);
                switch(command) {
                    case 'setstory':
                        console.log('go to setstory deeplink');
                        var setstoryDeepLink = 'intent://www.setmine.com/#Intent;scheme=setstory;package=com.setmusic.setstory;';
                        setstoryDeepLink += 'S.action=' + encodeURIComponent(action) + ';';
                        setstoryDeepLink += 'S.data=' + encodeURIComponent(data) + ';end';

                        break;
                    default:
                        console.log('go to setmine deeplink');

                        // window.location = 'setmine://setmine.com/' + pathWithoutLeadingSlash; break;
                }

            } else {
                console.log('go to setmine deeplink else');

                // window.location = 'setmine://setmine.com';
            }
        } else {
            console.log("Not mobile");
        }

    }
};
