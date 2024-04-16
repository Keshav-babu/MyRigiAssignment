import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAllPostsData, getAllUsersData } from "../api/homeAPI";
import HOME_PAGE_CONSTANTS from "./constant";
import { getAllPostsFailure, getAllPostsSuccess, getAllUsersFailure, getAllUsersSuccess } from "./actions";



export function* getAllUsers(action) {
    try {
        const response = yield call(getAllUsersData,action.data)
        yield put(getAllUsersSuccess(response))
    } catch (error) {
        yield put(getAllUsersFailure(error))
    }
}

export function* getAllPosts(action){

    try {
        const response = yield call(getAllPostsData,action.data)
        yield put(getAllPostsSuccess(response))
        
    } catch (error) {
        yield put(getAllPostsFailure(error))
        
    }
}

export default function* watchHomeRequest() {   
    yield all([
        takeLatest(HOME_PAGE_CONSTANTS.GET_ALL_USERS_REQUEST,getAllUsers),
        takeLatest(HOME_PAGE_CONSTANTS.GET_ALL_POSTS_REQUEST,getAllPosts),
    ])
}

