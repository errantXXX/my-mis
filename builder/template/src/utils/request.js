import FormData from 'form-data';
import fetch from 'dva/fetch';
import lodash from 'lodash';

function parseJSON(response) {
  return response.json();
}

function parseQuerystring(obj) {
  let result = '';
  if (obj) {
    let tmp = [];
    lodash.map(obj, (value, key) => {
      tmp.push(`${key}=${value}`);
    });
    result = tmp.join('&');
  }
  return result;
}

function checkStatus(response) {
  if (response.status != 401) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {number} time      The time is request timeout time
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options, time) {
  if (options.method.toUpperCase() === 'POST') {
    let form = null;
    form = new FormData();
    Object.keys(options.body).forEach(key => form.append(key, options.body[key]));
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: options.method,
        body: form,
      })
        .then(resolve)
        .catch(reject);
      (time && typeof time == 'number') && setTimeout(() => {
        reject('timeout');
      }, time);
    }).then(checkStatus)
      .then(parseJSON)
      .then(data => ({data}))
      .catch(err => ({err}));
  } else {
    let queryString = parseQuerystring(options.query);
    url = url.indexOf('?') > 0 ? encodeURI(url) + '&' + queryString.replace(/\#/g, "%23")
      : encodeURI(url) + '?' + queryString.replace(/\#/g, "%23");
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: options.method,
      }).then(resolve);
      (time && typeof time == 'number') && setTimeout(() => {
        reject('timeout');
      }, time);
    }).then(checkStatus)
      .then(parseJSON)
      .then(data => ({data}))
      .catch(err => ({err}));
  }
}
