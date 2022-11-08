const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const filePath = path.join(__dirname, 'destination.txt');

const toExit = () => {
    stdout.write('Bye bye!\n');
    process.exit();
};

fs.open(filePath, 'w', () => {});

stdout.write('Hi! Enter your text\n');

process.on('SIGINT', toExit)

stdin.on('data', chunk => {
    if (chunk.toString().trim() == 'exit') {
        toExit();
    }
    fs.appendFile(filePath, chunk.toString(), () => {});
    stdout.write('Enter your text again\n');
})


