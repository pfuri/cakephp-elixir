class CombineTask extends Elixir.Task {

    /**
     * Create a new CombineTask instance.
     *
     * @param {string} name
     * @param {GulpPaths} paths
     */
    constructor(name, paths) {
        super(name, null, paths);
    }


    /**
     * Build the Gulp task.
     */
    gulpTask() {
        // The mix.combine() task should only
        // concat the files. That's it.
        if (this.name == 'combine') {
            return (
                gulp
                .src(this.src.path)
                .pipe(this.concat())
                .on('error', this.onError())
                .pipe(this.saveAs(gulp))
                .pipe(this.onSuccess('Assets Combined!'))
            );
        }

        // Otherwise, for mix.scripts() and mix.styles(),
        // we can also apply source maps and minification.
        return (
            gulp
            .src(this.src.path)
            .pipe(this.initSourceMaps())
            .pipe(this.concat())
            .pipe(this.minify())
            .on('error', this.onError())
            .pipe(this.writeSourceMaps())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess('Assets Combined!'))
        );
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.path)
            .ignore(this.output.path);
    }
}


export default CombineTask;
