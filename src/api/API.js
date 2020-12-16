
// -- axios
import axios from 'axios';

/**
 * API
 * @returns void
*/

export default class API {

  	constructor(env = null) {
      console.info(`[${this.constructor.name}]`, env);

      // if (env) {
      //     this.BASE_URL = env.ENV.API_BASE_URL;
      //     this.APP_BASE_URL = env.ENV.APP_BASE_URL;
      // }
      this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
    }

    /**
     * Handle form error messages from Ajax API call
     * https://getbootstrap.com/docs/4.0/components/forms/
     * @param {JSON} error
     * @return string
     */
    static handleAPIErrorMessages(error) {
        //console.info(`[API.handleAPIErrorMessages] error:`, error);

        const errorMessage = {
            title: "",
            body: ""
        };

        if (typeof(error) !== "undefined"){

            // Status
            if (typeof(error.status) !== "undefined"){
                errorMessage.title += `Error ${error.status}`;
            }
            if (typeof(error.statusText) !== "undefined"){
                errorMessage.title += ` : ${error.statusText}`;
            }

            // Body
            if (typeof(error.data) !== "undefined"){

                if (typeof(error.data.errors) !== "undefined") {

                    for (let key in error.data.errors) {
                        errorMessage.body += `${error.data.errors[key]}\n`;
                    }
                }
                else if (typeof(error.data.message) !== "undefined" ){
                    errorMessage.body += `${error.data.message}`;
                }
            }
        }


        // 403 ..
        //let errorMessage = error.responseJSON.message; // global error message

        return errorMessage.title !== "" ? errorMessage : {
            title: "Internal server error",
            body: "Internal server error"
        };
    }


    //-------------------------------------------------------------------------
    //                            Books
    //-------------------------------------------------------------------------

    /**
    * Get all books
      ex : http://henri-potier.xebia.fr/books
    * @returns Promise
    */
    getBooks = async () => {
      console.info(`[${this.constructor.name}.getBooks]`);

      const APIRoute = `${this.BASE_URL}/books`;

      const response = await axios.get(APIRoute)
      .then(json => {
          //console.log(`[${this.constructor.name}.getBooks] json`, json);
          return json.data;
      })
      // .catch(error => {
      //     // TODO : 404 ...
      //     console.error(`[${this.constructor.name}.getBooks]`, error.response);
      // })
      //.finally(() => this.setState({ loading: false }))

      return response;
    }

    //-------------------------------------------------------------------------
    //                            CommercialOffers
    //-------------------------------------------------------------------------

    /**
    * Get commercialOffers for a book
      ex : http://henri-potier.xebia.fr/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff/commercialOffers
    * @param {Array} ids
    * @returns Promise
    */
    getBookCommercialOffers = async (ids) => {
      console.info(`[${this.constructor.name}.getBookCommercialOffers]`, ids);

      const APIRoute = `${this.BASE_URL}/books/${ids.join(",")}/commercialOffers`;

      const response = await axios.get(APIRoute)
      .then(json => {
          //console.log(`[${this.constructor.name}.getBookCommercialOffers] json`, json);
          return json.data;
      })
      // .catch(error => {
      //     // TODO : 404 ...
      //     console.error(`[${this.constructor.name}.getBookCommercialOffers]`, error.response);
      // })
      //.finally(() => this.setState({ loading: false }))

      return response;
    }

}
