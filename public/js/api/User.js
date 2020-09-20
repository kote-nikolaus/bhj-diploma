/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem('user') && localStorage.user) {
      let user = localStorage.user;
      return JSON.parse(user);
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback) {
    let xhr = createRequest({
      url: `${User.URL}/current`,
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: function(err, response) {
        if (response && response.user) {
          User.setCurrent(data);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
    return xhr;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    let xhr = createRequest({
      url: `${User.URL}/login`,
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: function(err, response) {
        if (response && response.user) {
          User.setCurrent(response.user);

        }
        callback(err, response);
      }
    });
    return xhr;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    let xhr = createRequest({
      url: `${User.URL}/register`,
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: function(err, response) {
        if (response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
    return xhr;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    let xhr = createRequest({
      url: `${User.URL}/logout`,
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: function(err, response) {
        if (response && response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
    return xhr;
  }
}
