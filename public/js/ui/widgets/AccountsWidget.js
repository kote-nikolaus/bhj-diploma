/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      const constructorError = new Error('Конструктор пуст');
      throw constructorError;
    } else {
      this.element = element;
      this.update();
      this.registerEvents();
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let createAccountButton = document.getElementsByClassName('create-account').item(0);
    createAccountButton.addEventListener('click', function() {
      App.getModal('createAccount').open();
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let that = this;
    if (User.current() !== undefined) {
      Account.list(User.current(), function(err, response) {
        if (response.success) {
          that.clear();
          that.renderItem(response.data);
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accounts = Array.from(document.getElementsByClassName('account'));

    for (let i = 0; i < accounts.length; i++) {
      accounts[i].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    let activeAccount = document.getElementsByClassName('active').item(0);
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    } else {
      if (activeAccount) {
        activeAccount.classList.remove('active');
      }
      element.classList.add('active');
    }
    App.showPage('transactions', {account_id: element.dataset.id});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let newAccount = document.createElement('li');
    newAccount.className = 'account';
    newAccount.dataset.id = item.id;
    newAccount.innerHTML = `<a href="#"><span>${item.name}</span> <span>${item.sum} ₽</span></a>`;
    return newAccount;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    for (let i = 0; i < item.length; i++) {
      this.element.appendChild(this.getAccountHTML(item[i]));
    }

    let accounts = Array.from(document.getElementsByClassName('account'));
    for (let i = 0; i < accounts.length; i++) {
      let that = this;
      accounts[i].addEventListener('click', function(e) {that.onSelectAccount(this)});
    };

  }
}
