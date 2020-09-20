/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Виджет отсутствует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let removeAccountButton = document.getElementsByClassName('remove-account').item(0);
    removeAccountButton.addEventListener('click', e => this.removeAccount(e));

    this.element.addEventListener('click', e => this.removeTransaction(e.target.dataset.id));
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      let result = confirm('Вы действительно хотите удалить счёт?');
      if (result) {
        Account.remove(this.lastOptions.account_id, this.lastOptions, function(err, response) {
          if (response.success) {
            App.update();
          }
        })
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    let button = document.querySelector(`[data-id=${id}]`);
    if (button) {
      let result = confirm('Вы действительно хотите удалить эту транзакцию?');
      if (result) {
        Transaction.remove(id, {}, function(err, response) {
          if (response.success) {
            App.update();
          }
        })
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, options.data, (err, response) => {
        if (response.success) {
          this.renderTitle(response.data.name);
        }
      });
      Transaction.list(options, (err, response) => {
        if (response.success) {
          this.renderTransactions(response.data);
        }
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    let data = [];
    this.renderTransactions(data);
    let name = 'Название счета'
    this.renderTitle(name);
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    let title = document.getElementsByClassName('content-title').item(0);
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();

    function addZero(time) {
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    }

    let hours = addZero(newDate.getHours());
    let minutes = addZero(newDate.getMinutes());

    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let newTransaction = document.createElement('div');
    newTransaction.className = `transaction transaction_${item.type} row`;
    let date = this.formatDate(item.created_at);

    newTransaction.innerHTML = `<div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${date}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">${item.sum}<span class="currency">₽</span></div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>
        </button>
    </div>`
    return newTransaction;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let transactionsList = document.getElementsByClassName('content').item(0);
    transactionsList.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      let transaction = this.getTransactionHTML(data[i]);
      transactionsList.appendChild(transaction);
    }
  }
}
