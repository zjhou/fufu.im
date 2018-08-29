import { combineReducers } from 'redux';

const activePostsType = (state = null, action) => {
    if(action.type === 'SWITCH_POST_TYPE'){
        return  action.activePostsType;
    } else {
        return state;
    }
};

const posts = (state = {}, action) => {
    if( action.type === 'FETCH_POSTS_DONE' ) {
        return action.posts;
    }else{
        return state;
    }
};

const loadingPosts = (state = false, action) => {
    if( action.type === 'FETCH_POSTS') {
        return !action.done;
    } else {
        return state;
    }
};

const pagenow = (state = 1, action) => {
    switch (action.type) {
    case 'GOTO_PAGE': return action.pagenow;
    case 'NEXT_PAGE': return action.nextPage;
    case 'PREV_PAGE': return action.prevPage;
    default: return state;
    }
};

export default combineReducers({
    activePostsType,
    pagenow,
    posts,
    loadingPosts
});
