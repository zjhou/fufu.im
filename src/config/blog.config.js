const config = {
    apiEndPoint: 'https://fufufu.prismic.io/api/v2',
    enableWorker: true,
    isMobile: window.matchMedia('(max-width: 500px)').matches,
    pagesize: 10,
    docType: {
        blog: 'fufuim',
        navItem: 'nav-item',
        cat: 'cat',
        diary: 'diary',
        food: 'food',
        list: 'list',
        music: 'music',
        photo: 'photo',
    }
};

export default config;