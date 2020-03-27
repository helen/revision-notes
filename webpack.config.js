// This is so we can use relative paths
var path = require('path');

module.exports = {
	// Take js/src/revision-notes.js and compile it into js/revision-notes.min.js
	entry: path.resolve(__dirname, "js") + "/src/revision-notes.js",
	output: {
		filename: 'revision-notes.min.js',
		path: path.resolve(__dirname, "js"),
    },
};
