

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

export const TAX_RATE = 0.055;

/**
 * Returns distinct articles from cart
 * @param {Object} cart
 * @param {Boolean} returnIdsOnly
 * @returns Array
 */
export const getDistinctCartArticles = (cart, returnIdsOnly= false) => {
    //console.info(`[${FILE_NAME}.getDistinctCartArticles]`, cart, returnIdsOnly);

    const distinctArticlesObj = {};
    let isbn;

    cart.articles.forEach(article => {
        isbn = article.isbn
        distinctArticlesObj[isbn] = article;
    })
    if (returnIdsOnly){
        return Object.keys(distinctArticlesObj);
    }

    const distinctArticles = [];
    for (let isbn in distinctArticlesObj) {
        distinctArticles.push(distinctArticlesObj[isbn]);
    }
    return distinctArticles;
}

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
    //console.info(`[${FILE_NAME}.getCartArticle]`, id, articles);

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
 * @returns Number
 */
export const getArticleQuantity = (articles = [], id) => {
    //console.info(`[${FILE_NAME}.getArticleQuantity]`, articles, id);

    let qty = 0;
    articles.forEach(article => {
        if (article.isbn === id){
            qty++;
        }
    });
    return qty;
}

/**
 * Returns best discount
 * @param {Array} articles
 * @param {Int} id
 * @returns Float
 */
export const getDiscountFromCommercialOffers = (cartSummary, commercialOffers) => {
    //console.info(`[${FILE_NAME}.getDiscountFromCommercialOffers]`, cartSummary, commercialOffers);

    const total_amount_without_discount = cartSummary.total_amount_without_taxes;   // NB : HT !
    let discount = 0;
    const discounts = {};   // store discount type > discount

    if (typeof (commercialOffers.offers) === "undefined"){  // no offers
        return discount;
    }

    // compute discount for each offer type
    let offer;
    for (let key in commercialOffers.offers){
        offer = commercialOffers.offers[key];

        switch (offer.type){

            case 'percentage':
                discounts[offer.type] = total_amount_without_discount * (offer.value/100);
                break;

            case 'minus':
                discounts[offer.type] = offer.value;
                break;

            case 'slice':
                if (typeof (offer.sliceValue) === "undefined" || offer.sliceValue === 0){
                    throw new Error(`Division by 0 !`);
                }
                discounts[offer.type] = parseInt(total_amount_without_discount / offer.sliceValue) * offer.value;
                break;
        }
    }
    //console.log(`[${FILE_NAME}.getDiscountFromCommercialOffers] discounts:`, discounts);

    // get best discount
    const sortables = [];
    for (let type in discounts){
        sortables.push(discounts[type]);
    }
    // reverse sort
    sortables.sort((a,b) => {
        return b - a;
    });
    //console.log(`[${FILE_NAME}.getDiscountFromCommercialOffers] sortables:`, sortables);

    discount = sortables.shift();

    return discount;
}

//-------------------------------------------------------------------------
//                            String
//-------------------------------------------------------------------------

/**
 * Format number
 * @param {Number} num
 * @returns String
 */
export const ccyFormat = (num) => {
    return typeof (num) !== "undefined" ? `${num.toFixed(2)}` : 0;
}

//-------------------------------------------------------------------------
//                            Utils
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


