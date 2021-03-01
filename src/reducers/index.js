/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import authUserReducer from './AuthUserReducer';
import productReducer from './ProductReducer';



const reducers = combineReducers({

    
  authUser: authUserReducer,
  productSave:productReducer
    

});

export default reducers;
