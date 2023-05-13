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

class BooksList {
    constructor() {
        const thisBooksList = this;

        thisBooksList.favoriteBooks = [];

        thisBooksList.filters = [];

        thisBooksList.initData();

        thisBooksList.getElements();
    }

    initData() {
        const thisBooksList = this;

        thisBooksList.data = dataSource;

    }

    render() {
        const thisBooksList = this;

        thisBooksList.initActions();

        for (let productData in thisBooksList.data.books) {

            productData = thisBooksList.data.books[productData];

            const ratingBgc = thisBooksList.determineRatingBgc(productData.rating);

            const ratingWidth = productData.rating * 10;

            productData.ratingBgc = ratingBgc;

            productData.ratingWidth = ratingWidth;

            const generatedHTML = templates.product(productData);

            productData = utils.createDOMFromHTML(generatedHTML);

            thisBooksList.dom.productContainer.appendChild(productData);
        }
    }

    getElements() {
        const thisBooksList = this;

        thisBooksList.dom = {};
        thisBooksList.dom.productContainer = document.querySelector(select.containerOf.product);
        thisBooksList.dom.booksList = document.querySelector(select.containerOf.product);
        thisBooksList.dom.filtersList = document.querySelector(select.containerOf.filters);
    }

    initActions() {
        const thisBooksList = this;

        thisBooksList.dom.booksList.addEventListener('click', function (event) { event.preventDefault(); });

        thisBooksList.dom.booksList.addEventListener('dblclick', function (event) {

            event.preventDefault();

            if (event.target.offsetParent.classList.contains('book__image')) {

                const id = event.target.offsetParent.getAttribute('data-id');

                if (event.target.offsetParent.classList.contains('favorite')) {

                    event.target.offsetParent.classList.remove('favorite');

                    const indexOfFavoriteBooks = thisBooksList.favoriteBooks.indexOf(id);

                    thisBooksList.favoriteBooks.splice(indexOfFavoriteBooks, 1);

                } else {

                    event.target.offsetParent.classList.add('favorite');

                    thisBooksList.favoriteBooks.push(id);
                }
            }
        });

        thisBooksList.dom.filtersList.addEventListener('change', function (event) {

            if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {

                if (event.target.checked == true) {
                    thisBooksList.filters.push(event.target.value);
                } else {
                    const indexOfFilters = thisBooksList.filters.indexOf(event.target.value);

                    thisBooksList.filters.splice(indexOfFilters, 1);
                }
            }
            thisBooksList.filterBooks();
        });
    }

    filterBooks() {
        const thisBooksList = this;
        for (let book of thisBooksList.data.books) {

            let shouldBeHidden = false;

            for (let filter in thisBooksList.filters) {

                filter = thisBooksList.filters[filter];

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

    determineRatingBgc(rating) {

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

}

const app = new BooksList();

app.render();