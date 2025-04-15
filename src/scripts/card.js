export function createCard(cardData, handleDelete, handleClickOnImage, handleLike, userData) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);

  cardTemplate.querySelector(".card__title").textContent = cardData.name;
  cardTemplate.querySelector(".card__image").src = cardData.link;
  cardTemplate.querySelector(".card__image").alt = cardData.alt;

  const likeCountElement = cardTemplate.querySelector(".card__like-count");
  likeCountElement.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some(like => like._id === userData._id);
  if (isLiked) {
      cardTemplate.querySelector(".card__like-button").classList.add("card__like-button_is-active");
  }

  const isOwner = cardData.owner._id === userData._id;
  if (!isOwner) {
      cardTemplate.querySelector(".card__delete-button").style.display = "none";
  }
cardTemplate.querySelector(".card__delete-button").addEventListener("click", handleDelete);
  cardTemplate.querySelector(".card__image").addEventListener("click", handleClickOnImage);
  cardTemplate.querySelector(".card__like-button").addEventListener("click", handleLike);

  return cardTemplate;
}

export function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  if (cardElement) {
      cardElement.remove();
  }
}

export function handleLike(event) {
  const likeButton = event.target;
  const cardElement = likeButton.closest(".card");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  likeButton.classList.toggle("card__like-button_is-active");

  if (likeButton.classList.contains("card__like-button_is-active")) {
      likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
  } else {
      likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
  }
}