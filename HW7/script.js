// script.js

const usersURL = "https://ajax.test-danit.com/api/json/users";
const postsURL = "https://ajax.test-danit.com/api/json/posts";

// Function to send HTTP GET request
async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to send HTTP DELETE request
async function deleteData(url) {
  const response = await fetch(url, { method: "DELETE" });
  return response.ok;
}

// Function to send HTTP POST request
async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const newPost = await response.json();
  return newPost;
}

// Function to send HTTP PUT request
async function putData(url, data) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.ok;
}

// Function to create a post card
function createPostCard(post) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <p><strong>Author:</strong> ${post.user.name} ${post.user.username} (${post.user.email})</p>
    <div class="actions">
      <button class="delete" data-post-id="${post.id}">Delete</button>
      <button class="edit" data-post-id="${post.id}">Edit</button>
    </div>
  `;

  // Delete button click event
  const deleteButton = card.querySelector(".delete");
  deleteButton.addEventListener("click", async () => {
    const postId = deleteButton.dataset.postId;
    const success = await deleteData(`${postsURL}/${postId}`);
    if (success) {
      card.remove();
    }
  });

  // Edit button click event
  const editButton = card.querySelector(".edit");
  editButton.addEventListener("click", () => {
    const newTitle = prompt("Enter new title:", post.title);
    const newText = prompt("Enter new text:", post.body);
    if (newTitle && newText) {
      const updatedPost = {
        ...post,
        title: newTitle,
        body: newText,
      };
      putData(`${postsURL}/${post.id}`, updatedPost);
      card.querySelector("h3").textContent = newTitle;
      card.querySelector("p").textContent = newText;
    }
  });

  return card;
}

// Function to display the posts on the page
function displayPosts(posts) {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const card = createPostCard(post);
    postsContainer.appendChild(card);
  });
}

// Function to display the loading animation
function showLoadingAnimation() {
  document.getElementById("loading").style.display = "block";
}

// Function to hide the loading animation
function hideLoadingAnimation() {
  document.getElementById("loading").style.display = "none";
}

// Function to open the modal for creating a new post
function openModal() {
  document.getElementById("modal").style.display = "block";
}

// Function to close the modal for creating a new post
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("postTitle").value = "";
  document.getElementById("postText").value = "";
}

// Function to handle the "Add Post" button click event
function handleAddPost() {
  openModal();
}

// Function to handle the "Create" button click event in the modal
async function handleCreatePost() {
  const postTitle = document.getElementById("postTitle").value;
  const postText = document.getElementById("postText").value;

  if (postTitle && postText) {
    const newPost = {
      userId: 1, // Assigning the user with id: 1 as the author
      title: postTitle,
      body: postText,
    };

    const createdPost = await postData(postsURL, newPost);
    const card = createPostCard(createdPost);
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.insertBefore(card, postsContainer.firstChild);

    closeModal();
  }
}

// Function to initialize the web page
async function init() {
  showLoadingAnimation();

  try {
    const [users, posts] = await Promise.all([
      getData(usersURL),
      getData(postsURL),
    ]);
    const postsWithUser = posts.map((post) => ({
      ...post,
      user: users.find((user) => user.id === post.userId),
    }));

    displayPosts(postsWithUser);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoadingAnimation();
  }
}

// Event listeners
document
  .getElementById("addPostButton")
  .addEventListener("click", handleAddPost);
document
  .getElementById("createPostButton")
  .addEventListener("click", handleCreatePost);
document.querySelector(".close").addEventListener("click", closeModal);

// Initialize the web page
init();
