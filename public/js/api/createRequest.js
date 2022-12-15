/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  
  if (options.method === 'GET') {
    let url = options.url;

    if (options.data) {
      url += '?';
      for (let key in options.data) {
        url += `${key}=${options.data[key]}&`;
      }
      url = url.substring(0, url.length - 1);
    }

    try {
      xhr.open(options.method, url);
      xhr.send();
    } catch (err) {
      options.callback(err, null);
    }
  } else {
    const formData = new FormData();

    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }

    try {
      xhr.open(options.method, options.url);
      xhr.send(formData);
    } catch (err) {
      options.callback(err, null);
    }
  }

  xhr.addEventListener('load', () => {
    options.callback(xhr.error, xhr.response)
  })
};
