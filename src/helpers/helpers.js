

const FILE_NAME = 'helpers';

//-------------------------------------------------------------------------
//                            Search
//-------------------------------------------------------------------------

/**
 * Handle a value search on property field
 * @param {Array} data
 * @param {String} value
 * @param {String} property
 * @returns Array
 */
export const searchOnProperty = (data = [], value = '', property) => {
    console.info(`[${FILE_NAME}.searchOnProperty]`, data, value, property);

    const PATTERN = new RegExp(value, 'i');
    //console.info(`[helpers.searchOnProperty] PATTERN`, PATTERN);

    return data.filter(d => {
        if (typeof (d[property]) === "undefined") {
            throw new Error(`undefined property ${property} on object ${d}`);
        }
        return PATTERN.test(d[property])
    });
};

//-------------------------------------------------------------------------
//                            Cart / Articles
//-------------------------------------------------------------------------

/**
 * Returns distinct articles from cart
 * @param {Object} cart
 * @returns array
 */
export const getDistinctCartArticles = (cart) => {
    console.info(`[${FILE_NAME}.getDistinctCartArticles]`, cart);

    const distinctArticlesObj = {};
    let isbn;

    cart.articles.forEach(article => {
        isbn = article.isbn
        distinctArticlesObj[isbn] = article;
    })

    const distinctArticles = [];
    for (let isbn in distinctArticlesObj) {
        distinctArticles.push(distinctArticlesObj[isbn]);
    }
    return distinctArticles;
}

/**
 * Format number
 * @param {Number} num
 * @returns String
 */
export const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
}

export const TAX_RATE = 0.055;

/**
 * Returns cart summary
 * @param {Object} cart
 * @returns Object
 */
export const getCartSummary = (cart) => {
    console.info(`[${FILE_NAME}.getCartSummary]`, cart);

    let cartSummary = {
        articles: [],
        total_amount_without_taxes: 0,
        taxes: 0,
        total_amount_with_taxes: 0,
    };

    let qtyById = {};
    cart.articles.map(article => {

        // update qty
        if (typeof (qtyById[article.isbn]) === "undefined") {
            qtyById[article.isbn] = 1;
        } else {
            qtyById[article.isbn]++;
        }
        //return article;
    });
    //console.log('getCartSummary - qtyById', qtyById);

    let qty, article;
    for (let id in qtyById) {
        qty = qtyById[id];
        article = getCartArticle(id, cart.articles);
        //console.log('getCartSummary - article', article);

        article.qty = qty;
        article.total_amount_without_taxes = article.qty * article.price;
        article.taxes = (article.qty * (article.price * (1 + TAX_RATE))) - article.total_amount_without_taxes;
        article.total_amount_with_taxes = article.total_amount_without_taxes + article.taxes;

        cartSummary.articles.push(article);

        cartSummary.total_amount_without_taxes += article.total_amount_without_taxes;
        cartSummary.taxes += article.taxes;
        cartSummary.total_amount_with_taxes += article.total_amount_with_taxes;
    }
    //console.log('getCartSummary', cartSummary);

    return cartSummary;
}

/**
 * Returns article from cart (TODO : use every())
 * @param {String} id
 * @param {Array} articles
 * @returns Object
 */
export const getCartArticle = (id, articles) => {
    console.info(`[${FILE_NAME}.getCartArticle]`, id, articles);

    let foundArticle = null;
    articles.forEach(article => {
        if (article.isbn === id) {
            foundArticle = article;
        }
    })
    return foundArticle;
}

/**
 * Returns article qty
 * @param {Array} articles
 * @param {Int} id
 * @returns int
 */
const getArticleQuantity = (articles = [], id) => {
    //console.info(`[${FILE_NAME}.getArticleQuantity] articles`, articles);

    let qty = 0;
    articles.forEach(article => {
        if (article.isbn === id){
            qty++;
        }
    });
    return qty;
}

//-------------------------------------------------------------------------
//                            Utils ..
//-------------------------------------------------------------------------

/**
 * Redirect to route view
 * @param {String} route
 * @returns void
 */
export const redirectTo = (route) => {

    const routes = {
        'home-view': {
            path: '/'
        },
        'catalog-view': {
            path: '/catalog'
        },
        'cart-view': {
            path: '/cart'
        }
    };

    if (typeof (routes[route]) === "undefined") {
        throw new Error(`undefined route ${route}`);
    }
    //document.location.href = routes[route];
}


