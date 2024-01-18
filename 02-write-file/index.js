const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, 'text.txt');
// Create a file
fs.createWriteStream(filePath);

// Dispay the question
console.log(
  'Enter data to write to the file text.txt or type "exit" to finish:',
);

// Append the data to a file
const writeData = (data) => {
  fs.appendFile(filePath, data + '\n', (err) => {
    if (err) throw err;
    // console.log(`Data has been written to a file: ${filePath}`);
  });
};

// Input
rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Program completed');
    rl.close();
  } else {
    writeData(input);
  }
});

// Handle Ctrl+C (SIGINT)
rl.on('SIGINT', () => {
  console.log('Program completed');
  rl.close();
});
