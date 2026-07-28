const fs = require('fs');
const path = require('path');

const analyticsCode = '\n<script src="../js/analytics.js"></script>\n</body>';
const dir = './pages';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    // skip dashboard if it gets created before this runs, though it shouldn't be here yet
    if (file === 'dashboard.html') return; 
    
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('js/analytics.js')) {
        content = content.replace('</body>', analyticsCode);
        fs.writeFileSync(filePath, content);
        console.log('Injected analytics into', file);
    } else {
        console.log('Skipped', file);
    }
});

