/* Klient Boost: accessible, dependency-free interface enhancements. */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navbar = document.querySelector('.navbar'); const toggle = document.querySelector('.mobile-toggle'); const menu = document.querySelector('.nav-links');
  const setMenu = (open) => { if (!menu || !toggle) return; menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu'); toggle.textContent = open ? '×' : '☰'; };
  if (navbar) { const updateNav = () => navbar.classList.toggle('scrolled', window.scrollY > 24); updateNav(); window.addEventListener('scroll', updateNav, { passive: true }); }
  if (toggle && menu) { toggle.type = 'button'; toggle.setAttribute('aria-controls', menu.id || 'navLinks'); setMenu(false); toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open'))); menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false))); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); }); }
  document.querySelectorAll('[onclick*="contactUs"], .nav-cta, .btn-primary, .package-cta').forEach((element) => element.addEventListener('click', (event) => { if (element.matches('a')) event.preventDefault(); window.location.href = 'mailto:hello@klientboost.com?subject=Growth%20strategy%20enquiry'; }));
  const slides = [...document.querySelectorAll('.hero-slide')]; const dots = [...document.querySelectorAll('.hero-slider-dots .dot')];
  if (slides.length) { let active = 0; let timer; const show = (index) => { active = (index + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('active', i === active)); dots.forEach((dot, i) => { dot.classList.toggle('active', i === active); dot.setAttribute('aria-current', i === active ? 'true' : 'false'); }); }; const restart = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => show(active + 1), 5500); }; dots.forEach((dot, index) => { dot.tabIndex = 0; dot.setAttribute('role', 'button'); dot.setAttribute('aria-label', `Show message ${index + 1}`); dot.addEventListener('click', () => { show(index); restart(); }); dot.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); dot.click(); } }); }); show(0); restart(); }
  const reveal = document.querySelectorAll('.reveal'); const observer = !reduceMotion && 'IntersectionObserver' in window ? new IntersectionObserver((entries, self) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); self.unobserve(entry.target); } }), { threshold: .12 }) : null; reveal.forEach((item) => observer ? observer.observe(item) : item.classList.add('visible'));
  const count = (element) => { const target = Number(element.dataset.count); const suffix = element.dataset.suffix || ''; const start = performance.now(); const render = (now) => { const p = Math.min((now - start) / 1400, 1); element.textContent = `${Math.round(target * (1 - (1 - p) ** 3))}${suffix}`; if (p < 1) requestAnimationFrame(render); }; requestAnimationFrame(render); }; const counterObserver = !reduceMotion && 'IntersectionObserver' in window ? new IntersectionObserver((entries, self) => entries.forEach((entry) => { if (entry.isIntersecting) { count(entry.target); self.unobserve(entry.target); } }), { threshold: .55 }) : null; document.querySelectorAll('[data-count]').forEach((item) => counterObserver ? counterObserver.observe(item) : count(item));
  const tabs = [...document.querySelectorAll('.filter-tab')]; const items = [...document.querySelectorAll('[data-category]')]; tabs.forEach((tab) => tab.addEventListener('click', () => { const filter = tab.dataset.filter; tabs.forEach((item) => { const selected = item === tab; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); }); items.forEach((item) => { item.hidden = !(filter === 'all' || item.dataset.category === filter); }); }));
  document.querySelectorAll('.case-toggle').forEach((button) => { button.setAttribute('role', 'button'); button.tabIndex = 0; const toggleCase = () => { const detail = button.closest('.case-card')?.querySelector('.case-detail'); if (!detail) return; const open = detail.classList.toggle('open'); button.textContent = open ? 'Close case study' : 'Read case study'; button.setAttribute('aria-expanded', String(open)); }; button.addEventListener('click', toggleCase); button.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleCase(); } }); });
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => { const target = document.querySelector(link.getAttribute('href')); if (target) { event.preventDefault(); target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); } }));
  /* Pricing nav scroll-spy */
  const pricingNav = document.querySelector('.pricing-nav');
  if (pricingNav) { const sections = document.querySelectorAll('.pricing-section[id]'); const navLinks = pricingNav.querySelectorAll('a'); const spy = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)); } }); }, { rootMargin: '-20% 0px -60% 0px' }); sections.forEach((s) => spy.observe(s)); }
  /* contactUs fallback */
  window.contactUs = window.contactUs || function() { window.location.href = 'mailto:hello@klientboost.com?subject=Growth%20strategy%20enquiry'; };
  /* Portfolio images are sourced from the project's Portfolio Images folder. */
  const portfolioImages = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51].map((number) => `Portfolio Images/${number}.png`).concat([
    'Portfolio Images/WhatsApp Image 2026-08-22 at 16.41.57.jpeg', 'Portfolio Images/WhatsApp Image 2026-08-22 at 16.41.57 (1).jpeg',
    'Portfolio Images/WhatsApp Image 2026-08-22 at 16.41.58.jpeg', 'Portfolio Images/WhatsApp Image 2026-08-22 at 17.20.29.jpeg'
  ]);
  const portfolioVideos = [
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/Comment “PDF” 🏡If you want to learn how to create content that converts, I  broke down my strat.mp4' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/DNG NOBLE SKY[04].mp4' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/Lehigh Acres is where the deals are RIGHT NOW 👀🔥Nearly 2,000 sq ft • 3 Beds • 3 Baths • Brand-.mp4' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/Lucknow has been late on deliveries in the Real Estate Market heres why!#lucknow #realesate #oc.mp4' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/MORE PHOTOS & INFORMATION BELOW 🔗https---715-sunridge-drive.kelsieblevinsrealestate.com-Newly O.mp4' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/reel 02.mov' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/SHREEJI ELLORA 01.mp4' },
    { category: 'influencer', path: 'Influencer-20260824T181626Z-1-001/Influencer/When you work with the best agents, “good enough” isn’t in the playbook. So we fly out the best .mp4' },
    { category: 'performance', path: 'Performance/🤯@sultansaray.eg #videography #filmmaker.mp4' },
    { category: 'performance', path: 'Performance/At JW Marriott Hotel Bengaluru, Family by JW brings loved ones closer through experiences crafte.mp4' },
    { category: 'performance', path: 'Performance/Came for the plot.Stayed for the flavours. .[zuki, pan asian restaurant, comic style reel, food .mp4' },
    { category: 'performance', path: 'Performance/Friendly reminder- Saturdays are for staying out.Especially when the DJ is playing, the cocktail.mp4' },
    { category: 'performance', path: 'Performance/From its speakeasy-inspired interiors to its elevated cocktails and refined Japanese cuisine, Un.mp4' },
    { category: 'performance', path: 'Performance/From sunrise to sundown, Aqua by The Park is your perfect all-day escape.Start your day slow wit.mp4' },
    { category: 'performance', path: 'Performance/Mu work for @sultansaray.eg ❤🎬#videography #filmmaker.mp4' },
    { category: 'performance', path: 'Performance/Sip, dine and unwind under a textured moonlit canopy. Our curated cuisine and signature drinks a.mp4' },
    { category: 'performance', path: 'Performance/Your brand’s vision, painted with light. 🖌️ #brandfilm #cinematicstorytelling #showmofilms.mp4' }
  ];
  const imageUrl = (path) => path.split('/').map(segment => encodeURIComponent(segment)).join('/');
  const grid = document.querySelector('#portfolioGrid');
  if (grid) {
    const categories = ['social', 'ugc', 'influencer', 'websites', 'performance'];
    const imageCards = portfolioImages.map((path, index) => `<article class="portfolio-item reveal visible" data-category="${categories[index % categories.length]}"><img src="${imageUrl(path)}" alt="Klient Boost portfolio project ${index + 1}" loading="lazy" decoding="async"><div class="portfolio-overlay"><h4>Klient Boost</h4><div class="portfolio-meta">Portfolio project ${index + 1}</div></div></article>`);
    const videoType = (p) => p.endsWith('.mov') ? 'video/quicktime' : 'video/mp4';
    const videoCards = portfolioVideos.map((video, index) => `<article class="portfolio-item portfolio-video reveal visible" data-category="${video.category}"><video autoplay muted loop playsinline preload="metadata" aria-label="Klient Boost ${video.category} video ${index + 1}"><source src="${imageUrl(video.path)}" type="${videoType(video.path)}"></video><button class="video-sound-toggle" type="button" aria-label="Play video with sound">Sound on</button><div class="portfolio-overlay"><h4>${video.category === 'influencer' ? 'Influencer' : 'Performance'} Video</h4><div class="portfolio-meta">Tap sound on to listen</div></div></article>`);
    grid.innerHTML = [...imageCards, ...videoCards].join('');
    grid.querySelectorAll('.video-sound-toggle').forEach((button) => button.addEventListener('click', () => {
      const video = button.closest('.portfolio-video').querySelector('video');
      video.muted = !video.muted;
      button.textContent = video.muted ? 'Sound on' : 'Sound off';
      button.setAttribute('aria-label', video.muted ? 'Play video with sound' : 'Mute video');
      video.play();
    }));
  }
  const clientGallery = document.querySelector('#clientGalleryTrack');
  if (clientGallery) {
    clientGallery.innerHTML = [...portfolioImages, ...portfolioImages].map((path, index) => `<figure class="client-gallery-item"><img src="${imageUrl(path)}" alt="Client portfolio work ${index % portfolioImages.length + 1}" loading="lazy" decoding="async"></figure>`).join('');
  }
  if (grid) tabs.forEach((tab) => tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    grid.querySelectorAll('.portfolio-item').forEach((item) => { item.hidden = !(filter === 'all' || item.dataset.category === filter); });
  }));
  if (grid && tabs.length) tabs[0].click();
});
