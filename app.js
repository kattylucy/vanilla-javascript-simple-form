//BOOK CLASS: represents a book 
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI CLASS: HANDLE UI TASKS 

class UI{
    static displayBooks(){
        const storedBooks = [
            {
                title:'Book One',
                author: 'John Doe',
                isbn:'12346'
            },
            {
                title:'Book Two',
                author: 'Mary Doe',
                isbn:'1234699'
            },
        ]

        const books = storedBooks;
        storedBooks.map(book => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    
    static deleteBook(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
}

// STORE CLASS: HANDLE STORAGE (local storage)

// EVENTS: DISPLAY BOOK

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//EVENT: ADD BOOK

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);
    UI.addBookToList(book);

    //clear fields
    UI.clearFields();
});

//EVENT: REMOVE A BOOK

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});