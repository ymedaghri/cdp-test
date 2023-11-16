const { data } = require("./data.js");
const { processCommandLineArgs } = require("./main.js");

const result = processCommandLineArgs(process.argv.slice(2), data)

process.stdout.write(JSON.stringify(result, null, 2));