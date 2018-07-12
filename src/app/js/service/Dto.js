import {dateFormatter, getImage} from '../utils/utils';
import Render from './prismicLib/richtext';
import {renderToString} from 'react-dom/server';
import config from '../../../config/blog.config';

function Blog() {
    this.title = '';
    this.email = '';
    this.pagesize = '';
}

Blog.translate = function (prismicResult) {
    let blog = new Blog();
    blog.title = prismicResult.data.title[0].text;
    blog.email = prismicResult.data.email;
    blog.defaultType = prismicResult.data.defaulttype;
    blog.pagesize = prismicResult.data.pagesize;
    return blog;
};

function NavItem() {
    this.text = '';
    this.icon = '';
    this.highlightIcon = '';
}

NavItem.translate = async function (prismicResult) {
    let navItem = new NavItem();
    navItem.text = prismicResult.data.name;
    navItem.order = Number(prismicResult.data.order);
    navItem.icon = await getImage(prismicResult.data.icon.url);
    navItem.highlightIcon = await getImage(prismicResult.data['highlight-icon'].url);
    return navItem;
};

function Post() {
    this.title = '';
    this.type = '';
    this.date = '';
    this.content = '';
}

async function contentFormatter(post) {
    switch (post.type) {
    case config.docType.cat :
        return renderToString(Render(post.data.content));
    case config.docType.photo:
        return await getImage(post.data.content.url);
    default:
        return post.data.content[0].text;
    }
}

Post.translate = async function (prismicResult) {
    let post = new Post();
    post.type = prismicResult.type || '';
    if(prismicResult.data.title){
        post.title = prismicResult.data.title || '';
    }
    if(prismicResult.data.date){
        post.date = dateFormatter(prismicResult.data.date);
    }
    post.content = await contentFormatter(prismicResult);
    return post;
};

export {Blog, NavItem, Post};