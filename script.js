// Smooth fade-in for features
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
