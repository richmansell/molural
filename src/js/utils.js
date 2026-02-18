// Utility functions

function getCorners(shape) {
    const hw = shape.size / 2;
    return {
        tl: { x: shape.x - hw, y: shape.y - hw },
        tr: { x: shape.x + hw, y: shape.y - hw },
        bl: { x: shape.x - hw, y: shape.y + hw },
        br: { x: shape.x + hw, y: shape.y + hw }
    };
}

function getCornerAtPoint(shape, x, y, threshold = 15) {
    // First check if the click is reasonably close to the shape center
    // This prevents corners of unrelated shapes from being detected
    const distToCenter = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
    const hw = shape.size / 2;
    
    // Only check corners if click is within ~1.5x the half-width of the shape
    // This ensures we don't trigger corners on distant rotated shapes
    if (distToCenter > hw * 1.5 + threshold) {
        return null;
    }
    
    const corners = getCorners(shape);

    for (const [key, corner] of Object.entries(corners)) {
        const dist = Math.sqrt((x - corner.x) ** 2 + (y - corner.y) ** 2);
        if (dist < threshold) {
            return key;
        }
    }
    return null;
}

function createBrickPatternCanvas() {
    const p = document.createElement('canvas');
    p.width = 100;
    p.height = 100;
    const pCtx = p.getContext('2d');
    pCtx.fillStyle = '#c4a575';
    pCtx.fillRect(0, 0, 100, 100);
    pCtx.strokeStyle = '#a0845f';
    pCtx.lineWidth = 1;
    pCtx.strokeRect(0, 0, 100, 100);
    pCtx.fillRect(50, 0, 50, 50);
    pCtx.strokeRect(50, 0, 50, 50);
    pCtx.fillRect(0, 50, 50, 50);
    pCtx.strokeRect(0, 50, 50, 50);
    pCtx.fillRect(50, 50, 50, 50);
    pCtx.strokeRect(50, 50, 50, 50);
    return p;
}
