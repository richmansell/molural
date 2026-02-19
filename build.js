#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outputFile = path.join(__dirname, 'shape_wall.html');
const galleryOutputFile = path.join(__dirname, 'gallery.html');

// Read base HTML
const htmlPath = path.join(srcDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Read CSS
const cssPath = path.join(srcDir, 'css', 'style.css');
const css = fs.readFileSync(cssPath, 'utf8');

// Read JS files in order
const jsDir = path.join(srcDir, 'js');
const jsFiles = ['shapes.js', 'svg-shapes.js', 'utils.js', 'canvas.js', 'ui.js', 'main.js'];
let scripts = jsFiles.map(file => {
    const filePath = path.join(jsDir, file);
    return fs.readFileSync(filePath, 'utf8');
}).join('\n\n');

// Embed background image as data URL to avoid CORS taint
const bgImagePath = path.join(__dirname, 'bg', 'image.png');
const bgImageBase64 = fs.readFileSync(bgImagePath).toString('base64');
const bgDataUrl = `data:image/png;base64,${bgImageBase64}`;
const bgConstant = `\nconst BG_IMAGE_DATA_URL = '${bgDataUrl}';\n`;
scripts = bgConstant + scripts;

// Replace link tag with style tag
html = html.replace(
    /<link rel="stylesheet" href="css\/style.css">/,
    `<style>\n${css}\n</style>`
);

// Replace script tags with inline scripts
html = html.replace(
    /<!-- Script files -->[\s\S]*?<\/body>/,
    `<script>\n${scripts}\n</script>\n</body>`
);

// Write shape_wall.html
fs.writeFileSync(outputFile, html, 'utf8');
console.log(`✓ Built shape_wall.html successfully`);

// Copy gallery.html (it's already self-contained)
const galleryHtml = fs.readFileSync(path.join(srcDir, 'gallery.html'), 'utf8');
fs.writeFileSync(galleryOutputFile, galleryHtml, 'utf8');
console.log(`✓ Built gallery.html successfully`);

