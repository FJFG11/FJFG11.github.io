const ACCESS_HASH = "c9806a5d4db29fd7b1a73384a8e38f0e"; // Hashed key (replace below)
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const verifyBtn = document.getElementById('verify-key');
const accessInput = document.getElementById('access-key');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const announcementText = document.getElementById('announcement-text');
const saveAnnouncementBtn = document.getElementById('save-announcement');
const statusMsg = document.getElementById('status-msg');

// --- Simple Hash Function ---
function hashString(str) {
  return Array.from(str).reduce((hash, char) => {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    return hash & hash;
  }, 0).toString();
}

// --- Verify access key ---
verifyBtn.addEventListener('click', () => {
  const inputKey = accessInput.value.trim();
  if (hashString(inputKey) === ACCESS_HASH) {
    localStorage.setItem('bloxolite-loggedin', 'true');
    showDashboard();
  } else {
    loginError.style.display = 'block';
    setTimeout(() => (loginError.style.display = 'none'), 2000);
  }
});

// --- Show dashboard if already logged in ---
if (localStorage.getItem('bloxolite-loggedin') === 'true') {
  showDashboard();
}

function showDashboard() {
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'block';
  announcementText.value = localStorage.getItem('bloxolite-announcement') || '';
}

// --- Save announcement locally ---
saveAnnouncementBtn.addEventListener('click', () => {
  const text = announcementText.value.trim();
  if (text) {
    localStorage.setItem('bloxolite-announcement', text);
    statusMsg.style.display = 'block';
    setTimeout(() => (statusMsg.style.display = 'none'), 2000);
  }
});

// --- Logout ---
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('bloxolite-loggedin');
  location.reload();
});
