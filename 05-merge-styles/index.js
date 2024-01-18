const fs = require('fs');
const path = require('path');

const srcFolderPath = path.join(__dirname, 'styles');
const destFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

// Clean bundle.css file
fs.writeFile(destFilePath, '', (err) => {
  if (err) {
    console.error(err);
  }

  // Read `styles` directory
  fs.readdir(srcFolderPath, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach((file) => {
      const srcFilePath = path.join(srcFolderPath, file);

      // Check if it is a file and it has a .css extention
      fs.stat(srcFilePath, (err, stats) => {
        if (err) {
          console.error(err);
        }

        if (stats.isFile() && path.extname(file) === '.css') {
          // Read .css files and write to bundle.css (append each file to the end of bundle.css)
          const input = fs.createReadStream(srcFilePath, 'utf-8');
          const output = fs.createWriteStream(destFilePath, { flags: 'a' });
          input.pipe(output);
        }
      });
    });
  });
});
