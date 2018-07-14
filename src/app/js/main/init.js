import {getBlogConfig, getBlogVer, getNavItems} from '../service/BlogApi';
import localforage from 'localforage';
import Config from '../../../config/blog.config';
import {preloadImage} from '../utils/utils';

export default async function () {
    window.onbeforeunload = function() {
        localforage.clear();
    };
    const blogConfig = await getBlogConfig();
    const navItems = await getNavItems();
    const ver = await getBlogVer();

    if (window.Worker && Config.enableWorker) {
        let savePosts = (posts) => {
            let hasContent = posts.value.results && posts.value.results.length;
            localforage.setItem(posts.key, hasContent ? posts.value : 'NULL');
        };
        window.WORKER = new Worker('./worker.js');
        window.WORKER.postMessage({
            type: 'loadPages',
            content: {
                version: ver,
                pagenow: 1,
                pagesize: blogConfig.pagesize,
                types: navItems.map(item => item.text)
            }
        });
        window.WORKER.onmessage = function (e) {
            let MSG = e.data;
            switch (MSG.type) {
            case 'loadPage':
                savePosts(MSG.content);
                break;
            case 'loadPages':
                savePosts(MSG.content);
                break;
            case 'extractImageUrl':
                MSG.content.forEach(preloadImage);
            }
        };
    }

    return {
        config: blogConfig,
        navItems: navItems,
        activePostsType: blogConfig.defaultType
    };
}