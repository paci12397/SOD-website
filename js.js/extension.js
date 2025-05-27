
const internalPages = {
    "home": "home.html",
    "about": "about.html",
    "skills": "skills.html",
    "contact": "contact.html",
    "login": "login.html",
    "blogs": "blogs.html",
    "sign-up": "sign-up.html"
  };

  const externalSites = {
    "google": "https://www.google.com",
    "youtube": "https://www.youtube.com",
    "tiktok": "https://www.tiktok.com",
    "facebook": "https://www.facebook.com",
    "instagram": "https://www.instagram.com",
    "opera mini": "https://www.opera.com/mobile/mini",
    "twitter": "https://www.twitter.com",
    "whatsapp": "https://www.whatsapp.com"
  };

  const suggestionKeywords = [
    "new song",
    "latest news",
    "top videos",
    "funny memes",
    "movie trailers",
    "best games",
    "job alerts"
  ];

  function performSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    for (const [key, url] of Object.entries(internalPages)) {
      if (query.includes(key)) {
        window.location.href = url;
        return;
      }
    }

    for (const [key, link] of Object.entries(externalSites)) {
      if (query.includes(key)) {
        window.open(link, "_blank");
        return;
      }
    }

    alert("Page not found. Try keywords like 'home', 'about', 'google', 'youtube'...");
  }

  function showSuggestions() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";

    if (input.length === 0) return;

    const filtered = suggestionKeywords.filter(item => item.startsWith(input));

    filtered.forEach(suggestion => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      li.onclick = function () {
        document.getElementById("searchInput").value = suggestion;
        suggestionsList.innerHTML = "";
      };
      suggestionsList.appendChild(li);
    });
  }
  
  //load//

  
  
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 1000); 
});




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
  


    //seach funnctionaliyt//


  function searchPosts() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const results = posts.filter(post =>
    post.text && post.text.toLowerCase().includes(query)
  );

  blogPosts.innerHTML = "";

  const fallbackDiv = document.getElementById("googleFallback");
  fallbackDiv.innerHTML = ""; // Reset Google link

  if (results.length === 0) {
    blogPosts.innerHTML = "<p>No matching blog posts found.</p>";
    fallbackDiv.innerHTML = `
      <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank">
        Search "${query}" on Google instead
      </a>
    `;
    return;
  }

  results.forEach(post => {
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

    const actions = document.createElement("div");
    actions.className = "action-buttons";
    actions.innerHTML = `
      <button onclick="alert('Liked!')">Like</button>
      <button onclick="alert('Comment feature coming soon')">Comment</button>
      <button onclick="alert('Shared!')">Share</button>
    `;
    div.appendChild(actions);

    blogPosts.appendChild(div);
  });
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

    // Comment section (load saved comments)
    const commentKey = `comments-${post.id}`;
    const comments = JSON.parse(localStorage.getItem(commentKey)) || [];
    if (comments.length > 0) {
      const commentSection = document.createElement("div");
      commentSection.innerHTML = "<strong>Comments:</strong><ul style='margin:0;padding-left:20px;'></ul>";
      const ul = commentSection.querySelector("ul");
      comments.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c;
        ul.appendChild(li);
      });
      div.appendChild(commentSection);
    }

    // Like/Comment/Share buttons
    const actions = document.createElement("div");
    actions.className = "action-buttons";
    actions.innerHTML = `
      <button onclick="likePost(this)">👍 Like (<span>0</span>)</button>
      <button onclick="commentPost(${post.id})">💬 Comment</button>
      <button onclick="sharePost('${encodeURIComponent(post.text)}')">🔗 Share</button>
    `;
    div.appendChild(actions);

    blogPosts.appendChild(div);
  });
}


function likePost(btn) {
  const span = btn.querySelector("span");
  let count = parseInt(span.textContent);
  span.textContent = count + 1;
}

function commentPost(postId) {
  const comment = prompt("Enter your comment:");
  if (!comment) return;

  const key = `comments-${postId}`;
  const oldComments = JSON.parse(localStorage.getItem(key)) || [];
  oldComments.push(comment);
  localStorage.setItem(key, JSON.stringify(oldComments));

  alert("Comment saved!");
  renderPosts(); // re-render to show the new comment
}

function sharePost(postText) {
  const url = window.location.href;
  const decoded = decodeURIComponent(postText);

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitter = `https://twitter.com/intent/tweet?text=${decoded}&url=${url}`;
  const whatsapp = `https://api.whatsapp.com/send?text=${decoded}%20${url}`;

  const choice = prompt("Share on: facebook / twitter / whatsapp").toLowerCase();

  if (choice === "facebook") {
    window.open(facebook, "_blank");
  } else if (choice === "twitter") {
    window.open(twitter, "_blank");
  } else if (choice === "whatsapp") {
    window.open(whatsapp, "_blank");
  } else {
    alert("Invalid choice.");
  }
}




 
 