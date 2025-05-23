document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault(); 

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {

        localStorage.setItem("contact_name", name);
        localStorage.setItem("contact_email", email);
        localStorage.setItem("contact_message", message);

        
        window.location.href = "about.html";
      } else {
        alert("Please fill in all fields.");
      }
    });