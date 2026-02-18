#!/usr/bin/env node

/**
 * SVG Converter - Convert SVG files from input/ folder to addSvgShape() API calls
 * 
 * Usage:
 *   1. Put your SVG files in the input/ folder
 *   2. Run: npm run convert-svg
 *   3. Get JavaScript code in output/svg-shapes-to-add.js
 *   4. Copy desired addSvgShape() calls into src/js/svg-shapes.js
 */

const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, 'input');
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'svg-shapes-to-add.js');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Clean SVG content - removes unnecessary fill colors
 * The app will inject the correct color when rendering
 */
function cleanSvg(svgContent) {
    // Remove existing fill attributes from all elements
    svgContent = svgContent.replace(/\sfill="[^"]*"/g, '');
    svgContent = svgContent.replace(/\sfill='[^']*'/g, '');
    
    // Also remove fill: from style attributes
    svgContent = svgContent.replace(/fill:\s*[^;;}]*/g, '');
    
    return svgContent.trim();
}

/**
 * Ensure SVG has a viewBox attribute
 */
function ensureViewBox(svgContent) {
    // Check if SVG already has viewBox
    if (svgContent.includes('viewBox=')) {
        return svgContent;
    }

    // Try to extract width/height and create viewBox
    const widthMatch = svgContent.match(/width="(\d+)"/);
    const heightMatch = svgContent.match(/height="(\d+)"/);

    if (widthMatch && heightMatch) {
        const width = widthMatch[1];
        const height = heightMatch[1];
        // Add viewBox after opening svg tag
        return svgContent.replace(/<svg/, `<svg viewBox="0 0 ${width} ${height}"`);
    }

    // Default fallback - assume 100x100
    if (!svgContent.includes('viewBox=')) {
        return svgContent.replace(/<svg/, '<svg viewBox="0 0 100 100"');
    }

    return svgContent;
}

/**
 * Convert filename to a safe JavaScript identifier (key)
 */
function filenameToKey(filename) {
    return filename
        .toLowerCase()
        .replace(/\.svg$/i, '')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

/**
 * Convert filename to display name (Title Case)
 */
function filenameToName(filename) {
    return filename
        .replace(/\.svg$/i, '')
        .replace(/[_-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Escape single quotes in SVG for JavaScript string
 */
function escapeSvgForJs(svgContent) {
    return svgContent.replace(/'/g, "\\'");
}

/**
 * Main conversion function
 */
function convertSvgFiles() {
    // Check if input directory exists
    if (!fs.existsSync(INPUT_DIR)) {
        console.log('✗ input/ folder not found. Creating it...');
        fs.mkdirSync(INPUT_DIR, { recursive: true });
        console.log('✓ Created input/ folder');
        console.log('\nNext steps:');
        console.log('  1. Place your SVG files in the input/ folder');
        console.log('  2. Run: npm run convert-svg');
        console.log('  3. Get code in output/svg-shapes-to-add.js');
        return;
    }

    // Find all SVG files
    const files = fs.readdirSync(INPUT_DIR).filter(f => f.toLowerCase().endsWith('.svg'));

    if (files.length === 0) {
        console.log('✗ No SVG files found in input/ folder');
        console.log('\nNext steps:');
        console.log('  1. Place your SVG files in input/');
        console.log('  2. Run: npm run convert-svg');
        return;
    }

    console.log(`Converting ${files.length} SVG file(s)...`);

    // Generate JavaScript code
    let jsCode = `// Auto-generated SVG shape definitions
// Generated from input/ folder by svg-converter.js
// Copy the addSvgShape() calls you want into src/js/svg-shapes.js

`;

    let successCount = 0;

    files.forEach((filename, index) => {
        try {
            const filePath = path.join(INPUT_DIR, filename);
            let svgContent = fs.readFileSync(filePath, 'utf8');

            // Process SVG
            svgContent = cleanSvg(svgContent);
            svgContent = ensureViewBox(svgContent);

            const key = filenameToKey(filename);
            const name = filenameToName(filename);
            const escapedSvg = escapeSvgForJs(svgContent);

            // Generate code
            jsCode += `// From: ${filename}\n`;
            jsCode += `addSvgShape(\n`;
            jsCode += `    '${key}',\n`;
            jsCode += `    '${name}',\n`;
            jsCode += `    '${escapedSvg}'\n`;
            jsCode += `);\n`;

            if (index < files.length - 1) {
                jsCode += `\n`;
            }

            successCount++;
            console.log(`  ✓ ${filename}`);
        } catch (error) {
            console.log(`  ✗ ${filename}: ${error.message}`);
        }
    });

    // Write output file
    fs.writeFileSync(OUTPUT_FILE, jsCode);

    console.log(`\n✓ Converted ${successCount} SVG file(s)`);
    console.log(`\nOutput: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
    console.log('\nNext steps:');
    console.log('  1. Open output/svg-shapes-to-add.js');
    console.log('  2. Copy addSvgShape() calls into src/js/svg-shapes.js');
    console.log('  3. Run: npm run build');
    console.log('  4. Open shape_wall.html to see your new shapes!');
}

// Run conversion
convertSvgFiles();
