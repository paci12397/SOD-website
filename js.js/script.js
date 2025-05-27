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


    
  // Wait for page load
  window.addEventListener("load", function () {
    // Show loader for 2 seconds
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 2000); // 2000 milliseconds = 2 seconds
  });
