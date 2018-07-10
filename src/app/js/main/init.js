import {getBlogConfig, getNavItems} from '../service/BlogApi';
import localforage from 'localforage';
import Config from '../../../config/blog.config';

export default async function () {
    const blogConfig = await getBlogConfig();
    const navItems = await getNavItems();
    localforage.setItem('blogConfig', blogConfig);

    if(window.Worker && Config.enableWorker){
        const WORKER = new Worker('./worker.js');
        WORKER.postMessage({
            pagesize: blogConfig.pagesize,
            types: navItems.map(item => item.text)
        });
        WORKER.onmessage = function (e) {
            let posts = e.data;
            localforage.setItem(posts.key, posts.value);
        };
    }

    return {
        config: blogConfig,
        navItems: navItems,
        activePostsType: blogConfig.defaultType
    };

}