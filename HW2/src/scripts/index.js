// Select the button element with the class "button__nav"
const button = document.querySelector(".button__nav");

// Select the button element with the class "button__nav-x"
const buttonX = document.querySelector(".button__nav-x");

// Select the dropdown element with the class "dropdown"
const dropdown = document.querySelector(".dropdown");

// Define a click event listener function
const toggleDropdown = () => {
  // Toggle the "dropdown--active" class on the dropdown element
  dropdown.classList.toggle("dropdown--active");

  // Toggle the "button__nav--active" class on the button element
  button.classList.toggle("button__nav--active");

  // Toggle the "button__nav--active" class on the buttonX element
  buttonX.classList.toggle("button__nav--active");
};

// Add the same event listener function to both buttons
button.addEventListener("click", toggleDropdown);
buttonX.addEventListener("click", toggleDropdown);
