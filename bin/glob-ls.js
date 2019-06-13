// This is a small helper from python which will list all files considering 2nd parameter
// This is being used inside package.json to create a command which would format all html files at once
// Usage: `node bin/glob-ls.js 'src/**/*.html'`
const glob = require('glob');
const patterns = process.argv.slice(2);
patterns.forEach(pattern => {
  glob(pattern, {}, function(err, files) {
    if (err) throw err;
    process.stdout.write(files.join('\n') + '\n');
  });
});