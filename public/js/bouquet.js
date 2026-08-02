/* ==========================================================================
   Bouquet Engine - Personal Romantic Flower Messages for Sayang (Jabigah) from Muqriz
   ========================================================================== */

class BouquetEngine {
    constructor(canvasId, onFlowerClick) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.time = 0;
        this.hoveredFlowerIndex = -1;
        this.selectedFlowerIndex = -1; // Tracks 1st tap selection on mobile
        this.mouseX = -9999;
        this.mouseY = -9999;
        this.onFlowerClick = onFlowerClick;
        this.lastTapTime = 0;

        // Image Cache for Official DigiBouquet Assets
        this.assets = {};
        this.assetList = [
            { name: 'bush-1', file: 'bush-1.png' },
            { name: 'bush-1-top', file: 'bush-1-top.png' },
            { name: 'rose', file: 'rose.webp' },
            { name: 'peony', file: 'peony.webp' },
            { name: 'carnation', file: 'carnation.webp' },
            { name: 'anemone', file: 'anemone.webp' },
            { name: 'dahlia', file: 'dahlia.webp' },
            { name: 'daisy', file: 'daisy.webp' },
            { name: 'lily', file: 'lily.webp' },
            { name: 'zinnia', file: 'zinnia.webp' },
            { name: 'tulip', file: 'tulip.webp' },
            
            // Official Color Additions
            { name: 'ranunculus', file: 'official/color_ranunculus.webp' },
            { name: 'orchid', file: 'official/color_orchid.webp' },
            { name: 'sunflower', file: 'official/color_sunflower.webp' }
        ];

        this.flowers = [];
        this.init();
    }

    init() {
        this.loadAssets();

        const handleMobileTap = (clientX, clientY) => {
            const hitIndex = this.getFlowerIndexAtCoords(clientX, clientY);
            const now = Date.now();

            if (hitIndex === -1) {
                // Tapped empty space outside flowers -> RESUME SEQUENTIAL WAVE IMMEDIATELY!
                this.selectedFlowerIndex = -1;
                this.mouseX = -9999;
                this.mouseY = -9999;
                return;
            }

            // If 2nd tap happens on the SAME selected flower:
            if (this.selectedFlowerIndex === hitIndex && (now - this.lastTapTime > 150)) {
                // 2nd Tap -> OPEN POPUP MODAL!
                const flower = this.flowers[hitIndex];
                if (this.onFlowerClick && typeof this.onFlowerClick === 'function') {
                    this.onFlowerClick(flower);
                }
                this.lastTapTime = now;
            } else {
                // 1st Tap on a flower -> LIFT UP & SELECT FLOWER (DO NOT OPEN POPUP)!
                this.selectedFlowerIndex = hitIndex;
                this.lastTapTime = now;
                const flower = this.flowers[hitIndex];
                this.mouseX = flower.x;
                this.mouseY = flower.y;
            }
        };

        // Touch event listener specifically for mobile devices
        let touchStartX = 0;
        let touchStartY = 0;

        this.canvas.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                this.updatePointerCoords(touchStartX, touchStartY);
            }
        }, { passive: true });

        this.canvas.addEventListener('touchend', (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                const touch = e.changedTouches[0];
                const dist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
                // Ensure it's a clean tap (not a page scroll)
                if (dist < 15) {
                    if (e.cancelable) e.preventDefault();
                    handleMobileTap(touch.clientX, touch.clientY);
                } else {
                    // Page drag/scroll -> clear touch coordinates
                    this.mouseX = -9999;
                    this.mouseY = -9999;
                }
            }
        }, { passive: false });

        // Desktop mouse hover & click
        this.canvas.addEventListener('mousemove', (e) => {
            this.updatePointerCoords(e.clientX, e.clientY);
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = -9999;
            this.mouseY = -9999;
        });

        this.canvas.addEventListener('click', (e) => {
            // Ignore synthetic click events on mobile touch devices
            if (matchMedia('(pointer: fine)').matches) {
                handleMobileTap(e.clientX, e.clientY);
            }
        });

        this.loadPreset();
    }

    updatePointerCoords(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            this.mouseX = (clientX - rect.left) * (this.width / rect.width);
            this.mouseY = (clientY - rect.top) * (this.height / rect.height);
        }
    }

    getFlowerIndexAtCoords(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return -1;

        const x = (clientX - rect.left) * (this.width / rect.width);
        const y = (clientY - rect.top) * (this.height / rect.height);

        // 1. Check selected flower first
        if (this.selectedFlowerIndex !== -1 && this.selectedFlowerIndex < this.flowers.length) {
            const currentFlower = this.flowers[this.selectedFlowerIndex];
            const currentY = currentFlower.y + (currentFlower.liftOffset || 0);

            const dxBody = x - currentFlower.x;
            const dyBody = y - currentY;
            
            const dxPill = x - currentFlower.x;
            const dyPill = y - Math.max(8, currentY - currentFlower.size * 0.52 - 14);

            if (Math.hypot(dxBody, dyBody) < currentFlower.size * 0.48 || (Math.abs(dxPill) < 60 && Math.abs(dyPill) < 20)) {
                return this.selectedFlowerIndex;
            }
        }

        // 2. Layer-Aware Closest Matching across all 12 flowers
        let closestIndex = -1;
        let minDistance = Infinity;

        for (let i = 0; i < this.flowers.length; i++) {
            const flower = this.flowers[i];
            const currentY = flower.y + (flower.liftOffset || 0);

            const dx = x - flower.x;
            const dy = y - currentY;
            const dist = Math.hypot(dx, dy);

            if (dist < flower.size * 0.46) {
                if (dist < minDistance) {
                    minDistance = dist;
                    closestIndex = i;
                }
            }
        }

        return closestIndex;
    }

    loadAssets() {
        this.assetList.forEach(item => {
            const img = new Image();
            img.src = `assets/${item.file}`;
            this.assets[item.name] = img;
        });
    }

    loadPreset() {
        // Deeply Personal Messages from Muqriz to Sayang (Jabigah)
        this.flowers = [
            // Back Row Stems (Tallest Crowns with Ample Headroom)
            {
                type: 'sunflower',
                name: 'Golden Sunflower',
                imgSrc: 'assets/official/color_sunflower.webp',
                message: 'Ever since 25 May 2017, you have been the bright sunshine in my life, Sayang. Just seeing your smile puts me in a good mood every single day! 🌻',
                x: 250, y: 110, size: 135, rotation: -0.02, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'orchid',
                name: 'Blush Orchid',
                imgSrc: 'assets/official/color_orchid.webp',
                message: 'Back in school I used to think kenapa la panggil jabigah ni hahah, but it is so cute! You will always be my forever Jabigah. ✨',
                x: 155, y: 122, size: 120, rotation: -0.08, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'lily',
                name: 'White Lily',
                imgSrc: 'assets/lily.webp',
                message: 'I love how sweet and genuine your heart is, Sayang. Every simple thing you do to take care of me always puts a smile on my face. 🌺',
                x: 345, y: 122, size: 125, rotation: 0.08, hoverScale: 1, liftOffset: 0
            },

            // Middle Row Focal Blossoms
            {
                type: 'rose',
                name: 'Red Velvet Rose',
                imgSrc: 'assets/rose.webp',
                message: 'A red rose for my one and only! After all these years together since 2017, I love you more and more every single day, Sayang! 🌹❤️',
                x: 250, y: 180, size: 125, rotation: -0.03, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'tulip',
                name: 'Pink Tulip',
                imgSrc: 'assets/tulip.webp',
                message: 'I don’t even care where we go, I just love going out with you, Sayang. Any date with you is the best part of my day! 🌷',
                x: 120, y: 185, size: 115, rotation: -0.1, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'peony',
                name: 'Pink Peony',
                imgSrc: 'assets/peony.webp',
                message: 'Pink peonies for my Jabigah! Your laugh and cute smile are my absolute favorite things in the world. 🌸',
                x: 185, y: 182, size: 120, rotation: 0.03, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'ranunculus',
                name: 'Blush Ranunculus',
                imgSrc: 'assets/official/color_ranunculus.webp',
                message: 'Thank you for always taking care of me so thoughtfully, Sayang. Your gentleness and love mean everything to me. ❤️',
                x: 315, y: 182, size: 120, rotation: -0.04, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'anemone',
                name: 'Purple Anemone',
                imgSrc: 'assets/anemone.webp',
                message: 'I catch myself thinking about you all day long, Sayang. From school days until now, you are always on my mind! 🪻',
                x: 380, y: 185, size: 115, rotation: 0.1, hoverScale: 1, liftOffset: 0
            },

            // Front Row Accents
            {
                type: 'carnation',
                name: 'Blush Carnation',
                imgSrc: 'assets/carnation.webp',
                message: 'Let’s go treat you to a cold Teh Ais! Thank you for being my girlfriend and my best friend all these years, Sayang. 🏵️',
                x: 165, y: 232, size: 110, rotation: 0.06, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'daisy',
                name: 'Sweet White Daisy',
                imgSrc: 'assets/daisy.webp',
                message: 'Being with you is just so easy and comfortable, Sayang. I love our journey together so much! 🌼',
                x: 220, y: 240, size: 100, rotation: -0.04, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'dahlia',
                name: 'Crimson Dahlia',
                imgSrc: 'assets/dahlia.webp',
                message: 'I am so proud of us, Sayang. I will always be right here by your side supporting you in everything you do! ❤️',
                x: 280, y: 240, size: 105, rotation: 0.04, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'zinnia',
                name: 'Pink Zinnia',
                imgSrc: 'assets/zinnia.webp',
                message: 'I hope I can marry you soon and travel the whole world with you! Love you forever, my Jabigah. 🌸',
                x: 335, y: 232, size: 110, rotation: -0.06, hoverScale: 1, liftOffset: 0
            }
        ];
    }

    render() {
        this.time += 0.02;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Check if user is hovering or selecting any flower
        let userHoveredIndex = -1;
        this.flowers.forEach((flower, index) => {
            const dx = this.mouseX - flower.x;
            const dy = this.mouseY - flower.y;
            if (Math.hypot(dx, dy) < flower.size * 0.45) {
                userHoveredIndex = index;
            }
        });

        const isUserInteracting = (this.selectedFlowerIndex !== -1 || userHoveredIndex !== -1);

        // Slow, Gentle Wave Rhythm (~1.2 seconds per flower transition)
        const totalFlowers = this.flowers.length;
        const waveStep = Math.floor(this.time * 0.95);
        const waveIndex = isUserInteracting ? -1 : (waveStep % (totalFlowers + 4));

        // 1. Draw Bush Wrapper Backing
        this.renderBushBacking();

        // 2. Render Spaced Flowers
        let activeIndex = -1;
        this.flowers.forEach((flower, index) => {
            const isMouseHovered = (index === userHoveredIndex);
            const isSelected = (index === this.selectedFlowerIndex);
            const isActive = isMouseHovered || isSelected;

            if (isActive) activeIndex = index;

            // Slow, unhurried 18px lift-up wave transition
            const isSequentialWaveActive = (!isUserInteracting && index === waveIndex);

            let targetLift = 0;
            if (isActive) {
                targetLift = -24; // Full 24px lift on user tap/hover
            } else if (isSequentialWaveActive) {
                targetLift = -18; // Slow 18px "Tap me!" wave lift
            }

            // Smooth ease transition
            flower.liftOffset += (targetLift - flower.liftOffset) * 0.10;

            // Scale Bump
            const targetScale = isActive ? 1.09 : (isSequentialWaveActive ? 1.05 : 1.0);
            flower.hoverScale += (targetScale - flower.hoverScale) * 0.10;

            this.renderFlower(flower);
        });

        this.hoveredFlowerIndex = activeIndex;
        this.canvas.style.cursor = activeIndex !== -1 ? 'pointer' : 'default';

        // 3. Draw Floating Top Indicator Badge
        if (activeIndex !== -1) {
            // User is hovering/selecting: show "💌 Tap again for note ✨"
            const activeFlower = this.flowers[activeIndex];
            this.renderTopIndicator(activeFlower, "💌 Tap again for note ✨");
        } else if (waveIndex >= 0 && waveIndex < totalFlowers) {
            // Sequential wave active on flower: show "💌 Tap me ✨"
            const waveFlower = this.flowers[waveIndex];
            this.renderTopIndicator(waveFlower, "💌 Tap me ✨");
        }

        // 4. Draw Bush Wrapper Top Overlap
        this.renderBushTop();
    }

    renderBushBacking() {
        this.ctx.save();
        const img = this.assets['bush-1'];
        if (img && img.complete && img.naturalWidth !== 0) {
            this.ctx.drawImage(img, -50, -40, 600, 500);
        }
        this.ctx.restore();
    }

    renderBushTop() {
        this.ctx.save();
        const img = this.assets['bush-1-top'];
        if (img && img.complete && img.naturalWidth !== 0) {
            this.ctx.drawImage(img, -50, -40, 600, 500);
        }
        this.ctx.restore();
    }

    renderFlower(flower) {
        this.ctx.save();

        const microSway = Math.sin(this.time * 1.5 + flower.x) * 1.5;
        const currentY = flower.y + (flower.liftOffset || 0);

        this.ctx.translate(flower.x + microSway, currentY);
        this.ctx.rotate(flower.rotation);
        this.ctx.scale(flower.hoverScale, flower.hoverScale);

        const img = this.assets[flower.type];
        if (img && img.complete && img.naturalWidth !== 0) {
            const sz = flower.size;
            this.ctx.drawImage(img, -sz / 2, -sz / 2, sz, sz);
        }

        this.ctx.restore();
    }

    renderTopIndicator(flower, customText) {
        this.ctx.save();

        const currentY = flower.y + (flower.liftOffset || 0) - (flower.size * 0.52);
        const text = customText || "💌 Tap again for note ✨";

        this.ctx.font = "bold 13px 'Outfit', sans-serif";
        const textMetrics = this.ctx.measureText(text);
        const paddingX = 14;
        const pillWidth = textMetrics.width + paddingX * 2;
        const pillHeight = 28;

        const pillX = flower.x - pillWidth / 2;
        // Clamp pillY so it NEVER gets cut off at the top of the canvas (min 6px margin)
        let pillY = Math.max(6, currentY - pillHeight);

        // Draw Pill Shadow
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        this.ctx.shadowBlur = 8;
        this.ctx.shadowOffsetY = 3;

        // Draw Pill Background
        this.ctx.beginPath();
        this.ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 14);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();

        // Draw Pill Border
        this.ctx.shadowColor = "transparent";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "#111111";
        this.ctx.stroke();

        // Draw Pill Text
        this.ctx.fillStyle = "#111111";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, flower.x, pillY + pillHeight / 2);

        this.ctx.restore();
    }
}
