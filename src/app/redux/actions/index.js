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
