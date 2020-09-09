/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  constructor(element) {
    super(element);
  }
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    let that = this;
    User.register(options.data, function(err, response) {
      if (response.success) {
        that.element.reset();
        App.setState('user-logged');
        let modalName = that.element.closest("[class='modal fade in']").dataset.modalId;
        App.getModal(modalName).close();
      };
    });
  }
}
