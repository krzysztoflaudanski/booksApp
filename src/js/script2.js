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
    }
};

const templates = {
    product: Handlebars.compile(document.querySelector(select.templateOf.product).innerHTML)

};

const data = dataSource;

const favoriteBooks = [];

const filters = [];

function render() {
    for (let productData in data.books) {

        productData = (productData, data.books[productData]);

        const ratingBgc = determineRatingBgc(productData.rating);

        const ratingWidth = productData.rating * 10;

        productData.ratingBgc = ratingBgc;

        productData.ratingWidth = ratingWidth;

        const generatedHTML = templates.product(productData);

        productData.element = utils.createDOMFromHTML(generatedHTML);

        const productContainer = document.querySelector(select.containerOf.product);

        productContainer.appendChild(productData.element);
    }
}


function initActions() {
    const booksList = document.querySelector(select.containerOf.product);

    booksList.addEventListener('click', function (event) { event.preventDefault(); });

    booksList.addEventListener('dblclick', function (event) {

        event.preventDefault();
        
        if (event.target.offsetParent.classList.contains('book__image')) {

            const id = event.target.offsetParent.getAttribute('data-id');

            if (event.target.offsetParent.classList.contains('favorite')) {

                event.target.offsetParent.classList.remove('favorite');

                const indexOfFavoriBooks = favoriteBooks.indexOf(id);

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
            
            if (event.target.checked == true) {
                filters.push(event.target.value);
            } else {
                const indexOfFilters = filters.indexOf(event.target.value);

                filters.splice(indexOfFilters, 1);
            }
        }
        filterBooks();
        
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

