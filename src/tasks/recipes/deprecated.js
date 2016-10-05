/**
 * Deprecated.
 */
Elixir.extend('babel', function() {
    new Elixir.Task('babel', function() {
        Elixir.log
            .heading('Compatibility Alert!')
            .heading(
                "'mix.babel()' was removed. " +
                "You'll want to instead call 'mix.rollup().'"
            );

        process.exit(1);
    })
});
