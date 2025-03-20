// Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-animated');
  addKeydownHandler();
  setTimeout(() => {
    popupElement.classList.add('popup_is-opened');
  }, 60);
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  removeKeydownHandler();
  setTimeout(() => {
    popupElement.classList.remove('popup_is-animated');
  }, 60);
}

// Закрытие попапа при клике на оверлей
export function handleOverlayClick(popup) {
  popup.addEventListener('click', event => {
    if (!event.target.closest('.popup__content')) {
      closePopup(popup);
    }
  });
}

// Закрытие попапа по Escape
export function addKeydownHandler() {
  window.addEventListener('keydown', handleKeydown);
}

export function removeKeydownHandler() {
  window.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}