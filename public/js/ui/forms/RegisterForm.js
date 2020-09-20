/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.register(options, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.setState('user-logged');
        let modalName = this.element.closest("[class='modal fade in']").dataset.modalId;
        App.getModal(modalName).close();
      };
    });
  }
}
