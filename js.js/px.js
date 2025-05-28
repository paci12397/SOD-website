

  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const license = document.getElementById("license").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!fullName || !email || !license || !password) {
      message.textContent = "Please fill in all fields.";
      message.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.email === email);
    if (userExists) {
      message.textContent = "This email is already registered.";
      message.style.color = "red";
      return;
    }

    users.push({ fullName, email, license, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Account created successfully! Redirecting...";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

    
  // Wait for page load
  window.addEventListener("load", function () {
    // Show loader for 2 seconds
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 2000); // 2000 milliseconds = 2 seconds
  });

