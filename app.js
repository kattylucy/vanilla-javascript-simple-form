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

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
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

    if(title == '' || author == '' || isbn == ''){
        UI.showAlert('Please fill all the fields', 'danger')
    }else{
        const book = new Book(title, author, isbn);
        UI.showAlert('New book added', 'success')
        UI.addBookToList(book);
    }
  

    //clear fields
    UI.clearFields();
});

//EVENT: REMOVE A BOOK

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book deleted', 'danger')
});