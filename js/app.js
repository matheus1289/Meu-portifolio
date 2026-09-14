/* ==========================================================================
   MEUS LINKS — INTERACTIVE APP JAVASCRIPT
   Developer: Matheus Santos
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initParticlesCanvas();
    init3DTilt();
    initShareFeature();
    initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. HTML5 CANVAS TECH PARTICLES BACKGROUND
   -------------------------------------------------------------------------- */
function initParticlesCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(width * 0.05), 65);

    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.4 + 0.2;
            this.color = Math.random() > 0.4 ? '#00f0ff' : '#6366f1';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Mouse proximity effect
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 1.5;
                    this.y -= (dy / dist) * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.baseAlpha;
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    let alpha = (1 - dist / 130) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = '#00f0ff';
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

/* --------------------------------------------------------------------------
   2. INTERACTIVE 3D CARD TILT EFFECT
   -------------------------------------------------------------------------- */
function init3DTilt() {
    const card = document.getElementById('tilt-card');
    if (!card || window.innerWidth < 768) return; // Only on desktop/tablet

    const maxTilt = 8; // degrees

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
}

/* --------------------------------------------------------------------------
   3. SHARE FEATURE & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initShareFeature() {
    const shareBtn = document.getElementById('share-btn');
    const toast = document.getElementById('toast');
    let toastTimeout;

    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Matheus Santos — Desenvolvedor Web',
            text: 'Confira o perfil e links oficiais de Matheus Santos, Desenvolvedor Web.',
            url: window.location.href
        };

        // Try Native Share API first
        if (navigator.share && window.innerWidth < 768) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                // User cancelled or share failed, fallback to copy
            }
        }

        // Copy Link Fallback
        copyToClipboard(window.location.href);
        showToast('Link da página copiado!');
    });

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    function showToast(message) {
        if (!toast) return;

        const messageEl = toast.querySelector('.toast-message');
        if (messageEl) messageEl.textContent = message;

        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* --------------------------------------------------------------------------
   4. DYNAMIC YEAR IN FOOTER
   -------------------------------------------------------------------------- */
function initDynamicYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}