# How to Add Your Own Shapes

## Simple 3-Step Process

### Step 1: Convert Your PNG to SVG

Use **Potrace** (fastest, free, online):

1. Go to: [potrace.sourceforge.net](http://potrace.sourceforge.net/mkbitmap.html)
2. Upload your PNG image
3. Click "Trace"
4. Click "Download SVG"

**That's it!** You now have an SVG file.

---

### Step 2: Get the SVG Code

1. Open the SVG file with a text editor
2. Copy all the code between `<svg>` and `</svg>`

Example of what you'll see:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M50 10 L90 90 L10 90 Z" fill="#000000"/>
</svg>
```

---

### Step 3: Add to Your App

1. Open: `src/js/svg-shapes.js`
2. Scroll to the bottom
3. Add this code with your SVG:

```javascript
addSvgShape('myshape', 'My Shape Name',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <!-- Paste your SVG code here -->
  </svg>`
);
```

4. Run: `npm run build`

5. Open `shape_wall.html` in your browser

**Your shape now appears in the library!**

---

## That's All You Need to Know

- **PNG → SVG**: Use Potrace (1 minute)
- **SVG → App**: Copy code into `svg-shapes.js` (30 seconds)
- **Build & Test**: `npm run build` then open `shape_wall.html` (10 seconds)

---

## Troubleshooting

**"My shape doesn't appear"**
- Make sure you copied the code into `src/js/svg-shapes.js`
- Check the SVG has `viewBox="0 0 100 100"`
- Run `npm run build`

**"It looks weird/distorted"**
- In the SVG code, change `viewBox="..."` to `viewBox="0 0 100 100"`
- Or adjust in Potrace before downloading

**"Colors don't change"**
- Make sure the SVG has a fill color like `fill="#000000"`
- The app recolors based on that

---

## Alternative Tools (If Potrace doesn't work well)

**Use Inkscape (free, more control)**:
1. Download [Inkscape](https://inkscape.org/)
2. File → Open your PNG
3. Select the image
4. Path → Trace Bitmap
5. Click "OK"
6. Delete the PNG layer (click it, press Delete)
7. File → Save As → "Plain SVG"
8. Copy the SVG code

**Use Figma (web-based, intuitive)**:
1. Go to [figma.com](https://www.figma.com/)
2. Create a new file
3. Upload your PNG as an image
4. Right-click → Image → Trace
5. Right-click → Copy as → SVG
6. Paste into your app

---

## Quick Checklist when Adding a Shape

- ✓ SVG code copied from file
- ✓ Pasted into `addSvgShape()` call
- ✓ Given it a unique name (no spaces, like `myshape`)
- ✓ Given it a display name (like `'My Shape'`)
- ✓ SVG has `viewBox="0 0 100 100"`
- ✓ Ran `npm run build`
- ✓ Opened `shape_wall.html` to test

That's it! You're done.
