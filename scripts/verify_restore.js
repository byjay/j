const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const stylesPath = path.join(rootDir, 'css', 'styles.css');
const indexPath = path.join(rootDir, 'index.html');
const osakaPath = path.join(rootDir, 'js', 'travel', 'osaka.js');

let hasError = false;

function check(file, content, description) {
    try {
        const fileContent = fs.readFileSync(file, 'utf8');
        if (fileContent.includes(content)) {
            console.log(`✅ [PASS] ${description}`);
        } else {
            console.error(`❌ [FAIL] ${description} NOT found in ${path.basename(file)}`);
            hasError = true;
        }
    } catch (e) {
        console.error(`❌ [FAIL] Could not read ${path.basename(file)}: ${e.message}`);
        hasError = true;
    }
}

console.log('--- 🧪 STARTING RESTORATION VERIFICATION ---');

// 1. Check Mobile Frame
check(stylesPath, 'max-width: 480px', 'Mobile Frame Max-Width');
check(stylesPath, 'margin: 0 auto', 'Mobile Frame Centering');

// 2. Check Bottom Nav
check(indexPath, 'id="bottom-nav"', 'Bottom Navigation Element');
check(indexPath, 'class="fixed bottom-0', 'Bottom Navigation Styling');

// 3. Check Osaka Module (New System)
check(osakaPath, 'initOsakaTrip', 'Osaka Module Function');

// 4. Check Cleanup (Old System)
const indexContent = fs.readFileSync(indexPath, 'utf8');
if (!indexContent.includes('fukuoka_poi_data.js')) {
    console.log('✅ [PASS] Legacy Data Scripts Removed');
} else {
    console.error('❌ [FAIL] Legacy Data Scripts still present!');
    hasError = true;
}

if (hasError) {
    console.log('\n❌ VERIFICATION FAILED');
    process.exit(1);
} else {
    console.log('\n✨ ALL TESTS PASSED: System is Certified Restored.');
    process.exit(0);
}
