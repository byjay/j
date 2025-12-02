
const fs = require('fs');
const vm = require('vm');

const filePath = 'f:\\genmini\\japness\\변환\\fam\\js\\learning\\conversation.js';

try {
    const code = fs.readFileSync(filePath, 'utf8');
    const script = new vm.Script(code, { filename: filePath });
    console.log('Syntax check passed!');
} catch (err) {
    console.error('Syntax Error found:');
    console.error(err.message);
    if (err.stack) {
        console.error(err.stack.split('\n').slice(0, 5).join('\n'));
    }
}
