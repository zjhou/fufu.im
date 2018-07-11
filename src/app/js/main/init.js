import {getBlogConfig, getBlogVer, getNavItems} from '../service/BlogApi';
import localforage from 'localforage';
import Config from '../../../config/blog.config';

export default async function () {
    const blogConfig = await getBlogConfig();
    const navItems = await getNavItems();
    const ver = await getBlogVer();
    blogConfig.version = ver;
    localforage.setItem('blogConfig', blogConfig);

    if(window.Worker && Config.enableWorker){
        window.WORKER = new Worker('./worker.js');
        window.WORKER.postMessage({
            type: 'init',
            content: {
                version: ver,
                pagesize: blogConfig.pagesize,
                types: navItems.map(item => item.text)
            }
        });
        window.WORKER.onmessage = function (e) {
            let posts = e.data;
            let hasContent = posts.value.results && posts.value.results.length;
            localforage.setItem(posts.key, hasContent ? posts.value  : 'NULL');
        };
    }

    return {
        config: blogConfig,
        navItems: navItems,
        activePostsType: blogConfig.defaultType
    };

}