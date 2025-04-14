const fs = require('fs');

var filename = process.argv[2];

file = fs.readFileSync(filename);

const str = file.toString();

console.log(str.split('\n').length - 1);