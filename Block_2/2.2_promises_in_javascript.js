const fs = require('node:fs');

function readdatacontent(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readdatacontent('example_2_2.txt')
    .then(data => {
        console.log('The length of the datacontent is:', data.length);
    })
    .catch(err => {
        console.error('Error while reading:', error.message);
    })
