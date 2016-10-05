import gutil from 'gulp-util';
import MinimalTaskReporter from './reporters/MinimalTaskReporter';
import TaskReporter from './reporters/TaskReporter';

class Log {

    /**
     * Create a new Logger instance.
     */
    constructor() {
        this.minimal = gutil.env.minimal;
    }


    /**
     * Log a heading to the console.
     *
     * @param  {string} heading
     * @return {this}
     */
    heading(heading) {
        return this.break().message(
            gutil.colors.black(gutil.colors.bgGreen(heading))
        );
    };


    /**
     * Report the stats for the given task.
     *
     * @param {Task} task
     */
    task(task) {
        this.getReporter().report(task);
    }


    /**
     * Report the stats for all registered tasks.
     */
    tasks() {
        this.getReporter().report();
    }

    /**
     * Get the task reporter instance.
     *
     * @return {TaskReporter}
     */
    getReporter() {
        if (! this.reporter) {
            this.reporter = this.minimal
                ? new MinimalTaskReporter()
                : new TaskReporter();
        }

        return this.reporter;
    }


    /**
     * Log a general message to the console.
     *
     * @param  {string} message
     * @return {this}
     */
    message(message) {
        if (this.shouldBeMuted()) {
            return this;
        }

        console.log(message);

        return this;
    };


    /**
     * Log a heading and message to the console.
     *
     * @param  {string}      heading
     * @param  {string|null} message
     * @return {this}
     */
    status(heading, message) {
        this.heading(heading);

        message && this.message(message);

        return this;
    }


    /**
     * Log an error message to the console.
     *
     * @param {string} message
     */
    error(message) {
        this.break().message(
            gutil.colors.bgRed(message)
        );

        return this;
    }

    /**
     * Format a console command that should be run.
     *
     * @param  {string} command
     * @return {this}
     */
    command(command) {
        this.divider().message(command).divider();

        return this;
    }


    /**
     * Print a long divider to the console.
     *
     * @return {this}
     */
    divider() {
        this.message('=======================================================');

        return this;
    }


    /**
     * Add a line break to the console output.
     *
     * @return {this}
     */
    break() {
        console.log(''); // line break

        return this;
    }


    /**
     * Determine if we're in test-mode.
     *
     * @return {boolean}
     */
    shouldBeMuted() {
        return Elixir.config.muted;
    }
}


export default Log;
