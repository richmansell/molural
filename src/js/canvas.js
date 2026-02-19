// Canvas rendering and interaction

const CORNER_SIZE = 10;
const ORIGINAL_IMAGE_INTERACTIVE_HEIGHT = 393; // Interactive area height in original image
const SHAPE_SCALE = 3; // Shapes are 3x bigger
const BASE_SIZE = 80; // Base size when dragged (gets multiplied by SHAPE_SCALE)
let SHAPE_OPACITY = 0.75; // Always 75% opacity

class CanvasManager {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        this.selectedShapeIndex = -1;
        this.draggingShapeIndex = -1;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.resizingCorner = null;
        this.resizeStartSize = 0;
        this.resizeStartX = 0;
        this.resizeStartY = 0;
        this.rotatingShapeIndex = -1;
        this.rotationStartX = 0;
        this.rotationStartRotation = 0;
        this.backgroundImage = null;
        this.backgroundLoaded = false;
        this.interactiveHeightScaled = 393; // Fallback

        this.loadBackgroundImage();
        this.setupEventListeners();
    }

    getInteractiveHeight() {
        // Calculate proportional interactive height based on image dimensions
        if (this.backgroundImage) {
            return (ORIGINAL_IMAGE_INTERACTIVE_HEIGHT / this.backgroundImage.height) * this.canvas.height;
        }
        return ORIGINAL_IMAGE_INTERACTIVE_HEIGHT;
    }

    loadBackgroundImage() {
        const img = new Image();
        img.src = BG_IMAGE_DATA_URL;  // Use embedded data URL (no CORS issues)
        img.onload = () => {
            this.backgroundImage = img;
            this.backgroundLoaded = true;
            this.interactiveHeightScaled = this.getInteractiveHeight();
            this.redraw();
        };
        img.onerror = () => {
            console.warn('Failed to load background image');
            this.backgroundLoaded = true;
        };
    }

    setupEventListeners() {
        this.canvas.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.canvas.addEventListener('drop', (e) => this.handleDrop(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleDrop(e) {
        e.preventDefault();
        
        // Clear ALL ongoing interaction operations to prevent shapes from being linked
        this.draggingShapeIndex = -1;
        this.resizingCorner = null;
        this.rotatingShapeIndex = -1;
        this.selectedShapeIndex = -1;  // Deselect any previously selected shape
        
        const shapeKey = e.dataTransfer.getData('shapeKey');
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Only allow drops in the interactive area
        const interactiveHeight = this.getInteractiveHeight();
        if (y > interactiveHeight) return;

        const shape = {
            key: shapeKey,
            x: x,
            y: y,
            size: BASE_SIZE * SHAPE_SCALE,
            color: typeof uiManager !== 'undefined' ? uiManager.currentColor : '#FFB3BA',
            rotation: 0  // Explicitly set rotation to 0
        };

        this.shapes.push(shape);
        this.selectedShapeIndex = this.shapes.length - 1;
        if (typeof uiManager !== 'undefined') {
            uiManager.onShapeSelected(this.selectedShapeIndex);
        }
        this.redraw();
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const interactiveHeight = this.getInteractiveHeight();
        
        // Check if clicking on rotation handle
        if (this.selectedShapeIndex >= 0) {
            const shape = this.shapes[this.selectedShapeIndex];
            const rotationHandleY = shape.y - shape.size / 2 - 30;
            const rotationHandleX = shape.x;
            const handleRadius = 8;
            
            const distToHandle = Math.sqrt((x - rotationHandleX) ** 2 + (y - rotationHandleY) ** 2);
            if (distToHandle < handleRadius) {
                this.rotatingShapeIndex = this.selectedShapeIndex;
                this.rotationStartX = x;
                this.rotationStartRotation = shape.rotation || 0;
                return;
            }
        }
        
        // Only allow interaction in the interactive area
        if (y > interactiveHeight) return;

        // Check if clicking on a resize corner of the selected shape
        if (this.selectedShapeIndex >= 0) {
            const shape = this.shapes[this.selectedShapeIndex];
            const corner = getCornerAtPoint(shape, x, y);
            if (corner) {
                this.resizingCorner = corner;
                this.resizeStartSize = shape.size;
                this.resizeStartX = x;
                this.resizeStartY = y;
                this.resizeStartX_shape = shape.x;
                this.resizeStartY_shape = shape.y;
                return;
            }
        }

        // Check if clicking on any shape
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
            if (dist < shape.size / 2 + 10) {
                this.selectedShapeIndex = i;
                this.draggingShapeIndex = i;
                this.dragOffsetX = x - shape.x;
                this.dragOffsetY = y - shape.y;
                if (typeof uiManager !== 'undefined') {
                    uiManager.onShapeSelected(this.selectedShapeIndex);
                }
                this.redraw();
                return;
            }
        }

        this.selectedShapeIndex = -1;
        this.redraw();
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const interactiveHeight = this.getInteractiveHeight();

        // Handle rotation - drag left/right on rotation handle
        if (this.rotatingShapeIndex >= 0) {
            const shape = this.shapes[this.rotatingShapeIndex];
            const deltaX = x - this.rotationStartX;
            // Rotate based on horizontal movement: 1px = 1 degree
            shape.rotation = (this.rotationStartRotation + deltaX) % 360;
            if (shape.rotation < 0) shape.rotation += 360;
            this.redraw();
            return;
        }

        // Handle resizing - corner-specific resize
        if (this.resizingCorner && this.selectedShapeIndex >= 0) {
            const shape = this.shapes[this.selectedShapeIndex];
            const corner = this.resizingCorner;
            const dx = x - this.resizeStartX;
            const dy = y - this.resizeStartY;

            // Move the center and adjust size based on which corner is being dragged
            if (corner === 'tl') {
                shape.x = this.resizeStartX_shape - dx / 2;
                shape.y = this.resizeStartY_shape - dy / 2;
                shape.size = this.resizeStartSize - Math.sqrt(dx * dx + dy * dy);
            } else if (corner === 'tr') {
                shape.x = this.resizeStartX_shape + dx / 2;
                shape.y = this.resizeStartY_shape - dy / 2;
                // Grow when dragging right/up, shrink when dragging left/down
                const sizeChange = (dx - dy) / 2;
                shape.size = this.resizeStartSize + sizeChange;
            } else if (corner === 'bl') {
                shape.x = this.resizeStartX_shape - dx / 2;
                shape.y = this.resizeStartY_shape + dy / 2;
                // Grow when dragging left/down, shrink when dragging right/up
                const sizeChange = (dy - dx) / 2;
                shape.size = this.resizeStartSize + sizeChange;
            } else if (corner === 'br') {
                shape.x = this.resizeStartX_shape + dx / 2;
                shape.y = this.resizeStartY_shape + dy / 2;
                // Grow when dragging right/down, shrink when dragging left/up
                const sizeChange = (dx + dy) / 2;
                shape.size = this.resizeStartSize + sizeChange;
            }
            
            shape.size = Math.max(40, shape.size);
            this.redraw();
            return;
        }

        // Handle dragging - allow shapes to go below interactive area (will be clipped)
        if (this.draggingShapeIndex >= 0) {
            const shape = this.shapes[this.draggingShapeIndex];
            shape.x = x - this.dragOffsetX;
            shape.y = y - this.dragOffsetY;
            this.redraw();
            return;
        }

        // Only allow selection in the interactive area
        if (y > interactiveHeight) return;

        // Check for rotation handle hover
        if (this.selectedShapeIndex >= 0) {
            const shape = this.shapes[this.selectedShapeIndex];
            const rotationHandleY = shape.y - shape.size / 2 - 30;
            const rotationHandleX = shape.x;
            const handleRadius = 8;
            
            const distToHandle = Math.sqrt((x - rotationHandleX) ** 2 + (y - rotationHandleY) ** 2);
            if (distToHandle < handleRadius) {
                this.canvas.style.cursor = 'grab';
                return;
            }
        }

        // Update cursor based on what's under mouse
        if (this.selectedShapeIndex >= 0 && this.resizingCorner === null) {
            const shape = this.shapes[this.selectedShapeIndex];
            const corner = getCornerAtPoint(shape, x, y);
            if (corner) {
                if (corner === 'tl' || corner === 'br') {
                    this.canvas.style.cursor = 'nwse-resize';
                } else if (corner === 'tr' || corner === 'bl') {
                    this.canvas.style.cursor = 'nesw-resize';
                }
                return;
            }
        }
        this.canvas.style.cursor = 'crosshair';
    }

    handleMouseUp() {
        this.draggingShapeIndex = -1;
        this.resizingCorner = null;
        this.rotatingShapeIndex = -1;
    }

    handleKeyDown(e) {
        // Rotate selected shape with + and - keys
        if (this.selectedShapeIndex >= 0) {
            const shape = this.shapes[this.selectedShapeIndex];
            if (!shape.rotation) shape.rotation = 0;
            
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                shape.rotation = (shape.rotation + 15) % 360;
                this.redraw();
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                shape.rotation = (shape.rotation - 15 + 360) % 360;
                this.redraw();
            } else if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                this.deleteShape(this.selectedShapeIndex);
            }
        }
    }

    deleteShape(index) {
        if (index >= 0 && index < this.shapes.length) {
            this.shapes.splice(index, 1);
            if (this.selectedShapeIndex === index) {
                this.selectedShapeIndex = -1;
            } else if (this.selectedShapeIndex > index) {
                this.selectedShapeIndex--;
            }
            this.redraw();
        }
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background image if loaded, otherwise fallback to transparent
        if (this.backgroundLoaded && this.backgroundImage) {
            this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        }
        // No fallback background - canvas remains transparent

        // Save context state
        this.ctx.save();
        
        // Set clipping region so shapes are cut off at boundary
        const interactiveHeight = this.getInteractiveHeight();
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height); // Full height canvas so shapes can extend beyond
        this.ctx.clip();
        
        this.ctx.globalAlpha = SHAPE_OPACITY;

        // Draw all shapes sequentially to prevent context transform issues
        let shapeDrawIndex = 0;
        const drawNextShape = () => {
            if (shapeDrawIndex < this.shapes.length) {
                this.drawShape(this.shapes[shapeDrawIndex]);
                shapeDrawIndex++;
                drawNextShape();
            } else {
                // All shapes drawn, restore context and draw UI
                this.ctx.restore(); // Restore context state (opacity and clipping)
                
                // Draw selection UI
                this.drawSelectionUI();
                
                // Overlay the bottom part of background image to cover any shapes below the boundary
                if (this.backgroundLoaded && this.backgroundImage) {
                    this.ctx.globalAlpha = 1.0;
                    const srcHeight = this.backgroundImage.height;
                    const overlayStartY = interactiveHeight;
                    const srcOverlayStartY = ORIGINAL_IMAGE_INTERACTIVE_HEIGHT;
                    const overlayHeight = this.canvas.height - interactiveHeight;
                    const srcOverlayHeight = srcHeight - srcOverlayStartY;
                    
                    if (overlayHeight > 0 && srcOverlayHeight > 0) {
                        // Draw the bottom portion of the background image to cover shapes
                        this.ctx.drawImage(
                            this.backgroundImage,
                            0, srcOverlayStartY,
                            this.backgroundImage.width, srcOverlayHeight,
                            0, overlayStartY,
                            this.canvas.width, overlayHeight
                        );
                    }
                }
            }
        };
        drawNextShape();

        // Update cached interactive height
        this.interactiveHeightScaled = this.getInteractiveHeight();
    }

    drawShape(shape) {
        const shapeDef = shapeDefinitions[shape.key] || svgShapeDefinitions[shape.key];
        if (!shapeDef) return;

        // Save context for rotation
        this.ctx.save();
        
        // Apply rotation
        this.ctx.translate(shape.x, shape.y);
        this.ctx.rotate((shape.rotation || 0) * Math.PI / 180);
        this.ctx.translate(-shape.x, -shape.y);

        shapeDef.draw(this.ctx, shape.x, shape.y, shape.size, shape.color);
        
        // Restore context after drawing
        this.ctx.restore();
    }

    drawSelectionUI() {
        // Draw interactive area boundary line
        const interactiveHeight = this.getInteractiveHeight();
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, interactiveHeight);
        this.ctx.lineTo(this.canvas.width, interactiveHeight);
        this.ctx.stroke();

        if (this.selectedShapeIndex < 0) return;

        const shape = this.shapes[this.selectedShapeIndex];
        
        // Draw bounding box selection
        const hw = shape.size / 2;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(shape.x - hw - 8, shape.y - hw - 8, shape.size + 16, shape.size + 16);
        this.ctx.setLineDash([]);

        // Draw corner resize handles
        const corners = getCorners(shape);
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;

        for (const corner of Object.values(corners)) {
            this.ctx.fillRect(corner.x - CORNER_SIZE / 2, corner.y - CORNER_SIZE / 2, CORNER_SIZE, CORNER_SIZE);
            this.ctx.strokeRect(corner.x - CORNER_SIZE / 2, corner.y - CORNER_SIZE / 2, CORNER_SIZE, CORNER_SIZE);
        }
        
        // Draw rotation handle at top of shape
        const rotationHandleY = shape.y - shape.size / 2 - 30;
        const rotationHandleX = shape.x;
        const handleRadius = 8;
        
        this.ctx.fillStyle = '#2196F3';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(rotationHandleX, rotationHandleY, handleRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Draw line from shape to handle
        this.ctx.strokeStyle = 'rgba(33, 150, 243, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(shape.x, shape.y - shape.size / 2);
        this.ctx.lineTo(shape.x, rotationHandleY);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.redraw();
    }

    clearShapes() {
        if (this.shapes.length > 0 && confirm('Are you sure you want to clear all shapes?')) {
            this.shapes = [];
            this.selectedShapeIndex = -1;
            this.redraw();
        }
    }

    saveAsJpeg() {
        const link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/jpeg', 0.95);
        link.download = 'shape_wall_' + new Date().toISOString().slice(0, 10) + '.jpg';
        link.click();
    }

    updateSelectedShapeColor(color) {
        if (this.selectedShapeIndex >= 0) {
            this.shapes[this.selectedShapeIndex].color = color;
            this.redraw();
        }
    }
}
