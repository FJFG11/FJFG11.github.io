// Smooth reveal animations (AOS-like) + scroll-spy + docs search
document.addEventListener('DOMContentLoaded', () => {
  // Reveal animations using IntersectionObserver
  const revealItems = document.querySelectorAll('.reveal-up, .reveal-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const el = en.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(()=> el.classList.add('revealed'), delay);
        io.unobserve(el);
      }
    });
  }, {threshold: 0.15});

  revealItems.forEach(item => io.observe(item));

  // docs scroll-spy
  const sidebar = document.getElementById('sidebarNav') || document.querySelector('.sidebar-nav');
  const links = sidebar ? Array.from(sidebar.querySelectorAll('a')) : [];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScrollSpy(){
    let current = null;
    const scrollPos = window.scrollY + 140; // offset
    for (const sec of sections){
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScrollSpy);
  onScrollSpy();

  // sidebar search for docs
  const search = document.getElementById('doc-search');
  if (search){
    search.addEventListener('input', (e) => {
      const q = String(e.target.value || '').trim().toLowerCase();
      const navLinks = document.querySelectorAll('.sidebar-nav a');
      navLinks.forEach(a => {
        const t = a.textContent.trim().toLowerCase();
        a.style.display = (!q || t.includes(q)) ? '' : 'none';
      });
    });
  }

  // active nav link click smooth offset (works even with anchor)
  const offset = 80;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      ev.preventDefault();
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });

  // small enhancement: add tabindex focus rings for keyboard users
  document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
  }, {once:true});
});
