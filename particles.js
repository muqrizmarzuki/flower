/* ==========================================================================
   Particles Engine - Ambient Sparkles for DigiBouquet
   ========================================================================== */

class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.sparkles = [];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        for (let i = 0; i < 20; i++) {
            this.sparkles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 1,
                alpha: Math.random(),
                speed: Math.random() * 0.02 + 0.005
            });
        }
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    updateAndRender() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.sparkles.forEach(s => {
            s.alpha += s.speed;
            const currentAlpha = (Math.sin(s.alpha) + 1) / 2 * 0.6;

            this.ctx.fillStyle = `rgba(0, 0, 0, ${currentAlpha * 0.25})`;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}
