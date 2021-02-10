// Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

// UI Constructor
function UI(){}

//Create prototype
UI.prototype.addBookToList = function(book){
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

//Show error alert
UI.prototype.showAlert = function(message, className) {
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

//Deleting book proto target = className
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
    //remove target from parentElement 
     target.parentElement.parentElement.remove();
    }
}

// Clear input fields
UI.prototype.clearInputs = function(){
    
    // document.getElementById('title').value = ''
    title.value = ''
    author.value = ''
    isbn.value = ''
}

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
           ui.showAlert('Please fill all fields', 'error')
       } else {
           // Add to BookList
           ui.addBookToList(book);
           ui.showAlert('Book added successfully!','success')
    
           //Clear input fields
           ui.clearInputs();
       }
 
    e.preventDefault()
});

      //Event listener for delete book-list id
    document.getElementById('book-list').addEventListener('click',
    function(e){
        const ui = new UI()
        ui.deleteBook(e.target)

        ui.showAlert('Book Removed!','success')

        e.preventDefault()
})


