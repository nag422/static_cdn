import {
    SAVE_PRODUCT,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_FAIL,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS

} from '../actions/types'

import {
    saveProductSuccess,
    
} from '../actions'

/**
 * initial auth user
 */
const INIT_STATE = {
    productissubmitting:false,
    isproductsaved: null,
    products:[]

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {

    switch (action.type) {
        
        case SAVE_PRODUCT_SUCCESS:
            return { ...state, 
                isproductsaved: true 
            };   
        case SAVE_PRODUCT_FAIL:
            return { ...state,
                isproductsaved: false 
            };     
        case GET_PRODUCT_SUCCESS:
            return { ...state,
                    products:action.payload
            }

        default:
            return { ...state };
    }
};