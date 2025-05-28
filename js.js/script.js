
  // login 
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for matching user
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      errorMessage.textContent = "";
      alert("Login successful!");
      window.location.href = "home.html"; // Replace with your actual home page
    } else {
      errorMessage.textContent = "Invalid email or password.";
    }
  });


    
  // Wait for page load
  window.addEventListener("load", function () {
    // Show loader for 2 seconds
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 200); // 2000 milliseconds = 2 seconds
  });
