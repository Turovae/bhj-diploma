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
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', event => {
      event.preventDefault();

      const incomeButton = event.target.closest('.create-income-button');
      if (incomeButton) {
        App.getModal('newIncome').open();
      }

      const expenseButton = event.target.closest('.create-expense-button');
      if (expenseButton) {
        App.getModal('newExpense').open();
      }
    })
  }
}
