// Show / Hide Password

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            password.type = "password";

            togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

        }

    });

}


// Register

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const user = {

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            password: document.getElementById("password").value

        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful");

        window.location.href = "login.html";

    });

}



// Login

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (

            user &&

            user.email === email &&

            user.password === password

        ) {

            alert("Login Successful");

            window.location.href = "dashboard.html";

        }

        else {

            alert("Invalid Email or Password");

        }

    });

}