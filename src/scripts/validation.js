// Настройки валидации
const settings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'invalid',
  errorClass: 'error-message',
  errorElementClass: '.popup__input-error',
};

// Функция для проверки допустимых символов
const allowedCharactersRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;

// Минимальные и максимальные ограничения по количеству символов
const nameMinLength = 2;
const nameMaxLength = 40;
const descriptionMinLength = 2;
const descriptionMaxLength = 200;
const placeNameMinLength = 2;
const placeNameMaxLength = 30;

// Функция для проверки URL
const isValidURL = (urlString) => {
  try {
      new URL(urlString);
      return true;
  } catch (_) {
      return false;
  }
};

// Показ ошибки рядом с полем
const showInputError = (formElement, inputElement, settings, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);  // Добавляем класс invalid
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);  // Добавляем класс error-message
};

// Скрытие ошибки
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);  // Убираем класс invalid
  errorElement.classList.remove(settings.errorClass);  // Убираем класс error-message
  errorElement.textContent = '';
};

// Проверка отдельного поля
const checkInputValidity = (formElement, inputElement, settings) => {
  const { name } = inputElement;

  // Проверка пустоты поля
  if (inputElement.value.trim() === '') {
      showInputError(formElement, inputElement, settings, `Вы пропустили это поле.`);
      return false;
  }

  // Проверка специальных ограничений по типу поля
  if (name === 'name' || name === 'place-name') {
      if (!matchesPattern(allowedCharactersRegex, inputElement.value)) {
          showInputError(formElement, inputElement, settings, `Поле может содержать только латинские и кириллические буквы, дефисы и пробелы.`);
          return false;
      }

      // Либо имя, либо название карточки
      const minLength = name === 'name' ? nameMinLength : placeNameMinLength;
      const maxLength = name === 'name' ? nameMaxLength : placeNameMaxLength;

      if (inputElement.value.length < minLength) {
          showInputError(formElement, inputElement, settings, `Минимальное количество символов: ${minLength}. Длина текста сейчас: ${inputElement.value.length} символ(-ов).`);
          return false;
      }

      if (inputElement.value.length > maxLength) {
          showInputError(formElement, inputElement, settings, `Максимальное количество символов: ${maxLength}. Длина текста сейчас: ${inputElement.value.length} символ(-ов).`);
          return false;
      }
  }

  if (name === 'description') {
      if (inputElement.value.length < descriptionMinLength) {
          showInputError(formElement, inputElement, settings, `Минимальное количество символов: ${descriptionMinLength}. Длина текста сейчас: ${inputElement.value.length} символ(-ов).`);
          return false;
      }

      if (inputElement.value.length > descriptionMaxLength) {
          showInputError(formElement, inputElement, settings, `Максимальное количество символов: ${descriptionMaxLength}. Длина текста сейчас: ${inputElement.value.length} символ(-ов).`);
          return false;
      }
  }

  if (name === 'link' || name === 'avatar-link') {
      if (!isValidURL(inputElement.value)) {
          showInputError(formElement, inputElement, settings, `Введите адрес сайта.`);
          return false;
      }
  }

  hideInputError(formElement, inputElement, settings);
  return true;
};

// Проверка валидности всей формы
const hasInvalidInput = (inputList, settings) => {
  return inputList.some((inputElement) => !checkInputValidity(inputElement.form, inputElement, settings));
};

// Управление состоянием кнопки submit
const toggleButtonState = (formElement, settings) => {
  const buttonElement = formElement.querySelector(settings.submitButtonClass);
  const inputs = Array.from(formElement.querySelectorAll(settings.inputClass));

  if (hasInvalidInput(inputs, settings)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// Установка обработчиков событий на поля формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputClass));

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, settings);
          toggleButtonState(formElement, settings);
      });
  });
};

// Активация валидации для всех форм
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formClass));

  formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
  });
};

// Вспомогательная функция для проверки длины строки
const lengthIsValid = (minLength, maxLength, value) =>
  value.length >= minLength && value.length <= maxLength;

// Вспомогательная функция для проверки регулярного выражения
const matchesPattern = (pattern, value) => pattern.test(value);