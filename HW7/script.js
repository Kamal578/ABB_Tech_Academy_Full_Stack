// Get the main container element with the class "container"
const mainDiv = document.querySelector(".container");

// Create a Card class to represent a card element
class Card {
  constructor(title, text, name, email, postId) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.email = email;
    this.postId = postId;
  }

  // Render the card element with the provided data
  renderCard() {
    // Create an HTML string representing the card with dynamic data
    const displayCard = `
      <div class="card" data-post-id="${this.postId}">
        <header>
          <div class="profile-picture"></div>
          <div class="info-section">
            <h2 class="title">${this.title}</h2>
            <a href="" class="name-link">
              <p class="name">@${this.name}</p>
            </a>
          </div>
        </header>
        <main>
          <p class="text">${this.text}</p>
        </main>
        <footer>
          <p class="email">${this.email}</p>
          <button class="delete-btn">Delete</button>
        </footer>
      </div>`;

    // Insert the card HTML into the main container
    mainDiv.insertAdjacentHTML("beforeend", displayCard);
  }

  // Delete the card by sending a DELETE request to the server
  deleteCard() {
    fetch(`https://ajax.test-danit.com/api/json/posts/${this.postId}`, {
      method: "DELETE",
    }).then(() => {
      // Find the card element by its data-post-id attribute
      const cardElement = document.querySelector(
        `[data-post-id="${this.postId}"]`
      );
      if (cardElement) {
        // Hide the card by setting its display to "none"
        cardElement.style.display = "none";
      }
    });
  }
}

// Fetch the users and posts data from the server using Promises
const usersRequest = fetch("https://ajax.test-danit.com/api/json/users").then(
  (response) => response.json()
);
const postsRequest = fetch("https://ajax.test-danit.com/api/json/posts").then(
  (response) => response.json()
);

// Use Promise.all to wait for both requests to complete
Promise.all([usersRequest, postsRequest])
  .then(([usersInfo, postsInfo]) => {
    // Loop through users and posts to create and render cards for matching data
    for (user of usersInfo) {
      for (post of postsInfo) {
        if (user.id === post.userId) {
          let card = new Card(
            post.title,
            post.body,
            user.name,
            user.email,
            post.id
          );
          card.renderCard();
        }
      }
    }

    // After a delay (1000ms), set up event listeners for delete buttons
    setTimeout(() => {
      const deleteBtns = document.querySelectorAll("button.delete-btn");
      deleteBtns.forEach((btn) => {
        const postId = btn.closest(".card").getAttribute("data-post-id");
        const card = new Card();
        card.postId = postId;

        // Add a click event listener to each delete button to trigger card deletion
        btn.addEventListener("click", () => {
          card.deleteCard();
          new Dialog("jsdialog1").show(
            "Press ESC key or click the button to close"
          );
          document.querySelector(".overlay").classList.add("open");
        });
      });
    }, 100);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch process
    console.log(error);
  });

// unnecessary code, decided to add a nice dialog box

class Dialog {
  // Declare static properties to store the dialog elements
  static dialog = null;
  static dialogBody = null;
  static closeButton = null;
  static button = null;

  constructor(dialogId) {
    // Check if the dialog element already exists, if not, create it
    if (!Dialog.dialog) {
      Dialog.dialog = this.#createHTMLDialogBox(dialogId);
    }
    Dialog.dialogBody = Dialog.dialog.querySelector(".dialog-body");
    Dialog.closeButton = Dialog.dialog.querySelector(".dialog-close");
    Dialog.button = Dialog.dialog.querySelector(".dialog-button");

    // Bind the close method to the current instance
    this.close = this.close.bind(this);

    // Add an event listener for the two buttons.
    Dialog.closeButton.addEventListener("click", this.close);
    Dialog.button.addEventListener("click", this.close);
  }

  /**
   * @param {boolean} value
   */
  set visible(value) {
    Dialog.dialog.classList.toggle("open", value);
    document.querySelector(".overlay").classList.toggle("open", value);
  }

  show(message) {
    Dialog.dialogBody.textContent = message;
    document.addEventListener("keydown", this.close);
    // Use requestAnimationFrame to force transitions to run at the first time.
    requestAnimationFrame(() => {
      this.visible = true;
    });
  }

  close(event) {
    // Check if the ESC key was pressed or the button was clicked
    if (event?.key === "Escape" || event?.type === "click") {
      this.visible = false;
      document.removeEventListener("keydown", this.close);
    }
  }

  // Declare a private method to create a HTML dialog element and append it to the document
  #createHTMLDialogBox(dialogId) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    dialog.id = dialogId;
    dialog.innerHTML = `
    <div class="dialog-header">
      <span class="dialog-title">Tweet succefully deleted</span>
      <button type="button" class="dialog-close">&times;</button>
    </div>
    <div class="dialog-body">This is an alert message.</div>
    <div class="dialog-footer">
      <button type="button" class="dialog-button">OK</button>
    </div>
    `;
    document.body.appendChild(dialog);
    return dialog;
  }
}
