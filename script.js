console.log("✅ Script loaded!");

const ACCESS_HASH = "-94374278"; // Your hash
const verifyBtn = document.getElementById("verify-key");
const accessInput = document.getElementById("access-key");
const loginError = document.getElementById("login-error");
const adminPanel = document.getElementById("admin-panel");
const postBtn = document.getElementById("post-announcement");
const statusMsg = document.getElementById("status");

function hashString(str) {
  return Array.from(str).reduce((hash, char) => {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    return hash & hash;
  }, 0).toString();
}

verifyBtn.addEventListener("click", () => {
  const inputKey = accessInput.value.trim();
  if (hashString(inputKey) === ACCESS_HASH) {
    document.querySelector("h1").textContent = "Welcome, Admin 👋";
    verifyBtn.style.display = "none";
    accessInput.style.display = "none";
    loginError.style.display = "none";
    adminPanel.style.display = "block";
  } else {
    loginError.style.display = "block";
  }
});

// 🟢 Save the announcement to localStorage
postBtn.addEventListener("click", () => {
  const message = document.getElementById("announcement").value.trim();
  if (message.length > 0) {
    const date = new Date().toLocaleString();
    const announcementData = { message, date };
    let announcements = JSON.parse(localStorage.getItem("bloxolite_announcements")) || [];
    announcements.unshift(announcementData); // add newest to top
    localStorage.setItem("bloxolite_announcements", JSON.stringify(announcements));

    statusMsg.style.display = "block";
    setTimeout(() => (statusMsg.style.display = "none"), 3000);
    document.getElementById("announcement").value = "";
  }
});
