// ================================
// Profile Page
// ================================

// User Data
const user = JSON.parse(localStorage.getItem("user")) || {};

document.getElementById("name").textContent =
    user.name || "Guest User";

document.getElementById("email").textContent =
    user.email || "Not Available";


// ================================
// Total Reports
// ================================

const history = JSON.parse(localStorage.getItem("history")) || [];

document.getElementById("reports").textContent =
    history.length;

document.getElementById("analysis").textContent =
    history.length;


// ================================
// Dashboard Button
// ================================

document.getElementById("dashboardBtn")
.addEventListener("click", () => {

    window.location.href = "dashboard.html";

});


// ================================
// Edit Profile
// ================================

document.getElementById("editBtn")
.addEventListener("click", () => {

    const newName = prompt(
        "Enter New Name",
        document.getElementById("name").textContent
    );

    if (newName && newName.trim() !== "") {

        user.name = newName;

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        document.getElementById("name").textContent =
            newName;

        alert("Profile Updated Successfully ✅");

    }

});


// ================================
// Logout
// ================================

document.getElementById("logoutBtn")
.addEventListener("click", () => {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

});