const select = {
    templateOf: {
        product: '#template-book',
    },
    containerOf: {
        product: '.books-list'
    },
    books: {
        imageWrapper: '.books-list .book__image'
    }
};

const templates = {
    product: Handlebars.compile(document.querySelector(select.templateOf.product).innerHTML)
};

const data = dataSource;
//console.log(data);

const favoriteBooks = [];
//console.log(favoriteBooks);

function render() {
    for (let productData in data.books) {
        //console.log(productData);

        productData = (productData, data.books[productData]);
        //console.log(productData);

        const generatedHTML = templates.product(productData);
        //console.log(generatedHTML);

        productData.element = utils.createDOMFromHTML(generatedHTML);
        //console.log(productData.element);

        const productContainer = document.querySelector(select.containerOf.product);
        //console.log(productContainer);

        productContainer.appendChild(productData.element);
    }

}


function initActions() {
    const bookImages = document.querySelectorAll(select.books.imageWrapper);
    //console.log(bookImages);


    for (let bookImage of bookImages) {
        //console.log(bookImage);
        bookImage.addEventListener('click', function (event) { event.preventDefault(); });

        bookImage.addEventListener('dblclick', function (event) {

            event.preventDefault();

            let id = bookImage.getAttribute('data-id');
            //console.log(id);


            if (bookImage.classList.contains('favorite')) {

                bookImage.classList.remove('favorite');

                const indexOfFavoriBooks = favoriteBooks.indexOf(id);
                //console.log(indexOfFavoriBooks);

                favoriteBooks.splice(indexOfFavoriBooks, 1);

            } else {

                bookImage.classList.add('favorite');

                let id = bookImage.getAttribute('data-id');
                //console.log(id);

                favoriteBooks.push(id);

            }
            //console.log(favoriteBooks);
        });
    }
}



render();

initActions();



