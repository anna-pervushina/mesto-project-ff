// Применяем класс один раз при загрузке страницы
document.querySelectorAll(".popup").forEach(popup => {
  popup.classList.add("popup_is-animated");
});

// Открывает модальное окно
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  addKeydownHandler(); // Регистрация прослушивания клавиатурных событий
}

// Закрывает модальное окно
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  removeKeydownHandler(); // Снимаем прослушивание клавиатурных событий
}

// Настройка реакции на клик по оверлею модального окна
export function initOverlayClick(popup) {
  popup.addEventListener("click", (event) => {
      if (!event.target.closest(".popup__content")) {
          closePopup(popup);
      }
  });
}

// Регистрация прослушивания событий клавиатуры
export function addKeydownHandler() {
  window.addEventListener("keydown", handleKeydown);
}

// Снятие прослушивания событий клавиатуры
export function removeKeydownHandler() {
  window.removeEventListener("keydown", handleKeydown);
}

// Обработчик события keydown для клавиатуры
function handleKeydown(event) {
  if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup.popup_is-opened");
      if (openedPopup) {
          closePopup(openedPopup); // Закрываем открытое модальное окно
      }
  }
}