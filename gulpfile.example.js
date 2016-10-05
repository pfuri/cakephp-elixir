const elixir = require('cakephp-elixir');

//require('laravel-elixir-del');
//require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
		//mix.del(["public/build", "public/css", "public/js"])
    	//.sass('default.scss').version('css/default.css')
        //.webpack('default.js').version('js/default.js');
        mix.sass('default.scss');
});
