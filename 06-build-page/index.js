const fs = require('fs');
const path = require('path');

const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname, 'styles');

const promis = fs.promises;

async function App() {
    await deleteDirection();
    await makeNewDirection();
    await createNewAssets();
    await createNewStyles();
    await htmlBuilder()
    return true;
}
App();

async function htmlBuilder() {
    const sample = path.join(__dirname, 'template.html');
    let sampleRead = await promis.readFile(sample, 'utf-8');
    const dirBlocks = path.join(__dirname, 'components');
    const blocks = await promis.readdir(dirBlocks);
    for (let block of blocks) {
        const format = path.extname(block);
        if (format == '.html') {
            const blockName = path.parse(path.join(dirBlocks, block)).name;
            let blockRead = await promis.readFile(path.join(dirBlocks, block));
            sampleRead = sampleRead.replace(`{{${blockName}}}`, blockRead);
        }
    }
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), sampleRead, (err) => {
        if (err) { throw err; }
    });
}

async function deleteDirection() {
    await promis.rm(path.resolve(__dirname, 'project-dist'), { recursive: true, force: true });
}

async function makeNewDirection() {
    await promis.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
        if (err) throw new Error(err);
    })
}

async function createNewAssets() {
    promis.readdir(pathAssets, { withFileTypes: true }).then(files => {
        files.forEach(file => {
            const initialFile = path.join(__dirname, 'assets', file.name);
            const finalFile = path.join(__dirname, 'project-dist', 'assets', file.name);
            if (file.isFile()) {
                promis.copyFile(initialFile, finalFile);
            } 
            else {
                promis.readdir(initialFile, {withFileTypes: true}).then(direction => {
                    promis.mkdir(path.join(__dirname, 'project-dist', `assets/${file.name}`), { recursive: true })
                    direction.forEach(elem => {
                        const initial = path.join(initialFile, elem.name);
                        const finish = path.join(finalFile, elem.name);
                        promis.copyFile(initial, finish);
                    });
                });
            }
        });
    });
};

async function createNewStyles() {
    promis.readdir(pathStyles, {withFileTypes: true}).then(elems => {
        const newChunk = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

        elems.forEach(elem => {
            const filePath = path.join(pathStyles, elem.name);
            const format = path.extname(filePath);
            const name = path.basename(filePath);
            if (format == '.css') {
                const determine = fs.createReadStream(path.join(pathStyles, name));
                determine.on('data', chunk => {
                    newChunk.write(chunk + '\n');
                });
            }
        });
    });
}