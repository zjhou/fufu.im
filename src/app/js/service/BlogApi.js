import localforage from 'localforage';
import Config from '../../../config/blog.config';
import {Blog, NavItem, Post} from './Dto';
import {Get, resolvePromise} from '../utils/utils';

const respFormatter = (resp, filter, singleResult) => {
    if(resp === 'NULL' && !singleResult) {
        return Promise.resolve({
            list: [],
            totalPages: 0,
            totalNum: 0,
            prevPage: false,
            nextPage: false,
        });
    }
    let results = resp.results.map(filter);
    if (singleResult) {
        return Promise.resolve(results[0]);
    }
    else {
        return Promise.resolve({
            list: results,
            totalPages: resp.total_pages,
            totalNum: resp.total_results_size,
            prevPage: Boolean(resp.prev_page),
            nextPage: Boolean(resp.next_page)
        });
    }
};

const queryAPI = async function (option, filter, singleResult) {
    const blogConfig = localforage.getItem('blogConfig');
    const URL = `${Config.apiEndPoint}/documents/search?`
        + `page=${option.pagenow}&pageSize=${option.pagesize || (blogConfig || Config).pagesize}`
        + `&orderings=[${option.orderings}]`
        + `&ref=${await getBlogVer()}&q=[[at(document.type, "${option.type}")]]`;

    return Get(URL, 'json')
        .then(response => respFormatter(response, filter, singleResult))
        .catch(Promise.reject);
};

const getBlogConfig = async () => {
    let cachedConfig = await localforage.getItem('blogConfig');
    if(cachedConfig) return cachedConfig;

    let config = await queryAPI(
        {
            pagesize: 1,
            type: Config.docType.blog,
            pagenow: 1
        },
        Blog.translate,
        true
    );
    await localforage.setItem('blogConfig', config);
    return config;
};

const getBlogVer = async () => {
    let cachedVer = await localforage.getItem('blogVer');
    if(cachedVer) return cachedVer;
    let ver = JSON.parse(await Get(Config.apiEndPoint)).refs[0].ref;
    await localforage.setItem('blogVer', ver);
    return ver;
};

const getNavItems = async () => {
    let results = await queryAPI(
        {
            type: Config.docType.navItem,
            pagenow: 1,
            pagesize: 6,
            orderings: 'document.data.order'
        },
        NavItem.translate,
    );
    let items = await resolvePromise(results.list);
    return items.sort((a, b) => a.order - b.order);
};

const getPostsWithWorker = async (type, pagenow, pagesize, version) => {
    let hasCached = (await localforage.keys()).includes(`${type}-${pagenow}`);
    if(!window.Worker || !Config.enableWorker || hasCached){ return false;}
    window.WORKER.postMessage({
        type: 'loadPage',
        content: {
            type,
            version,
            pagenow,
            pagesize
        }
    });
};
const getPosts = async (type, pagenow, hasNextPage) => {
    let cachedConfig = await localforage.getItem('blogConfig');
    let cachedPosts = await localforage.getItem(`${type}-${pagenow}`);
    let pagesize = (cachedConfig || Config).pagesize;
    let results = cachedPosts
        ? await respFormatter(cachedPosts, Post.translate)
        : await queryAPI(
            {
                type: type,
                pagesize: pagesize,
                pagenow: pagenow
            },
            Post.translate
        );
    if(hasNextPage){
        await getPostsWithWorker(type, pagenow + 1, pagesize, await getBlogVer());
    }
    results.list = await resolvePromise(results.list);
    results.pagenow = pagenow;
    return results;
};

export {getBlogConfig, getNavItems, getPosts, getBlogVer};
