const GITHUB_CLIENT_ID = "Ov23li7zZWQ0BMEBZw4j"; // <-- Replace this
const OWNER_USERNAME = "FJFG11"; // Only this GitHub username can access

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const githubLoginBtn = document.getElementById('github-login');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const announcementText = document.getElementById('announcement-text');
const saveAnnouncementBtn = document.getElementById('save-announcement');
const statusMsg = document.getElementById('status-msg');

// Step 1: GitHub redirect
if (githubLoginBtn) {
  githubLoginBtn.addEventListener('click', () => {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=read:user`;
  });
}

// Step 2: Check for GitHub redirect code
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code && !localStorage.getItem('bloxolite-loggedin')) {
  fetch(`https://authjs.dev/api/github?code=${code}&client_id=${GITHUB_CLIENT_ID}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.login && data.login.toLowerCase() === OWNER_USERNAME.toLowerCase()) {
        localStorage.setItem('bloxolite-loggedin', 'true');
        showDashboard();
      } else {
        loginError.style.display = 'block';
      }
    })
    .catch(() => {
      loginError.style.display = 'block';
    });
}

// Step 3: Normal dashboard logic
function showDashboard() {
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'block';
  announcementText.value = localStorage.getItem('bloxolite-announcement') || '';
}

if (localStorage.getItem('bloxolite-loggedin') === 'true') {
  showDashboard();
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('bloxolite-loggedin');
    location.href = 'dashboard.html';
  });
}

if (saveAnnouncementBtn) {
  saveAnnouncementBtn.addEventListener('click', () => {
    const text = announcementText.value.trim();
    if (text) {
      localStorage.setItem('bloxolite-announcement', text);
      statusMsg.style.display = 'block';
      setTimeout(() => (statusMsg.style.display = 'none'), 2000);
    }
  });
}
