// Shape definitions as functions that draw on canvas
const shapeDefinitions = {
    circle: {
        name: 'Circle',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    square: {
        name: 'Square',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
    },
    triangle: {
        name: 'Triangle',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2, y + size / 2);
            ctx.lineTo(x - size / 2, y + size / 2);
            ctx.closePath();
            ctx.fill();
        }
    },
    star: {
        name: 'Star',
        draw: (ctx, x, y, size, color) => {
            const points = 5;
            const innerRadius = size / 4;
            const outerRadius = size / 2;
            ctx.fillStyle = color;
            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / points - Math.PI / 2;
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        }
    },
    hexagon: {
        name: 'Hexagon',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const px = x + Math.cos(angle) * (size / 2);
                const py = y + Math.sin(angle) * (size / 2);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        }
    },
    heart: {
        name: 'Heart',
        draw: (ctx, x, y, size, color) => {
            const scale = size / 100;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x + 10 * scale, y + 35 * scale);
            ctx.bezierCurveTo(x + 10 * scale, y + 10 * scale, x - 15 * scale, y - 10 * scale, x - 15 * scale, y - 10 * scale);
            ctx.bezierCurveTo(x - 30 * scale, y - 10 * scale, x - 35 * scale, y + 10 * scale, x - 20 * scale, y + 25 * scale);
            ctx.bezierCurveTo(x - 5 * scale, y + 35 * scale, x + 10 * scale, y + 50 * scale, x + 10 * scale, y + 50 * scale);
            ctx.bezierCurveTo(x + 10 * scale, y + 50 * scale, x + 25 * scale, y + 35 * scale, x + 40 * scale, y + 25 * scale);
            ctx.bezierCurveTo(x + 55 * scale, y + 10 * scale, x + 50 * scale, y - 10 * scale, x + 35 * scale, y - 10 * scale);
            ctx.bezierCurveTo(x + 35 * scale, y - 10 * scale, x + 10 * scale, y + 10 * scale, x + 10 * scale, y + 35 * scale);
            ctx.fill();
        }
    },
    diamond: {
        name: 'Diamond',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2, y);
            ctx.lineTo(x, y + size / 2);
            ctx.lineTo(x - size / 2, y);
            ctx.closePath();
            ctx.fill();
        }
    },
    wavy: {
        name: 'Wavy Circle',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            const points = 16;
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const radius = (size / 2) * (0.8 + 0.2 * Math.sin(angle * 4));
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        }
    },
    blob: {
        name: 'Blob',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            // Create a blobby organic shape using bezier curves
            const scale = size / 100;
            ctx.moveTo(x + 20 * scale, y - 40 * scale);
            ctx.bezierCurveTo(x + 45 * scale, y - 45 * scale, x + 50 * scale, y - 20 * scale, x + 45 * scale, y + 10 * scale);
            ctx.bezierCurveTo(x + 50 * scale, y + 25 * scale, x + 40 * scale, y + 45 * scale, x + 15 * scale, y + 45 * scale);
            ctx.bezierCurveTo(x - 15 * scale, y + 40 * scale, x - 45 * scale, y + 25 * scale, x - 45 * scale, y);
            ctx.bezierCurveTo(x - 50 * scale, y - 20 * scale, x - 30 * scale, y - 45 * scale, x + 10 * scale, y - 45 * scale);
            ctx.closePath();
            ctx.fill();
        }
    },
    untitled: {
        name: 'Untitled',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            
            // Scale factor: viewBox is 288x416 (width x height)
            // Scale to fit within size x size square, using height as limiting dimension
            const scale = size / 416; // 416 is the height (larger dimension)
            const offsetX = -144; // Center X (288/2)
            const offsetY = -208; // Center Y (416/2)
            
            const sx = (px) => x + (px + offsetX) * scale;
            const sy = (py) => y + (py + offsetY) * scale;
            
            // Start point
            ctx.moveTo(sx(203.881775), sy(61.657822));
            
            // Bezier curves from SVG path - preserving all detail
            ctx.bezierCurveTo(sx(225.502975), sy(61.103149), sx(246.641037), sy(60.586517), sx(267.776215), sy(59.970444));
            ctx.bezierCurveTo(sx(273.691040), sy(59.798031), sx(274.403015), sy(60.248177), sx(274.284180), sy(66.279533));
            ctx.bezierCurveTo(sx(273.726776), sy(94.570030), sx(272.033203), sy(122.820747), sx(270.981445), sy(151.093246));
            ctx.bezierCurveTo(sx(270.216461), sy(171.657516), sx(267.807373), sy(192.203918), sx(265.210144), sy(212.641220));
            ctx.bezierCurveTo(sx(263.537750), sy(225.800888), sx(260.684875), sy(238.892105), sx(255.592438), sy(251.278152));
            ctx.bezierCurveTo(sx(247.562347), sy(270.809235), sx(233.266983), sy(284.892334), sx(215.867447), sy(296.165161));
            ctx.bezierCurveTo(sx(196.315796), sy(308.832336), sx(174.434586), sy(312.811768), sx(151.624176), sy(313.234222));
            ctx.bezierCurveTo(sx(146.625687), sy(313.326813), sx(141.590546), sy(312.935242), sx(136.631866), sy(313.400970));
            ctx.bezierCurveTo(sx(121.714111), sy(314.802185), sx(107.961967), sy(310.748932), sx(94.532516), sy(304.971344));
            ctx.bezierCurveTo(sx(92.651970), sy(304.162323), sx(90.980927), sy(303.049835), sx(89.197968), sy(305.135315));
            ctx.bezierCurveTo(sx(88.450294), sy(306.009796), sx(87.437523), sy(305.770081), sx(86.476028), sy(305.205872));
            ctx.bezierCurveTo(sx(72.592239), sy(297.058472), sx(57.955708), sy(290.216125), sx(46.101395), sy(278.781433));
            ctx.bezierCurveTo(sx(34.515705), sy(267.605865), sx(30.595001), sy(254.487213), sx(30.128117), sy(238.557022));
            ctx.bezierCurveTo(sx(29.614080), sy(221.018158), sx(31.595436), sy(203.250885), sx(27.377857), sy(185.843292));
            ctx.bezierCurveTo(sx(25.651068), sy(178.716187), sx(26.302794), sy(171.262207), sx(25.931833), sy(163.993713));
            ctx.bezierCurveTo(sx(25.043547), sy(146.588852), sx(24.528318), sy(129.173355), sx(26.354170), sy(111.687408));
            ctx.bezierCurveTo(sx(27.378212), sy(101.880280), sx(26.225548), sy(91.735107), sx(25.133205), sy(81.843887));
            ctx.bezierCurveTo(sx(23.524773), sy(67.279465), sx(23.558905), sy(66.805298), sx(38.015377), sy(66.836739));
            ctx.bezierCurveTo(sx(58.513756), sy(66.881317), sx(78.949959), sy(65.412201), sx(99.394775), sy(64.272346));
            ctx.bezierCurveTo(sx(104.152054), sy(64.007111), sx(105.513420), sy(65.403313), sx(105.396782), sy(70.033066));
            ctx.bezierCurveTo(sx(104.762939), sy(95.192711), sx(106.773796), sy(120.271599), sx(108.513268), sy(145.330948));
            ctx.bezierCurveTo(sx(109.339226), sy(157.229965), sx(110.211891), sy(169.341904), sx(113.541107), sy(180.823349));
            ctx.bezierCurveTo(sx(117.143913), sy(193.248306), sx(123.748055), sy(204.177292), sx(136.413040), sy(209.533615));
            ctx.bezierCurveTo(sx(143.397690), sy(212.487595), sx(150.658463), sy(211.794754), sx(157.788177), sy(208.971252));
            ctx.bezierCurveTo(sx(173.198990), sy(202.868317), sx(175.114441), sy(189.286499), sx(176.172729), sy(175.542725));
            ctx.bezierCurveTo(sx(177.862839), sy(153.593735), sx(174.565018), sy(131.615082), sx(175.926147), sy(109.666641));
            ctx.bezierCurveTo(sx(176.783157), sy(95.847015), sx(177.006302), sy(82.089218), sx(175.923996), sy(68.286934));
            ctx.bezierCurveTo(sx(175.471680), sy(62.518417), sx(176.436722), sy(61.711555), sx(182.398392), sy(61.676525));
            ctx.bezierCurveTo(sx(189.397919), sy(61.635395), sx(196.397812), sy(61.661366), sx(203.881775), sy(61.657822));
            
            ctx.closePath();
            ctx.fill();
        }
    }
};
