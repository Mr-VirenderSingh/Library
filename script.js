const myLibrary = [];

function book(author, title, total_pages, read_yet) {
  this.author = author;
  this.title = title;
  this.total_pages = total_pages;
  this.read_yet = read_yet;
}

book.prototype.toggleRead = function () {
  this.read_yet = !this.read_yet;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function addBookToLibrary() {
  let author = document.querySelector("#author").value;
  let title = document.querySelector("#title").value;
  let total_pages = document.querySelector("#total_pages").value;
  let read_status = document.getElementById("read_status").checked;

  const add_book = new book(author, title, total_pages, read_status);
  myLibrary.push(add_book);
  render();
}

function render() {
  let library = document.querySelector("#library");
  library.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.classList.add("card-body");
    bookEl.innerHTML = `
    <div class="card-header">
    <h3 >Title: ${book.title}</h3>
    <h5> By: ${book.author}</h5>
    </div>
    <div>
    <p>${book.total_pages} Pages </p>
    <p>${book.read_yet ? "Read" : "Not Read"}</p>
    <button class="remove_btn" onclick='removeBook(${i})'>Remove</button>
    <button class="toggle" onclick="toggleRead(${i})">Toggle</button>
    `;
    console.log(book);
    library.appendChild(bookEl);
    console.log(bookEl);
  }
}

let hide_unhide = 0;

document.querySelector(".new_book_btn").addEventListener("click", () => {
  let show_form = document.querySelector(".add_new_book");
  console.log(hide_unhide);
  switch (hide_unhide) {
    case 0:
      show_form.style.display = "flex";
      hide_unhide++;
        break;
    
      case 1:
      show_form.style.display = "none";
      hide_unhide--;
        break;
    }

});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  document.querySelector("form").reset();
});

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}
