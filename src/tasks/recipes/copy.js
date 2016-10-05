/*
 |----------------------------------------------------------------
 | Copying
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. No more complicated than that! You may either set
 | a single file or alternatively you can copy a full dir.
 |
 */

Elixir.extend('copy', function(src, output) {
    let paths = new Elixir.GulpPaths().src(src).output(output);

    new Elixir.Task('copy', function($) {
        return (
            gulp
            .src(paths.src.path, { dot: true })
            .pipe($.if(! paths.output.isDir, $.rename(paths.output.name)))
            .pipe(this.saveAs(gulp))
        );
    }, paths)
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
