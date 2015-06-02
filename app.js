var zip = require("./zip.js")

var code = process.argv.splice(2)

code.forEach(zip.get);



