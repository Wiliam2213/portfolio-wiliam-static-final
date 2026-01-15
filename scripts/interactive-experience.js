// ========================================
// INTERACTIVE EXPERIENCE SYSTEM
// Creative user interactions
// ========================================

class InteractiveExperience {
  constructor() {
    this.setupKonamiCode();
    this.setupEasterEggs();
    this.setupClickEffects();
    this.setupKeyboardShortcuts();
    this.setupScrollTriggers();
    this.setupHoverEffects();
    this.setupGameMode();
  }

  // ========================================
  // 1. KONAMI CODE EASTER EGG
  // ========================================
  setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.activateMatrixMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  // ========================================
  // 2. EASTER EGGS
  // ========================================
  setupEasterEggs() {
    // Secret: Click on the name multiple times
    let nameClicks = 0;
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
      heroTitle.addEventListener('click', () => {
        nameClicks++;
        if (nameClicks === 5) {
          this.activateHologramMode();
          nameClicks = 0;
        }
      });
    }

    // Secret: Type "JEDI" to unlock Jedi mode
    let typeBuffer = '';
    document.addEventListener('keydown', (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        typeBuffer += e.key.toUpperCase();
        if (typeBuffer.includes('JEDI')) {
          this.activateJediMode();
          typeBuffer = '';
        }
        if (typeBuffer.length > 10) {
          typeBuffer = typeBuffer.slice(-10);
        }
      }
    });

    // Secret: Type "HACKER" to unlock hacker mode
    document.addEventListener('keydown', (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        typeBuffer += e.key.toUpperCase();
        if (typeBuffer.includes('HACKER')) {
          this.activateHackerMode();
          typeBuffer = '';
        }
      }
    });
  }

  // ========================================
  // 3. CLICK EFFECTS - PARTICLE EXPLOSIONS
  // ========================================
  setupClickEffects() {
    document.addEventListener('click', (e) => {
      // Skip if clicking on interactive elements
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
        return;
      }

      this.createClickExplosion(e.clientX, e.clientY);
    });
  }

  createClickExplosion(x, y) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 20;
    const colors = ['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let hasAlive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vy += 0.1; // gravity

        if (p.life > 0) {
          hasAlive = true;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (hasAlive) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();
  }

  // ========================================
  // 4. KEYBOARD SHORTCUTS
  // ========================================
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // ? = Show help
      if (e.key === '?') {
        this.showHelpMenu();
      }

      // G = Go to top
      if (e.key === 'g' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // S = Search/scroll to skills
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        const skillsSection = document.getElementById('habilidades');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // ========================================
  // 5. SCROLL TRIGGERS
  // ========================================
  setupScrollTriggers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'sectionReveal 0.6s ease-out';
          this.createSectionPulse(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sectionReveal {
        0% {
          opacity: 0;
          filter: blur(10px);
        }
        100% {
          opacity: 1;
          filter: blur(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  createSectionPulse(section) {
    const rect = section.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 50px;
      height: 50px;
      border: 2px solid rgba(0, 255, 255, 0.8);
      border-radius: 50%;
      pointer-events: none;
      animation: pulsOut 0.8s ease-out forwards;
      z-index: 9998;
    `;

    document.body.appendChild(pulse);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulsOut {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => pulse.remove(), 800);
  }

  // ========================================
  // 6. HOVER EFFECTS
  // ========================================
  setupHoverEffects() {
    document.querySelectorAll('a, button, .skill-badge, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.05) translateZ(0)';
        el.style.filter = 'brightness(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.filter = 'brightness(1)';
      });
    });
  }

  // ========================================
  // 7. GAME MODE - HIDDEN FEATURE
  // ========================================
  setupGameMode() {
    // Activate with Ctrl+Shift+G
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        this.activateGameMode();
      }
    });
  }

  // ========================================
  // SPECIAL MODES
  // ========================================

  activateMatrixMode() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00FF00;
      font-family: 'Space Mono', monospace;
      font-size: 24px;
      text-align: center;
    `;

    overlay.innerHTML = `
      <div>
        <p style="margin: 0; font-size: 32px; margin-bottom: 20px;">⚠️ MATRIX MODE ACTIVATED ⚠️</p>
        <p style="margin: 0; font-size: 16px; animation: blink 1s infinite;">
          There is no spoon... but there is code! 🥄
        </p>
      </div>
    `;

    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => overlay.remove(), 3000);
  }

  activateHologramMode() {
    document.body.style.filter = 'hue-rotate(180deg) brightness(1.2)';
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 255, 255, 0.2);
      border: 2px solid rgba(0, 255, 255, 0.8);
      color: #00FFFF;
      padding: 30px;
      font-family: 'Space Mono', monospace;
      z-index: 10001;
      text-align: center;
      animation: hologramPulse 0.5s ease-out;
    `;
    notification.innerHTML = '<p style="margin: 0; font-size: 20px;">🎆 HOLOGRAM MODE ENABLED 🎆</p>';
    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes hologramPulse {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.style.filter = 'none';
      notification.remove();
    }, 3000);
  }

  activateJediMode() {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 0, 0, 0.2);
      border: 2px solid rgba(255, 0, 0, 0.8);
      color: #FF0000;
      padding: 30px;
      font-family: 'Space Mono', monospace;
      z-index: 10001;
      text-align: center;
      font-size: 24px;
      animation: jediFlash 0.5s ease-out;
    `;
    notification.innerHTML = '<p style="margin: 0;">⚡ MAY THE FORCE BE WITH YOU ⚡</p>';
    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes jediFlash {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => notification.remove(), 2000);
  }

  activateHackerMode() {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 255, 0, 0.2);
      border: 2px solid rgba(0, 255, 0, 0.8);
      color: #00FF00;
      padding: 30px;
      font-family: 'Space Mono', monospace;
      z-index: 10001;
      text-align: center;
      font-size: 20px;
      animation: hackerGlitch 0.5s ease-out;
    `;
    notification.innerHTML = '<p style="margin: 0;">🔓 HACKER MODE UNLOCKED 🔓</p>';
    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes hackerGlitch {
        0% {
          transform: translate(-50%, -50%) skewX(-10deg);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) skewX(10deg);
        }
        100% {
          transform: translate(-50%, -50%) skewX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => notification.remove(), 2000);
  }

  activateGameMode() {
    const gameOverlay = document.createElement('div');
    gameOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10002;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00FF00;
      font-family: 'Space Mono', monospace;
      text-align: center;
    `;

    gameOverlay.innerHTML = `
      <div style="font-size: 32px; line-height: 1.8;">
        <p style="margin: 0; font-size: 48px; margin-bottom: 20px;">🎮 GAME MODE 🎮</p>
        <p style="margin: 0;">Use arrow keys to navigate</p>
        <p style="margin: 0;">Press SPACE to interact</p>
        <p style="margin: 0; margin-top: 20px; font-size: 14px;">Press ESC to exit</p>
      </div>
    `;

    document.body.appendChild(gameOverlay);

    const exitGame = (e) => {
      if (e.key === 'Escape') {
        gameOverlay.remove();
        document.removeEventListener('keydown', exitGame);
      }
    };

    document.addEventListener('keydown', exitGame);
  }

  showHelpMenu() {
    const helpMenu = document.createElement('div');
    helpMenu.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 20, 40, 0.95);
      border: 2px solid rgba(0, 255, 255, 0.8);
      color: #00FFFF;
      padding: 30px;
      font-family: 'Space Mono', monospace;
      z-index: 10001;
      max-width: 500px;
      max-height: 500px;
      overflow-y: auto;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    `;

    helpMenu.innerHTML = `
      <h2 style="margin-top: 0; text-align: center;">⌨️ KEYBOARD SHORTCUTS ⌨️</h2>
      <p><strong>Ctrl+G:</strong> Go to top</p>
      <p><strong>Ctrl+S:</strong> Go to skills</p>
      <p><strong>Ctrl+Shift+G:</strong> Game mode</p>
      <p><strong>?:</strong> Show this help</p>
      <hr style="border: 1px solid rgba(0, 255, 255, 0.3);">
      <h3>🎮 EASTER EGGS:</h3>
      <p><strong>↑ ↑ ↓ ↓ ← → ← → B A:</strong> Matrix mode</p>
      <p><strong>Click name 5x:</strong> Hologram mode</p>
      <p><strong>Type JEDI:</strong> Jedi mode</p>
      <p><strong>Type HACKER:</strong> Hacker mode</p>
      <p style="text-align: center; margin-top: 20px; font-size: 12px;">Click anywhere to close</p>
    `;

    document.body.appendChild(helpMenu);

    const closeHelp = () => {
      helpMenu.remove();
      document.removeEventListener('click', closeHelp);
    };

    setTimeout(() => {
      document.addEventListener('click', closeHelp);
    }, 100);
  }
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new InteractiveExperience();
  });
} else {
  new InteractiveExperience();
}
