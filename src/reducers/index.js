/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import authUserReducer from './AuthUserReducer';
import productReducer from './ProductReducer';
import profileReducer from './ProfileReducer';



const reducers = combineReducers({

    
  authUser: authUserReducer,
  productSave:productReducer,
  profileops:profileReducer
    

});

export default reducers;
