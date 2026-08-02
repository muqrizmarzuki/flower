/* ==========================================================================
   Animations & Interaction Helpers for DigiBouquet
   ========================================================================== */

class AnimationController {
    constructor() {
        this.audioCtx = null;
        this.isPlayingAudio = false;
        this.synthGain = null;
        this.initAudio();
    }

    initAudio() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            this.audioCtx = new AudioContext();
        }
    }

    playAmbientSynth() {
        if (!this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        if (this.isPlayingAudio) return;

        this.synthGain = this.audioCtx.createGain();
        this.synthGain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
        this.synthGain.connect(this.audioCtx.destination);

        const chordFreqs = [220.00, 261.63, 329.63, 392.00];

        chordFreqs.forEach((freq) => {
            const osc = this.audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
            osc.connect(this.synthGain);
            osc.start();
        });

        this.isPlayingAudio = true;
    }

    pauseAmbientSynth() {
        if (this.synthGain && this.audioCtx) {
            this.synthGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.3);
            setTimeout(() => {
                this.isPlayingAudio = false;
            }, 300);
        }
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }
}
