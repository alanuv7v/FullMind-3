// run `node node.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

var fs = require('fs');

let data = {a: 123}

fs.writeFileSync('file.json', JSON.stringify(data));