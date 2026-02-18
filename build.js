#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outputFile = path.join(__dirname, 'shape_wall.html');

// Read base HTML
const htmlPath = path.join(srcDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Read CSS
const cssPath = path.join(srcDir, 'css', 'style.css');
const css = fs.readFileSync(cssPath, 'utf8');

// Read JS files in order
const jsDir = path.join(srcDir, 'js');
const jsFiles = ['shapes.js', 'svg-shapes.js', 'utils.js', 'canvas.js', 'ui.js', 'main.js'];
const scripts = jsFiles.map(file => {
    const filePath = path.join(jsDir, file);
    return fs.readFileSync(filePath, 'utf8');
}).join('\n\n');

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

// Write output
fs.writeFileSync(outputFile, html, 'utf8');
console.log(`✓ Built shape_wall.html successfully`);
