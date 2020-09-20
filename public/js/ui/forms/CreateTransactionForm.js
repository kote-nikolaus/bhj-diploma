/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current() !== undefined) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          let accountsList = this.element.closest('.modal').querySelector('.accounts-select');
          accountsList.innerHTML = '';
          for (let i = 0; i < response.data.length; i++) {
          let account = document.createElement('option');
            account.value = response.data[i].id;
            account.innerHTML = response.data[i].name;
            accountsList.appendChild(account);
          }
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response.success) {
        this.element.reset();
        let modalName = this.element.closest("[class='modal fade in']").dataset.modalId;
        App.getModal(modalName).close();
        App.update();
      }
    })
  }
}
