// ========================================
// MAIN JAVASCRIPT
// ========================================

// ========================================
// 1. NAVBAR TOGGLE
// ========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// ========================================
// 2. SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// 3. SCROLL ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item').forEach(el => {
  el.classList.add('fade-in-on-scroll');
  observer.observe(el);
});

// ========================================
// 4. FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
      showFormStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus('Por favor, insira um email válido.', 'error');
      return;
    }

    // Show loading state
    showFormStatus('Enviando mensagem...', 'loading');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      showFormStatus('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
      contactForm.reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        formStatus.classList.remove('show');
      }, 5000);
    } catch (error) {
      showFormStatus('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
    }
  });
}

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status show ${type}`;
}

// ========================================
// 5. NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 217, 255, 0.2)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  lastScrollTop = scrollTop;
});

// ========================================
// 6. ACTIVE NAV LINK
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// 7. LAZY LOADING IMAGES
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// 8. COPY EMAIL TO CLIPBOARD
// ========================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Allow default behavior but add visual feedback
    const email = link.textContent;
    console.log('Email:', email);
  });
});

// ========================================
// 9. ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && navMenu) {
    navMenu.classList.remove('active');
  }

  // Tab key for keyboard navigation
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

// Remove keyboard-nav class on mouse click
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ========================================
// 10. PERFORMANCE MONITORING
// ========================================

if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', pageLoadTime + 'ms');
  });
}

// ========================================
// 11. SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
document.body.appendChild(scrollTopBtn);

scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00d9ff, #ff00ff);
  color: #0a0e27;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
`;

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollTopBtn.addEventListener('mouseenter', () => {
  scrollTopBtn.style.transform = 'scale(1.1)';
  scrollTopBtn.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
  scrollTopBtn.style.transform = 'scale(1)';
  scrollTopBtn.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
});

// ========================================
// 12. CONSOLE MESSAGE
// ========================================

console.log(
  '%c🚀 Bem-vindo ao portfólio de Wiliam Fagundes!',
  'color: #00d9ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);'
);
console.log(
  '%cDesenvolvido com ❤️ e muito código ✨',
  'color: #ff00ff; font-size: 14px; font-style: italic;'
);
console.log(
  '%cGitHub: https://github.com',
  'color: #00ff88; font-size: 12px;'
);
