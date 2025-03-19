// Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-animated');
  setTimeout(() => {
    popupElement.classList.add('popup_is-opened');
  }, 60);
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  setTimeout(() => {
    popupElement.classList.remove('popup_is-animated');
  }, 60);
}