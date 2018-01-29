const path = require('path')
const pkg = require(path.resolve(process.cwd(), 'package.json'))

console.log('pkg.gitPackage', pkg.gitPackage);
