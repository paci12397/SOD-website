 document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMessage = document.getElementById("error-message");

      if (!email || !password) {
        errorMessage.textContent = "All fields are required.";
        return;
      }

      if (email === "mushimirepacifique@gmail.com" && password === "pacy@123") {
        errorMessage.textContent = "";
        window.location.href = "home.html";
      } else {
        errorMessage.textContent = "Invalid email or password.";
      }
    });