export const switchPostType = (postType = '') => ({
    type: 'SWITCH_POST_TYPE',
    activePostsType: postType
});

export const gotoPage = (pagenow) => ({
    type: 'GOTO_PAGE',
    pagenow
});

export const nextPage = (pagenow) => ({
    type: 'NEXT_PAGE',
    nextPage: pagenow + 1
});

export const prevPage = (pagenow) => ({
    type: 'PREV_PAGE',
    prevPage: pagenow - 1
});

export const fetchPosts = (isDone) => ({
    type: 'FETCH_POSTS',
    done: isDone
});

export const fetchPostsDone = (status, response) => ({
    type: 'FETCH_POSTS_DONE',
    posts: status === 'ERROR' ? {} : response
});
