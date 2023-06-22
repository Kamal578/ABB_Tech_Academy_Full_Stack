const books = [
  {
    author: "Lucy Foley",
    name: "List of Invitees",
    price: 70,
  },
  {
    author: "Susanna Clarke",
    name: "Jonathan Strange & Mr Norrell",
  },
  {
    name: "Design. A Book for Non-Designers.",
    price: 70,
  },
  {
    author: "Alan Moore",
    name: "Neonomicon",
    price: 70,
  },
  {
    author: "Terry Pratchett",
    name: "Moving Pictures",
    price: 40,
  },
  {
    author: "Angus Hyland",
    name: "Cats in Art",
  },
];

try {
  const rootElement = document.getElementById("root");
  const ulElement = document.createElement("ul");

  books.forEach((book) => {
    try {
      if (
        !book.hasOwnProperty("author") ||
        !book.hasOwnProperty("name") ||
        !book.hasOwnProperty("price")
      ) {
        throw new Error(`Invalid book object: ${JSON.stringify(book)}`);
      }

      const liElement = document.createElement("li");
      liElement.textContent = `${book.name} by ${book.author}, Price: $${book.price}`;

      ulElement.appendChild(liElement);
    } catch (error) {
      console.error(error);
    }
  });

  rootElement.appendChild(ulElement);
} catch (error) {
  console.error("An error occurred while creating the book list:", error);
}
