<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#F9F9EE">

    <!-- Primary Title & Meta Description -->
    <title>For My Sayang ❤️ | DigiBouquet</title>
    <meta name="title" content="For My Sayang ❤️">
    <meta name="description" content="A digital flower bouquet gift made with endless love for Sayang Syafiqa by Muqriz. Tap any flower to discover hidden romantic notes!">
    <meta name="keywords" content="Sayang, Muqriz, DigiBouquet, Digital Flower Bouquet, Love Gift, Romantic Flowers, Digital Roses">
    <meta name="author" content="Muqriz">

    <!-- Open Graph / Facebook / WhatsApp Preview Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://syafiqa.muqriz.my/">
    <meta property="og:site_name" content="My Sayang">
    <meta property="og:title" content="For My Sayang ❤️">
    <meta property="og:description" content="A digital flower bouquet gift made with endless love for Sayang Syafiqa by Muqriz. Tap any flower to discover hidden romantic notes!">
    <meta property="og:image" content="{{ asset('assets/photo.jpg') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Muqriz & Sayang Photo">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://syafiqa.muqriz.my/">
    <meta name="twitter:title" content="For My Sayang ❤️">
    <meta name="twitter:description" content="A digital flower bouquet gift made with endless love for Sayang Syafiqa by Muqriz. Tap any flower to discover hidden romantic notes!">
    <meta name="twitter:image" content="{{ asset('assets/photo.jpg') }}">

    <!-- iOS Apple Web App Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="My Sayang">

    <!-- Local Self-Contained Stylesheet with Cache-Buster -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ time() }}">
</head>
<body>
    <!-- Canvas FX Layer for Gentle Ambient Petals -->
    <canvas id="fx-canvas" class="fullscreen-canvas" aria-hidden="true"></canvas>

    <!-- Main Container -->
    <div class="page-container">
        <!-- Romantic Header Typography (Option 9: Satisfy Brush Script) -->
        <header class="header-typography">
            <h1 id="header-title-text" class="header-title font-style-9">Blooms Made With Love</h1>
        </header>

        <!-- Main Gift Stage: Single Combined Hybrid Bouquet -->
        <main class="gift-stage">
            <div class="bouquet-wrapper">

                <!-- Live Hybrid Canvas Bouquet Stage -->
                <div class="canvas-container">
                    <canvas id="bouquet-canvas" width="500" height="420"></canvas>
                </div>


                <div class="cards-flex-container">
                    <!-- 1. Floating Polaroid Photo Frame -->
                    <div class="polaroid-card" id="polaroid-card">
                        <div class="tape-strip"></div>
                        <div class="polaroid-frame">
                            <div class="polaroid-photo-wrapper">
                                <img src="{{ asset('assets/photo.jpg') }}?v={{ time() }}" alt="Sayang & Us" id="polaroid-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'350\' viewBox=\'0 0 300 350\'><rect width=\'100%\' height=\'100%\' fill=\'%232c0b16\'/><path d=\'M150 140 Q180 100 210 140 T150 220 Q120 180 90 140 T150 140\' fill=\'%23e899ac\'/><text x=\'50%\' y=\'270\' fill=\'%23fdfbf7\' font-family=\'serif\' font-size=\'18\' text-anchor=\'middle\'>Forever & Always ❤️</text></svg>'">
                                <div class="photo-glare"></div>
                            </div>
                            <div class="polaroid-caption">
                                <span id="caption-text" class="polaroid-caption-handwritten">Forever & Always ❤️</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Pinned Handwritten Permanent Note Card -->
                    <div class="note-card" id="note-card">
                        <div class="tape-strip right-tape"></div>
                        <div class="card-inner">
                            <div class="card-line">
                                <span class="card-label">Dearest</span>
                                <span class="card-value">Sayang,</span>
                            </div>
                            <div class="card-message-box">
                                <p class="card-message-text">I will always love you forever & after! ❤️<br><br>Every single flower in this bouquet blooms just for you.</p>
                            </div>
                            <div class="card-line right">
                                <span class="card-label">Forever Yours,</span>
                                <span class="card-value">Muqriz</span>
                            </div>
                            <div class="card-subtagline">Forever my girl ❤️</div>
                        </div>
                    </div>
                </div>

                <!-- Daily Love Note & Milestone Badge -->
                <div class="daily-love-wrapper">
                    <div class="days-together-badge">
                        <span>💖</span>
                        <span id="days-together-text">Together Since 25 May 2017</span>
                    </div>

                    <div class="daily-note-card" id="daily-note-card">
                        <div class="daily-note-header">
                            <span class="daily-note-tag">🥠 Today's Love Note</span>
                            <span class="daily-note-date" id="daily-note-date">Today</span>
                        </div>
                        <p class="daily-note-text" id="daily-note-text">"Tap to reveal today's secret love message from Muqriz! ✨"</p>
                    </div>
                </div>

                <!-- Secret Notes Bar -->
                <div class="secret-bar">
                    <span class="secret-bar-label">💌 Secret Notes</span>
                    <div class="secret-bar-track"><div class="secret-bar-fill" id="secret-bar-fill"></div></div>
                    <span class="secret-bar-count" id="secret-bar-count">0/6</span>
                </div>

            </div>
        </main>
    </div>

    <!-- Hidden Love Note Modal Popup -->
    <div id="flower-modal" class="modal-overlay hidden" aria-hidden="true">
        <div class="modal-card">
            <button type="button" id="modal-close" class="modal-close-btn" aria-label="Close message">&times;</button>
            <div class="modal-flower-img-wrapper">
                <img id="modal-flower-img" src="" alt="Flower Asset" class="modal-flower-img">
            </div>
            <div id="modal-flower-title" class="modal-flower-title">Sunflower</div>
            <p id="modal-flower-message" class="modal-flower-message">You are my sunshine, Sayang! 🌻</p>
        </div>
    </div>

    <!-- Hidden Audio Element -->
    <audio id="bg-music" src="{{ asset('assets/music.mp3') }}" preload="auto" loop></audio>

    <!-- Scripts with Cache-Buster -->
    <script src="{{ asset('js/particles.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/petals.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/bouquet.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/animations.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/script.js') }}?v={{ time() }}"></script>
</body>
</html>
