// card.js

// Функция создания карточки
export function createCard(cardData, handleDelete, handleClickOnImage, handleLike) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);

  cardTemplate.querySelector(".card__title").textContent = cardData.name;
  cardTemplate.querySelector(".card__image").src = cardData.link;
  cardTemplate.querySelector(".card__image").alt = cardData.alt;

  cardTemplate.querySelector(".card__delete-button").addEventListener("click", handleDelete);
  cardTemplate.querySelector(".card__image").addEventListener("click", handleClickOnImage);
  cardTemplate.querySelector('.card__like-button').addEventListener('click', handleLike);

  return cardTemplate;
}

// Функция для удаления карточки
export function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
}

// Функция лайка
export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// Рендеринг карточек на страницу
export function renderCards(cardsArray, container, handleDelete) {
  cardsArray.forEach((cardData) => {
    const newCard = createCard(cardData, deleteCard, null, handleLike);
    container.appendChild(newCard);
  });
}