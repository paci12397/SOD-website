

  // Wait for page load
  window.addEventListener("load", function () {
    // Show loader for 2 seconds
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 2000); // 2000 milliseconds = 2 seconds
  });


