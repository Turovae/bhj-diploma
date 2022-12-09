/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let error;
  let response;

  try {

    if (options.method === 'GET') {
      let url = options.url;
      if (options.data) {
        url += '?';
        for (let key in options.data) {
          url += `${key}=${options.data[key]}&`;
        }
        url = url.substring(0, url.length - 1);
      }
      
      xhr.open(options.method, url);
      xhr.send();
    } else {
      const formData = new FormData();

      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        response = xhr.response;
        if (!response) {
          error = "Неправильный запрос"
        }
        options.callback(error, response);
      }
    });
  } catch (err) {
    options.callback(err, null);
  }
};
