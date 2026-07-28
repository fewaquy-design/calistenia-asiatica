const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const filesToProcess = [];

function findHtmlFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.vercel') {
                findHtmlFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            filesToProcess.push(fullPath);
        }
    }
}

findHtmlFiles(dir);

const utmifyScript = `
    <!-- UTMify - UTM tracking -->
    <script
      src="https://cdn.utmify.com.br/scripts/utms/latest.js"
      data-utmify-prevent-xcod-sck
      data-utmify-prevent-subids
      async
      defer
    ></script>
    
    <!-- UTMify - Meta Pixel -->
    <script>
      window.pixelId = "6a4bd1448a171a32aa7d1226";
      var a = document.createElement("script");
      a.setAttribute("async", "");
      a.setAttribute("defer", "");
      a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(a);
    </script>
`;

let count = 0;
for (const file of filesToProcess) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('window.pixelId = "6a4bd1448a171a32aa7d1226"')) {
        continue; // Already injected
    }
    
    // insert before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', utmifyScript + '</head>');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
}
console.log('Injetado em ' + count + ' arquivos HTML.');
