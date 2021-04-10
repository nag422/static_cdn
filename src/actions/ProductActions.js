/* eslint-disable no-sequences */

/* 
* Product Actions
* Product CRUD operations
*/
import {
    SAVE_PRODUCT, 
    CREATOR_SAVE_PRODUCT,
    GET_REQUEST_DATA
    

} from './types'


/** Redux action for save_product */

export const saveProduct = (values,history) => (
    console.log('save_product_triggered',values),
   {
       type:SAVE_PRODUCT,
       payload:{values,history}
   }
)


// Request Product creator
export const requestProduct = (values,history) => (
    console.log('request_product_triggered',values),
   {
       type:CREATOR_SAVE_PRODUCT,
       payload:{values,history}
   }
)



// Retrieving data

export const getallproducts = (pageNumber) => (
    console.log('get_products_triggered'),
   {
       type:GET_REQUEST_DATA,
       payload:{pageNumber}
      
   }
)