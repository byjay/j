const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'index.html');
const now = new Date();
// Format: YYYYMMDDHHMM
const ts = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0') +
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0');

let content = fs.readFileSync(targetFile, 'utf8');
const regex = /const APP_VERSION = '\d{12}';/;

if (regex.test(content)) {
    content = content.replace(regex, `const APP_VERSION = '${ts}';`);
    fs.writeFileSync(targetFile, content);
    console.log(`✅ TimeStamp Updated: ${ts}`);
} else {
    console.error('❌ Version string not found!');
    process.exit(1);
}
