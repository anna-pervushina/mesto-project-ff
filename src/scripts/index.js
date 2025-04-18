import "../pages/index.css";
import { createCard, deleteCard, handleLike } from "./card.js";
import { openPopup, closePopup, initOverlayClick } from "./modals.js";
import { enableValidation } from './validation.js';
import { getUserInfo, getInitialCards, postNewCard, patchUserInfo, updateAvatar } from './api.js';

// Настройки валидации
const validationSettings = {
    formClass: '.popup__form',
    inputClass: '.popup__input',
    submitButtonClass: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'invalid',
    errorClass: 'error-message',
    errorElementClass: '.popup__input-error',
};

// Вспомогательные функции для отображения процесса загрузки
function showLoading(button, loadingText) {
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add('loading');
}

function hideLoading(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('loading');
}

// Глобальные элементы DOM
const cardsContainer = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePreviewPopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

// Элементы профиля (переиспользование)
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

// Элементы формы редактирования профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Элементы формы создания карточки
const placeNameInput = document.querySelector('.popup_type_new-card .popup__input_type_card-name');
const linkInput = document.querySelector('.popup_type_new-card .popup__input_type_url');

// Элементы формы изменения аватара
const avatarLinkInput = document.querySelector(".popup__input_type_avatar-link");

// Элементы внутри pop-up'a картинок (переиспользование)
const popupImageElement = imagePreviewPopup.querySelector(".popup__image");
const popupCaptionElement = imagePreviewPopup.querySelector(".popup__caption");

// Рендеринг карточек на страницу
function renderCards(cardsArray, container, handleDelete, handleLike, userId) {
    cardsArray.forEach((cardData) => {
        const newCard = createCard(cardData, handleDelete, openCardPopup, handleLike, userId);
        container.appendChild(newCard);
    });
}

// Загрузка данных пользователя и карточек одновременно
function initializeApp() {
    return Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cardsData]) => {
            // Сохраняем только userId
            const userId = userData ? userData._id : null;

            // Обновляем профиль
            if (userData) {
                profileTitle.textContent = userData.name;
                profileDescription.textContent = userData.about;
                profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            } else {
                console.error('Не удалось получить данные пользователя.');
            }

            // Отображение карточек
            if (cardsData && cardsData.length > 0) {
                renderCards(cardsData, cardsContainer, deleteCard, handleLike, userId);
            } else {
                console.log('Карточки не найдены или произошла ошибка при их загрузке.');
            }
        })
        .catch(error => {
            console.error('Ошибка при инициализации приложения:', error.message);
        });
}

// Обработчики кнопок
document.querySelector(".profile__edit-avatar-button")?.addEventListener("click", () => openPopup(avatarPopup));

// Открытие окна редактирования профиля
document.querySelector(".profile__edit-button").addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
});

// Открытие окна добавления карточки
document.querySelector(".profile__add-button").addEventListener("click", () => openPopup(newCardPopup));

// Закрытие попапов
document.querySelectorAll(".popup__close").forEach(button => {
    button.addEventListener("click", event => {
        const popup = event.currentTarget.closest(".popup");
        closePopup(popup);
    });
});

// Закрытие попапа при клике на оверлей
document.querySelectorAll(".popup").forEach(popup => {
    initOverlayClick(popup);
});

// Редактирование профиля
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');

function handleEditProfileFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const nameValue = form.elements["name"].value;
    const aboutValue = form.elements["description"].value;

    const saveButton = form.querySelector('.popup__button');
    const originalText = saveButton.textContent;

    showLoading(saveButton, 'Сохранение...');

    patchUserInfo({ name: nameValue, about: aboutValue })
        .then(updatedUserData => {
            profileTitle.textContent = updatedUserData.name;
            profileDescription.textContent = updatedUserData.about;
            closePopup(editProfilePopup);
            hideLoading(saveButton, originalText);
        })
        .catch(error => {
            console.error('Ошибка при обновлении данных пользователя:', error.message);
            hideLoading(saveButton, originalText);
        });
}

if (editProfileForm) {
    editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
}

// Добавление карточки
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');

function addNewCard(event) {
    event.preventDefault();

    const form = event.target;
    const placeName = form.elements["place-name"].value;
    const link = form.elements["link"].value;

    const saveButton = form.querySelector('.popup__button');
    const originalText = saveButton.textContent;

    showLoading(saveButton, 'Сохранение...');

    postNewCard({ name: placeName, link: link })
        .then(data => {
            const newCardElement = createCard(data, deleteCard, openCardPopup, handleLike, data.owner._id);
            cardsContainer.prepend(newCardElement);
            closePopup(newCardPopup);
            form.reset();
            hideLoading(saveButton, originalText);
        })
        .catch(error => {
            console.error('Ошибка при создании карточки:', error.message);
            hideLoading(saveButton, originalText);
        });
}

if (newPlaceForm) {
    newPlaceForm.addEventListener("submit", addNewCard);
}

// Просмотр изображений в попапе
function openCardPopup(event) {
    const clickedImg = event.target;

    if (!clickedImg.classList.contains("card__image")) return;

    const cardItem = clickedImg.closest(".places__item");

    const cardTitle = cardItem.querySelector(".card__title").innerText;
    const cardSrc = clickedImg.getAttribute("src");
    const cardAlt = clickedImg.getAttribute("alt");

    // Переиспользуем предварительно выбранные элементы
    popupImageElement.setAttribute("src", cardSrc);
    popupImageElement.setAttribute("alt", cardAlt);
    popupCaptionElement.textContent = cardTitle;

    openPopup(imagePreviewPopup);
}

// Обработчик формы изменения аватара
const avatarForm = document.querySelector('.popup__form[name="change-avatar"]');

function handleAvatarFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const avatarLink = form.elements["avatar-link"].value;

    const saveButton = form.querySelector('.popup__button');
    const originalText = saveButton.textContent;

    showLoading(saveButton, 'Сохранение...');

    updateAvatar(avatarLink)
        .then(response => {
            if (response && response.avatar) {
                profileAvatar.style.backgroundImage = `url(${response.avatar})`;
                closePopup(avatarPopup);
                hideLoading(saveButton, originalText);
            } else {
                console.error('Полученный ответ от сервера не содержит необходимых данных:', response);
            }
        })
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error.message);
            hideLoading(saveButton, originalText);
        });
}

if (avatarForm) {
    avatarForm.addEventListener('submit', handleAvatarFormSubmit);
}

// Инициализация валидации и приложения
window.onload = () => {
    enableValidation(validationSettings);   // Активируем новую систему валидации
    initializeApp();       // Начинаем приложение
};