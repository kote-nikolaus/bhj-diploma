/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  constructor(element) {
    super(element);
  }
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    let that = this;
    User.login(options.data, function(err, response) {
      if (response.success) {
        that.element.reset();
        App.setState('user-logged');
        let modalName = that.element.closest("[class='modal fade in']").dataset.modalId;
        App.getModal(modalName).close();
      };
    });
  }
}
