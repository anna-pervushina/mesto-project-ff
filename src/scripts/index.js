// index.js
import "../pages/index.css";
import { createCard, deleteCard, handleLike } from "./card.js";
import { openPopup, closePopup, initOverlayClick } from "./modals.js";
import { clearValidationErrors, validateForm, isValidURL } from './validation.js';
import { getUserInfo, getInitialCards, postNewCard, patchUserInfo } from './api.js';

// Глобальные элементы DOM
const cardsContainer = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePreviewPopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

// Рендеринг карточек на страницу
const container = document.querySelector(".cards-container");

function renderCards(cardsArray, container, handleDelete, handleLike, userData) {
    cardsArray.forEach((cardData) => {
        const newCard = createCard(cardData, handleDelete, openCardPopup, handleLike, userData);
        container.appendChild(newCard);
    });
}

// Загрузка данных пользователя и карточек одновременно
function initializeApp() {
    return Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        // Сохраняем данные пользователя в глобальную область видимости
        globalThis.userData = userData;

        // Обновляем данные пользователя
        if (userData) {
            document.querySelector('.profile__title').textContent = userData.name;
            document.querySelector('.profile__description').textContent = userData.about;
            document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
        } else {
            console.error('Не удалось получить данные пользователя.');
        }

        // Отображаем карточки
        if (cardsData && cardsData.length > 0) {
            renderCards(cardsData, cardsContainer, deleteCard, handleLike, userData);
        } else {
            console.log('Карточки не найдены или произошла ошибка при их загрузке.');
        }
    })
    .catch(error => {
        console.error('Ошибка при инициализации приложения:', error.message);
    });
}

// Обработчики кнопок
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
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

// Форма редактирования профиля
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');

function handleEditProfileFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const nameValue = form.elements["name"].value;
    const aboutValue = form.elements["description"].value;

    const saveButton = form.querySelector('.popup__button');
    const originalText = saveButton.textContent;

    showLoading(saveButton, 'Сохранение...');

    patchUserInfo({ name: nameValue, about: aboutValue }) // Обращаемся к API-функции
    .then(updatedUserData => {
        document.querySelector('.profile__title').textContent = updatedUserData.name;
        document.querySelector('.profile__description').textContent = updatedUserData.about;
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
if (newPlaceForm) {
    newPlaceForm.addEventListener("submit", addNewCard);
}

function addNewCard(event) {
    event.preventDefault();

    const form = event.target;
    const placeName = form.elements["place-name"].value;
    const link = form.elements["link"].value;

    if (!isValidURL(link)) {
        alert("Пожалуйста, введите корректный URL.");
        return;
    }

    const saveButton = form.querySelector('.popup__button');
    const originalText = saveButton.textContent;

    showLoading(saveButton, 'Сохранение...');

    postNewCard({ name: placeName, link: link }) // Обращаемся к API-функции
    .then(data => {
        const newCardElement = createCard(data, deleteCard, openCardPopup, handleLike, globalThis.userData);
        cardsContainer.prepend(newCardElement);
        closePopup(form.closest(".popup"));
        form.reset();
        clearValidationErrors('new-place');
        validateForm('new-place');
        hideLoading(saveButton, originalText);
    })
    .catch(error => {
        console.error('Ошибка при создании карточки:', error.message);
        hideLoading(saveButton, originalText);
    });
}

// Просмотр изображений в попапе
function openCardPopup(event) {
    const clickedImg = event.target;

    if (!clickedImg.classList.contains("card__image")) return;

    const cardItem = clickedImg.closest(".places__item");

    const cardTitle = cardItem.querySelector(".card__title").innerText;
    const cardSrc = clickedImg.getAttribute("src");
    const cardAlt = clickedImg.getAttribute("alt");

    const popupImage = document.querySelector(".popup_type_image");

    popupImage.querySelector(".popup__image").setAttribute("src", cardSrc);
    popupImage.querySelector(".popup__image").setAttribute("alt", cardAlt);
    popupImage.querySelector(".popup__caption").textContent = cardTitle;

    openPopup(popupImage);
}

// Показ индикатора загрузки
function showLoading(button, text) {
    button.textContent = text;
    button.disabled = true;
    button.classList.add('loading');
}

// Скрыть индикатор загрузки
function hideLoading(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('loading');
}

// Связывание обработчиков событий для валидации форм
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const avatarLinkInput = document.querySelector(".popup__input_type_avatar-link");

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
nameInput.addEventListener('input', () => validateForm('edit'));
jobInput.addEventListener('input', () => validateForm('edit'));

document.querySelector('.popup_type_edit .popup__close').addEventListener('click', () => clearValidationErrors('edit'));

if (newPlaceForm) {
    const placeNameInput = newPlaceForm.elements['place-name'];
    const linkInput = newPlaceForm.elements['link'];

    placeNameInput.addEventListener('input', () => validateForm('new-place'));
    linkInput.addEventListener('input', () => validateForm('new-place'));

    document.querySelector('.popup_type_new-card .popup__close').addEventListener('click', () => clearValidationErrors('new-place'));
}

// Обработчик для иконки редактирования аватара
if (avatarLinkInput) {
    avatarLinkInput.addEventListener('input', () => validateForm('change-avatar'));
}

document.querySelector('.popup_type_avatar .popup__close').addEventListener('click', () => clearValidationErrors('change-avatar'));

// Вызов функции при загрузке страницы
window.onload = function() {
 initializeApp();
};