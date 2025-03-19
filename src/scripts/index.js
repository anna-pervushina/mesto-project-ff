// index.js

import { createCard, deleteCard, handleLike, renderCards } from './card.js';
import { openPopup, closePopup } from './modals.js';
import { initialCards } from './cards.js';

// Глобальные элементы DOM
const cardsContainer = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePreviewPopup = document.querySelector('.popup_type_image');

// Инициализация карточек
renderCards(initialCards, cardsContainer, deleteCard);

// Обработчики кнопок
document.querySelector('.profile__edit-button').addEventListener('click', () => openPopup(editProfilePopup));
document.querySelector('.profile__add-button').addEventListener('click', () => openPopup(newCardPopup));

// Закрытие попапов
document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', event => {
    const popup = event.currentTarget.closest('.popup');
    closePopup(popup);
  });
});

// Закрытие попапа при клике вне области содержания
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', event => {
    if (!event.target.closest('.popup__content')) {
      closePopup(popup);
    }
  });
});

// Закрытие попапа по Escape
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.querySelector('.popup.popup_is-opened')) {
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    closePopup(openedPopup);
  }
});

// Редактирование имени и информации о себе
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(document.querySelector('.popup_type_edit'));
}

formElement.addEventListener('submit', handleFormSubmit);

// Добавление карточки
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
if (newPlaceForm) {
  newPlaceForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const placeNameInput = this.elements['place-name'];
    const linkInput = this.elements['link'];

    if (!placeNameInput.value || !linkInput.value) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newCardData = {
      name: placeNameInput.value,
      link: linkInput.value,
      alt: 'изображение ' + placeNameInput.value
    };

    const newCardElement = createCard(newCardData, deleteCard, null, handleLike);

    const placesList = document.querySelector('.places__list');
    if (placesList) {
      placesList.insertBefore(newCardElement, placesList.firstChild); // Вставка новой карточки в начало списка
    }

    closePopup(this.closest('.popup')); // Закрываем попап после добавления карточки
    this.reset(); // Очищаем форму после отправки
  });
}

// Просмотр изображений в попапе
document.querySelectorAll('.card__image').forEach(img => {
  img.addEventListener('click', event => {
    const cardItem = img.closest('.places__item');
    if (cardItem) {
      const cardTitle = cardItem.querySelector('.card__title').innerText;
      const cardSrc = img.getAttribute('src');
      const cardAlt = img.getAttribute('alt');

      const popupImage = document.querySelector('.popup_type_image');
      if (popupImage) {
        popupImage.querySelector('.popup__image').setAttribute('src', cardSrc);
        popupImage.querySelector('.popup__image').setAttribute('alt', cardAlt);
        popupImage.querySelector('.popup__caption').textContent = cardTitle;

        openPopup(popupImage);
      } else {
        console.error('Попап для изображения не найден!');
      }
    } else {
      console.error('Родительский элемент карточки не найден!');
    }
  });
});

// Предотвращение всплытия событий для других элементов карточки
document.querySelectorAll('.card__delete-button, .card__description').forEach(element => {
  element.addEventListener('click', event => {
    event.stopPropagation(); // Останавливаем всплытие события
  });
});