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
    },
    mol_shape_1: {
        name: 'Mol Shape 1',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            const scale = size / 337; // viewBox height
            const offsetX = -436; // Center X of actual path bounds
            const offsetY = -469; // Center Y of actual path bounds
            const sx = (px) => x + (px + offsetX) * scale;
            const sy = (py) => y + (py + offsetY) * scale;
            ctx.moveTo(sx(486.176), sy(615.896));
            ctx.bezierCurveTo(sx(477.279), sy(619.214), sx(468.508), sy(622.939), sx(459.447), sy(625.725));
            ctx.bezierCurveTo(sx(451.486), sy(628.174), sx(437.038), sy(620.114), sx(435.324), sy(612.065));
            ctx.bezierCurveTo(sx(432.7), sy(599.752), sx(431.208), sy(587.202), sx(428.962), sy(574.802));
            ctx.bezierCurveTo(sx(425.834), sy(557.527), sx(431.012), sy(541.256), sx(434.687), sy(524.806));
            ctx.bezierCurveTo(sx(436.889), sy(514.949), sx(440.692), sy(505.254), sx(441.4), sy(495.317));
            ctx.bezierCurveTo(sx(442.053), sy(486.148), sx(439.642), sy(476.739), sx(438.353), sy(467.467));
            ctx.bezierCurveTo(sx(437.931), sy(464.426), sx(436.791), sy(461.484), sx(435.989), sy(458.495));
            ctx.bezierCurveTo(sx(432.804), sy(446.628), sx(426.185), sy(436.52), sx(420.228), sy(426.072));
            ctx.bezierCurveTo(sx(419.561), sy(426.119), sx(418.894), sy(426.166), sx(418.227), sy(426.213));
            ctx.bezierCurveTo(sx(417.464), sy(432.86), sx(416.702), sy(439.506), sx(415.638), sy(446.923));
            ctx.bezierCurveTo(sx(415.863), sy(456.399), sx(416.389), sy(465.104), sx(416.916), sy(473.81));
            ctx.bezierCurveTo(sx(417.442), sy(489.564), sx(417.958), sy(505.318), sx(418.507), sy(521.071));
            ctx.bezierCurveTo(sx(418.593), sy(523.536), sx(419.039), sy(526.002), sx(418.958), sy(528.456));
            ctx.bezierCurveTo(sx(418.745), sy(534.9), sx(418.051), sy(541.339), sx(418.074), sy(547.778));
            ctx.bezierCurveTo(sx(418.1), sy(555.538), sx(419.078), sy(563.307), sx(418.895), sy(571.055));
            ctx.bezierCurveTo(sx(418.676), sy(580.291), sx(418.154), sy(589.58), sx(416.831), sy(598.711));
            ctx.bezierCurveTo(sx(415.834), sy(605.596), sx(411.561), sy(611.266), sx(406.008), sy(615.364));
            ctx.bezierCurveTo(sx(394.692), sy(623.717), sx(383.318), sy(632.047), sx(371.434), sy(639.542));
            ctx.bezierCurveTo(sx(367.247), sy(642.182), sx(361.37), sy(643.683), sx(356.513), sy(643.201));
            ctx.bezierCurveTo(sx(353.063), sy(642.86), sx(349.176), sy(638.89), sx(346.966), sy(635.556));
            ctx.bezierCurveTo(sx(339.635), sy(624.497), sx(335.271), sy(612.061), sx(332.01), sy(599.241));
            ctx.bezierCurveTo(sx(330.597), sy(593.682), sx(329.799), sy(587.864), sx(327.613), sy(582.626));
            ctx.bezierCurveTo(sx(324.115), sy(574.243), sx(327.57), sy(567.372), sx(331.779), sy(561.03));
            ctx.bezierCurveTo(sx(334.895), sy(556.334), sx(339.755), sy(552.815), sx(343.713), sy(548.653));
            ctx.bezierCurveTo(sx(348.49), sy(543.629), sx(353.148), sy(538.49), sx(357.832), sy(533.378));
            ctx.bezierCurveTo(sx(359.715), sy(531.323), sx(361.244), sy(528.825), sx(363.428), sy(527.186));
            ctx.bezierCurveTo(sx(373.51), sy(519.617), sx(376.15), sy(508.612), sx(378.08), sy(497.095));
            ctx.bezierCurveTo(sx(379.88), sy(486.356), sx(382.057), sy(475.679), sx(384.371), sy(464.304));
            ctx.bezierCurveTo(sx(385.037), sy(462.025), sx(385.482), sy(460.428), sx(385.748), sy(458.803));
            ctx.bezierCurveTo(sx(387.164), sy(450.164), sx(388.535), sy(441.518), sx(389.922), sy(432.875));
            ctx.bezierCurveTo(sx(392.691), sy(425.348), sx(395.631), sy(417.879), sx(398.165), sy(410.274));
            ctx.bezierCurveTo(sx(399.758), sy(405.492), sx(401.446), sy(400.56), sx(401.814), sy(395.6));
            ctx.bezierCurveTo(sx(402.244), sy(389.811), sx(398.293), sy(387.379), sx(392.996), sy(389.899));
            ctx.bezierCurveTo(sx(388.248), sy(392.159), sx(383.642), sy(394.927), sx(379.454), sy(398.103));
            ctx.bezierCurveTo(sx(373.531), sy(402.596), sx(373.67), sy(409.731), sx(373.105), sy(416.233));
            ctx.bezierCurveTo(sx(372.615), sy(421.856), sx(373.281), sy(427.571), sx(372.945), sy(433.217));
            ctx.bezierCurveTo(sx(372.153), sy(446.534), sx(370.474), sy(459.829), sx(370.375), sy(473.142));
            ctx.bezierCurveTo(sx(370.331), sy(479.025), sx(370.516), sy(484.68), sx(369.139), sy(490.491));
            ctx.bezierCurveTo(sx(367.149), sy(498.885), sx(362.629), sy(505.641), sx(357.367), sy(512.199));
            ctx.bezierCurveTo(sx(346.005), sy(526.361), sx(331.152), sy(536.681), sx(317.708), sy(548.54));
            ctx.bezierCurveTo(sx(313.871), sy(551.924), sx(309.205), sy(554.963), sx(303.999), sy(550.896));
            ctx.bezierCurveTo(sx(301.965), sy(549.308), sx(299.895), sy(547.017), sx(299.176), sy(544.642));
            ctx.bezierCurveTo(sx(297.384), sy(538.723), sx(296.358), sy(532.572), sx(295.158), sy(526.029));
            ctx.bezierCurveTo(sx(295.393), sy(525.257), sx(295.312), sy(525.05), sx(295.049), sy(524.923));
            ctx.bezierCurveTo(sx(295.049), sy(524.923), sx(295.009), sy(524.989), sx(295.1), sy(524.576));
            ctx.bezierCurveTo(sx(294.13), sy(518.045), sx(293.07), sy(511.926), sx(292.01), sy(505.808));
            ctx.bezierCurveTo(sx(295.047), sy(500.813), sx(298.205), sy(495.886), sx(301.098), sy(490.809));
            ctx.bezierCurveTo(sx(307.216), sy(480.073), sx(318.043), sy(471.442), sx(319.383), sy(458.716));
            ctx.bezierCurveTo(sx(321.215), sy(441.332), sx(328.615), sy(425.846), sx(333.515), sy(409.548));
            ctx.bezierCurveTo(sx(336.568), sy(399.393), sx(344.502), sy(392.027), sx(353.142), sy(385.886));
            ctx.bezierCurveTo(sx(358.405), sy(382.146), sx(363.682), sy(378.395), sx(369.182), sy(375.023));
            ctx.bezierCurveTo(sx(374.186), sy(371.955), sx(376.984), sy(367.671), sx(378.011), sy(362.036));
            ctx.bezierCurveTo(sx(379.011), sy(356.552), sx(379.85), sy(351.031), sx(381.074), sy(345.596));
            ctx.bezierCurveTo(sx(382.818), sy(337.853), sx(387.055), sy(331.409), sx(392.49), sy(325.782));
            ctx.bezierCurveTo(sx(397.109), sy(320.999), sx(401.831), sy(316.289), sx(406.807), sy(311.885));
            ctx.bezierCurveTo(sx(408.804), sy(310.118), sx(411.508), sy(309.017), sx(414.051), sy(308.024));
            ctx.bezierCurveTo(sx(424.427), sy(303.974), sx(432.8), sy(308.152), sx(440.995), sy(314.309));
            ctx.bezierCurveTo(sx(451.34), sy(322.082), sx(457.903), sy(332.65), sx(463.562), sy(343.81));
            ctx.bezierCurveTo(sx(467.189), sy(350.965), sx(466.821), sy(359.026), sx(465.315), sy(366.691));
            ctx.bezierCurveTo(sx(461.913), sy(384.004), sx(466.825), sy(396.187), sx(482.32), sy(406.343));
            ctx.bezierCurveTo(sx(487.481), sy(409.499), sx(492.055), sy(412.373), sx(496.789), sy(414.958));
            ctx.bezierCurveTo(sx(499.726), sy(416.561), sx(502.903), sy(417.725), sx(505.972), sy(419.087));
            ctx.bezierCurveTo(sx(505.972), sy(419.087), sx(506.0), sy(419.025), sx(506.031), sy(419.287));
            ctx.bezierCurveTo(sx(506.38), sy(419.645), sx(506.698), sy(419.741), sx(507.016), sy(419.837));
            ctx.bezierCurveTo(sx(511.708), sy(422.233), sx(516.938), sy(423.953), sx(520.98), sy(427.166));
            ctx.bezierCurveTo(sx(529.284), sy(433.765), sx(538.758), sy(439.952), sx(544.487), sy(448.497));
            ctx.bezierCurveTo(sx(554.883), sy(464.005), sx(567.005), sy(477.862), sx(579.137), sy(491.855));
            ctx.bezierCurveTo(sx(584.74), sy(498.318), sx(591.346), sy(504.16), sx(593.059), sy(513.35));
            ctx.bezierCurveTo(sx(594.985), sy(523.691), sx(595.175), sy(533.668), sx(590.026), sy(543.248));
            ctx.bezierCurveTo(sx(585.379), sy(551.894), sx(581.316), sy(560.891), sx(576.108), sy(569.175));
            ctx.bezierCurveTo(sx(574.312), sy(572.031), sx(569.92), sy(573.354), sx(566.576), sy(575.115));
            ctx.bezierCurveTo(sx(560.652), sy(578.234), sx(554.775), sy(581.528), sx(548.593), sy(584.048));
            ctx.bezierCurveTo(sx(542.714), sy(586.444), sx(536.402), sy(583.189), sx(534.675), sy(577.202));
            ctx.bezierCurveTo(sx(531.916), sy(567.636), sx(529.762), sy(557.891), sx(526.867), sy(548.369));
            ctx.bezierCurveTo(sx(524.49), sy(540.548), sx(521.487), sy(532.912), sx(518.612), sy(525.25));
            ctx.bezierCurveTo(sx(515.738), sy(517.588), sx(512.556), sy(510.04), sx(509.733), sy(502.36));
            ctx.bezierCurveTo(sx(506.824), sy(494.446), sx(502.25), sy(487.679), sx(496.222), sy(481.106));
            ctx.bezierCurveTo(sx(495.721), sy(480.317), sx(495.392), sy(480.125), sx(495.064), sy(479.934));
            ctx.bezierCurveTo(sx(495.064), sy(479.934), sx(495.124), sy(479.954), sx(495.189), sy(479.567));
            ctx.bezierCurveTo(sx(491.831), sy(475.279), sx(488.408), sy(471.379), sx(484.985), sy(467.478));
            ctx.bezierCurveTo(sx(479.842), sy(460.905), sx(474.699), sy(454.332), sx(469.392), sy(447.162));
            ctx.bezierCurveTo(sx(468.508), sy(445.69), sx(467.787), sy(444.814), sx(467.067), sy(443.938));
            ctx.bezierCurveTo(sx(467.067), sy(443.938), sx(467.016), sy(444.007), sx(467.09), sy(443.619));
            ctx.bezierCurveTo(sx(464.863), sy(440.089), sx(462.56), sy(436.947), sx(460.258), sy(433.805));
            ctx.bezierCurveTo(sx(460.258), sy(433.805), sx(460.224), sy(433.801), sx(460.317), sy(433.46));
            ctx.bezierCurveTo(sx(455.691), sy(426.233), sx(451.047), sy(419.295), sx(446.209), sy(412.495));
            ctx.bezierCurveTo(sx(444.758), sy(410.455), sx(442.767), sy(408.8), sx(441.024), sy(406.969));
            ctx.bezierCurveTo(sx(441.024), sy(406.969), sx(440.999), sy(407.0), sx(440.99), sy(406.641));
            ctx.bezierCurveTo(sx(439.18), sy(404.179), sx(437.556), sy(401.879), sx(435.513), sy(400.046));
            ctx.bezierCurveTo(sx(434.323), sy(398.978), sx(432.464), sy(398.657), sx(430.906), sy(397.999));
            ctx.bezierCurveTo(sx(430.593), sy(399.68), sx(429.972), sy(401.38), sx(430.073), sy(403.036));
            ctx.bezierCurveTo(sx(430.141), sy(404.162), sx(431.222), sy(405.226), sx(431.85), sy(406.317));
            ctx.bezierCurveTo(sx(448.485), sy(429.617), sx(465.855), sy(452.436), sx(481.478), sy(476.396));
            ctx.bezierCurveTo(sx(490.799), sy(490.691), sx(498.178), sy(506.344), sx(499.162), sy(524.266));
            ctx.bezierCurveTo(sx(499.897), sy(537.635), sx(502.052), sy(550.926), sx(503.407), sy(564.95));
            ctx.bezierCurveTo(sx(503.371), sy(568.59), sx(503.579), sy(571.531), sx(503.62), sy(574.474));
            ctx.bezierCurveTo(sx(503.755), sy(583.978), sx(503.83), sy(593.482), sx(503.927), sy(602.986));
            ctx.bezierCurveTo(sx(503.927), sy(602.986), sx(503.99), sy(602.994), sx(503.714), sy(603.02));
            ctx.bezierCurveTo(sx(503.267), sy(603.357), sx(503.097), sy(603.667), sx(502.927), sy(603.977));
            ctx.bezierCurveTo(sx(502.927), sy(603.977), sx(502.989), sy(603.994), sx(502.705), sy(604.01));
            ctx.bezierCurveTo(sx(502.256), sy(604.336), sx(502.09), sy(604.646), sx(501.924), sy(604.955));
            ctx.bezierCurveTo(sx(501.924), sy(604.955), sx(501.96), sy(604.898), sx(501.603), sy(604.891));
            ctx.bezierCurveTo(sx(500.781), sy(605.544), sx(500.317), sy(606.205), sx(499.852), sy(606.865));
            ctx.bezierCurveTo(sx(499.852), sy(606.865), sx(499.891), sy(606.927), sx(499.546), sy(606.836));
            ctx.bezierCurveTo(sx(496.111), sy(609.142), sx(493.021), sy(611.54), sx(489.93), sy(613.938));
            ctx.bezierCurveTo(sx(489.93), sy(613.938), sx(489.986), sy(613.987), sx(489.661), sy(613.872));
            ctx.bezierCurveTo(sx(488.87), sy(614.154), sx(488.406), sy(614.551), sx(487.941), sy(614.948));
            ctx.bezierCurveTo(sx(487.941), sy(614.948), sx(487.998), sy(614.983), sx(487.712), sy(614.926));
            ctx.bezierCurveTo(sx(487.009), sy(615.211), sx(486.592), sy(615.554), sx(486.176), sy(615.896));
            ctx.closePath();
            ctx.fill();
        }
    },
    mol_shape_2: {
        name: 'Mol Shape 2',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            const scale = size / 194; // viewBox height
            const offsetX = -257; // Center X of actual path bounds
            const offsetY = -492; // Center Y of actual path bounds
            const sx = (px) => x + (px + offsetX) * scale;
            const sy = (py) => y + (py + offsetY) * scale;
            ctx.moveTo(sx(215.473), sy(400.172));
            ctx.bezierCurveTo(sx(223.156), sy(399.655), sx(230.416), sy(398.937), sx(237.666), sy(399.034));
            ctx.bezierCurveTo(sx(258.806), sy(399.318), sx(279.352), sy(402.944), sx(298.993), sy(411.017));
            ctx.bezierCurveTo(sx(303.571), sy(412.899), sx(306.625), sy(419.458), sx(305.363), sy(424.421));
            ctx.bezierCurveTo(sx(302.917), sy(434.039), sx(301.292), sy(443.969), sx(297.779), sy(453.18));
            ctx.bezierCurveTo(sx(295.157), sy(460.055), sx(290.553), sy(466.345), sx(286.032), sy(472.286));
            ctx.bezierCurveTo(sx(278.571), sy(482.091), sx(270.226), sy(491.221), sx(262.712), sy(500.988));
            ctx.bezierCurveTo(sx(257.665), sy(507.547), sx(258.704), sy(513.647), sx(264.4), sy(520.955));
            ctx.bezierCurveTo(sx(274.062), sy(533.352), sx(284.165), sy(545.444), sx(290.586), sy(560.064));
            ctx.bezierCurveTo(sx(295.605), sy(571.492), sx(293.599), sy(578.564), sx(282.659), sy(584.013));
            ctx.bezierCurveTo(sx(277.247), sy(586.709), sx(271.485), sy(588.696), sx(265.93), sy(591.114));
            ctx.bezierCurveTo(sx(261.242), sy(593.155), sx(257.577), sy(591.701), sx(253.922), sy(588.506));
            ctx.bezierCurveTo(sx(239.5), sy(575.9), sx(224.946), sy(563.448), sx(210.431), sy(550.949));
            ctx.bezierCurveTo(sx(205.759), sy(546.926), sx(200.736), sy(543.242), sx(196.516), sy(538.793));
            ctx.bezierCurveTo(sx(194.593), sy(536.766), sx(193.482), sy(533.31), sx(193.285), sy(530.414));
            ctx.bezierCurveTo(sx(192.238), sy(514.991), sx(192.047), sy(499.776), sx(201.95), sy(486.282));
            ctx.bezierCurveTo(sx(205.746), sy(481.109), sx(208.554), sy(474.999), sx(210.776), sy(468.937));
            ctx.bezierCurveTo(sx(213.541), sy(461.396), sx(210.258), sy(454.602), sx(205.928), sy(448.483));
            ctx.bezierCurveTo(sx(199.898), sy(439.959), sx(196.889), sy(430.252), sx(195.143), sy(420.22));
            ctx.bezierCurveTo(sx(193.041), sy(408.138), sx(198.815), sy(401.622), sx(211.202), sy(400.978));
            ctx.bezierCurveTo(sx(212.491), sy(400.911), sx(213.765), sy(400.561), sx(215.473), sy(400.172));
            ctx.closePath();
            ctx.fill();
        }
    },
    mol_shape_3: {
        name: 'Mol Shape 3',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            const scale = size / 125; // viewBox height
            const offsetX = -657; // Center X of actual path bounds
            const offsetY = -306; // Center Y of actual path bounds
            const sx = (px) => x + (px + offsetX) * scale;
            const sy = (py) => y + (py + offsetY) * scale;
            ctx.moveTo(sx(637.303), sy(272.225));
            ctx.bezierCurveTo(sx(634.135), sy(263.467), sx(637.442), sy(256.473), sx(642.086), sy(249.831));
            ctx.bezierCurveTo(sx(649.286), sy(239.533), sx(667.465), sy(237.006), sx(675.987), sy(245.661));
            ctx.bezierCurveTo(sx(681.54), sy(251.3), sx(682.346), sy(258.862), sx(680.164), sy(266.341));
            ctx.bezierCurveTo(sx(679.03), sy(270.227), sx(678.859), sy(272.579), sx(683.38), sy(274.228));
            ctx.bezierCurveTo(sx(693.936), sy(278.081), sx(694.678), sy(287.792), sx(695.952), sy(296.927));
            ctx.bezierCurveTo(sx(697.086), sy(305.052), sx(694.009), sy(312.031), sx(689.24), sy(318.548));
            ctx.bezierCurveTo(sx(699.054), sy(327.791), sx(701.648), sy(339.177), sx(699.076), sy(352.063));
            ctx.bezierCurveTo(sx(698.98), sy(352.547), sx(699.033), sy(353.06), sx(699.005), sy(353.559));
            ctx.bezierCurveTo(sx(698.366), sy(364.999), sx(698.366), sy(364.999), sx(686.67), sy(364.999));
            ctx.bezierCurveTo(sx(682.005), sy(364.999), sx(677.324), sy(364.758), sx(672.681), sy(365.07));
            ctx.bezierCurveTo(sx(668.595), sy(365.345), sx(667.18), sy(363.047), sx(667.068), sy(359.777));
            ctx.bezierCurveTo(sx(666.598), sy(346.088), sx(666.136), sy(332.394), sx(666.072), sy(318.7));
            ctx.bezierCurveTo(sx(666.03), sy(309.602), sx(666.671), sy(300.501), sx(666.996), sy(291.402));
            ctx.bezierCurveTo(sx(667.031), sy(290.403), sx(667.055), sy(289.398), sx(666.982), sy(288.404));
            ctx.bezierCurveTo(sx(666.565), sy(282.748), sx(663.385), sy(278.391), sx(659.538), sy(279.135));
            ctx.bezierCurveTo(sx(654.522), sy(280.106), sx(654.179), sy(284.676), sx(654.046), sy(288.702));
            ctx.bezierCurveTo(sx(653.284), sy(311.718), sx(652.538), sy(334.736), sx(652.079), sy(357.759));
            ctx.bezierCurveTo(sx(651.949), sy(364.323), sx(646.642), sy(362.443), sx(643.841), sy(362.736));
            ctx.bezierCurveTo(sx(636.569), sy(363.496), sx(629.165), sy(362.951), sx(621.815), sy(363.016));
            ctx.bezierCurveTo(sx(619.132), sy(363.039), sx(617.652), sy(362.101), sx(618.017), sy(359.211));
            ctx.bezierCurveTo(sx(618.778), sy(353.189), sx(619.501), sy(347.163), sx(620.323), sy(341.15));
            ctx.bezierCurveTo(sx(621.481), sy(332.685), sx(625.993), sy(325.935), sx(631.519), sy(319.738));
            ctx.bezierCurveTo(sx(621.416), sy(312.201), sx(618.344), sy(299.568), sx(627.875), sy(284.81));
            ctx.bezierCurveTo(sx(630.251), sy(281.13), sx(633.846), sy(278.245), sx(636.784), sy(274.911));
            ctx.bezierCurveTo(sx(637.263), sy(274.367), sx(637.239), sy(273.382), sx(637.303), sy(272.225));
            ctx.closePath();
            ctx.fill();
        }
    },
    mol_shape_4: {
        name: 'Mol Shape 4',
        draw: (ctx, x, y, size, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            const scale = size / 172; // viewBox height
            const offsetX = -1231; // Center X of actual path bounds
            const offsetY = -503; // Center Y of actual path bounds
            const sx = (px) => x + (px + offsetX) * scale;
            const sy = (py) => y + (py + offsetY) * scale;
            ctx.moveTo(sx(1228.615), sy(417.037));
            ctx.bezierCurveTo(sx(1232.716), sy(418.175), sx(1234.818), sy(421.314), sx(1234.92), sy(421.454));
            ctx.bezierCurveTo(sx(1240.189), sy(428.657), sx(1248.914), sy(439.015), sx(1253.998), sy(447.034));
            ctx.bezierCurveTo(sx(1256.07), sy(450.865), sx(1258.009), sy(453.97), sx(1259.947), sy(457.075));
            ctx.bezierCurveTo(sx(1259.947), sy(457.075), sx(1264.334), sy(478.748), sx(1266.654), sy(489.183));
            ctx.bezierCurveTo(sx(1266.863), sy(490.124), sx(1267.458), sy(507.373), sx(1267.203), sy(508.926));
            ctx.bezierCurveTo(sx(1265.737), sy(517.874), sx(1264.136), sy(526.803), sx(1262.416), sy(535.706));
            ctx.bezierCurveTo(sx(1261.039), sy(542.832), sx(1257.987), sy(556.989), sx(1257.657), sy(557.08));
            ctx.bezierCurveTo(sx(1254.505), sy(562.763), sx(1248.934), sy(573.93), sx(1248.588), sy(573.95));
            ctx.bezierCurveTo(sx(1246.811), sy(575.98), sx(1244.009), sy(580.011), sx(1243.662), sy(580.01));
            ctx.bezierCurveTo(sx(1241.852), sy(581.653), sx(1236.581), sy(585.253), sx(1235.922), sy(585.698));
            ctx.bezierCurveTo(sx(1226.139), sy(592.294), sx(1203.348), sy(585.747), sx(1202.042), sy(585.255));
            ctx.bezierCurveTo(sx(1201.221), sy(584.847), sx(1197.015), sy(581.995), sx(1197.05), sy(581.631));
            ctx.bezierCurveTo(sx(1195.091), sy(579.444), sx(1188.244), sy(570.056), sx(1186.985), sy(568.128));
            ctx.bezierCurveTo(sx(1180.199), sy(557.74), sx(1176.605), sy(547.571), sx(1175.367), sy(535.121));
            ctx.bezierCurveTo(sx(1174.099), sy(522.369), sx(1174.753), sy(509.717), sx(1177.08), sy(497.135));
            ctx.bezierCurveTo(sx(1178.638), sy(488.707), sx(1180.196), sy(480.279), sx(1181.795), sy(471.859));
            ctx.bezierCurveTo(sx(1183.024), sy(465.396), sx(1184.108), sy(458.895), sx(1185.64), sy(452.503));
            ctx.bezierCurveTo(sx(1187.209), sy(445.955), sx(1189.245), sy(439.519), sx(1191.077), sy(433.035));
            ctx.bezierCurveTo(sx(1191.077), sy(433.035), sx(1191.008), sy(433.013), sx(1191.375), sy(433.038));
            ctx.bezierCurveTo(sx(1198.17), sy(420.576), sx(1217.612), sy(417.099), sx(1219.026), sy(417.599));
            ctx.moveTo(sx(1199.061), sy(528.16));
            ctx.bezierCurveTo(sx(1200.06), sy(532.189), sx(1200.829), sy(536.292), sx(1202.103), sy(540.232));
            ctx.bezierCurveTo(sx(1205.216), sy(549.855), sx(1210.796), sy(557.98), sx(1218.125), sy(564.862));
            ctx.bezierCurveTo(sx(1220.731), sy(567.308), sx(1223.049), sy(567.244), sx(1226.24), sy(564.483));
            ctx.bezierCurveTo(sx(1234.224), sy(557.576), sx(1237.317), sy(548.199), sx(1239.781), sy(538.779));
            ctx.bezierCurveTo(sx(1242.877), sy(526.944), sx(1244.859), sy(514.798), sx(1246.906), sy(502.716));
            ctx.bezierCurveTo(sx(1247.881), sy(496.96), sx(1248.804), sy(490.938), sx(1248.16), sy(485.216));
            ctx.bezierCurveTo(sx(1246.649), sy(471.799), sx(1238.406), sy(461.114), sx(1232.07), sy(449.72));
            ctx.bezierCurveTo(sx(1230.014), sy(446.021), sx(1227.609), sy(442.342), sx(1224.653), sy(439.358));
            ctx.bezierCurveTo(sx(1220.293), sy(434.956), sx(1212.574), sy(436.831), sx(1209.711), sy(442.414));
            ctx.bezierCurveTo(sx(1205.185), sy(451.241), sx(1203.625), sy(460.756), sx(1202.3), sy(470.899));
            ctx.bezierCurveTo(sx(1201.686), sy(472.733), sx(1200.85), sy(474.525), sx(1200.502), sy(476.408));
            ctx.bezierCurveTo(sx(1199.535), sy(481.627), sx(1199.263), sy(487.023), sx(1197.829), sy(492.098));
            ctx.bezierCurveTo(sx(1194.445), sy(504.073), sx(1196.467), sy(515.725), sx(1199.061), sy(528.16));
            ctx.closePath();
            ctx.fill();
        }
    }
};
