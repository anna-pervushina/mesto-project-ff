import { putLike, removeLike, deleteCardById } from './api.js';

// Функция удаления карточки без подтверждения
function deleteCardWithoutConfirmation(cardId) {
  deleteCardById(cardId)
    .then(() => {
      const cardToRemove = document.querySelector(`[data-id="${cardId}"]`);
      if (cardToRemove) {
        cardToRemove.remove();
      }
    })
    .catch(console.error);
}

// Основная функция создания карточки
export function createCard(cardData, handleDelete, handleClickOnImage, handleLike, currentUserId) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);

  const titleElement = cardTemplate.querySelector(".card__title");
  const imageElement = cardTemplate.querySelector(".card__image");

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.alt;
  imageElement.addEventListener("click", handleClickOnImage);

  const likeCountElement = cardTemplate.querySelector(".card__like-count");
  likeCountElement.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some(like => like._id === currentUserId);
  if (isLiked) {
    cardTemplate.querySelector(".card__like-button").classList.add("card__like-button_is-active");
  }

  const isOwner = cardData.owner._id === currentUserId;
  if (!isOwner) {
    cardTemplate.querySelector(".card__delete-button").style.display = "none";
  }

  cardTemplate.querySelector(".card").dataset.id = cardData._id;

  cardTemplate.querySelector(".card__delete-button").addEventListener("click", () => {
    deleteCardWithoutConfirmation(cardData._id); // Немедленно удаляет карточку без подтверждения
  });

  cardTemplate.querySelector(".card__like-button").addEventListener("click", handleLike.bind(null, cardData._id));

  return cardTemplate;
}

// Функция обработки лайков
export function handleLike(cardId) {
  const cardElement = document.querySelector(`[data-id="${cardId}"]`);
  if (!cardElement) {
    console.error('Карточка не найдена.', cardId);
    return;
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then(() => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = Math.max(parseInt(likeCountElement.textContent) - 1, 0);
      })
      .catch(console.error);
  } else {
    putLike(cardId)
      .then(() => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
      })
      .catch(console.error);
  }
}

// Остальные части оставлены без изменений
export function deleteCard(cardId) {
  const cardToRemove = document.querySelector(`[data-id="${cardId}"]`);
  if (cardToRemove) {
    cardToRemove.remove();
  }
}