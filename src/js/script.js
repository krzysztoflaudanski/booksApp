const select = {
    templateOf: {
        product: '#template-book',
    },
    containerOf: {
        product: '.books-list',
        filters: '.filters',
    },
    books: {
        imageWrapper: '.books-list .book__image',
        list: '.books-list li'
    }
};

const templates = {
    product: Handlebars.compile(document.querySelector(select.templateOf.product).innerHTML)

};

const data = dataSource;
//console.log(data);

const favoriteBooks = [];
//console.log(favoriteBooks);

const filters = [];

function render() {
    for (let productData in data.books) {
        //console.log(productData);

        productData = (productData, data.books[productData]);
        //console.log(productData);

        const ratingBgc = determineRatingBgc(productData.rating);
        
        const ratingWidth = productData.rating * 10;
       
        productData.ratingBgc = ratingBgc;

        productData.ratingWidth = ratingWidth;

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
    const booksList = document.querySelector(select.containerOf.product);

    booksList.addEventListener('click', function (event) { event.preventDefault(); });

    booksList.addEventListener('dblclick', function (event) {

        event.preventDefault();
        //console.log(event.target);
        if (event.target.offsetParent.classList.contains('book__image')) {

            const id = event.target.offsetParent.getAttribute('data-id');
            //console.log(id);

            if (event.target.offsetParent.classList.contains('favorite')) {

                event.target.offsetParent.classList.remove('favorite');

                const indexOfFavoriBooks = favoriteBooks.indexOf(id);
                //console.log(indexOfFavoriBooks);

                favoriteBooks.splice(indexOfFavoriBooks, 1);

            } else {

                event.target.offsetParent.classList.add('favorite');

                favoriteBooks.push(id);

            }
            console.log(favoriteBooks);
        }


    });

    const filtersList = document.querySelector(select.containerOf.filters);

    filtersList.addEventListener('change', function (event) {

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
            //console.log(event.target.value);
            //console.log(event.target.checked);
            if (event.target.checked == true) {
                filters.push(event.target.value);
            } else {
                const indexOfFilters = filters.indexOf(event.target.value);

                filters.splice(indexOfFilters, 1);
            }
        }
        filterBooks();
        //console.log(filters);
    });
}

function filterBooks() {
    for (let book of data.books) {

        let shouldBeHidden = false;

        for (let filter in filters) {

            filter = filters[filter];

            if (book.details[filter] != true) {

                shouldBeHidden = true;

                break;
            }
        }
        const showBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

        if (shouldBeHidden == false) {

            showBook.classList.remove('hidden');

        } else {

            showBook.classList.add('hidden');
        }

    }
}

function determineRatingBgc(rating) {

    let ratingBgc = '';

    if (rating < 6) {

        ratingBgc = 'linear-gradient(to bottom. #fefcea 0%, #f1da36 100%';

    } else if (rating > 6 && rating <= 8) {

        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';

    } else if (rating > 8 && rating <= 9) {

        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';

    } else if (rating > 9) {

        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
    }
    return ratingBgc;
}





render();

initActions();

