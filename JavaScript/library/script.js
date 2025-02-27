const books = [];
let currentbookID = 0;
const bookList = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    pages: 310,
    read: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    pages: 328,
    read: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    pages: 281,
    read: true,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    pages: 277,
    read: false,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    pages: 311,
    read: true,
  },
];

function Book(bookID, title, author, year, pages, read) {
  this.bookID = bookID;
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
}

bookList.forEach((item) => {
  books.push(
    new Book(
      currentbookID,
      item.title,
      item.author,
      item.year,
      item.pages,
      item.read
    )
  );
  currentbookID++;
});

function addBook(title, author, year, pages, read) {
  new Book(currentbookID, title, author, year, pages, read);
  currentbookID++;
}

function renderBooks() {
  const bookContainer = document.querySelector(".bookContainer");
  bookContainer.innerHTML = "";

  books.forEach((item) => {
    const container = document.createElement("div");
    container.innerHTML = `
              <div class="book-card">
                <div class="left-card">
                    <h3 class="booktitle">${item.title}</h3>
                    <div class="book-det">
                        <span class="book-key">Author:</span>
                        <span class="book-value">${item.author}</span>
                    </div>
                    <div class="book-det">
                        <span class="book-key">Year:</span>
                        <span class="book-value">${item.year}</span>
                    </div>
                    <div class="book-det">
                        <span class="book-key">Pages:</span>
                        <span class="book-value">${item.pages}</span>
                    </div>
                    <button class="${item.bookID} book-read ${
      item.read ? "green-btn" : "red-btn"
    }">${item.read ? "Read" : "Not read"}</button>
                </div>
                <button class="${item.bookID} book-delete">x</button>
            </div>
    `;
    bookContainer.appendChild(container);
  });
  const readBtns = document.querySelectorAll(".book-read");
  const deleteBtns = document.querySelectorAll(".book-delete");

  readBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let bookIndex;
      bookIndex = books.findIndex(
        (book) => book.bookID == e.target.classList[0]
      );
      books[bookIndex].read
        ? (books[bookIndex].read = false)
        : (books[bookIndex].read = true);
      renderBooks();
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let bookIndex;
      bookIndex = books.findIndex(
        (book) => book.bookID == e.target.classList[0]
      );
      books.splice(bookIndex, 1);
      renderBooks();
    });
  });
}

renderBooks();
