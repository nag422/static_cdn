/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './Auth';
import productSagas from './Product'
import ProfileSagas from './Profile'

export default function* rootSaga(getState) {

    yield all([
        authSagas(),
        productSagas(),
        ProfileSagas(),
    ]);


}


