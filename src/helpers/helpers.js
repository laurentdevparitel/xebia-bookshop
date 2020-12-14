
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
    console.info(`[helpers.searchOnProperty]`, data, value, property);

    const PATTERN = new RegExp(value, 'i');
    //console.info(`[helpers.searchOnProperty] PATTERN`, PATTERN);

    return data.filter( d => {
        if (typeof (d[property]) === "undefined"){
            throw new Error(`undefined property ${property} on object ${d}`);
        }
        return PATTERN.test(d[property])
    });
};