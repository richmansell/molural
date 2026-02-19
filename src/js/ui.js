// UI interactions

// 10 beautiful pastel colors
const PASTEL_COLORS = [
    '#FFB3BA', // Pastel Pink
    '#FFCCCB', // Pastel Red
    '#FFDFBA', // Pastel Orange
    '#FFFFBA', // Pastel Yellow
    '#BAFFC9', // Pastel Green
    '#BAE1FF', // Pastel Blue
    '#E0BBE4', // Pastel Purple
    '#C9BAFF', // Pastel Lavender
    '#FFC9E3', // Pastel Magenta
    '#D4C5B9'  // Pastel Brown
];

class UIManager {
    constructor(canvasManager) {
        this.canvasManager = canvasManager;
        this.colorPalette = document.getElementById('colorPalette');
        this.submitBtn = document.getElementById('submitBtn');
        this.shapeLibrary = document.getElementById('shapeLibrary');
        this.currentColor = PASTEL_COLORS[0];
        this.previewCanvases = new Map(); // Store preview canvases by shape key

        this.setupEventListeners();
        this.initializeColorPalette();
        this.initializeShapeLibrary();
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
    }

    initializeColorPalette() {
        PASTEL_COLORS.forEach((color, index) => {
            const box = document.createElement('div');
            box.className = 'color-box';
            if (index === 0) box.classList.add('selected');
            box.style.backgroundColor = color;
            box.title = color;

            box.addEventListener('click', () => {
                // Remove selected from all boxes
                document.querySelectorAll('.color-box').forEach(b => b.classList.remove('selected'));
                // Add selected to this box
                box.classList.add('selected');
                // Update color
                this.currentColor = color;
                // Redraw all previews with new color
                this.updateAllPreviewColors(color);
                // Update selected shape if any
                if (this.canvasManager.selectedShapeIndex >= 0) {
                    this.canvasManager.updateSelectedShapeColor(color);
                }
            });

            this.colorPalette.appendChild(box);
        });
    }

    updateAllPreviewColors(color) {
        this.previewCanvases.forEach((canvas, shapeKey) => {
            const shape = shapeDefinitions[shapeKey] || svgShapeDefinitions[shapeKey];
            if (shape) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const drawResult = shape.draw(ctx, 25, 25, 40, color);
                Promise.resolve(drawResult);
            }
        });
    }

    initializeShapeLibrary() {
        // Add canvas-drawn shapes
        Object.entries(shapeDefinitions).forEach(([key, shape]) => {
            this.addShapeToLibrary(key, shape);
        });

        // Add SVG shapes
        Object.entries(svgShapeDefinitions).forEach(([key, shape]) => {
            this.addShapeToLibrary(key, shape);
        });
    }

    addShapeToLibrary(key, shape) {
        const item = document.createElement('div');
        item.className = 'shape-item';
        item.draggable = true;
        item.dataset.shapeKey = key;

        // Create canvas preview
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 50;
        previewCanvas.height = 50;
        previewCanvas.className = 'shape-preview';
        const previewCtx = previewCanvas.getContext('2d');

        // Store reference to preview canvas for color updates
        this.previewCanvases.set(key, previewCanvas);

        // Draw preview
        const drawResult = shape.draw(previewCtx, 25, 25, 40, '#FFB3BA');
        
        // Handle async SVG drawing
        Promise.resolve(drawResult).then(() => {
            // Preview is drawn
        });

        const nameDiv = document.createElement('div');
        nameDiv.className = 'shape-name';
        nameDiv.textContent = shape.name;

        item.appendChild(previewCanvas);
        item.appendChild(nameDiv);

        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('shapeKey', key);
            e.dataTransfer.setDragImage(previewCanvas, 25, 25);
        });

        this.shapeLibrary.appendChild(item);
    }

    handleSubmit() {
        // Deselect any selected shapes first so selection handles don't appear in image
        this.canvasManager.selectedShapeIndex = -1;
        this.canvasManager.redraw();
        
        // Convert canvas to JPEG blob
        this.canvasManager.canvas.toBlob(async (blob) => {
            try {
                const filename = 'molural_' + new Date().toISOString().slice(0, 10) + '.jpg';
                
                // Discord webhook URL (automatically configured)
                const webhookUrl = 'https://discord.com/api/webhooks/1473834282496561246/fiNo4Rf8B9oL9-TCs2J-Su_7XgQJ98wn2VIJXUO7Yd68zWjREE3AS17thP81SUKcT2Se';
                
                this.submitBtn.disabled = true;
                this.submitBtn.textContent = '⏳ Submitting...';
                
                // Post to Discord webhook
                const formData = new FormData();
                formData.append('file', blob, filename);
                formData.append('content', '✨ New artwork submission!');
                
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error(`Discord error: ${response.status}`);
                }
                
                console.log('✓ Posted to Discord!');
                
                // Show thank you modal
                const thankYouModal = document.getElementById('thankYouModal');
                if (thankYouModal) {
                    thankYouModal.style.display = 'flex';
                    
                    // Disable canvas interactions
                    this.canvasManager.canvas.style.pointerEvents = 'none';
                    this.canvasManager.canvas.style.opacity = '0.5';
                    
                    // Disable shape library dragging
                    document.querySelectorAll('.shape-item').forEach(item => {
                        item.draggable = false;
                        item.style.opacity = '0.5';
                        item.style.cursor = 'not-allowed';
                    });
                    
                    // Disable color palette
                    document.querySelectorAll('.color-box').forEach(box => {
                        box.style.pointerEvents = 'none';
                        box.style.opacity = '0.5';
                    });
                    
                    // Disable submit button
                    this.submitBtn.style.pointerEvents = 'none';
                    this.submitBtn.style.opacity = '0.5';
                }
                
            } catch (error) {
                console.error('Submit error:', error);
                this.submitBtn.textContent = '✗ Error - try again';
                this.submitBtn.disabled = false;
                
                setTimeout(() => {
                    this.submitBtn.textContent = '✨ Submit to Gallery';
                }, 2000);
                
                alert(`Error submitting to Discord: ${error.message}`);
            }
        }, 'image/jpeg', 0.95);
    }

    onShapeSelected(index) {
        if (index >= 0 && index < this.canvasManager.shapes.length) {
            const shape = this.canvasManager.shapes[index];
            this.currentColor = shape.color;
            
            // Update color palette selection
            const selectedBox = document.querySelector('.color-box.selected');
            if (selectedBox) selectedBox.classList.remove('selected');
            
            const colorIndex = PASTEL_COLORS.indexOf(shape.color);
            if (colorIndex >= 0) {
                document.querySelectorAll('.color-box')[colorIndex].classList.add('selected');
            }
        }
    }

    deleteShapeOnCanvas(event, shapeIndex) {
        event.stopPropagation();
        event.preventDefault();
        this.canvasManager.deleteShape(shapeIndex);
    }
}
