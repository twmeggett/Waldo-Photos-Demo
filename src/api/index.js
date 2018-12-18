import fetch from 'isomorphic-fetch';
import cookies from 'browser-cookies';

export default function baseApi(type, url, data, callback, error, opts) {
  let options = opts || {};
  const params = {
    method: type,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: options.accept ? options.accept : 'application/json',
      // 'X-CSRFToken': cookies.get('csrftoken'),
    },
  };

  if (data) {
    params.body = data;
  }

  return fetch(url, params)
    .then(response => {
      if (!response.ok && error) {
        throw response;
      }

      const cdHeader = response.headers.get('content-disposition');
      if (cdHeader !== null && cdHeader.indexOf('attachment') !== -1) {
          // NOTE: Edge seems to crash when dealing with response.blob() for very large responses
        return response.blob();
      } else if (!options.accept) {
        return type !== 'DELETE' ? response.json() : {};
      } else {
        return type !== 'DELETE' ? response.text() : {};
      }
    })
    .then((respData) => {
      // We only get here if the response was ok (2xx)
      if (window.gDebugEnabled) {
        console.log(respData); // Turn off for production
      }
      callback(respData);
    })
    .catch((response) => {
      // We only get here if the response was not ok (2xx)
      if (response instanceof TypeError) {
        if (error) {
          error(response.message);
        } else {
          console.log(response);
        }
      } else if (typeof response.json === 'function') {
        response.json().then((json) => {
          if (error) {
            if (json.error) {
              error(json.error);
            } else {
              let errorString = '';

              if (typeof json === 'string') {
                errorString = json;
              } else {
                for (const key in json) {
                  if (json.hasOwnProperty(key)) {
                    errorString += `${key} - ${json[key]}. `;
                  }
                }
              }

              error(`${response.status} - ${response.statusText}: ${errorString}`);
            }
          } else {
            console.log(response.status);
            console.log(response.statusText);
            console.log(json);
          }
        });
      } else {
        response.text().then((respData) => {
          if (error) {
            error(`${response.status} - ${response.statusText}: ${respData}`);
          } else {
            console.log(response.status);
            console.log(response.statusText);
            console.log(respData);
          }
        });
      }
    });
}

export function del(url, callback, error) {
  return baseApi('DELETE', url, null, callback, (msg) => {
    if (error) {
      error(msg);
    }
  });
}

export function get(url, callback, error) {
  return baseApi('GET', url, null, callback, (msg) => {
    if (error) {
      error(msg);
    }
  });
}

export function post(url, data, callback, error) {
  return baseApi('POST', url, data, callback, (msg) => {
    if (error) {
      error(msg);
    }
  });
}

export function postHTMLRes(url, data, callback, error) {
  return baseApi('POST', url, data, callback, (msg) => {
    if (error) {
      error(msg);
    }
  }, { accept: 'text/html' });
}

export function put(url, data, callback, error) {
  return baseApi('PUT', url, data, callback, (msg) => {
    if (error) {
      error(msg);
    }
  });
}
