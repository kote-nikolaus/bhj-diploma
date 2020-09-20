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

  try {
    if (options.method === 'GET') {
      let address = `${options.url}?`;
      for (key in options.data) {
        let parameter = `${key}=${options.data[key]}&`;
        address += parameter;
      }
      address = address.slice(0, -1);
      xhr.open('GET', address);
      xhr.send();
  } else {
    let formData = new FormData();
    for (item in options.data) {
      formData.append(String(item), options.data[item]);
    }
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
  } catch (e) {
      callback(e);
    }
  return xhr;
}
