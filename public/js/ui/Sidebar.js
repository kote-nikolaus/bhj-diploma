/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    let body = document.getElementsByTagName('body').item(0);
    let toggleButton = document.getElementsByClassName('sidebar-toggle').item(0);

    toggleButton.addEventListener('click', function() {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
      return false;
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let signUpButton = document.getElementsByClassName('menu-item_register').item(0);
    signUpButton.addEventListener('click', function() {
      App.getModal('register').open();
    });

    let signInButton = document.getElementsByClassName('menu-item_login').item(0);
    signInButton.addEventListener('click', function() {
      App.getModal('login').open();
    });

    let logoutButton = document.getElementsByClassName('menu-item_logout').item(0);
    logoutButton.addEventListener('click', function() {
      User.logout(User.current(), function(err, response) {
        if (response.success) {
          App.setState('init');
        }
      });
    });
  }

}
