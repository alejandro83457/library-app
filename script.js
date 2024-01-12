let addBookButton = document.querySelector("#add-book-button");
let dialog = document.querySelector("dialog");
let closeDialogButton = document.querySelector("dialog button");
let bookDiv = document.querySelector("#book-list");

let bookElement = document.querySelector("dialog #book-name");
let authorElement = document.querySelector("dialog #author-name");
let pagesElement = document.querySelector("dialog #pages");
let readElement = document.querySelector("dialog #read");

class Library {
  #library = [];
  addBook(book) {
    this.#library.push(book);
  }
  removeBook(book) {
    // console.log(`Book to remove: ${book.name}`);
    let index;
    for (let i = 0; i < this.#library.length; i++) {
      if (this.#library[i].name == book.name) index = i;
    }
    this.#library.splice(index, 1);
  }
  showLibrary() {
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
  book() {
    return `${this.#name} ${this.#author}`;
  }
}

let book1 = new Book("name1", "author1", 100, false);
let book2 = new Book("name2", "author2", 100, true);
let book3 = new Book("name3", "author3", 100, false);

let library = new Library();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.showLibrary();

library.removeBook(book3);
library.showLibrary();
