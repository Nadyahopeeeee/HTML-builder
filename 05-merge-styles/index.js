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

// const fs = require("fs");
// const path = require("path");

// const inputPath = path.join(__dirname, "styles");
// const outputPath = path.join(__dirname, "project-dist");

// fs.writeFile(path.join(outputPath, "bundle.css"), "", (err) => {
//   if(err) throw err;
// } )

// fs.readdir(inputPath, (err, files) => {
//   files.forEach(file => {
//     let filePath = path.join(inputPath, file);
//     if(path.extname(filePath) == ".css") {

//         let fileContents = "";
//         fs.readFile(filePath, (err, data) => {
//           if(err) throw err;
//           fileContents = data.toString();
//           fs.appendFile(path.join(outputPath, "bundle.css"), fileContents, (err) => {
//             if(err) throw err;
//             console.log(`${file} is appended to bundle.css`)
//           })
//         })
//     }
    
//   })
// })
