/*
 |----------------------------------------------------------------
 | TDD Watcher
 |----------------------------------------------------------------
 |
 | This task will keep an eye on any tasks that are part of the
 | tdd category. By default this includes PHPUnit and PHPSpec
 | tests. Run `gulp tdd` and your tests will auto-trigger.
 |
 */

gulp.task('tdd', function() {
    Elixir.log.message('Watching for tests...');

    runAllTasks();

    Elixir.tasks
        .filter(task  => task.category == 'tdd')
        .forEach(task => gulp.watch(task.watchers, [task.name]));
});


/**
 * Trigger all registered tasks.
 */
function runAllTasks() {
    gulp.start('default');

    Elixir.isRunningAllTasks = false;
}
