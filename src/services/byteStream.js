var byteStream = module.exports = (function() {
    var decode64 = function(encodedString) {
        console.log('==encodedString==');
        console.log(encodedString);
        var decodedString = atob(encodedString);
        console.log('==decodedString==');
        console.log(decodedString);

        return decodedString;

    }

    var download = function(fileUrl) {
        return new Promise( function(resolve, reject) {
            console.log('Downloading file from ' + fileUrl);
            var blob = null;
            var xhr = new XMLHttpRequest();

            xhr.open("GET", fileUrl);
            xhr.responseType = 'blob';

            xhr.onload = function () {
                console.log('Blob downloaded.');
                blob = xhr.response;
                console.log(blob);

                resolve(blob);
            };

            xhr.send();
        });
    }

    var pack = function(bytes) {
        console.log(bytes.length);
        var chars = [];
        for (var i = 0, n = bytes.length; i < n;) {
            chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
        }
        console.log(chars);
        return String.fromCharCode.apply(null, chars);
    }

    var readBlob = function(blob) {
        return new Promise( function(resolve, reject) {
            var reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                var base64data = reader.result;
                resolve(base64data.substr(base64data.indexOf(',')+1));
            }
        });
    }

    return {
        decode: decode64,
        download: download,
        pack: pack,
        readBlob: readBlob
    }
})();
