/* ==========================================================================
   Bouquet Engine - Flawless Mobile Touch & Click Engine for Sayang
   ========================================================================== */

class BouquetEngine {
    constructor(canvasId, onFlowerClick) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.time = 0;
        this.hoveredFlowerIndex = -1;
        this.mouseX = 0;
        this.mouseY = 0;
        this.onFlowerClick = onFlowerClick;
        this.lastTriggerTime = 0;

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

        const triggerClickAtCoords = (clientX, clientY) => {
            const now = Date.now();
            if (now - this.lastTriggerTime < 350) return; // Prevent duplicate double taps
            
            const flower = this.getFlowerAtCoords(clientX, clientY);
            if (flower && this.onFlowerClick && typeof this.onFlowerClick === 'function') {
                this.lastTriggerTime = now;
                this.onFlowerClick(flower);
            }
        };

        // Pointer Events (Modern Standard for iOS Safari, Chrome Mobile, Android, & Desktop)
        if (window.PointerEvent) {
            this.canvas.addEventListener('pointermove', (e) => {
                this.updatePointerCoords(e.clientX, e.clientY);
            });

            this.canvas.addEventListener('pointerdown', (e) => {
                this.updatePointerCoords(e.clientX, e.clientY);
            });

            this.canvas.addEventListener('pointerup', (e) => {
                triggerClickAtCoords(e.clientX, e.clientY);
            });
        } else {
            // Fallback Mouse & Touch Listeners
            this.canvas.addEventListener('mousemove', (e) => {
                this.updatePointerCoords(e.clientX, e.clientY);
            });

            this.canvas.addEventListener('click', (e) => {
                triggerClickAtCoords(e.clientX, e.clientY);
            });

            const handleTouchEnd = (e) => {
                if (e.changedTouches && e.changedTouches.length > 0) {
                    const touch = e.changedTouches[0];
                    triggerClickAtCoords(touch.clientX, touch.clientY);
                }
            };

            this.canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        this.loadPreset();
    }

    updatePointerCoords(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            this.mouseX = (clientX - rect.left) * (this.width / rect.width);
            this.mouseY = (clientY - rect.top) * (this.height / rect.height);
        }
    }

    getFlowerAtCoords(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return null;

        const x = (clientX - rect.left) * (this.width / rect.width);
        const y = (clientY - rect.top) * (this.height / rect.height);

        // Check flowers from top-most layer to bottom-most layer with generous touch radius (0.75x)
        for (let i = this.flowers.length - 1; i >= 0; i--) {
            const flower = this.flowers[i];
            const dx = x - flower.x;
            const dy = y - flower.y;
            // Radius tolerance for mobile touch targets (~75% of flower size)
            if (Math.hypot(dx, dy) < flower.size * 0.75) {
                return flower;
            }
        }
        return null;
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
                x: 250, y: 110, size: 130, rotation: -0.02, hoverScale: 1
            },
            {
                type: 'orchid',
                name: 'Blush Orchid',
                imgSrc: 'assets/official/color_orchid.webp',
                message: 'You are as rare, elegant, and precious to me as an orchid. I treasure you endlessly, Sayang! ✨',
                x: 160, y: 115, size: 120, rotation: -0.08, hoverScale: 1
            },
            {
                type: 'lily',
                name: 'White Lily',
                imgSrc: 'assets/lily.webp',
                message: 'Pure, sweet, and beautiful—just like your heart, Sayang! 🌺',
                x: 340, y: 115, size: 125, rotation: 0.08, hoverScale: 1
            },

            // Middle Row Focal Blossoms
            {
                type: 'tulip',
                name: 'Pink Tulip',
                imgSrc: 'assets/tulip.webp',
                message: 'You bring endless joy and magic to my life every single day, Sayang! 🌷',
                x: 120, y: 170, size: 115, rotation: -0.1, hoverScale: 1
            },
            {
                type: 'peony',
                name: 'Pink Peony',
                imgSrc: 'assets/peony.webp',
                message: 'Your beautiful smile brightens up my whole world. Being with you is my favorite place to be, Sayang! 🌸',
                x: 190, y: 165, size: 120, rotation: 0.03, hoverScale: 1
            },
            {
                type: 'rose',
                name: 'Red Velvet Rose',
                imgSrc: 'assets/rose.webp',
                message: 'My love for you grows stronger with every passing second. You hold the key to my heart forever, Sayang! 🌹',
                x: 250, y: 155, size: 125, rotation: -0.03, hoverScale: 1
            },
            {
                type: 'ranunculus',
                name: 'Blush Ranunculus',
                imgSrc: 'assets/official/color_ranunculus.webp',
                message: 'Through every season of life, I will choose you over and over again, Sayang! ❤️',
                x: 310, y: 165, size: 120, rotation: -0.04, hoverScale: 1
            },
            {
                type: 'anemone',
                name: 'Purple Anemone',
                imgSrc: 'assets/anemone.webp',
                message: 'My heart beats only for you, my dearest Sayang! 🪻',
                x: 380, y: 170, size: 115, rotation: 0.1, hoverScale: 1
            },

            // Front Row Accents
            {
                type: 'carnation',
                name: 'Blush Carnation',
                imgSrc: 'assets/carnation.webp',
                message: 'Thank you for being my best friend, my confidante, and my soulmate. I love you so much, Sayang! 🏵️',
                x: 165, y: 210, size: 110, rotation: 0.06, hoverScale: 1
            },
            {
                type: 'daisy',
                name: 'Sweet White Daisy',
                imgSrc: 'assets/daisy.webp',
                message: 'Forever and always, my heart belongs to you and only you, Sayang! ❤️✨',
                x: 220, y: 220, size: 100, rotation: -0.04, hoverScale: 1
            },
            {
                type: 'dahlia',
                name: 'Crimson Dahlia',
                imgSrc: 'assets/dahlia.webp',
                message: 'You are the most precious gift in my life, Sayang! 🌼',
                x: 280, y: 220, size: 105, rotation: 0.04, hoverScale: 1
            },
            {
                type: 'zinnia',
                name: 'Pink Zinnia',
                imgSrc: 'assets/zinnia.webp',
                message: 'Loving you is the easiest and best thing I have ever done! 🌸',
                x: 335, y: 210, size: 110, rotation: -0.06, hoverScale: 1
            }
        ];
    }

    render() {
        this.time += 0.02;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Bush Wrapper Backing
        this.renderBushBacking();

        // 2. Render Spaced Flowers
        let hoveredFound = -1;
        this.flowers.forEach((flower, index) => {
            const dx = this.mouseX - flower.x;
            const dy = this.mouseY - flower.y;
            const isHovered = Math.hypot(dx, dy) < flower.size * 0.45;

            if (isHovered) hoveredFound = index;

            const targetScale = isHovered ? 1.08 : 1.0;
            flower.hoverScale += (targetScale - flower.hoverScale) * 0.15;

            this.renderFlower(flower);
        });

        this.hoveredFlowerIndex = hoveredFound;
        this.canvas.style.cursor = hoveredFound !== -1 ? 'pointer' : 'default';

        // 3. Draw Bush Wrapper Top Overlap
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
        this.ctx.translate(flower.x + microSway, flower.y);
        this.ctx.rotate(flower.rotation);
        this.ctx.scale(flower.hoverScale, flower.hoverScale);

        const img = this.assets[flower.type];
        if (img && img.complete && img.naturalWidth !== 0) {
            const sz = flower.size;
            this.ctx.drawImage(img, -sz / 2, -sz / 2, sz, sz);
        }

        this.ctx.restore();
    }
}
