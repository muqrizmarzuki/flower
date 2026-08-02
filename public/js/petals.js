/* ==========================================================================
   Petals Engine - Floating & Showering Petals for DigiBouquet
   ========================================================================== */

class PetalEngine {
    constructor(ctx) {
        this.ctx = ctx;
        this.petals = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        });
    }

    triggerShower(count = 35) {
        const colors = ['#E493B3', '#D85A38', '#FFFFFF', '#9C1C4D', '#F5B014'];
        for (let i = 0; i < count; i++) {
            this.petals.push({
                x: Math.random() * this.width,
                y: -20 - Math.random() * 40,
                size: Math.random() * 12 + 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 1.2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.04,
                opacity: 1
            });
        }
    }

    updateAndRender() {
        for (let i = this.petals.length - 1; i >= 0; i--) {
            const p = this.petals[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.004;

            if (p.y > this.height + 20 || p.opacity <= 0) {
                this.petals.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = Math.max(0, p.opacity);

            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }
    }
}
