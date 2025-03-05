// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Функция создания карточки
function createCard(data, cardElement) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  
  // Устанавливаем имя и изображение карточки
  cardTemplate.querySelector('.card__title').textContent = data.name;
  cardTemplate.querySelector('.card__image').src = data.link;
  cardTemplate.querySelector('.card__image').alt = data.alt;

  // Добавляем обработчик клика на кнопку удаления
  cardTemplate.querySelector('.card__delete-button').addEventListener('click', function(event) {
    const cardElement = event.target.closest('.card'); 
    if (cardElement) {
      deleteCard(cardElement);
    }
  });

  return cardTemplate;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция добавления карточек на страницу
function renderCards(cardsArray, container, cardElement) {
  cardsArray.forEach((cardData) => {
    const newCard = createCard(cardData, cardElement);
    container.appendChild(newCard);
  });
}

// Выводим все карточки на страницу
const cardsContainer = document.querySelector('.places__list');

// Отображаем существующие карточки
  renderCards(initialCards, cardsContainer, deleteCard); 