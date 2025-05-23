
  
  

//blogs post//


    const fileInput = document.getElementById("fileInput");
    const previewArea = document.getElementById("previewArea");
    const blogPosts = document.getElementById("blogPosts");

    let uploadedImages = [];

    fileInput.addEventListener("change", () => {
      previewArea.innerHTML = "";
      uploadedImages = [];

      Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const url = e.target.result;
          const img = document.createElement("img");
          img.src = url;
          previewArea.appendChild(img);
          uploadedImages.push({ name: file.name, url: url });
        };
        reader.readAsDataURL(file);
      });
    });

    function downloadImages() {
      uploadedImages.forEach(img => {
        const link = document.createElement("a");
        link.href = img.url;
        link.download = img.name;
        link.click();
      });
    }

    function postBlog() {
      const content = document.getElementById("postContent").value.trim();
      if (content === "" && uploadedImages.length === 0) {
        return alert("Please write something or upload images.");
      }

      const post = {
        id: Date.now(),
        text: content,
        time: new Date().toLocaleString(),
        images: uploadedImages
      };

      const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
      existingPosts.push(post);
      localStorage.setItem("posts", JSON.stringify(existingPosts));

      renderPosts();
      document.getElementById("postContent").value = "";
      uploadedImages = [];
      previewArea.innerHTML = "";
      fileInput.value = "";
    }

    function renderPosts() {
      blogPosts.innerHTML = "";
      const posts = JSON.parse(localStorage.getItem("posts")) || [];

      posts.forEach(post => {
        const div = document.createElement("div");
        div.style.marginTop = "15px";
        div.style.padding = "10px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "5px";
        div.style.backgroundColor = "#f9f9f9";

        const time = document.createElement("small");
        time.textContent = `Posted on: ${post.time}`;
        div.appendChild(time);

        if (post.text) {
          const p = document.createElement("p");
          p.textContent = post.text;
          div.appendChild(p);
        }

        if (post.images && post.images.length > 0) {
          const imgContainer = document.createElement("div");
          imgContainer.style.display = "flex";
          imgContainer.style.flexWrap = "wrap";
          imgContainer.style.gap = "10px";

          post.images.forEach(img => {
            const image = document.createElement("img");
            image.src = img.url;
            image.style.width = "120px";
            image.style.height = "90px";
            image.style.objectFit = "cover";
            image.style.border = "1px solid #ccc";
            image.style.borderRadius = "5px";
            imgContainer.appendChild(image);
          });

          div.appendChild(imgContainer);
        }

        // Like/Comment/Share
        const actions = document.createElement("div");
        actions.className = "action-buttons";
        actions.innerHTML = `
          <button onclick="alert('Liked!')">Like</button>
          <button onclick="alert('Comment feature coming soon')">Comment</button>
          <button onclick="alert('Shared!')">Share</button>
          <button onclick="deletePost(${post.id})" style="background-color:#dc3545;color:white;">Delete</button>
        `;
        div.appendChild(actions);

        blogPosts.appendChild(div);
      });
    }

    function deletePost(id) {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = posts.filter(p => p.id !== id);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      renderPosts();
    }

    function clearAllPosts() {
      if (confirm("Delete all blog posts?")) {
      localStorage.removeItem("posts");
        renderPosts();
      }
    }

    // Initial load
    window.onload = renderPosts;
  



  