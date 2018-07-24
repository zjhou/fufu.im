const Get = function (url, type) {
    const client = new XMLHttpRequest();
    client.open('GET', url, true);
    if (type) {
        client.responseType = type;
    }

    client.send();
    return function (onSuccess, onError) {
        client.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return false;
            }
            if (this.status === 200) {
                onSuccess(this.response);
            }
            else {
                onError && onError(new Error(this.statusText));
            }
        };
    };
};

const getPosts = (type, pagenow, pagesize, version) => {
    const URL = `https://fufu.im/api/search?`
        + `page=${pagenow}&pageSize=${pagesize}`
        + `&orderings=[document.last_publication_date desc]`
        + `&ref=${version}&q=[[at(document.type, "${type}")]]`;

    return Get(URL, 'json');
};

const getPostsAndSendBack = (type, pagenow, pagesize, ref) => {
    getPosts(type, pagenow, pagesize, ref)(
        (posts) => {
            if(type === 'cat'){
                postMessage({
                    type: 'extractImageUrl',
                    content: extractImageUrl(posts)
                });
            }
            if(type === 'photo'){
                postMessage({
                    type: 'extractPhotoUrl',
                    content: extractPhotoUrl(posts)
                });
            }
            postMessage({
                type: 'loadPage',
                content: {
                    key: type + '-' + pagenow,
                    value: posts
                }
            });
        });
};

const extractPhotoUrl = (response) => {
    return response.results.map(post => post.data.content.url)
};

const extractImageUrl = (response) => {
    let urls = [];
    let getUrlFromPostData = (result) =>
        result.data.content.filter(cont => cont.type === 'image').map(cont => cont.url);

    try {
        response.results.forEach(post => {
            urls = urls.concat(getUrlFromPostData(post));
        });
    }
    catch (e) {
        console.error(e);
        return urls;
    }

    return urls;
};


onmessage = async function (e) {
    let MSG = e.data;
    switch (MSG.type) {
        case 'loadPages':
            MSG.content.types.forEach(type => {
                getPostsAndSendBack(type, MSG.content.pagenow, MSG.content.pagesize, MSG.content.version);
            });
            break;
        case 'loadPage':
            getPostsAndSendBack(MSG.content.type, MSG.content.pagenow, MSG.content.pagesize, MSG.content.version);
            break;
    }
};


