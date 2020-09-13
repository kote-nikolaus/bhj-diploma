/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback) {
    return createRequest({
      url: this.URL,
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    data._method = 'PUT';
    return createRequest({
      url: this.URL,
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: callback,
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id, data, callback) {
    return createRequest({
      url: `${this.URL}/${id}`,
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id, data, callback) {
    data.id = id;
    data._method = 'DELETE';
    return createRequest({
      url: this.URL,
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: callback,
    });
  }
}
