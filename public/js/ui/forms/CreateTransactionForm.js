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
    Account.list(null, (err, response) => {
      if (response.success) {
        for (let elem of this.element.querySelectorAll("select > option")) {
          if (elem) {
            elem.remove();
          }
        }

        for (let i = 0; i < Array.from(response.data).length; i++) {
          const option = document.createElement("option");
          option.value = response.data[i].id;
          option.text = response.data[i].name;
          this.element.querySelector(".accounts-select").append(option);
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        App.getModal("newExpense").close();
        App.getModal("newIncome").close();
        this.element.reset();
      }
    });
  }
}