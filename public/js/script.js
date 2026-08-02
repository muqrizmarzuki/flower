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

    // Simple Secret Bar
    const secretBarFill = document.getElementById('secret-bar-fill');
    const secretBarCount = document.getElementById('secret-bar-count');

    function updateSecretBar(count) {
        const total = 6;
        const c = Math.min(count, total);
        if (secretBarFill) secretBarFill.style.width = `${Math.round((c / total) * 100)}%`;
        if (secretBarCount) secretBarCount.textContent = `${c}/${total}`;
    }

    function openModal(flower) {
        if (!modal) return;

        if (modalFlowerImg && flower.imgSrc) {
            modalFlowerImg.src = flower.imgSrc;
            modalFlowerImg.alt = flower.name || flower.title || 'Flower';
        }
        
        if (modalTitle) modalTitle.textContent = flower.name || flower.title || 'Flower';
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

    // 1. Live Days Together Counter Since 25 May 2017
    const daysTextEl = document.getElementById('days-together-text');
    if (daysTextEl) {
        const startDate = new Date('2017-05-25');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        daysTextEl.textContent = `${diffDays.toLocaleString()} Days Together Since 25 May 2017`;
    }

    // 2. Daily Love Note Generator (Automatically hashes calendar date for unique daily note)
    const dailyNotes = [
        "Remember to drink lots of water today, Sayang! Thinking of you always. ❤️",
        "Don't stress out today okay? I'm always right here cheering for you! ✨",
        "Go treat yourself to a big cold Teh Ais today, Sayang! You deserve it. 🏵️",
        "Just wanted to remind my Jabigah that she's the absolute cutest girl in the world! 🌸",
        "Hope you have an easy, smooth, and wonderful day today, my love! ❤️",
        "Sending you the biggest virtual hug right now! Have a great day Sayang. 🤗",
        "Counting down the days until our next date & food trip together! 🌷",
        "You're doing awesome today, Sayang. I'm so proud of you! 🌺",
        "Never forget how much I love you, my forever Jabigah! ✨",
        "Can't wait to travel the world to London & Edinburgh with you soon! 🌸",
        "Take a break and rest well today okay? Love you, Sayang! ❤️",
        "You make my world so much brighter every single day! 🌻",
        "Hope your day is filled with good food, smiles, and happiness! 🍧",
        "Just a quick reminder: You're my favorite person in the whole universe! 🌹",
        "No matter how busy today gets, remember that I'm always thinking of you! ❤️",
        "You're the sweetest part of my life, Sayang. Have an amazing day! ✨"
    ];

    const dailyCardEl = document.getElementById('daily-note-card');
    const dailyDateEl = document.getElementById('daily-note-date');
    const dailyTextEl = document.getElementById('daily-note-text');

    if (dailyDateEl) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        dailyDateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Automatic Date Hashing: Maps today's calendar date to a unique daily note
    const dateStr = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = (hash << 5) - hash + dateStr.charCodeAt(i);
        hash |= 0;
    }
    const todayNoteIdx = Math.abs(hash) % dailyNotes.length;
    const todaysNote = dailyNotes[todayNoteIdx];

    if (dailyCardEl && dailyTextEl) {
        let revealed = false;
        dailyCardEl.addEventListener('click', () => {
            if (!revealed) {
                dailyTextEl.textContent = `"${todaysNote}"`;
                petalEngine.triggerShower(18);
                revealed = true;
            } else {
                petalEngine.triggerShower(10);
            }
        });
    }

    // Rare Secret Collection Tracker (6 Secret Notes)
    const secretSurpriseCollection = [
        {
            title: "✨ Secret Note #1 / 6 Unlocked! 💌",
            imgSrc: "assets/official/color_sunflower.webp",
            message: "Pssst Sayang! ✨ A hidden love note popped up just for you:\n\nI love you so much today & every day! You're my favorite person in the whole world. ❤️\n\n- Yours, Muqriz"
        },
        {
            title: "✨ Secret Note #2 / 6 Unlocked! 💌",
            imgSrc: "assets/rose.webp",
            message: "Special Secret Note! ✨\n\nDid you know you look extra cute today? Thank you for being my girlfriend, my best friend, and my whole world! ❤️\n\n- Forever Yours, Muqriz"
        },
        {
            title: "✨ Secret Note #3 / 6 Unlocked! 💌",
            imgSrc: "assets/official/color_orchid.webp",
            message: "Yay! You unlocked another secret note! ✨\n\nCan't wait for our next date together & a cold Teh Ais! Love you forever, my Jabigah. ❤️\n\n- Muqriz"
        },
        {
            title: "✨ Secret Note #4 / 6 Unlocked! 💌",
            imgSrc: "assets/tulip.webp",
            message: "A little surprise for my Sayang! ✨\n\nJust wanted to remind you that you make my life so much brighter every single day. ❤️\n\n- Love, Muqriz"
        },
        {
            title: "✨ Secret Note #5 / 6 Unlocked! 💌",
            imgSrc: "assets/official/color_ranunculus.webp",
            message: "Secret Memory Unlocked! ✨\n\nFrom school days in 2017 teasing you to get your attention, to dreaming of London & Edinburgh together... I'm so lucky to have you, Jabigah! ❤️\n\n- Yours Always, Muqriz"
        },
        {
            title: "✨ All Secret Notes Collected! 🎉",
            imgSrc: "assets/peony.webp",
            message: "You've Unlocked All Secret Notes! 🎉\n\nEvery single bloom in this bouquet was made with endless love just for you, Sayang. Tap any flower in the bouquet to discover more hidden love notes! ❤️\n\n- Forever Yours, Muqriz"
        }
    ];

    // Load current collection progress from localStorage
    let currentUnlocked = parseInt(localStorage.getItem('sayang_secret_count') || '0', 10);
    updateSecretBar(currentUnlocked);

    // Rare 25% Chance on Page Load to Trigger Pop-Up & Unlock Next Secret
    if (Math.random() < 0.25) {
        setTimeout(() => {
            const nextIdx = currentUnlocked % secretSurpriseCollection.length;
            const secretNote = secretSurpriseCollection[nextIdx];

            openModal(secretNote);
            petalEngine.triggerShower(25);

            // Increment progress
            currentUnlocked += 1;
            localStorage.setItem('sayang_secret_count', currentUnlocked);
            updateSecretBar(currentUnlocked);
        }, 1200);
    }

    // Periodically spawn gentle ambient petals
    setInterval(() => {
        petalEngine.triggerShower(2);
    }, 10000);
});
