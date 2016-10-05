var ncp = require('ncp').ncp;

var source = "resources";
var destination = "../../resources";
var options = { "clobber": false };
ncp(source, destination, options, function (err) {
	if (err) {
		return console.error(err);
	}
 	console.log("app/resources created successfully!\n");
});

source = "elixir.example.json";
destination = "../../elixir.json";
ncp(source, destination, options, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("app/elixir.json created successfully!\n");
});

source = "gulpfile.example.js";
destination = "../../gulpfile.js";
ncp(source, destination, options, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("app/gulpfile.js created successfully!\n");
});
