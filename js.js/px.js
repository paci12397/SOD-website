 document.getElementById("signupForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("mushimirepacifique").value;
      const email = document.getElementById("pacy@gmail.com").value;
      const license = document.getElementById("12345").value;
      const password = document.getElementById("gihogwe").value;

      if (name && email && license && password) {
        document.getElementById("message").style.color = "green";
        document.getElementById("message").textContent = "Signed up successfully!";
        setTimeout(() => {
          window.location.href = "login.html"; // Redirect after 1 second
        }, );
      } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent = "Please fill all fields.";
      }
    });