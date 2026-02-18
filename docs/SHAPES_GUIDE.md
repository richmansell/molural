# Adding Custom Shapes Guide

## SVG Shapes (Recommended)

SVG (Scalable Vector Graphics) is the best solution for custom shapes. SVGs:
- Can be hand-drawn in design tools
- Scale perfectly to any size without pixelation
- Support dynamic color changes
- Are lightweight and fast

### Method 1: Add SVG Shapes Inline (Easiest)

Edit `src/js/svg-shapes.js` and add your SVG:

```javascript
// Add a custom SVG shape
addSvgShape('myCustomShape', 'My Custom Shape', 
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M 50 10 L 90 90 L 10 90 Z" fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
  </svg>`
);
```

### Method 2: Load SVG from a File URL

Place an SVG file on a server or in your project folder and reference it:

```javascript
// In src/js/svg-shapes.js or main.js, add:
loadSvgShapeFromUrl('customStar', 'Custom Star', '/shapes/star.svg');
```

**Note:** Due to CORS restrictions, this works best when serving the HTML from a web server, not from `file://`.

### Method 3: Hand-Draw Shapes Using Design Tools

#### Using Inkscape (Free, Open-Source)

1. Download [Inkscape](https://inkscape.org/)
2. Create a new document
3. Draw your shape
4. Set document size to 100x100 pixels (File → Document Properties)
5. Resize your shape to fit the canvas
6. Export as SVG (File → Export → Save as type: Plain SVG)
7. Open the exported SVG file in a text editor and copy the content
8. Add the SVG shape using the method above

#### Using Adobe Illustrator

1. Create a new 100x100px artboard
2. Draw your shape
3. File → Export As → SVG
4. Copy the SVG code and add to your app

#### Using Figma (Free Web-Based)

1. Create a 100x100 frame
2. Design your shape
3. Right-click → Copy as → SVG
4. Use the copied SVG in your app

### Method 4: Hand-Draw and Scan (More Advanced)

1. Draw your shape on paper
2. Scan or photograph it
3. Use an image tracer tool like [Potrace](http://potrace.sourceforge.net/) or Inkscape's "Trace Bitmap" to convert to SVG
4. Use the exported SVG

## PNG Shapes (Limited Color Support)

While not recommended, you can use PNGs with limited color tinting:

```javascript
// In canvas.js, you'd need to add support for image-based shapes
// This is more complex and doesn't support dynamic colors as well as SVG
```

**Why PNG is not ideal:**
- Harder to change colors
- Doesn't scale as nicely
- Larger file sizes
- Limited to what you drew

**If you must use PNG:**
- PNGs can be loaded from URLs
- Canvas can apply color filters/tints
- Results are less predictable than SVG

## Recommended Workflow

1. **Design** your shapes in a design tool (Figscape, Inkscape, Illustrator)
2. **Export as SVG** with a viewBox of 0 0 100 100
3. **Add to app** using `addSvgShape()` function
4. **Rebuild** with `npm run build`
5. **Test** in the browser

## SVG Best Practices

### Viewbox Size
Always use `viewBox="0 0 100 100"` in your SVGs. This ensures consistent sizing and positioning.

### Color Handling
- SVGs in the library use `#FF6B6B` as the base color
- The app automatically recolors your shape when a user picks a new color
- Make sure your SVG has a fill color for this to work

### Example SVG Template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Your shape here, use fill="#FF6B6B" or similar -->
  <circle cx="50" cy="50" r="40" fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
</svg>
```

## Adding Multiple Shapes at Once

In `src/js/svg-shapes.js`:

```javascript
// Add several custom shapes at startup
addSvgShape('flower', 'Flower',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="15" fill="#FF6B6B"/>
    <circle cx="50" cy="20" r="12" fill="#FF6B6B"/>
    <circle cx="50" cy="80" r="12" fill="#FF6B6B"/>
    <circle cx="20" cy="50" r="12" fill="#FF6B6B"/>
    <circle cx="80" cy="50" r="12" fill="#FF6B6B"/>
  </svg>`
);

addSvgShape('crescent', 'Crescent',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M 50 20 A 30 30 0 1 1 50 80 A 24 24 0 1 0 50 26 Z" fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
  </svg>`
);
```

## Testing Your Shapes

1. Add your shape using one of the methods above
2. Run: `npm run build`
3. Open `shape_wall.html` in a browser
4. Your new shape should appear in the library on the left
5. Drag it onto the wall and test color changes

## Color Changing Technical Details

The app converts colors in two ways:

1. **For SVG shapes**: The `renderSvgOnCanvas()` function recolors SVGs by:
   - Rendering the SVG to canvas
   - Using pixel-by-pixel color manipulation
   - Preserving luminance (brightness) while changing hue
   - This allows smooth, natural-looking color changes

2. **For canvas shapes**: Colors are changed directly since they're drawn programmatically

## Troubleshooting

**SVG doesn't appear:**
- Check that the SVG has a valid viewBox="0 0 100 100"
- Ensure the SVG has a fill color
- Check browser console for errors

**Colors don't change nicely:**
- SVG recoloring uses luminance-based tinting
- Try adjusting the colors in your original SVG

**Shape is distorted:**
- Make sure your SVG fits within the 100x100 viewBox
- Check aspect ratio and positioning

## Next Steps

1. Design 2-3 custom shapes in your preferred design tool
2. Export as SVG with viewBox="0 0 100 100"
3. Add them to `svg-shapes.js` using `addSvgShape()`
4. Rebuild and test!
