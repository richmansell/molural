# Funky Shape Wall

A fun, interactive HTML5 canvas app for creating collages with colorful shapes.

## Quick Start

### Use It Now

Open `shape_wall.html` in your browser to start creating!

### Add Your Own Shapes

1. **Convert PNG to SVG** using [Potrace](http://potrace.sourceforge.net/mkbitmap.html)
2. **Copy SVG code** from the exported file  
3. **Add to `src/js/svg-shapes.js`** using `addSvgShape()`
4. **Run `npm run build`**

See **ADD_SHAPES_SIMPLE.md** for step-by-step instructions.

## Features

✨ **Drag & Drop** shapes onto the wall  
🎨 **Change Colors** - 10 beautiful pastel colors  
📏 **Resize** by dragging corners  
🗑️ **Delete** shapes with Delete key  
💾 **Save** as JPEG  
✏️ **Add Custom Shapes** - Import your own SVGs

## Built-in Shapes

8 default shapes included:
- Circle, Square, Triangle
- Star, Hexagon, Heart
- Diamond, Wavy Circle

## How to Use

1. **Select a color** from the palette at top-left
2. **Drag a shape** from the library onto the wall
3. **Click a shape** on the wall to select it
4. **Resize** - drag any corner
5. **Change color** - click a color (palette shows shape's current color)
6. **Delete** - press Delete key
7. **Save** - click "Save as JPEG"

## For Developers

### Source Files

```
src/
├── css/style.css       - All styling
└── js/
    ├── shapes.js       - Built-in shapes (8 canvas-drawn)
    ├── svg-shapes.js   - Your custom SVG shapes go here
    ├── canvas.js       - Canvas rendering & interaction
    ├── ui.js           - UI, colors, shape library
    ├── utils.js        - Helper functions
    └── main.js         - Initialization
```

### Build & Test

```bash
npm run build    # Merge src/ files into shape_wall.html
npm run dev      # Build and open in browser
```

### Add Custom Shapes

Edit `src/js/svg-shapes.js` and add:

```javascript
addSvgShape('myshape', 'My Shape Name',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <!-- Your SVG code here -->
  </svg>`
);
```

Then `npm run build`.

## Documentation

- **ADD_SHAPES_SIMPLE.md** - Simple guide to add custom shapes
- **README.md** - This file

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

---

**Want to add your own shapes?** See **ADD_SHAPES_SIMPLE.md** for a simple 3-step guide!
