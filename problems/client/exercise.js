var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var execute = require('workshopper-exercise/execute')
var comparestdout = require('workshopper-exercise/comparestdout')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// compare stdout of solution and submission
exercise = comparestdout(exercise)
/**
 * The seneca log is set to "quiet" to have a clean comparation of stdouts.
 */
exercise.addSetup(function (mode, callback) {
   // Test arguments to be summed
  if (mode === 'run') {
    // run
    this.submissionArgs = [process.cwd() + '/' + this.submission, process.argv[4], process.argv[5]]
  } else {
    // verify
    this.solutionArgs = [this.solution, 2, 7]
    this.submissionArgs = [process.cwd() + '/' + this.submission, 2, 7]
  }
  this.solution = __dirname + '/seneca-client-executor.js'
  this.submission = __dirname + '/seneca-client-executor.js'
  callback()
})

// cleanup for both run and verify
exercise.addCleanup(function (mode, passed, callback) { /* Do nothing */ })

module.exports = exercise
