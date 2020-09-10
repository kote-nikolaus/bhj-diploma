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
      Account.list(User.current(), function(err, response) {
        if (response.success) {
          let accountsList = document.getElementById('expense-accounts-list');
          //let incomeAccountsList = document.getElementById('income-accounts-list');
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

  }
}
