const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'styles');
const output = path.join(__dirname, 'project-dist');

fs.writeFile(path.join(output, 'bundle.css'), '', (error) => {
    if (error) throw error;
});

fs.readdir(input, (error, files) => {
    files.forEach(elem => {
        let filesPath = path.join(input, elem);

        if(path.extname(filesPath) == '.css') {    
            let fileData = '';
            
            fs.readFile(filesPath, (error, chunk) => {
            if(error) throw error;
            fileData = chunk.toString();

                fs.appendFile(path.join(output, 'bundle.css'), fileData, (error) => {
                if(error) throw error;
                console.log(`$File ${elem} successfully added.`)
                })
            });
        }
    });
});
