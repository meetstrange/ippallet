
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: '.',
        tasks: 'server'
      }
    },
    server: {
      port: 3333,
      base: '.'
    }
  });
};
