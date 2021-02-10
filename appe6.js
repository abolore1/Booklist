class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn 

         document.getElementById('title').value
         document.getElementById('author').value
         document.getElementById('isbn').value
    
    }
}

class UI{
    
    addBookToList(book){
        const list = document.getElementById('book-list')

        //Creating element
        const row = document.createElement('tr')
     
        //Insert column
        row.innerHTML = `
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href="#" class="delete">X</a></td>
        `
        // append row to list
        list.appendChild(row)
    }

    showAlert(message, className){
        //Create div element
        const div = document.createElement('div')

        //Add class name
        div.className = `alert ${className}`

        //Creat textNode
        div.appendChild(document.createTextNode(message));

        //Get parent
        const container = document.querySelector('.container');

        //Get form
        const form = document.querySelector('#book-form');
        
        //Insert div
        container.insertBefore(div, form);

        //Set timeout
        setTimeout(function(){
            document.querySelector('.alert').remove()
        },3000)
    }

    deleteBook(target){
       if(target.className === 'delete'){
        //remove target from parentElement 
        target.parentElement.parentElement.remove();
        }
    }

    clearInputs(){
     // document.getElementById('title').value = ''
        title.value = ''
        author.value = ''
        isbn.value = ''
    }
}

//Local Storage Class
class Store {
    static getBooks(){
      let books;
      if(localStorage.getItem('books')===null){
          books = [];
      } else {
          books = JSON.parse(localStorage.getItem('books'))
      }
        return books
    }

    static displayBooks(){
       const books = Store.getBooks();

       books.forEach(book => {
           const ui = new UI;

           //Add Book to ui
           ui.addBookToList(book)
       });
    }

    static addBook(book) {
       const books = Store.getBooks()
       
       books.push(book);

       localStorage.setItem('books',JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books))
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event listener for add book
document.getElementById('book-form').addEventListener('submit',
function(e){
    // Getting value form input
 const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value

       //Instantiate book
       const book = new Book(title,author,isbn)
       
      //Instantiate UI
       const ui = new UI()

       //Validate 
       if(title === '' || author === ''|| isbn ===''){
           //Error alert
           ui.showAlert('Please fill in all fields', 'error')
       } else {
           // Add to BookList
           ui.addBookToList(book);

          //Add to LS
           Store.addBook(book);

           //Show successful
           ui.showAlert('Book added successfully!','success')
    
           //Clear input fields
           ui.clearInputs();
       }

 
    e.preventDefault()
});

      //Event listener for delete book-list id
    document.getElementById('book-list').addEventListener('click',
    function(e){
        // Instantiate UI
        const ui = new UI()

        // Delete book
        ui.deleteBook(e.target)

        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        
        // Show message
        ui.showAlert('Book Removed!','success')    
        e.preventDefault()
})

