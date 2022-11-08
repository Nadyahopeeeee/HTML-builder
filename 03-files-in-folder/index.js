const fs = require('fs');
const path = require('path');

const { stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
    
    if(err) throw err;

    files.forEach(elem => {
        let newFilePath = path.join(__dirname, 'secret-folder', elem);

        fs.stat(newFilePath, (err, stats) => {
            if (!stats.isFile()) {
                return
            }
            const size = stats.size / 1024;
            stdout.write(`${path.parse(elem).name} - ${path.extname(newFilePath).substring(1)} - ${size.toFixed(3)}kb\n`)
        });
    });
});