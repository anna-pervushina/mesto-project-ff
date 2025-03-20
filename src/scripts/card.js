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
  const target = event.target.closest('.card__like-button');
  if (target) {
    target.classList.toggle('card__like-button_is-active');
  }
}