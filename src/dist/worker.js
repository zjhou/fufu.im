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

const getPosts = (type, pagenow, pagesize) => {
    const URL = `https://fufufu.cdn.prismic.io/api/v2/documents/search?`
        + `page=${pagenow}&pageSize=${pagesize}`
        + `&ref=W0QLwx4AACsEmcZE&q=[[at(document.type, "${type}")]]`;

    return Get(URL);
};

onmessage = async function (e) {
    let blogInfo = e.data;
    blogInfo.types.map(type => {
        getPosts(type, 1, blogInfo.pagesize)((posts) => {
            postMessage({
                key: type + '-' + 1,
                value: JSON.parse(posts)
            });
        })
    })
};


