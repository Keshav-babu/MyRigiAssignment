import { all } from 'redux-saga/effects';

import homeSaga from "../Home/saga";
import postSaga from "../Post/saga";
export default function* rootSaga() {
    yield all([
        homeSaga(),
        postSaga()
    ])
}