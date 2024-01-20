const fs = require('fs');
const path = require('path');

const destFolderPath = path.join(__dirname, 'project-dist');
const destAssetsPath = path.join(__dirname, 'project-dist', 'assets');
const destHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
const destCssFilePath = path.join(__dirname, 'project-dist', 'style.css');

const srcAssetsPath = path.join(__dirname, 'assets');
const srcCssFolderPath = path.join(__dirname, 'styles');
const srcTemplatePath = path.join(__dirname, 'template.html');
const componentsFolderPath = path.join(__dirname, 'components');

// Create `project-dist` folder
fs.mkdir(destFolderPath, { recursive: true }, (err) => {
  if (err) console.error(err);
});

// Copy `assets` folder
fs.cp(srcAssetsPath, destAssetsPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

// Copy `template` to index.html
const input = fs.createReadStream(srcTemplatePath, 'utf-8');
const output = fs.createWriteStream(destHtmlPath);
input.pipe(output).on('finish', () => {
  // Read index.html after copying is finished
  fs.readFile(destHtmlPath, 'utf-8', (err, htmlContent) => {
    if (err) {
      console.error(err);
    }

    // Find placeholders {{componentName}}
    const placeholders = htmlContent.match(/{{\w+}}/g) || [];

    let placeholderCount = placeholders.length;
    if (!placeholderCount) return;

    placeholders.forEach((placeholder) => {
      const componentName = placeholder.replace(/[{}]/g, '');
      const componentPath = path.join(
        componentsFolderPath,
        `${componentName}.html`,
      );

      fs.readFile(componentPath, 'utf-8', (err, componentContent) => {
        if (err) {
          console.error(err);
        }

        htmlContent = htmlContent.replace(placeholder, componentContent);
        placeholderCount--;

        if (placeholderCount === 0) {
          // Write components to index.html
          fs.writeFile(destHtmlPath, htmlContent, 'utf-8', (err) => {
            if (err) console.error(err);
          });
        }
      });
    });
  });
});

// Compile css styles into project-dist/style.css
// clean style.css file
fs.writeFile(destCssFilePath, '', (err) => {
  if (err) {
    console.error(err);
  }

  // read `styles` directory
  fs.readdir(srcCssFolderPath, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach((file) => {
      const srcCssFilePath = path.join(srcCssFolderPath, file);

      // check if it is a file and it has a .css extention
      fs.stat(srcCssFilePath, (err, stats) => {
        if (err) {
          console.error(err);
        }

        if (stats.isFile() && path.extname(file) === '.css') {
          // read .css files and write to style.css (append each file to the end of style.css)
          const input = fs.createReadStream(srcCssFilePath, 'utf-8');
          const output = fs.createWriteStream(destCssFilePath, { flags: 'a' });
          input.pipe(output);
        }
      });
    });
  });
});
