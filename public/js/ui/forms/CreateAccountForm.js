/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    let that = this;
    Account.create(options.data, function(err, response) {
      if (response.success) {
        that.element.reset();
        App.update();
        //let modalName = that.element.closest("[class='modal fade in']").dataset.modalId;
        App.getModal('createAccount').close();
      };
    });
  }
}
