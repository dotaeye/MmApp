import config from '../common/config';
import Storage from './Storage';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

const timeout = 15000;

function formatUrl(path) {
  let adjustedPath = path[0] !== '/' ? '/' + path : path;
  adjustedPath = config.apiRoot + adjustedPath;
  return adjustedPath;
}

function getSaveKey(endpoint, params, data) {
  return endpoint + getStringParams(params) + getStringParams(data)
}

function getStringParams(data) {
  let result = '';
  if (data) {
    for (let key in data) {
      if(data[key]) {
        result += `&${key}=${data[key]}`;
      }
    }
  }
  return result;
}

function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("请求超时,请刷新再试"));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  })
}

export default class Request {

  constructor() {

    methods.forEach((method) =>

      this[method] = (endpoint,
        {
          params,
          data,
          headers,
          token,
          login,
          formJson,
          formString,
          saved,
          saveKey,
          fullPath

        } = {}) => {

        let path = fullPath ? endpoint : formatUrl(endpoint);

        let options = {
          method: method.toUpperCase()
        };

        if (headers) {
          options.headers = headers
        }

        if (formJson) {
          options.headers = Object.assign({}, options.headers, {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          });
        }

        if (token) {
          options.headers = Object.assign({}, options.headers, {
            'Authorization': 'Bearer ' + token
          });
        }

        if (params) {
          let queryString = '?_t=' + new Date().getTime();
          path += queryString + getStringParams(params);
        }

        if (data) {
          if (formJson) {
            options.body = formString ? data : JSON.stringify(data);
          } else {
            options.body = getStringParams(data).substr(1);
          }
        }
        if (saved) {
          let storeKey = saveKey || getSaveKey(endpoint, params, data);
          return new Promise((resolve, reject) => {
            Storage.get(storeKey)
              .then(source=>JSON.parse(source))
              .then(res=> {
                if (!res) {
                  timeoutFetch(timeout, fetch(path, options))
                    .then((response)=> {
                      if (response.ok) {
                        return response;
                      } else {
                        throw new Error('server handle error');
                      }
                    })
                    .then((response)=>response.json())
                    .then(result=> {
                      if (login) {
                        resolve(result);
                      } else {
                        if (result.code == 0) {
                          Storage.save(storeKey, JSON.stringify(result.data));
                          resolve(result.data);
                        }
                        else {
                          reject(result.info)
                        }
                      }
                    })
                    .catch(err=> {
                      console.log(err);
                      reject(err);
                    })
                }
                else {
                  resolve(res);
                }
              })
              .catch(err=> {
                console.log(err);
                reject(err);
              })
          });

        } else {
          return new Promise((resolve, reject) => {
            timeoutFetch(timeout, fetch(path, options))
              .then((response)=> {
                if (response.ok) {
                  return response;
                } else {
                  throw new Error('server handle error');
                }
              })
              .then((response)=> {
                return response.json()
              })
              .then((result) => {
                if (login) {
                  resolve(result);
                } else {
                  if (result.code == 0) {
                    resolve(result.data);
                  }
                  else {
                    reject(result.info)
                  }
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
        }
      })
  }
}
