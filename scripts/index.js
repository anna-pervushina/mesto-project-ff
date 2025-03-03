// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from './cards.js';

// Функция создания карточки
function createCard(data, handleDelete) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  
  // Устанавливаем имя и изображение карточки
  cardTemplate.querySelector('.card__title').textContent = data.name;
  cardTemplate.querySelector('.card__image').src = data.imageLink;

  // Добавляем обработчик клика на кнопку удаления
  cardTemplate.querySelector('.card__delete-button').addEventListener('click', (event) => {
    handleDelete(event.currentTarget.parentElement); // Передаем родительский элемент карточки
  });

  return cardTemplate;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция добавления карточек на страницу
function renderCards(cardsArray, container, handleDelete) {
  cardsArray.forEach((cardData) => {
    const newCard = createCard(cardData, handleDelete);
    container.appendChild(newCard);
  });
}

// Выводим все карточки на страницу
document.addEventListener('DOMContentLoaded', function() {
  const placesList = document.querySelector('.places__list');
  const addButton = document.querySelector('.profile__add-button');

  // Обработчик события клика на кнопку добавления
  addButton.addEventListener('click', () => {
    const newCardData = {
      name: prompt("Название"), // запрашиваем название у пользователя
      imageLink: prompt("Ссылка на картинку")
    };
    
    if (newCardData.name && newCardData.imageLink) {
      const newCard = createCard(newCardData, deleteCard);
      placesList.prepend(newCard); // добавляем новую карточку в начало списка
    }
  });

  // Отображаем существующие карточки
  renderCards(initialCards, placesList, deleteCard);
});