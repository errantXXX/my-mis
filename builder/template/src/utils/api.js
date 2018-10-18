import request from './request';
const host = require('../config');

let token = null;
export async function getApi(query, url, apiBase = 'apibase', auth = true, path = 'ofo-kefu-api/') {
  const queryObj = query || {};
  if (auth) {
    queryObj.token = token
  }

  let perfixUrl = host[apiBase];

  let rUrl = perfixUrl + path + url;
  return request(rUrl, {
    credentials: 'include',
    method: 'GET',
    query: queryObj,
  });
}

export async function api(form, url, time, apiBase = 'apibase', auth = true, path = 'ofo-kefu-api/') {
  const bodyForm = form || {};
  if (auth) {
    bodyForm.token = token
  }
  bodyForm.time = new Date().getTime();
  let perfixUrl = host[apiBase];

  let rUrl = perfixUrl + path + url;

      // 联调指向后端地址
    // if (url.indexOf('order/list') > -1) {
    //   rUrl = 'http://10.200.51.174:9092' + url;
    // }
  return request(rUrl, {
    method: 'POST',
    body: bodyForm,
  }, time);
}
export async function apiDirect(form, url, time, apiBase = 'apibase', auth = true, path = 'ofo-kefu-api/') {
  const bodyForm = form || {};

  bodyForm.time = new Date().getTime();
      // 联调指向后端地址
    // if (url.indexOf('order/list') > -1) {
    //   rUrl = 'http://10.200.51.174:9092' + url;
    // }
  return request(url, {
    method: 'POST',
    body: bodyForm,
  }, time);
}
export function setToken(t) {
  token = t;
}
export async function getDirect(query, url, apiBase = 'apibase', auth = true, path = 'ofo-kefu-api/') {
  const queryObj = query || {};


  return request(url, {
    credentials: 'include',
    method: 'GET',
    query: queryObj,
  });
}