const fs = require('node:fs');
const path = require('node:path');
const config= require('./config.json');
const prompt = require('prompt-sync')();

const folder = prompt('Enter the Folder name: ');
console.log(folder)
const folderPath = path.join(__dirname, folder);
try{
var folderFiles = fs.readdirSync(folder);
}catch(err){
console.error(`There was an Error While Moving Files or There are no such files to move.`);
process.exit();
}
let movedFiles = 0;
let createdFolders = 0;

for (const file of folderFiles) {
    const ext = file.split('.')[file.split('.').length - 1];

    let oldPath = path.join(folderPath, file);
    let newPath = path.join(folderPath, ext, file);
    let extensionPath = path.join(folderPath, ext);

    if (!fs.existsSync(path.join(folderPath, ext))) {
        try {
            fs.mkdirSync(extensionPath);
            console.log(`Created ${ext} Folder`);
            createdFolders++;
        } catch (error) {
            console.log(`There wan error Creating ${ext} Folder/n ${error}`);
        }
    }
    try {
        fs.renameSync(oldPath, newPath);
        console.log(`SuccessFully Moved ${file}`);
        movedFiles++;
    } catch (error) {
        console.log(`There was an Error While Moving ${file} file`)
    }
}

if (movedFiles == 0) {
    console.error(`There was an Error While Moving Files or There are no such files to move.`)
} else {
    console.log(`Successfully Moved ${movedFiles} Files.`)
}


