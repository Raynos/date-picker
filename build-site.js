#!/usr/bin/env node

var fs = require('fs')
  , util = require('util')
  , path = require('path')
  , child_process = require('child_process')

  , files = listFiles()
  , layout = fs.readFileSync(path.join(__dirname, '_layout.html'), 'utf8')

files.forEach(function(file) {
	md(fs.readFileSync(file, 'utf8'), function(err, content) {
		var html = layout.replace('{{{content}}}', content)
		fs.writeFile(file.replace(/md$/, 'html'), html);
	})
});

function listFiles() {
	var pattern = /md$/
	return fs.readdirSync(__dirname)
		.filter(function(file) {
			return pattern.test(file);
		})
		.map(function(file) {
			return path.join(__dirname, file);
		})
};

function md(content, done) {
	var cmd = util.format('perl %s', path.join(__dirname, 'Markdown.pl'))
	  , prs = child_process.exec(cmd, function(err, stdout, stderr) {
	    done(err, stdout)
	  })

	prs.stdin.end(content);
};
