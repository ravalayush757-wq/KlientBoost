/* Klient Boost: accessible, dependency-free interface enhancements. */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navbar = document.querySelector('.navbar'); const toggle = document.querySelector('.mobile-toggle'); const menu = document.querySelector('.nav-links');
  const setMenu = (open) => { if (!menu || !toggle) return; menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu'); toggle.textContent = open ? '×' : '☰'; };
  if (navbar) { const updateNav = () => navbar.classList.toggle('scrolled', window.scrollY > 24); updateNav(); window.addEventListener('scroll', updateNav, { passive: true }); }
  if (toggle && menu) { toggle.type = 'button'; toggle.setAttribute('aria-controls', menu.id || 'navLinks'); setMenu(false); toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open'))); menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false))); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); }); }
  /* WhatsApp Contact Handler */
  const WHATSAPP_NUMBER = '919387905882';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Klient Boost, I would like to discuss growing my business.')}`;
  let lastContactTrigger = 0;
  window.contactUs = function() {
    const now = Date.now();
    if (now - lastContactTrigger < 500) return;
    lastContactTrigger = now;
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  document.querySelectorAll('[onclick*="contactUs"], .nav-cta, button.btn-primary, .package-cta, .pricing-cta').forEach((element) => {
    element.addEventListener('click', (event) => {
      const href = element.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
        return;
      }
      event.preventDefault();
      window.contactUs();
    });
  });

  /* Floating WhatsApp Button Injection */
  if (!document.querySelector('.floating-whatsapp')) {
    const floatBtn = document.createElement('a');
    floatBtn.href = WHATSAPP_URL;
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener noreferrer';
    floatBtn.className = 'floating-whatsapp';
    floatBtn.setAttribute('aria-label', 'Chat on WhatsApp with Klient Boost');
    floatBtn.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.37C9.37 7.37 9.1 7.43 8.87 7.68C8.64 7.93 8 8.53 8 9.75C8 10.97 8.89 12.15 9.01 12.31C9.14 12.47 10.74 14.95 13.2 16C15.25 16.88 15.67 16.71 16.11 16.67C16.55 16.63 17.54 16.08 17.74 15.51C17.95 14.95 17.95 14.46 17.88 14.36C17.82 14.26 17.66 14.2 17.41 14.07C17.16 13.95 15.94 13.35 15.71 13.27C15.48 13.18 15.32 13.14 15.15 13.39C14.99 13.64 14.52 14.2 14.37 14.36C14.23 14.53 14.08 14.55 13.84 14.43C13.59 14.3 12.56 13.97 11.33 12.88C10.38 12.03 9.73 10.98 9.61 10.77C9.48 10.57 9.6 10.45 9.72 10.33C9.83 10.22 9.97 10.04 10.1 9.89C10.22 9.74 10.26 9.64 10.34 9.47C10.42 9.31 10.38 9.17 10.32 9.04C10.26 8.92 9.79 7.77 9.59 7.37Z"/></svg>`;
    document.body.appendChild(floatBtn);
  }
  const slides = [...document.querySelectorAll('.hero-slide')]; const dots = [...document.querySelectorAll('.hero-slider-dots .dot')];
  if (slides.length) { let active = 0; let timer; const show = (index) => { active = (index + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('active', i === active)); dots.forEach((dot, i) => { dot.classList.toggle('active', i === active); dot.setAttribute('aria-current', i === active ? 'true' : 'false'); }); }; const restart = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => show(active + 1), 5500); }; dots.forEach((dot, index) => { dot.tabIndex = 0; dot.setAttribute('role', 'button'); dot.setAttribute('aria-label', `Show message ${index + 1}`); dot.addEventListener('click', () => { show(index); restart(); }); dot.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); dot.click(); } }); }); show(0); restart(); }
  const reveal = document.querySelectorAll('.reveal'); const observer = !reduceMotion && 'IntersectionObserver' in window ? new IntersectionObserver((entries, self) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); self.unobserve(entry.target); } }), { threshold: .12 }) : null; reveal.forEach((item) => observer ? observer.observe(item) : item.classList.add('visible'));

  /* Enhanced scroll animations — parallax hero backgrounds + floating particles on all sections */
  if (!reduceMotion) {
    /* Parallax: hero background elements shift on scroll */
    const heroBg = document.querySelector('.hero-bg, .page-hero .hero-bg');
    const heroParticles = document.querySelector('.hero-particles');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
        if (heroParticles) heroParticles.style.transform = `translateY(${scrollY * 0.2}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Stagger reveal: cards in grids animate one-by-one */
    document.querySelectorAll('.services-grid, .packages-grid, .pricing-grid, .case-studies-grid, .portfolio-masonry').forEach((grid) => {
      const cards = grid.querySelectorAll('.reveal');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
      });
    });

    /* Floating ambient particles on every major section */
    document.querySelectorAll('.services, .packages, .testimonials, .final-cta, .pricing-section').forEach((section) => {
      if (section.querySelector('.section-particles')) return;
      const particlesDiv = document.createElement('div');
      particlesDiv.className = 'section-particles';
      particlesDiv.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 3; i++) {
        const p = document.createElement('div');
        p.className = 'section-particle';
        p.style.left = `${15 + Math.random() * 70}%`;
        p.style.animationDelay = `${Math.random() * 4}s`;
        p.style.animationDuration = `${6 + Math.random() * 6}s`;
        particlesDiv.appendChild(p);
      }
      section.style.position = section.style.position || 'relative';
      section.style.overflow = 'hidden';
      section.appendChild(particlesDiv);
    });
  }
  const count = (element) => { const target = Number(element.dataset.count); const suffix = element.dataset.suffix || ''; const start = performance.now(); const render = (now) => { const p = Math.min((now - start) / 1400, 1); element.textContent = `${Math.round(target * (1 - (1 - p) ** 3))}${suffix}`; if (p < 1) requestAnimationFrame(render); }; requestAnimationFrame(render); }; const counterObserver = !reduceMotion && 'IntersectionObserver' in window ? new IntersectionObserver((entries, self) => entries.forEach((entry) => { if (entry.isIntersecting) { count(entry.target); self.unobserve(entry.target); } }), { threshold: .55 }) : null; document.querySelectorAll('[data-count]').forEach((item) => counterObserver ? counterObserver.observe(item) : count(item));
  
  document.querySelectorAll('.case-toggle').forEach((button) => { button.setAttribute('role', 'button'); button.tabIndex = 0; const toggleCase = () => { const detail = button.closest('.case-card')?.querySelector('.case-detail'); if (!detail) return; const open = detail.classList.toggle('open'); button.textContent = open ? 'Close case study' : 'Read case study'; button.setAttribute('aria-expanded', String(open)); }; button.addEventListener('click', toggleCase); button.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleCase(); } }); });
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => { const target = document.querySelector(link.getAttribute('href')); if (target) { event.preventDefault(); target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); } }));
  /* Pricing nav scroll-spy */
  const pricingNav = document.querySelector('.pricing-nav');
  if (pricingNav) { const sections = document.querySelectorAll('.pricing-section[id]'); const navLinks = pricingNav.querySelectorAll('a'); const spy = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)); } }); }, { rootMargin: '-20% 0px -60% 0px' }); sections.forEach((s) => spy.observe(s)); }
  /* contactUs fallback */
  window.contactUs = window.contactUs || function() { window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer'); };

  /* ============== PORTFOLIO V2 ============== */
  /* Tab filtering for category containers */
  const filterTabs = document.getElementById('filterTabs');
  if (filterTabs) {
    const allTabs = [...filterTabs.querySelectorAll('.filter-tab')];
    const allCategories = [...document.querySelectorAll('.portfolio-category')];

    const showCategory = (filter) => {
      /* Pause all videos when switching tabs */
      document.querySelectorAll('.portfolio-video-card video').forEach((v) => {
        v.pause();
        const wrapper = v.closest('.video-wrapper');
        const playBtn = wrapper?.querySelector('.video-play-btn');
        if (wrapper) wrapper.classList.remove('is-playing');
        if (playBtn) playBtn.classList.remove('hidden');
      });

      allTabs.forEach((tab) => {
        const selected = tab.dataset.filter === filter;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-pressed', String(selected));
      });
      allCategories.forEach((cat) => {
        cat.style.display = cat.dataset.category === filter ? '' : 'none';
      });
    };

    allTabs.forEach((tab) => tab.addEventListener('click', () => showCategory(tab.dataset.filter)));
    /* Trigger initial tab */
    const activeTab = filterTabs.querySelector('.filter-tab.active');
    if (activeTab) showCategory(activeTab.dataset.filter);
  }

  /* Video play/pause on click */
  document.querySelectorAll('.portfolio-video-card').forEach((card) => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.video-play-btn');
    const soundBtn = card.querySelector('.video-sound-btn');
    const wrapper = card.querySelector('.video-wrapper');
    if (!video || !playBtn || !wrapper) return;

    playBtn.addEventListener('click', () => {
      /* Pause other playing videos */
      document.querySelectorAll('.portfolio-video-card video').forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
          const otherWrapper = otherVideo.closest('.video-wrapper');
          const otherPlay = otherWrapper?.querySelector('.video-play-btn');
          if (otherWrapper) otherWrapper.classList.remove('is-playing');
          if (otherPlay) otherPlay.classList.remove('hidden');
        }
      });

      video.play().then(() => {
        playBtn.classList.add('hidden');
        wrapper.classList.add('is-playing');
      }).catch(() => {});
    });

    /* Click video itself to pause */
    video.addEventListener('click', () => {
      if (!video.paused) {
        video.pause();
        playBtn.classList.remove('hidden');
        wrapper.classList.remove('is-playing');
      }
    });

    /* Sound toggle */
    if (soundBtn) {
      const iconMuted = soundBtn.querySelector('.icon-muted');
      const iconUnmuted = soundBtn.querySelector('.icon-unmuted');
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (iconMuted) iconMuted.style.display = video.muted ? '' : 'none';
        if (iconUnmuted) iconUnmuted.style.display = video.muted ? 'none' : '';
        soundBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
      });
    }
  });


  /* Client logo dual-slider */
  const portfolioImages = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51].map((number) => `Portfolio Images/${number}.png`).concat([
    'Portfolio Images/WhatsApp Image 2026-08-22 at 16.41.57.jpeg', 'Portfolio Images/WhatsApp Image 2026-08-22 at 16.41.57 (1).jpeg',
    'Portfolio Images/WhatsApp Image 2026-08-22 at 16.41.58.jpeg', 'Portfolio Images/WhatsApp Image 2026-08-22 at 17.20.29.jpeg'
  ]);
  const imageUrl = (path) => path.split('/').map(segment => encodeURIComponent(segment)).join('/');
  const mid = Math.ceil(portfolioImages.length / 2);
  const row1Images = portfolioImages.slice(0, mid);
  const row2Images = portfolioImages.slice(mid);
  const buildLogoTrack = (images) => [...images, ...images].map((path, index) => `<figure class="client-logo-item"><img src="${imageUrl(path)}" alt="Client work ${(index % images.length) + 1}" loading="lazy" decoding="async"></figure>`).join('');
  const trackLeft = document.getElementById('clientLogoTrackLeft');
  const trackRight = document.getElementById('clientLogoTrackRight');
  if (trackLeft) trackLeft.innerHTML = buildLogoTrack(row1Images);
  if (trackRight) trackRight.innerHTML = buildLogoTrack(row2Images);
});
