// fetch('http://openlibrary.org/search.json?q=javascript')
//     .then(res => res.json())
//     .then(data => console.log(data));

const SearchBook = () => {
    let inputSearch = document.getElementById("input-search");

    const inputText = inputSearch.value;

    if (inputText !== '') {

        const url = 'https://openlibrary.org/search.json?q=' + inputText
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data))
            .catch(error => {
                alert("Sorry, somthing wrong");
            });
        inputSearch.value = '';
    }

}

const displayBook = (data) => {

    const totalReult = data.numFound;
    let bookResult = document.getElementById("book-result");
    let searchResult = document.getElementById("search-result");
    bookResult.innerHTML = "";

    if (data !== null && data.numFound > 0) {

        const books = data.docs; // set book result
        searchResult.innerHTML = `Result found: ${totalReult}, Result view: ${books.length}`; // set result 
        let bookData = "";

        //  set all book result dynamicaly
        for (const book of books) {

            // set book info
            const title = book.title;
            const author_name = book.author_name;
            const publisher = book.publisher;
            const first_publish_year = book.first_publish_year;


            // generate dynamic html
            bookData += `<div class="card p-2 book-card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid" style="height: 200px;">
                <div class="card-body">
                    <h5 class="card-title"><span class="fw-bold">Book Name:</span> ${title}</h5>
                    <p class="card-text"><span class="fw-bold">Author:</span> ${author_name}</p>
                    <p class="card-text"><span class="fw-bold">Publisher:</span> ${publisher}</p>
                    <p class="card-text"><span class="fw-bold">First Publish:</span> ${first_publish_year}</p>
                </div>
            </div>`;

        }

        // appent html
        bookResult.innerHTML = bookData;
    } else {
        bookResult.innerHTML = ``;
        searchResult.innerText = `No result found!`;
    }



}