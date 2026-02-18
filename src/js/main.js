// Main initialization

let canvasManager;
let uiManager;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    
    canvasManager = new CanvasManager(canvas);
    uiManager = new UIManager(canvasManager);

    // Resize canvas to fit container
    window.addEventListener('resize', () => canvasManager.resizeCanvas());
    canvasManager.resizeCanvas();

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (canvasManager.selectedShapeIndex >= 0) {
                canvasManager.deleteShape(canvasManager.selectedShapeIndex);
            }
        }
    });
});
