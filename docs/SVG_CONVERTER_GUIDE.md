# SVG Converter - Automated Shape Addition

**The goal: Auto-convert your SVG files into code ready to add to the app. Automation is key!**

## The Workflow (4 Simple Steps)

### 1. Drop SVGs in the input/ folder
```
input/
  ├── my_shape_1.svg
  ├── my_shape_2.svg
  └── my_custom_star.svg
```

### 2. Run the converter
```bash
npm run convert-svg
```

### 3. Check the output
Your generated code appears in: `output/svg-shapes-to-add.js`

```javascript
// From: my_shape_1.svg
addSvgShape(
    'my_shape_1',
    'My Shape 1',
    '<svg viewBox="0 0 100 100">...</svg>'
);

// From: my_shape_2.svg
addSvgShape(
    'my_shape_2',
    'My Shape 2',
    '<svg viewBox="0 0 100 100">...</svg>'
);
```

### 4. Copy to src/js/svg-shapes.js
Open `output/svg-shapes-to-add.js` and copy-paste whichever `addSvgShape()` calls you want into `src/js/svg-shapes.js`, then:

```bash
npm run build
open shape_wall.html
```

Done! Your new shapes are ready to use.

## How It Works

The converter automatically:
- ✓ Reads all SVG files from `input/`
- ✓ Ensures each has a `viewBox` attribute (adds one if missing)
- ✓ Creates a JavaScript key from the filename: `my_shape_1.svg` → `my_shape_1`
- ✓ Creates a display name: `my_shape_1` → `My Shape 1`
- ✓ Escapes the SVG for JavaScript strings
- ✓ Generates ready-to-use `addSvgShape()` calls
- ✓ Saves everything to `output/svg-shapes-to-add.js`

## Why This Matters

Instead of manually:
1. Opening TextEdit/VS Code
2. Copying SVG content
3. Creating JavaScript strings
4. Adding escape characters
5. Formatting the code

Now you just:
1. Drop SVG files in `input/`
2. Run `npm run convert-svg`
3. Copy the generated code
4. Done! ✓

## Tips

- **SVG Format**: Your SVGs should have `viewBox="0 0 100 100"` (or width/height). The converter will add this if missing.
- **Multiple shapes**: Drop as many SVGs as you want in `input/` - the converter handles them all in one run.
- **Try it now**: The converter showed an example above using `leaf_example.svg`
- **Pick and choose**: You don't have to use every shape - copy only the ones you like from `output/svg-shapes-to-add.js`

## File Structure

```
project/
├── input/                          ← Drop your SVG files here
├── output/                         ← Generated code appears here
├── svg-converter.js                ← The automation tool
├── src/
│   └── js/
│       └── svg-shapes.js           ← Copy into this file
└── shape_wall.html                 ← Test in your browser
```
