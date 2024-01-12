class Library {
  #library = [];
  addBook(book) {
    this.#library.push(book);
  }
  removeBook(bookName) {
    let index;
    for (let i = 0; i < this.#library.length; i++) {
      if (this.#library[i].name == bookName) index = i;
    }
    this.#library.splice(index, 1);
  }
  // Based on name of book, linear search and call the book's
  // toggleRead function
  updateRead(bookName) {
    for (let book of this.#library) {
      if (book.name == bookName) {
        book.toggleRead();
      }
    }
  }
  showLibrary() {
    console.log("My books:");
    for (let book of this.#library) {
      console.log(book.book());
    }
    console.log(" ");
  }
}

class Book {
  #name;
  #author;
  #pages;
  #read;
  constructor(name, author, pages, read) {
    this.#name = name;
    this.#author = author;
    this.#pages = pages;
    this.#read = read;
  }
  toggleRead() {
    this.#read = !this.#read;
  }
  get name() {
    return this.#name;
  }
  get author() {
    return this.#author;
  }
  get pages() {
    return this.#pages;
  }
  get read() {
    return this.#read;
  }
  book() {
    return `${this.#name} ${this.#author} ${this.#pages} ${this.#read}`;
  }
}

// Element objects
let addBookButton = document.querySelector("#add-book-button");
let dialog = document.querySelector("dialog");
let closeDialogButton = document.querySelector("dialog button");
let bookDiv = document.querySelector("#book-list");

let bookElement = document.querySelector("dialog #book-name");
let authorElement = document.querySelector("dialog #author-name");
let pagesElement = document.querySelector("dialog #pages");
let readElement = document.querySelector("dialog #read");

// Library object
const library = new Library();

// EVENT LISTENERS
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});
// Close dialog if clicking background
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    bookElement.value = "";
    authorElement.value = "";
    pagesElement.value = "";
    readElement.checked = false;
    // close dialog box
    dialog.close();
  }
});
// Closes dialog
closeDialogButton.addEventListener("click", (e) => {
  e.preventDefault(); // prevents the submission of the form
  dialog.close();

  // Grabs inputs from dialog
  let name = bookElement.value;
  let author = authorElement.value;
  let pages = pagesElement.value;
  let read = readElement.checked;

  // Create book obj and add to library
  let book = new Book(name, author, pages, read);
  library.addBook(book);
  library.showLibrary();
  addBookDOM(book);

  // Clears previous inputs
  bookElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  readElement.checked = false;
});

// Adding book to DOM
const addBookDOM = (book) => {
  // create div container
  let div = document.createElement("div");
  div.setAttribute("data-value", book.name);

  // create div for book attributes
  let nameDiv = document.createElement("div");
  let authorDiv = document.createElement("div");
  let pagesDiv = document.createElement("div");
  let readDiv = document.createElement("div");

  // create checkbox for read
  let readCheck = document.createElement("input");
  readCheck.setAttribute("type", "checkbox");
  readCheck.checked = book.read;
  readCheck.addEventListener("change", (e) => {
    library.updateRead(
      readCheck.parentElement.parentElement.getAttribute("data-value")
    );
    library.showLibrary();
  });

  nameDiv.textContent = book.name;
  authorDiv.textContent = book.author;
  pagesDiv.textContent = `Pages ${book.pages}`;
  readDiv.textContent = "Read ";

  // create button
  let button = document.createElement("button");
  button.textContent = "Delete";

  // button event to delete itself and parent
  button.addEventListener("click", () => {
    // delete book from array
    library.removeBook(button.parentElement.getAttribute("data-value"));

    // delete book from DOM
    button.parentElement.remove();
    library.showLibrary();
  });

  div.appendChild(nameDiv);
  div.appendChild(authorDiv);
  div.appendChild(pagesDiv);
  readDiv.appendChild(readCheck);
  div.appendChild(readDiv);
  div.appendChild(button);
  bookDiv.appendChild(div);
};
