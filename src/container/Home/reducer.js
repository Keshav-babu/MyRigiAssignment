import HOME_PAGE_CONSTANTS from "./constant";


const initialState={
    isUsersLoading:false,
    isPostsLoading:true,
    allUsers:[],
    allPost:[]
}

const homeReducer=(state=initialState,action)=>{    
    switch(action.type)    {
        case HOME_PAGE_CONSTANTS.GET_ALL_USERS_SUCCESS:
            return{
                ...state,
                allUsers:action.data,
                isUsersLoading:true

            }
        case HOME_PAGE_CONSTANTS.GET_ALL_USERS_FAILURE:
            return{
                ...state,
                isUsersLoading:false
            }
        case HOME_PAGE_CONSTANTS.GET_ALL_POSTS_REQUEST:
            return{
                ...state,
                isPostsLoading:true
            }
        case HOME_PAGE_CONSTANTS.GET_ALL_POSTS_SUCCESS:
            return{
                ...state,
                allPost:[...state.allPost,...action.data.data||action.data],
                pagination:action.data.pagination,
                isPostsLoading:false,
                hasMore:action.data?.pagination?.hasMore
            }
        case HOME_PAGE_CONSTANTS.GET_ALL_POSTS_FAILURE:
            return{
                ...state,
                isPostsLoading:false
            }
        case HOME_PAGE_CONSTANTS.CLEAR_ALL_POSTS:
            return{
                ...state,
                allPost:[]
            }
        default:
        return {
            ...state
        }
    }

}

export default homeReducer;