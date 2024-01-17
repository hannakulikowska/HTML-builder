const fs = require('fs');
const path = require('path');
const folderPath = '03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    let filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stats.isFile()) {
        console.log(
          `${path.parse(file).name} - ${path.extname(file).slice(1)} - ${(
            stats.size / 1024
          ).toFixed(3)}kb`,
        );
      }
    });
  });
});
