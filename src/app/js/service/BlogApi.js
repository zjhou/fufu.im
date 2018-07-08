import Prismic from 'prismic-javascript';
import localforage from 'localforage';
import Config from '../../../config/blog.config';
import {Blog, NavItem, Post} from './Dto';
import {resolvePromise} from '../utils/utils';

const queryAPI = function (queryFun, filter, singleResult) {
    return Prismic
        .getApi(Config.apiEndPoint, {})
        .then(queryFun)
        .then(function (response) {
            let results = response.results.map(filter);
            if (singleResult) {
                return Promise.resolve(results[0]);
            }
            else {
                return Promise.resolve({
                    list: results,
                    totalPages: response.total_pages,
                    totalNum: response.total_results_size,
                    prevPage: Boolean(response.prev_page),
                    nextPage: Boolean(response.next_page)
                });
            }
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

const getNavItems = async () => {
    let results = await queryAPI(
        api => api.query(Prismic.Predicates.at('document.type', Config.docType.navItem), {
            orderings: '[document.data.order]',
        }),
        NavItem.translate,
    );
    return await resolvePromise(results.list);
};

const getPosts = async (type, pagenow) => {
    let cachedConfig = await localforage.getItem('blogConfig');
    let results = await queryAPI(
        api => api.query(Prismic.Predicates.at('document.type', type), {
            pageSize: (cachedConfig || Config).pagesize,
            page: pagenow
        }),
        Post.translate
    );
    results.list = await resolvePromise(results.list);
    results.pagenow = pagenow;
    return results;
};

export {getBlogConfig, getNavItems, getPosts};
