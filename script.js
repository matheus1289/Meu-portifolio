window.sr = ScrollReveal({ reset: true});

sr.reveal('.titulo', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay: 500
});
sr.reveal('.subtitulo', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:1000
});
sr.reveal('.carta', { 
    duration: 2000,
    origin:'left',
    distance:'50px',
    delay:1500
});
sr.reveal('.foto', { 
    duration: 2000
    
});

sr.reveal('.container-2', { 
    duration: 2000
});

sr.reveal('.sobre-mim h3', { 
    duration: 2000,
    origin:'left',
    distance:'20px',
    delay:500

});
sr.reveal('.info-sobre', { 
    duration: 2000,
    origin:'left',
    distance:'20px',
    delay:1000

});
sr.reveal('.container3', { 
    duration: 1000
});

// fim do scroll reviel

// scroll da header
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem',window.scrollY > 1)
})
window.addEventListener("scroll", function(){
    let cima = document.querySelector('.icon')
    cima.classList.toggle('view',window.scrollY > 100)
})
// fim scrol header

// menu reponsivo
function initNavHighlight() {
  const secs = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-links a');
  
  window.addEventListener('scroll', () => {
    let cur = '';
    
    secs.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });

    navLinks.forEach(a => {
      if (a.closest('.nav-mobile-links')) {
        a.style.color = a.getAttribute('href') === '#' + cur ? '#FFFFFF' : '';
        return;
      }

      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--blue)' : '';
    });
  });
}

function initNavbar() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav-mobile-links a, .nav-cta-mobile');

  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
  };

  const openMenu = () => {
    document.body.classList.add('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll);

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Inicializar as funções
initNavbar();
initNavHighlight();
