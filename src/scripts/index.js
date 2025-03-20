import '../pages/index.css';
import { createCard, deleteCard, handleLike } from './card.js';
import { openPopup, closePopup, handleOverlayClick } from './modals.js';
import { initialCards } from './cards.js';

// Глобальные элементы DOM
const cardsContainer = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePreviewPopup = document.querySelector('.popup_type_image');

// Рендеринг карточек на страницу
const container = document.querySelector('.cards-container');

function renderCards(cardsArray, container, handleDelete, handleLike) {
  cardsArray.forEach((cardData) => {
    const newCard = createCard(cardData, deleteCard, handleLike);
    container.appendChild(newCard);
  });
}

// Инициализация карточек
renderCards(initialCards, cardsContainer, deleteCard);

// Обработчики кнопок
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  openPopup(editProfilePopup);
});
document.querySelector('.profile__add-button').addEventListener('click', () => openPopup(newCardPopup));

// Закрытие попапов
document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', event => {
    const popup = event.currentTarget.closest('.popup');
    closePopup(popup);
  });
});

// Закрытие попапа при клике на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  handleOverlayClick(popup);
});

// Редактирование имени и информации о себе
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


function handleEditFormSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(document.querySelector('.popup_type_edit'));
}

formElement.addEventListener('submit', handleEditFormSubmit);

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
function openCardPopup(event) {
  const clickedImg = event.target;

  if (!clickedImg.classList.contains('card__image')) return;

  const cardItem = clickedImg.closest('.places__item');
  if (!cardItem) {
    console.error('Родительский элемент карточки не найден!');
    return;
  }

  const cardTitle = cardItem.querySelector('.card__title').innerText;
  const cardSrc = clickedImg.getAttribute('src');
  const cardAlt = clickedImg.getAttribute('alt');

  const popupImage = document.querySelector('.popup_type_image');

  popupImage.querySelector('.popup__image').setAttribute('src', cardSrc);
  popupImage.querySelector('.popup__image').setAttribute('alt', cardAlt);
  popupImage.querySelector('.popup__caption').textContent = cardTitle;

  openPopup(popupImage);
};

document.querySelector('.places').addEventListener('click', openCardPopup);

