// run-test.js
const { execSync } = require('child_process');
const path = require('path');

const testFile = process.argv[2];

if (!testFile) {
    console.error('Please provide a test file to run.');
    process.exit(1);
}

const fullPath = path.resolve(__dirname, testFile);

try {
    execSync(`mocha ${fullPath}`, { stdio: 'inherit' });
} catch (error) {
    process.exit(1);
}
