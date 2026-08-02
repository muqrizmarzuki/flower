/* ==========================================================================
   Bouquet Engine - 2-Step Mobile Touch Engine for Sayang
   (1st Tap: Lifts flower & shows top indicator | 2nd Tap: Opens love note popup)
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
        this.mouseX = 0;
        this.mouseY = 0;
        this.onFlowerClick = onFlowerClick;

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

        const handleMobileTouch = (clientX, clientY) => {
            const hitIndex = this.getFlowerIndexAtCoords(clientX, clientY);

            if (hitIndex === -1) {
                // Tapped empty space -> unselect current flower
                this.selectedFlowerIndex = -1;
                return;
            }

            if (this.selectedFlowerIndex === hitIndex) {
                // 2nd Touch Tap on the same flower -> OPEN MODAL POPUP!
                const flower = this.flowers[hitIndex];
                if (this.onFlowerClick && typeof this.onFlowerClick === 'function') {
                    this.onFlowerClick(flower);
                }
                this.selectedFlowerIndex = -1; // Reset after opening
            } else {
                // 1st Touch Tap on a flower -> LIFT UP & SELECT FLOWER!
                this.selectedFlowerIndex = hitIndex;
                const flower = this.flowers[hitIndex];
                this.mouseX = flower.x;
                this.mouseY = flower.y;
            }
        };

        // Mobile Touch Events (1st tap selects & lifts, 2nd tap opens modal)
        this.canvas.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                const touch = e.touches[0];
                handleMobileTouch(touch.clientX, touch.clientY);
            }
        }, { passive: true });

        // Desktop Mouse Hover
        this.canvas.addEventListener('mousemove', (e) => {
            this.updatePointerCoords(e.clientX, e.clientY);
        });

        // Desktop Mouse Click (Desktop 1-click shortcut or standard click)
        this.canvas.addEventListener('click', (e) => {
            // Only handle desktop clicks if not triggered by touch
            if (matchMedia('(pointer: fine)').matches) {
                const hitIndex = this.getFlowerIndexAtCoords(e.clientX, e.clientY);
                if (hitIndex !== -1) {
                    const flower = this.flowers[hitIndex];
                    if (this.onFlowerClick && typeof this.onFlowerClick === 'function') {
                        this.onFlowerClick(flower);
                    }
                }
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

        // Check flowers from top-most layer to bottom-most layer with generous touch radius (0.8x)
        for (let i = this.flowers.length - 1; i >= 0; i--) {
            const flower = this.flowers[i];
            const dx = x - flower.x;
            const dy = y - (flower.y + (flower.liftOffset || 0));
            if (Math.hypot(dx, dy) < flower.size * 0.8) {
                return i;
            }
        }
        return -1;
    }

    loadAssets() {
        this.assetList.forEach(item => {
            const img = new Image();
            img.src = `assets/${item.file}`;
            this.assets[item.name] = img;
        });
    }

    loadPreset() {
        // Spaced Flower Placement for Mobile Touch Devices
        this.flowers = [
            // Back Row Stems
            {
                type: 'sunflower',
                name: 'Golden Sunflower',
                imgSrc: 'assets/official/color_sunflower.webp',
                message: 'You are my sunshine, Sayang! Thank you for bringing warmth and laughter into my life every day. 🌻❤️',
                x: 250, y: 110, size: 130, rotation: -0.02, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'orchid',
                name: 'Blush Orchid',
                imgSrc: 'assets/official/color_orchid.webp',
                message: 'You are as rare, elegant, and precious to me as an orchid. I treasure you endlessly, Sayang! ✨',
                x: 160, y: 115, size: 120, rotation: -0.08, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'lily',
                name: 'White Lily',
                imgSrc: 'assets/lily.webp',
                message: 'Pure, sweet, and beautiful—just like your heart, Sayang! 🌺',
                x: 340, y: 115, size: 125, rotation: 0.08, hoverScale: 1, liftOffset: 0
            },

            // Middle Row Focal Blossoms
            {
                type: 'tulip',
                name: 'Pink Tulip',
                imgSrc: 'assets/tulip.webp',
                message: 'You bring endless joy and magic to my life every single day, Sayang! 🌷',
                x: 120, y: 170, size: 115, rotation: -0.1, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'peony',
                name: 'Pink Peony',
                imgSrc: 'assets/peony.webp',
                message: 'Your beautiful smile brightens up my whole world. Being with you is my favorite place to be, Sayang! 🌸',
                x: 190, y: 165, size: 120, rotation: 0.03, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'rose',
                name: 'Red Velvet Rose',
                imgSrc: 'assets/rose.webp',
                message: 'My love for you grows stronger with every passing second. You hold the key to my heart forever, Sayang! 🌹',
                x: 250, y: 155, size: 125, rotation: -0.03, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'ranunculus',
                name: 'Blush Ranunculus',
                imgSrc: 'assets/official/color_ranunculus.webp',
                message: 'Through every season of life, I will choose you over and over again, Sayang! ❤️',
                x: 310, y: 165, size: 120, rotation: -0.04, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'anemone',
                name: 'Purple Anemone',
                imgSrc: 'assets/anemone.webp',
                message: 'My heart beats only for you, my dearest Sayang! 🪻',
                x: 380, y: 170, size: 115, rotation: 0.1, hoverScale: 1, liftOffset: 0
            },

            // Front Row Accents
            {
                type: 'carnation',
                name: 'Blush Carnation',
                imgSrc: 'assets/carnation.webp',
                message: 'Thank you for being my best friend, my confidante, and my soulmate. I love you so much, Sayang! 🏵️',
                x: 165, y: 210, size: 110, rotation: 0.06, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'daisy',
                name: 'Sweet White Daisy',
                imgSrc: 'assets/daisy.webp',
                message: 'Forever and always, my heart belongs to you and only you, Sayang! ❤️✨',
                x: 220, y: 220, size: 100, rotation: -0.04, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'dahlia',
                name: 'Crimson Dahlia',
                imgSrc: 'assets/dahlia.webp',
                message: 'You are the most precious gift in my life, Sayang! 🌼',
                x: 280, y: 220, size: 105, rotation: 0.04, hoverScale: 1, liftOffset: 0
            },
            {
                type: 'zinnia',
                name: 'Pink Zinnia',
                imgSrc: 'assets/zinnia.webp',
                message: 'Loving you is the easiest and best thing I have ever done! 🌸',
                x: 335, y: 210, size: 110, rotation: -0.06, hoverScale: 1, liftOffset: 0
            }
        ];
    }

    render() {
        this.time += 0.02;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Bush Wrapper Backing
        this.renderBushBacking();

        // 2. Render Spaced Flowers
        let activeIndex = -1;
        this.flowers.forEach((flower, index) => {
            const dx = this.mouseX - flower.x;
            const dy = this.mouseY - (flower.y + (flower.liftOffset || 0));
            const isMouseHovered = Math.hypot(dx, dy) < flower.size * 0.45;
            const isSelected = (index === this.selectedFlowerIndex);

            const isActive = isMouseHovered || isSelected;

            if (isActive) activeIndex = index;

            // Lift-Up Animation (-24px vertical glide up when touched or hovered)
            const targetLift = isActive ? -24 : 0;
            flower.liftOffset += (targetLift - flower.liftOffset) * 0.2;

            // Scale Bump
            const targetScale = isActive ? 1.09 : 1.0;
            flower.hoverScale += (targetScale - flower.hoverScale) * 0.15;

            this.renderFlower(flower);
        });

        this.hoveredFlowerIndex = activeIndex;
        this.canvas.style.cursor = activeIndex !== -1 ? 'pointer' : 'default';

        // 3. Draw Floating Top Indicator Badge over active flower
        if (activeIndex !== -1) {
            const activeFlower = this.flowers[activeIndex];
            this.renderTopIndicator(activeFlower);
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

    renderTopIndicator(flower) {
        this.ctx.save();

        const currentY = flower.y + (flower.liftOffset || 0) - (flower.size * 0.52);
        const text = "💌 Tap again for note ✨";

        this.ctx.font = "bold 13px 'Outfit', sans-serif";
        const textMetrics = this.ctx.measureText(text);
        const paddingX = 14;
        const pillWidth = textMetrics.width + paddingX * 2;
        const pillHeight = 28;

        const pillX = flower.x - pillWidth / 2;
        const pillY = currentY - pillHeight;

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
