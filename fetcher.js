const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let args = process.argv;


const fetcher = function(url, filePath) {
  request(url, (error, response, body) => {
    console.log(error);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`${filePath} does not exist`);
        fs.writeFile(filePath, body, () => {
          console.log(`Downloaded and saved to ${filePath}`);
        });
        rl.close();
      } else if (!err) {
        console.log(`${filePath} exists`);
        rl.question("File already exists. Overwrite file? (Y/N)", (answer) => {
          if (answer === "\u004e") { //N
            process.exit();
          } if (answer === "\u0059") { //Y
            rl.close();
            fs.writeFile(filePath, body, () => {
              fs.stat(filePath, (err, stat) => {
                console.log(`Downloaded and saved ${stat.size} bytes to ${filePath}.`);
              });
            });
          }
        });
      }
    });
  });
};

fetcher(args[2], args[3]);

module.exports = {
  fetcher,
};
