const fs = require('fs');
const path = require('path');

const folderName = 'files';
const srcFolderPath = path.join(__dirname, folderName);
const destFolderPath = path.join(__dirname, `${folderName}-copy`);

fs.rm(destFolderPath, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(err);
  }
  fs.mkdir(destFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
    copyFiles();
  });
});

function copyFiles() {
  fs.readdir(srcFolderPath, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach((file) => {
      const srcFile = path.join(srcFolderPath, file);
      const destFile = path.join(destFolderPath, file);
      fs.copyFile(srcFile, destFile, (err) => {
        if (err) console.error(err);
      });
    });
  });
}
