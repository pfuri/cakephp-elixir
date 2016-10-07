var ncp = require('ncp').ncp;

var source = "resources";
var destination = "../../resources";
var options = { "clobber": false };
ncp(source, destination, options, function (err) {
	if (err) {
		return console.error(err);
	}
 	console.log("app/resources copied (noclobber) successfully!\n");
});

source = "elixir.example.json";
destination = "../../elixir.json";
ncp(source, destination, options, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("app/elixir.json copied (noclobber) successfully!\n");
});

source = "gulpfile.example.js";
destination = "../../gulpfile.js";
ncp(source, destination, options, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("app/gulpfile.js copied (noclobber) successfully!\n");
});

console.log("Thank you for using CakePHP Elixir!\n");
console.log("If using the version extension, don't forget to install the CakePHP Version Helper!\n");
console.log("https://github.com/pfuri/cakephp-elixir-helper\n");
