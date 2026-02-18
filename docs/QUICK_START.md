# Quick Start: Adding Shapes

## Option 1: Use Built-In Canvas Shapes
These are already included. No action needed. They're in `src/js/shapes.js`.

## Option 2: Add Simple SVG Shapes

### Fastest Way (Copy & Paste)

1. Open `EXAMPLE_SHAPES.js` - it has 10 ready-to-use SVG shapes
2. Copy any function that looks like:
   ```javascript
   addSvgShape('blob', 'Blob', `<svg>...</svg>`);
   ```
3. Paste it into the bottom of `src/js/svg-shapes.js`
4. Run: `npm run build`
5. Your shape appears in the app!

### Create Your Own (5 minutes)

1. Open any text editor
2. Create simple SVG code:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
     <rect x="20" y="20" width="60" height="60" fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
   </svg>
   ```
3. Add to `src/js/svg-shapes.js`:
   ```javascript
   addSvgShape('mySquare', 'My Square', `<svg xmlns="...">...</svg>`);
   ```
4. Build: `npm run build`
5. Done!

## Option 3: Design Shapes in a Tool

### Free Tools
- **Figma** (Web-based): figma.com
- **Inkscape** (Download): inkscape.org
- **Draw.io** (Web): draw.io

### Steps
1. Create a 100x100 canvas
2. Draw your shape
3. Export as SVG
4. Open the SVG file in a text editor
5. Copy the SVG code and add using `addSvgShape()`

## Option 4: Use a PNG (Not Recommended)

PNG support is complex and doesn't recolor as nicely as SVG. Use SVG instead!

## Testing Your Changes

```bash
npm run build  # Rebuild HTML
npm run dev    # Build and open in browser
```

## Key Points

- **SVGs must have**: 
  - `viewBox="0 0 100 100"` attribute
  - A fill color (e.g., `fill="#FF6B6B"`)
  
- **Function signature**:
  ```javascript
  addSvgShape(uniqueKey, displayName, svgString)
  ```
  - `uniqueKey`: No spaces, unique identifier
  - `displayName`: What shows in the UI
  - `svgString`: The full SVG XML

- **Color recoloring** happens automatically. Just make sure your SVG has a fill color.

## Examples

### Simple Circle
```javascript
addSvgShape('circle', 'Circle',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
  </svg>`
);
```

### Heart
```javascript
addSvgShape('heart', 'Heart',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50 85 C20 70 10 50 10 40 C10 25 20 15 30 15 C40 15 50 25 50 25 C50 25 60 15 70 15 C80 15 90 25 90 40 C90 50 80 70 50 85 Z" 
          fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
  </svg>`
);
```

### More Examples
See **EXAMPLE_SHAPES.js** for 10+ ready-to-use examples!

## Need Help?

1. Read **SHAPES_GUIDE.md** for detailed instructions
2. Check **EXAMPLE_SHAPES.js** for shape templates
3. Look at existing shapes in `src/js/svg-shapes.js`
4. Check your SVG has: `viewBox="0 0 100 100"` and a fill color
