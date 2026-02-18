// SVG Shape utilities and rendering

/**
 * Renders an SVG string onto a canvas with a specific color
 * Injects the color directly into the SVG before rendering
 */
function renderSvgOnCanvas(ctx, svgString, x, y, size, color) {
    return new Promise((resolve, reject) => {
        try {
            // Inject color into the SVG by adding fill="color" to shape elements
            let coloredSvg = svgString;
            
            // Add fill color to all shape elements that might not have it
            coloredSvg = coloredSvg.replace(/<path\s/g, `<path fill="${color}" `);
            coloredSvg = coloredSvg.replace(/<circle\s/g, `<circle fill="${color}" `);
            coloredSvg = coloredSvg.replace(/<rect\s/g, `<rect fill="${color}" `);
            coloredSvg = coloredSvg.replace(/<polygon\s/g, `<polygon fill="${color}" `);
            coloredSvg = coloredSvg.replace(/<ellipse\s/g, `<ellipse fill="${color}" `);
            coloredSvg = coloredSvg.replace(/<polyline\s/g, `<polyline fill="${color}" `);

            // Handle elements that already have fill attribute - replace it
            coloredSvg = coloredSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
            coloredSvg = coloredSvg.replace(/fill='[^']*'/g, `fill='${color}'`);

            // Create a canvas for rendering the SVG
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const tempCtx = canvas.getContext('2d');

            // Create an image from the colored SVG
            const svg = new Blob([coloredSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svg);
            const img = new Image();

            img.onload = () => {
                try {
                    // Draw the colored SVG onto the temp canvas
                    tempCtx.drawImage(img, 0, 0, size, size);

                    // Draw the SVG onto the main canvas
                    ctx.drawImage(canvas, x - size / 2, y - size / 2, size, size);

                    URL.revokeObjectURL(url);
                    resolve();
                } catch (err) {
                    URL.revokeObjectURL(url);
                    reject(err);
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load SVG image'));
            };

            img.src = url;
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 100, b: 100 };
}

/**
 * Create a simple SVG shape from a string
 */
function svgString(content) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${content}</svg>`;
}

/**
 * SVG Shape definitions
 * You can:
 * 1. Define SVG content inline (recommended for built-in shapes)
 * 2. Load SVG files from URLs
 * 3. Import hand-drawn SVGs from design tools
 */
const svgShapeDefinitions = {
    // Note: For better performance, consider using canvas-drawn shapes instead of SVG rendering
    // SVG rendering is async and can cause flickering. Use renderSvgOnCanvas() only for complex hand-drawn SVGs
};

/**
 * Add a custom SVG shape
 * @param {string} key - Unique identifier for the shape
 * @param {string} name - Display name
 * @param {string} svgContent - SVG string (should have viewBox="0 0 100 100")
 */
function addSvgShape(key, name, svgContent) {
    svgShapeDefinitions[key] = {
        name: name,
        type: 'svg',
        svg: svgContent,
        draw: (ctx, x, y, size, color) => {
            return renderSvgOnCanvas(ctx, svgContent, x, y, size, color);
        }
    };
}

/**
 * Load an SVG shape from a URL
 * @param {string} key - Unique identifier for the shape
 * @param {string} name - Display name
 * @param {string} url - URL to the SVG file
 */
function loadSvgShapeFromUrl(key, name, url) {
    svgShapeDefinitions[key] = {
        name: name,
        type: 'svg',
        url: url,
        draw: (ctx, x, y, size, color) => {
            return fetch(url)
                .then(response => response.text())
                .then(svgContent => renderSvgOnCanvas(ctx, svgContent, x, y, size, color))
                .catch(err => console.error(`Failed to load SVG from ${url}:`, err));
        }
    };
}

// Add Blob shape as a hardcoded canvas drawing (instead of SVG for better performance)
// This is loaded from shapes.js, so no need to re-define it here


