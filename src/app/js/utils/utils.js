import localforage from 'localforage';
import Config from '../../../config/blog.config';

const Get = function (url, type) {
    return new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            }
            else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();

        client.open('GET', url, true);
        if (type) {
            client.responseType = type;
        }

        client.onreadystatechange = handler;
        client.send();
    });
};

const dateFormatter = (dataStr) => {
    let dt = new Date(dataStr);
    let mm = dt.getMonth() + 1; // getMonth() is zero-based
    let dd = dt.getDate();
    let hh = dt.getHours();
    let MM = dt.getMinutes();
    let add0 = num => num < 10 ? '0' + num : num;
    return `${dt.getFullYear()}-${add0(mm)}-${add0(dd)}  ${add0(hh)}:${add0(MM)}`;
};

const resolvePromise = async (promiseArray) => {
    let results = [];
    await promiseArray.reduce((acc, p) => p.then(result => results.push(result)), Promise.resolve);
    return results;
};

const preloadImage = (url) => {
    if(!url) return;
    if(url.includes(Config.cdnImgPath)){
        url = url.replace(Config.cdnImgPath, Config.localImgPath);
    }
    let image = new Image();
    image.src = url;
};

const getImage = async (url, blob) => {
    if(url.includes(Config.cdnImgPath)){
        url = url.replace(Config.cdnImgPath, Config.localImgPath);
    }
    let image = document.createElement('img');
    let imageBlob = blob || await localforage.getItem(url);
    if(!imageBlob) {
        try{
            imageBlob = await Get(url, 'blob');
        }catch (e){
            throw e;
        }
        localforage.setItem(url, imageBlob);
    }
    return new Promise(async function (resolve, reject) {
        image.src = window.URL.createObjectURL(imageBlob);
        image.onload = function () {
            window.URL.revokeObjectURL(image.src);
            resolve(image);
        };
        image.onerror = function () {
            reject('failed to load image');
        };
    });
};

const daysFrom = start => {
    let currentMs = (new Date()).getTime();
    let startMs= (new Date(start)).getTime();
    return parseInt((currentMs - startMs) / 1000 / 60 / 60 / 24);
};

export {getImage, Get, dateFormatter, resolvePromise, daysFrom, preloadImage};
