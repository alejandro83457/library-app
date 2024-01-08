let addBookButton = document.querySelector("#add-book-button");
let dialog = document.querySelector("dialog");
let closeDialogButton = document.querySelector("dialog button");
let bookDiv = document.querySelector("#book-list");

let bookElement = document.querySelector("dialog #book-name");
let authorElement = document.querySelector("dialog #author-name");
let pagesElement = document.querySelector("dialog #pages");
let readElement = document.querySelector("dialog #read");

let book = "";
let author = "";
let pages = 0;
let read = false;

const myLibrary = [];

// Book object used for storage
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle function used to toggle read var.
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Event listeners
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});
bookElement.addEventListener("input", (e) => {
  book = e.target.value;
});
authorElement.addEventListener("input", (e) => {
  author = e.target.value;
});
pagesElement.addEventListener("input", (e) => {
  pages = e.target.value;
});
readElement.addEventListener("change", (e) => {
  read = e.target.checked;
});

// Closes dialog
closeDialogButton.addEventListener("click", (e) => {
  e.preventDefault(); // prevents the submission of the form
  dialog.close();

  addBook();
  console.log(myLibrary);

  // Clears previous inputs
  bookElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  readElement.checked = false;
  read = false;
});

const addBook = () => {
  let newBook = new Book(book, author, pages, read);
  myLibrary.push(newBook);

  let div = document.createElement("div");
  div.textContent = newBook.name;

  bookDiv.appendChild(div);
};
