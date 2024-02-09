/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sideBarToggle = document.querySelector(".sidebar-toggle");
    const body = document.querySelector("body");
    sideBarToggle.addEventListener("click", function () {
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
      return false;
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const arrButtons = [".menu-item_register", ".menu-item_login", ".menu-item_logout"];
    arrButtons.forEach((btn) => {
      document.querySelector(btn).addEventListener("click", function (e) {
        e.preventDefault();
        if (btn !== ".menu-item_logout") {
          App.getModal(btn.split("_")[btn.split("_").length - 1]).open();
        } else {
          User.logout((err, response) => {
            if (response.success) {
              App.setState("init")
            }
          })
        }
      });
    });
  }
}