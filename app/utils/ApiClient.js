import {config} from '../common/constants';
import Storage from './Storage';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

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
      result += `&${key}=${data[key]}`;
    }
  }
  return result;
}

export default class ApiClient {

  constructor() {

    methods.forEach((method) =>

      this[method] = (endpoint,
        {
          params,
          data,
          headers,
          auth,
          saved,
          saveKey

        } = {}) => {

        let path = formatUrl(endpoint);

        let options = {
          method: method.toUpperCase()
        };

        if (headers) {
          options.headers = headers
        }

        if (auth) {
          const bearerToken = storage.get(configs.authToken).access_token;
          options.headers = Object.assign({}, options.headers, {
            'Authorization': 'Bearer ' + bearerToken
          });
        }

        if (params) {
          let queryString = '?_t=' + new Date().getTime();
          path += queryString + getStringParams(params);
        }

        if (data) {
          options.body = getStringParams(data).substr(1);
        }
        if (saved) {
          let storeKey = saveKey || getSaveKey(endpoint, params, data);
          return new Promise((resolve, reject) => {
            Storage.get(storeKey)
              .then(source=>JSON.parse(source))
              .then(res=> {
                if (!res) {
                  fetch(path, options)
                    .then((response)=>response.json())
                    .then(responseJSON=> {
                      Storage.save(storeKey, JSON.stringify(responseJSON));
                      resolve(responseJSON);
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
            fetch(path, options)
              .then((response) => {
                return response.json();
              })
              .then((responseData) => {
                resolve(responseData);
              })
              .catch((error) => {
                reject(error);
              });
          })
        }
      })
  }
}
