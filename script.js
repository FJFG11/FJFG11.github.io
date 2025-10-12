// Smooth fade-in animation for features
const features = document.querySelectorAll('.feature');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

features.forEach(feature => {
  feature.style.opacity = 0;
  feature.style.transform = 'translateY(20px)';
  feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(feature);
});

// Highlight active doc section in sidebar
const sections = document.querySelectorAll('.docs-content article');
const navLinks = document.querySelectorAll('.sidebar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});
