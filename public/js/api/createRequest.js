/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        options.callback(null, JSON.parse(this.response));
      } else {
        options.callback(this.status);
      }
    }
  })

  if (options.method === 'GET') {
    let address = `${options.url}?mail=${options.data.email}&password=${options.data.password}`;
    try {
      xhr.open('GET', address);
      xhr.send();
    }  catch (e) {
      callback(e);
    }
  } else {
    let formData = new FormData();
    for (item in options.data) {
      formData.append(String(item), options.data[item]);
    }
    //formData.append('email', options.data.email);
    //formData.append('password', options.data.password);
    try {
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }  catch (e) {
      callback(e);
    }
  }
  return xhr;
};
