// Smooth animations for features
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

// Dashboard login + announcement
const dashboardSection = document.getElementById('dashboard-section');
const loginSection = document.getElementById('login-section');
const loginBtn = document.getElementById('login-btn');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const announcementText = document.getElementById('announcement-text');
const saveAnnouncementBtn = document.getElementById('save-announcement');
const statusMsg = document.getElementById('status-msg');
const ADMIN_PASSWORD = "Ciderg105272_11";

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    if (passwordInput.value === ADMIN_PASSWORD) {
      localStorage.setItem('bloxolite-loggedin', 'true');
      showDashboard();
    } else {
      loginError.style.display = 'block';
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('bloxolite-loggedin');
    location.reload();
  });
}

function showDashboard() {
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'block';
  announcementText.value = localStorage.getItem('bloxolite-announcement') || '';
}

if (localStorage.getItem('bloxolite-loggedin') === 'true') {
  showDashboard();
}

if (saveAnnouncementBtn) {
  saveAnnouncementBtn.addEventListener('click', () => {
    const text = announcementText.value.trim();
    if (text) {
      localStorage.setItem('bloxolite-announcement', text);
      statusMsg.style.display = 'block';
      setTimeout(() => statusMsg.style.display = 'none', 2000);
    }
  });
}

// Display announcement on homepage
const announcementBox = document.getElementById('announcement-text-display');
if (announcementBox) {
  const savedAnnouncement = localStorage.getItem('bloxolite-announcement');
  if (savedAnnouncement) {
    announcementBox.textContent = savedAnnouncement;
  }
}
