/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
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
    Account.list(User.current(), (err, response) => {
      if (response && response.data) {
        const responseData = response.data;
        const accountSelect = this.element.querySelector('.accounts-select');
        if (accountSelect) {
          accountSelect.innerHTML = responseData.reduce((acc, elem) => {
            return acc + `<option value="${elem.id}">${elem.name}</option>`;
          }, '');
        }
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    data.type = this.element.id.split('-')[1];

    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        if (data.type === 'income') {
          App.getModal('newIncome').close();
        }
        if (data.type === 'expense') {
          App.getModal('newExpense').close();
        } 
        App.update();
      }
    });
  }
}