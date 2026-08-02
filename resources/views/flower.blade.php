<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>For Sayang ❤️ — DigiBouquet</title>
    <meta name="description" content="A digital flower bouquet gift made with love for Sayang, featuring clickable interactive flowers with hidden romantic love messages.">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;600;700&family=Caveat:wght@500;600;700&family=Outfit:wght@400;500;600;700&family=Dancing+Script:wght@500;600;700&display=swap" rel="stylesheet">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <!-- Canvas FX Layer for Gentle Ambient Petals -->
    <canvas id="fx-canvas" class="fullscreen-canvas" aria-hidden="true"></canvas>

    <!-- Main Container -->
    <div class="page-container">
        <!-- Main Gift Stage: Single Combined Hybrid Bouquet -->
        <main class="gift-stage">
            <div class="bouquet-wrapper">
                
                <!-- Live Hybrid Canvas Bouquet Stage -->
                <div class="canvas-container">
                    <canvas id="bouquet-canvas" width="500" height="420"></canvas>
                </div>

                <!-- Cards Container (Polaroid Photo + Handwritten Message Card) -->
                <div class="cards-flex-container">
                    
                    <!-- 1. Floating Polaroid Photo Frame -->
                    <div class="polaroid-card" id="polaroid-card">
                        <div class="tape-strip"></div>
                        <div class="polaroid-frame">
                            <div class="polaroid-photo-wrapper">
                                <img src="{{ asset('assets/photo.jpg') }}" alt="Sayang & Us" id="polaroid-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'350\' viewBox=\'0 0 300 350\'><rect width=\'100%\' height=\'100%\' fill=\'%232c0b16\'/><path d=\'M150 140 Q180 100 210 140 T150 220 Q120 180 90 140 T150 140\' fill=\'%23e899ac\'/><text x=\'50%\' y=\'270\' fill=\'%23fdfbf7\' font-family=\'serif\' font-size=\'18\' text-anchor=\'middle\'>7/1/2026 ❤️</text></svg>'">
                                <div class="photo-glare"></div>
                            </div>
                            <div class="polaroid-caption">
                                <span id="caption-text" class="polaroid-caption-handwritten">7/1/2026</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Pinned Handwritten Love Message Card -->
                    <div class="note-card" id="note-card">
                        <div class="tape-strip right-tape"></div>
                        <div class="card-inner">
                            <div class="card-line">
                                <span class="card-label">Dearest</span>
                                <input type="text" id="input-to" class="card-input" value="Sayang" placeholder="Sayang">
                            </div>
                            <div class="card-message-box">
                                <textarea id="input-message" class="card-textarea" rows="3" placeholder="Write your love message...">Happy Valentine’s Day, my love! ❤️

Every single flower in this bouquet blooms just for you.</textarea>
                            </div>
                            <div class="card-line right">
                                <span class="card-label">Forever Yours,</span>
                                <input type="text" id="input-from" class="card-input" value="Alex" placeholder="Alex">
                            </div>
                            <div class="card-subtagline">Forever my girl ❤️</div>
                        </div>
                    </div>

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

    <!-- Scripts -->
    <script src="{{ asset('js/particles.js') }}"></script>
    <script src="{{ asset('js/petals.js') }}"></script>
    <script src="{{ asset('js/bouquet.js') }}"></script>
    <script src="{{ asset('js/animations.js') }}"></script>
    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>
