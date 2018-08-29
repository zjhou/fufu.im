import { combineReducers } from 'redux';

const activePostsType = (state = null, action) => {
    if(action.type === 'SWITCH_POST_TYPE'){
        return  action.activePostsType;
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
});
