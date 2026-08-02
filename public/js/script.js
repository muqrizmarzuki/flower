/* ==========================================================================
   Main Script - DigiBouquet Girlfriend Gift Page for Sayang
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Canvas Engines
    const particleEngine = new ParticleEngine('fx-canvas');
    const fxCtx = particleEngine.ctx;

    const petalEngine = new PetalEngine(fxCtx);

    // Modal Popup DOM elements
    const modal = document.getElementById('flower-modal');
    const modalClose = document.getElementById('modal-close');
    const modalFlowerImg = document.getElementById('modal-flower-img');
    const modalTitle = document.getElementById('modal-flower-title');
    const modalMessage = document.getElementById('modal-flower-message');

    function openModal(flower) {
        if (!modal) return;

        if (modalFlowerImg && flower.imgSrc) {
            modalFlowerImg.src = flower.imgSrc;
            modalFlowerImg.alt = flower.name || 'Flower';
        }
        
        if (modalTitle) modalTitle.textContent = flower.name || 'Flower';
        if (modalMessage) modalMessage.textContent = flower.message || 'I love you!';
        
        // Lock body scrolling on mobile devices for 100% full-bleed backdrop overlay
        document.body.style.overflow = 'hidden';

        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');

        // Burst petals for Sayang on click
        petalEngine.triggerShower(15);
    }

    function closeModal() {
        if (!modal) return;

        // Restore body scrolling
        document.body.style.overflow = '';

        modal.classList.add('hidden');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');

        if (window.bouquetEngine) {
            window.bouquetEngine.selectedFlowerIndex = -1;
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Instantiate Bouquet Engine with flower click listener
    window.bouquetEngine = new BouquetEngine('bouquet-canvas', (flower) => {
        openModal(flower);
    });

    // Main 60 FPS Render Loop
    function renderLoop() {
        particleEngine.updateAndRender();
        window.bouquetEngine.render();
        petalEngine.updateAndRender();
        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

    // Initial Petal Welcome Shower & Gentle Ambient Drift
    setTimeout(() => {
        petalEngine.triggerShower(18);
    }, 500);

    // Periodically spawn gentle ambient petals
    setInterval(() => {
        petalEngine.triggerShower(2);
    }, 10000);
});
