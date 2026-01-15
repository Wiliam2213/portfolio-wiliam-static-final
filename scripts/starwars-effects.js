// ========================================
// STAR WARS + VIDEOGAME EFFECTS
// Epic space exploration experience
// ========================================

class StarWarsEffects {
  constructor() {
    this.setupStarfieldParallax();
    this.setupHolographicElements();
    this.setupScanlineEffect();
    this.setupMouseReactivity();
    this.setupSectionZones();
    this.setupDiscoveryEffects();
    this.setupAudioFeedback();
  }

  // ========================================
  // 1. STARFIELD WITH PARALLAX DEPTH
  // ========================================
  setupStarfieldParallax() {
    const canvas = document.createElement('canvas');
    canvas.id = 'starfieldCanvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars with depth
    const stars = [];
    const starCount = 400;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2,
        opacity: Math.random() * 0.7 + 0.3,
        color: ['#FFFFFF', '#00FFFF', '#FF00FF', '#FFFF00'][Math.floor(Math.random() * 4)],
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    let scrollDepth = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Track scroll for depth effect
    window.addEventListener('scroll', () => {
      scrollDepth = window.scrollY * 0.5;
    });

    // Track mouse for parallax
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate starfield
    const animateStarfield = () => {
      ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star, index) => {
        // Parallax effect based on depth
        const parallaxX = (mouseX - canvas.width / 2) * (star.z / 1000) * 0.02;
        const parallaxY = (mouseY - canvas.height / 2) * (star.z / 1000) * 0.02;

        const x = star.x + parallaxX;
        const y = star.y + parallaxY + scrollDepth * (star.z / 1000);

        // Wrap around screen
        if (y > canvas.height) {
          star.y = -10;
        }

        // Twinkling effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const finalOpacity = star.opacity * (0.5 + twinkle * 0.5);

        // Draw star
        ctx.fillStyle = star.color;
        ctx.globalAlpha = finalOpacity;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 5 + twinkle * 3;

        ctx.beginPath();
        ctx.arc(x, y, star.size + twinkle * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(animateStarfield);
    };

    animateStarfield();

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ========================================
  // 2. HOLOGRAPHIC ELEMENTS
  // ========================================
  setupHolographicElements() {
    const style = document.createElement('style');
    style.textContent = `
      .holographic {
        position: relative;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
        border: 1px solid rgba(0, 255, 255, 0.3);
        box-shadow: 
          0 0 10px rgba(0, 255, 255, 0.2),
          inset 0 0 10px rgba(0, 255, 255, 0.1);
        animation: holographicFlicker 3s infinite;
      }

      @keyframes holographicFlicker {
        0%, 100% {
          box-shadow: 
            0 0 10px rgba(0, 255, 255, 0.2),
            inset 0 0 10px rgba(0, 255, 255, 0.1);
        }
        50% {
          box-shadow: 
            0 0 15px rgba(0, 255, 255, 0.3),
            inset 0 0 15px rgba(0, 255, 255, 0.15);
        }
      }

      .section-title {
        position: relative;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 900;
        animation: titleGlow 2s ease-in-out infinite;
      }

      @keyframes titleGlow {
        0%, 100% {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        50% {
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.5);
        }
      }
    `;
    document.head.appendChild(style);

    // Apply holographic class to sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('holographic');
    });
  }

  // ========================================
  // 3. SCANLINE EFFECT (RETRO VIDEOGAME)
  // ========================================
  setupScanlineEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'scanlineCanvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9998;
      pointer-events: none;
      opacity: 0.03;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw horizontal scanlines
    const drawScanlines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 1;

      for (let i = 0; i < canvas.height; i += 2) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    };

    drawScanlines();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawScanlines();
    });
  }

  // ========================================
  // 4. MOUSE REACTIVITY - SPACE RESPONDS
  // ========================================
  setupMouseReactivity() {
    const reactiveElements = document.querySelectorAll('section');
    
    document.addEventListener('mousemove', (e) => {
      reactiveElements.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isNear = (
          e.clientX > rect.left - 100 &&
          e.clientX < rect.right + 100 &&
          e.clientY > rect.top - 100 &&
          e.clientY < rect.bottom + 100
        );

        if (isNear) {
          section.style.boxShadow = `
            0 0 20px rgba(0, 255, 255, 0.4),
            inset 0 0 20px rgba(0, 255, 255, 0.2)
          `;
        } else {
          section.style.boxShadow = `
            0 0 10px rgba(0, 255, 255, 0.2),
            inset 0 0 10px rgba(0, 255, 255, 0.1)
          `;
        }
      });
    });
  }

  // ========================================
  // 5. SECTION ZONES - DIFFERENT COSMIC AREAS
  // ========================================
  setupSectionZones() {
    const zones = [
      { id: 'sobre', color: 'rgba(100, 200, 255, 0.05)', name: 'Blue Nebula' },
      { id: 'habilidades', color: 'rgba(200, 100, 255, 0.05)', name: 'Purple Sector' },
      { id: 'experiencia', color: 'rgba(255, 100, 200, 0.05)', name: 'Red Galaxy' },
      { id: 'projetos', color: 'rgba(100, 255, 200, 0.05)', name: 'Cyan Cluster' }
    ];

    zones.forEach(zone => {
      const section = document.getElementById(zone.id);
      if (section) {
        section.style.background = zone.color;
        section.dataset.zone = zone.name;
      }
    });
  }

  // ========================================
  // 6. DISCOVERY EFFECTS - REVEAL ON SCROLL
  // ========================================
  setupDiscoveryEffects() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('discovered');
          entry.target.style.animation = 'discoveryReveal 0.8s ease-out';
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-badge, .project-card, .experience-item').forEach(el => {
      observer.observe(el);
    });

    // Add discovery animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes discoveryReveal {
        0% {
          opacity: 0;
          transform: scale(0.8) translateY(20px);
          filter: blur(5px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0);
        }
      }

      .discovered {
        animation: discoveryReveal 0.8s ease-out !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // 7. AUDIO FEEDBACK (OPTIONAL, MUTED BY DEFAULT)
  // ========================================
  setupAudioFeedback() {
    // Create audio context for future use
    let audioContext = null;
    let isMuted = true;

    // Add mute toggle button
    const muteBtn = document.createElement('button');
    muteBtn.id = 'audioToggle';
    muteBtn.innerHTML = '🔇 Audio OFF';
    muteBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      padding: 10px 15px;
      background: rgba(0, 255, 255, 0.2);
      border: 1px solid rgba(0, 255, 255, 0.5);
      color: #00FFFF;
      cursor: pointer;
      font-family: 'Space Mono', monospace;
      border-radius: 3px;
      transition: all 0.3s;
    `;

    muteBtn.addEventListener('mouseover', () => {
      muteBtn.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.6)';
    });

    muteBtn.addEventListener('mouseout', () => {
      muteBtn.style.boxShadow = 'none';
    });

    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      muteBtn.innerHTML = isMuted ? '🔇 Audio OFF' : '🔊 Audio ON';
      
      if (!isMuted && !audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.playStartupSound(audioContext);
      }
    });

    document.body.appendChild(muteBtn);

    // Store for later use
    this.audioContext = audioContext;
    this.isMuted = isMuted;
  }

  // Play startup sound
  playStartupSound(audioContext) {
    if (!audioContext) return;

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Play interaction sound
  playInteractionSound(audioContext, frequency = 600) {
    if (!audioContext || this.isMuted) return;

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  }
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new StarWarsEffects();
  });
} else {
  new StarWarsEffects();
}
