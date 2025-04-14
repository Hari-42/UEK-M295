const fs = require('fs');

var filename = process.argv[2];

var ext = process.argv[3];

var path = RegExp('\\.' + ext + '$');


file = fs.readdir(filename, function(err, data) {
    for (i = 0; i < data.length; i++) {
        if (path.test(data[i])) {
            console.log(data[i]);
        }
    }
})