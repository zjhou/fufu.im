import Prismic from 'prismic-javascript';
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

const queryAPI = function (queryFun, filter, singleResult) {
    return Prismic
        .getApi(Config.apiEndPoint, {})
        .then(queryFun)
        .then(function (response) {
            return respFormatter(response, filter, singleResult);
        }, function (err) {
            return Promise.reject(err);
        });
};

const getBlogConfig = async () => {
    let config = await queryAPI(
        api => api.query(Prismic.Predicates.at('document.type', Config.docType.blog)),
        Blog.translate,
        true
    );
    await localforage.setItem('blogConfig', config);
    return config;
};

const getBlogVer = async () => JSON.parse(await Get(Config.apiEndPoint)).refs[0].ref;

const getNavItems = async () => {
    let results = await queryAPI(
        api => api.query(Prismic.Predicates.at('document.type', Config.docType.navItem), {
            orderings: '[document.data.order]',
        }),
        NavItem.translate,
    );
    let items = await resolvePromise(results.list);
    return items.sort((a, b) => a.order > b.order);
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
            api => api.query(Prismic.Predicates.at('document.type', type), {
                pageSize:pagesize,
                page: pagenow
            }),
            Post.translate
        );
    if(hasNextPage){
        await getPostsWithWorker(type, pagenow + 1, pagesize, cachedConfig.version);
    }
    results.list = await resolvePromise(results.list);
    results.pagenow = pagenow;
    return results;
};

export {getBlogConfig, getNavItems, getPosts, getBlogVer};
