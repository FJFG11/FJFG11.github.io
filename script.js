// Smooth entrance for cards using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card, .product-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  cards.forEach(c => {
    c.style.opacity = 0;
    c.style.transform = 'translateY(18px)';
    c.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(c);
  });
});

// Modal: show more details for products
const modal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');

function openModal(id){
  if(!modal) return;
  let html = '';
  if(id === 'ac'){
    html = `
      <h2>BloxOLite Anti-Cheat — Details</h2>
      <p><strong>Detects:</strong> Speed Hacks, Jump Hacks, Fly Hacks, Teleport Hacks, Noclip</p>
      <p>The Anti-Cheat is highly configurable for different game styles. Frequent updates ensure new exploit types are addressed quickly.</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Configurable sensitivity</li>
        <li>Auto-action options (kick, tempban)</li>
        <li>Detailed logs for staff review</li>
      </ul>
    `;
  } else if(id === 'modcall'){
    html = `
      <h2>ModCall — Details</h2>
      <p>BloxOLite Moderator Call lets players request staff for rule violations directly from the game.</p>
      <p><strong>Includes:</strong></p>
      <ul>
        <li>Webhook logging for external systems</li>
        <li>Clean, non-intrusive UI for players</li>
        <li>Easy to configure who receives calls</li>
      </ul>
      <p>Settings are customizable to fit your moderation workflow.</p>
    `;
  } else {
    html = `<p>More info coming soon.</p>`;
  }

  modalContent.innerHTML = html;
  modal.setAttribute('aria-hidden', 'false');
}

// Close modal
function closeModal(){
  const m = document.getElementById('product-modal');
  if(!m) return;
  m.setAttribute('aria-hidden', 'true');
}

// close modal on backdrop click
document.addEventListener('click', (e) => {
  const m = document.getElementById('product-modal');
  if(!m) return;
  if (e.target === m) closeModal();
});

// escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
