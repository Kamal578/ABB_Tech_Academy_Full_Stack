// Theoretical question: Provide a few examples of when it is appropriate to use the try...catch construct in code.

// EXAMPLE 1: PARSING JSON

try {
  const json = '{"name": "John", "age": 30}';
  const person = JSON.parse(json);
  console.log(person.name); // Output: John
} catch (error) {
  console.log("Error parsing JSON:", error);
}

// EXAMPLE 2: FETCHING DATA FROM AN API

async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/products/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

fetchData();

// EXAMPLE 3: READING A FILE

const fs = require("fs"); // Node.js file system module

try {
  const data = fs.readFileSync("example.txt", "utf8");
  console.log(data);
} catch (error) {
  console.log("Error reading file:", error);
}

// EXAMPLE 4: CREATING A CUSTOM ERROR

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

function test() {
  throw new CustomError("This is a custom error");
}

try {
  test();
} catch (error) {
  console.log(error.name); // Output: CustomError
  console.log(error.message); // Output: This is a custom error
}

// EXAMPLE 5: CATCHING MULTIPLE ERRORS

try {
  throw new Error("This is an error");
} catch (error) {
  console.log(error.name); // Output: Error
  console.log(error.message); // Output: This is an error
} finally {
  console.log("Finally block executed");
}

try {
  throw new TypeError("This is a type error");
} catch (error) {
  console.log(error.name); // Output: TypeError
  console.log(error.message); // Output: This is a type error
} finally {
  console.log("Finally block executed");
}

// EXAMPLE 6: CATCHING ERRORS IN  ASYNC FUNCTIONS

async function test() {
  throw new Error("This is an error");
}

test().catch((error) => {
  console.log(error.name); // Output: Error
  console.log(error.message); // Output: This is an error
});
