let addBookButton = document.querySelector("#add-book-button");
let dialog = document.querySelector("dialog");
let closeDialogButton = document.querySelector("dialog button");

let bookElement = document.querySelector("dialog #book-name");
let authorElement = document.querySelector("dialog #author-name");
let pagesElement = document.querySelector("dialog #pages");

let book = "";
let author = "";
let pages = 0;

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

closeDialogButton.addEventListener("click", (e) => {
  e.preventDefault(); // prevents the submission of the form
  dialog.close();

  // Clears previous inputs
  bookElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";

  console.log(book, author, pages);
});
