/**
 * Example: Custom SVG Shapes
 * 
 * This file demonstrates different ways to add custom shapes.
 * Copy these examples to src/js/svg-shapes.js to use them!
 */

// Example 1: Simple hand-drawn style shapes
addSvgShape('blob', 'Blob',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M 50 10 Q 20 15 15 40 Q 10 60 30 75 Q 50 90 70 80 Q 90 70 85 45 Q 80 20 50 10 Z" 
              fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
    </svg>`
);

// Example 2: Organic leaf shape
addSvgShape('leaf', 'Leaf',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="25" ry="40" fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
        <line x1="50" y1="15" x2="50" y2="85" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
        <path d="M 45 35 Q 40 40 45 45" stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none"/>
        <path d="M 55 35 Q 60 40 55 45" stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none"/>
    </svg>`
);

// Example 3: Simple flower (hand-drawn feel)
addSvgShape('simpleFlower', 'Simple Flower',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="10" fill="#FF6B6B"/>
        <circle cx="50" cy="25" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="70" cy="35" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="75" cy="55" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="70" cy="70" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="50" cy="75" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="30" cy="70" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="25" cy="55" r="12" fill="#FF6B6B" opacity="0.9"/>
        <circle cx="30" cy="35" r="12" fill="#FF6B6B" opacity="0.9"/>
    </svg>`
);

// Example 4: Paint splatter
addSvgShape('splatter', 'Splatter',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="20" fill="#FF6B6B"/>
        <circle cx="35" cy="35" r="8" fill="#FF6B6B"/>
        <circle cx="65" cy="35" r="9" fill="#FF6B6B"/>
        <circle cx="30" cy="55" r="7" fill="#FF6B6B"/>
        <circle cx="70" cy="58" r="8" fill="#FF6B6B"/>
        <circle cx="45" cy="70" r="6" fill="#FF6B6B"/>
        <circle cx="60" cy="72" r="7" fill="#FF6B6B"/>
        <circle cx="50" cy="25" r="5" fill="#FF6B6B"/>
        <circle cx="25" cy="50" r="4" fill="#FF6B6B"/>
        <circle cx="75" cy="48" r="5" fill="#FF6B6B"/>
    </svg>`
);

// Example 5: Simple arrow pointing right
addSvgShape('arrow', 'Arrow',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="15,30 15,70 60,70 60,85 85,50 60,15 60,30" 
                 fill="#FF6B6B" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
    </svg>`
);

// Example 6: Spiral
addSvgShape('spiral', 'Spiral',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M 50 10 Q 70 10 70 30 Q 70 50 50 50 Q 30 50 30 30 Q 30 15 50 15" 
              fill="none" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
    </svg>`
);

// Example 7: Starburst
addSvgShape('starburst', 'Starburst',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="8" fill="#FF6B6B"/>
        <line x1="50" y1="50" x2="50" y2="10" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="50" y2="90" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="10" y2="50" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="90" y2="50" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="25" y2="25" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="75" y2="75" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="75" y2="25" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="50" x2="25" y2="75" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
    </svg>`
);

// Example 8: Scribble circle
addSvgShape('scribble', 'Scribble',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M 50 15 Q 35 20 30 35 Q 25 50 35 65 Q 50 78 65 70 Q 80 62 78 48 Q 75 32 60 28 Q 45 25 50 40 Q 55 50 65 55" 
              fill="none" stroke="#FF6B6B" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
);

// Example 9: Cross/Plus
addSvgShape('cross', 'Cross',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect x="40" y="10" width="20" height="80" fill="#FF6B6B"/>
        <rect x="10" y="40" width="80" height="20" fill="#FF6B6B"/>
    </svg>`
);

// Example 10: Checkmark
addSvgShape('checkmark', 'Checkmark',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polyline points="15,50 40,75 85,20" fill="none" stroke="#FF6B6B" stroke-width="6" 
                  stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
);
