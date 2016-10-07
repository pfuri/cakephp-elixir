# Elixir For CakePHP

- [Introduction](#introduction)
- [Installation & Setup](#installation)
- [Running Elixir](#running-elixir)
- [Working With Stylesheets](#working-with-stylesheets)
    - [Less](#less)
    - [Sass](#sass)
    - [Stylus](#stylus)
    - [Plain CSS](#plain-css)
    - [Source Maps](#css-source-maps)
- [Working With Scripts](#working-with-scripts)
    - [Webpack](#webpack)
    - [Rollup](#rollup)
    - [Scripts](#javascript)
- [Copying Files & Directories](#copying-files-and-directories)
- [Versioning / Cache Busting](#versioning-and-cache-busting)
- [BrowserSync](#browser-sync)

<a name="introduction"></a>
## Introduction

If you love Elixir, but also love CakePHP, you wil love Elixir for CakePHP! 

Elixir for CakePHP provides a clean, fluent API for defining basic [Gulp](http://gulpjs.com) tasks for your CakePHP application. Elixir supports common CSS and JavaScript pre-processors like [Sass](http://sass-lang.com) and [Webpack](https://webpack.github.io/). Using method chaining, Elixir allows you to fluently define your asset pipeline. For example:

```javascript
elixir(function(mix) {
    mix.sass('default.scss')
       .webpack('default.js');
});
```

If you've ever been confused and overwhelmed about getting started with Gulp and asset compilation, you will love Elixir for CakePHP. However, you are not required to use it while developing your application. You are free to use any asset pipeline tool you wish, or even none at all.

<a name="installation"></a>
## Installation & Setup

#### Installing Node

Before triggering Elixir, you must first ensure that Node.js and NPM are installed on your machine.

    node -v
    npm -v

You can easily install the latest version of Node and NPM using simple graphical installers from [their download page](http://nodejs.org/en/download/).

#### Gulp

Next, you'll need to pull in [Gulp](http://gulpjs.com) as a global NPM package:

    npm install --global gulp-cli

#### Elixir For CakePHP

The only remaining step is to install Elixir for CakePHP. To do this you will need a create a file in your app directory named `package.json` and paste in the following:  

```javascript
{
  "private": true,
  "scripts": {
    "prod": "gulp --production",
    "dev": "gulp watch"
  },
  "devDependencies": {
    "bootstrap-sass": "^3.3.7",
    "gulp": "^3.9.1",
    "jquery": "^3.1.0",
    "cakephp-elixir": "^1.2.1",
    "laravel-elixir-del": "^0.1.1",
    "laravel-elixir-webpack-official": "^1.0.2",
    "lodash": "^4.16.2"
  }
}
```

Think of this like your `composer.json` file, except it defines Node dependencies instead of PHP. You may install the dependencies it references by running:

    npm install

If you are developing on a Windows system or you are running your VM on a Windows host system, you may need to run the `npm install` command with the `--no-bin-links` switch enabled:

    npm install --no-bin-links

This process could take a couple minutes, so be patient.  

Once complete, you'll notice two new directories and two new files: ***app/node_modules***, ***app/resources***, ***app/elixir.js*** & ***app/gulpfile.js***.

* ***app/node_modules***: This is where your Node.js modules are stored
* ***app/resources***: This is where your raw assets are stored (E.g. sass/less, js, coffeescript, etc..)
* ***app/elixir.js***: This is the elixir configuration file where you can change the default source & destination folders used by Elixir
* ***app/gulpfile.js***: This is where you actually use Elixir (*see below for instructions & examples*) 

<a name="running-elixir"></a>
## Running Elixir

Elixir is built on top of [Gulp](http://gulpjs.com), so to run your Elixir tasks you only need to run the `gulp` command in your terminal. Adding the `--production` flag to the command will instruct Elixir to minify your CSS and JavaScript files:

    // Run all tasks...
    gulp

    // Run all tasks and minify all CSS and JavaScript...
    gulp --production

Upon running this command, you'll see a nicely formatted table that displays a summary of the events that just took place.

#### Watching Assets For Changes

The `gulp watch` command will continue running in your terminal and watch your assets for any changes. Gulp will automatically recompile your assets if you modify them while the `watch` command is running:

    gulp watch

<a name="working-with-stylesheets"></a>
## Working With Stylesheets

The `gulpfile.js` file in your project's root directory contains all of your Elixir tasks. Elixir tasks can be chained together to define exactly how your assets should be compiled.

<a name="less"></a>
### Less

The `less` method may be used to compile [Less](http://lesscss.org/) into CSS. The `less` method assumes that your Less files are stored in `app/resources/assets/less`. By default, the task will place the compiled CSS for this example in `app/webroot/css/default.css`:

```javascript
elixir(function(mix) {
    mix.less('default.less');
});
```

You may also combine multiple Less files into a single CSS file. Again, the resulting CSS will be placed in `app/webroot/css/default.css`:

```javascript
elixir(function(mix) {
    mix.less([
        'default.less',
        'controllers.less'
    ]);
});
```

If you wish to customize the output location of the compiled CSS, you may pass a second argument to the `less` method:

```javascript
elixir(function(mix) {
    mix.less('default.less', 'app/webroot/stylesheets');
});

// Specifying a specific output filename...
elixir(function(mix) {
    mix.less('default.less', 'app/webroot/stylesheets/style.css');
});
```

<a name="sass"></a>
### Sass

The `sass` method allows you to compile [Sass](http://sass-lang.com/) into CSS. Assuming your Sass files are stored at `app/resources/assets/sass`, you may use the method like so:

```javascript
elixir(function(mix) {
    mix.sass('default.scss');
});
```

Again, like the `less` method, you may compile multiple Sass files into a single CSS file, and even customize the output directory of the resulting CSS:

```javascript
elixir(function(mix) {
    mix.sass([
        'default.scss',
        'controllers.scss'
    ], 'app/webroot/assets/css');
});
```

#### Custom Paths

While it's recommended that you use Elixir for CakePHP's default asset directories, if you require a different base directory, you may begin any file path with `./`. This instructs Elixir to begin at the project root, rather than using the default base directory.

For example, to compile a file located at `app/assets/sass/default.scss` and output the results to `app/webroot/css/default.css`, you would make the following call to the `sass` method:

```javascript
elixir(function(mix) {
    mix.sass('./assets/sass/default.scss');
});
```

<a name="stylus"></a>
### Stylus

The `stylus` method may be used to compile [Stylus](http://stylus-lang.com/) into CSS. Assuming that your Stylus files are stored in `app/resources/assets/stylus`, you may call the method like so:

```javascript
elixir(function(mix) {
    mix.stylus('default.styl');
});
```

> {tip} This method's signature is identical to both `mix.less()` and `mix.sass()`.

<a name="plain-css"></a>
### Plain CSS

If you would just like to combine some plain CSS stylesheets into a single file, you may use the `styles` method. Paths passed to this method are relative to the `app/app/resources/assets/css` directory and the resulting CSS will be placed in `app/webroot/css/all.css`:

```javascript
elixir(function(mix) {
    mix.styles([
        'normalize.css',
        'main.css'
    ]);
});
```

You may also instruct Elixir to write the resulting file to a custom directory or file by passing a second argument to the `styles` method:

```javascript
elixir(function(mix) {
    mix.styles([
        'normalize.css',
        'main.css'
    ], 'app/webroot/assets/css/site.css');
});
```

<a name="css-source-maps"></a>
### Source Maps

In Elixir, source maps are enabled by default and provide better debugging information to your browser's developer tools when using compiled assets. For each relevant file that is compiled, you will find a companion `*.css.map` or `*.js.map` file in the same directory.

If you do not want source maps generated for your application, you may disable them using the `sourcemaps` configuration option:

```javascript
elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix.sass('default.scss');
});
```

<a name="working-with-scripts"></a>
## Working With Scripts

Elixir provides several features to help you work with your JavaScript files, such as compiling ECMAScript 2015, module bundling, minification, and simply concatenating plain JavaScript files.

When writing ES2015 with modules, you have your choice between [Webpack](http://webpack.github.io) and [Rollup](http://rollupjs.org/). If these tools are foreign to you, don't worry, Elixir will handle all of the hard work behind the scenes. By default, the CakePHP `gulpfile` uses `webpack` to compile Javascript, but you are free to use any module bundler you like.

<a name="webpack"></a>
### Webpack

The `webpack` method may be used to compile and bundle [ECMAScript 2015](https://babeljs.io/docs/learn-es2015/) into plain JavaScript. This function accepts a file path relative to the `app/resources/assets/js` directory and generates a single bundled file in the `app/webroot/js` directory:

```javascript
elixir(function(mix) {
    mix.webpack('default.js');
});
```

To choose a different output or base directory, simply specify your desired paths with a leading `.`. Then you may specify the paths relative to the root of your application. For example, to compile `app/assets/js/default.js` to `app/webroot/dist/default.js`:

```javascript
elixir(function(mix) {
    mix.webpack(
        './assets/js/default.js',
        './webroot/dist'
    );
});
```

If you'd like to leverage more of Webpack's functionality, Elixir will read any `webpack.config.js` file that is in your project root and [factor its configuration](https://webpack.github.io/docs/configuration.html) into the build process.


<a name="rollup"></a>
### Rollup

Similar to Webpack, Rollup is a next-generation bundler for ES2015. This function accepts an array of files relative to the `app/resources/assets/js` directory, and generates a single file in the `app/webroot/js` directory:

```javascript
elixir(function(mix) {
    mix.rollup('default.js');
});
```

Like the `webpack` method, you may customize the location of the input and output files given to the `rollup` method:

    elixir(function(mix) {
        mix.rollup(
            './resources/assets/js/default.js',
            './webroot/dist'
        );
    });

<a name="javascript"></a>
### Scripts

If you have multiple JavaScript files that you would like to combine into a single file, you may use the `scripts` method, which provides automatic source maps, concatenation, and minification.

The `scripts` method assumes all paths are relative to the `app/resources/assets/js` directory, and will place the resulting JavaScript in `app/webroot/js/all.js` by default:

```javascript
elixir(function(mix) {
    mix.scripts([
        'order.js',
        'forum.js'
    ]);
});
```

If you need to concatenate multiple sets of scripts into different files, you may make multiple calls to the `scripts` method. The second argument given to the method determines the resulting file name for each concatenation:

```javascript
elixir(function(mix) {
    mix.scripts(['default.js', 'controllers.js'], 'app/webroot/js/default.js')
       .scripts(['forum.js', 'threads.js'], 'app/webroot/js/forum.js');
});
```

If you need to combine all of the scripts in a given directory, you may use the `scriptsIn` method. The resulting JavaScript will be placed in `app/webroot/js/all.js`:

```javascript
elixir(function(mix) {
    mix.scriptsIn('app/webroot/js/some/directory');
});
```

> {tip} If you intend to concatenate multiple pre-minified vendor libraries, such as jQuery, instead consider using `mix.combine()`. This will combine the files, while omitting the source map and minification steps. As a result, compile times will drastically improve.


<a name="copying-files-and-directories"></a>
## Copying Files & Directories

The `copy` method may be used to copy files and directories to new locations. All operations are relative to the project's root directory:

```javascript
elixir(function(mix) {
    mix.copy('vendor/foo/bar.css', 'app/webroot/css/bar.css');
});
```

<a name="versioning-and-cache-busting"></a>
## Versioning / Cache Busting

Many developers suffix their compiled assets with a timestamp or unique token to force browsers to load the fresh assets instead of serving stale copies of the code. Elixir can handle this for you using the `version` method.

The `version` method accepts a file name relative to the `app/webroot` directory, and will append a unique hash to the filename, allowing for cache-busting. For example, the generated file name will look something like: `all-16d570a7.css`:

```javascript
elixir(function(mix) {
    mix.version('css/all.css');
});
```

After generating the versioned file, you may use the [CakePHP Elixir Helper](https://github.com/pfuri/cakephp-elixir-helper) within your views to load the appropriately hashed asset. The `version` function will automatically determine the current name of the hashed file:

    <link rel="stylesheet" href="<?php echo $this->Elixir->version('css/all.css'); ?>">

#### Versioning Multiple Files

You may pass an array to the `version` method to version multiple files:

```javascript
elixir(function(mix) {
    mix.version(['css/all.css', 'js/default.js']);
});
```

Once the files have been versioned, you may use the `elixir` helper function to generate links to the proper hashed files. Remember, you only need to pass the name of the un-hashed file to the `elixir` helper function. The helper will use the un-hashed name to determine the current hashed version of the file:

    <link rel="stylesheet" href="<?php echo $this->Elixir->version('css/all.css'); ?>">

    <script src="<?php echo $this->Elixir->version('js/default.js'); ?>"></script>

<a name="browser-sync"></a>
## BrowserSync

BrowserSync automatically refreshes your web browser after you make changes to your assets. The `browserSync` method accepts a JavaScript object with a `proxy` attribute containing the local URL for your application. Then, once you run `gulp watch` you may access your web application using port 3000 (`http://project.dev:3000`) to enjoy browser syncing:

```javascript
elixir(function(mix) {
    mix.browserSync({
        proxy: 'project.dev'
    });
});
```
