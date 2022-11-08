
const fs = require('fs');
const path = require('path');
const { stdout } = process;

const inputPath = `${__dirname}/files/`;
const outputPath = `${__dirname}/files-copy/`;

const copyFile = () => {
    fs.readdir(inputPath, (error, files) => {
    files.forEach(elem => {
        fs.copyFile(
            inputPath + elem,
            outputPath + elem,
            (error) => {if (error) throw error}
        );
    });
        stdout.write('Yahoo! All files copied.\n');
    }
)};

const createDir = () => {
    fs.mkdir(path.join(__dirname, 'files-copy'), (error) => {
        stdout.write('New directory already created.\n');
    });
}

fs.rm(outputPath, { recursive: true }, error => {
    copyFile();
    createDir();
})