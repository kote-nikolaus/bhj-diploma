/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    this.registerEvents()
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let newIncomeButton = document.getElementsByClassName('create-income-button').item(0);
    newIncomeButton.addEventListener('click', function() {
      App.getModal('newIncome').open();
    });
    let newExpenseButton = document.getElementsByClassName('create-expense-button').item(0);
    newExpenseButton.addEventListener('click', function() {
      App.getModal('newExpense').open();
    });
  }
}
