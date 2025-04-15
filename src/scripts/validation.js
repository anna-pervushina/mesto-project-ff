export function clearValidationErrors(formType) {
    switch (formType) {
        case 'edit':
            const nameError = document.querySelector('.popup_type_edit .popup__input_type_name ~ .error-message');
            const descriptionError = document.querySelector('.popup_type_edit .popup__input_type_description ~ .error-message');
            
            if (nameError) {
                nameError.textContent = '';
            }
            if (descriptionError) {
                descriptionError.textContent = '';
            }
            const nameInput = document.querySelector('.popup_type_edit .popup__input_type_name');
            const jobInput = document.querySelector('.popup_type_edit .popup__input_type_description');
            if (nameInput && nameInput.classList.contains('invalid')) {
                nameInput.classList.remove('invalid');
            }
            if (jobInput && jobInput.classList.contains('invalid')) {
                jobInput.classList.remove('invalid');
            }
            break;
        case 'new-place':
            const placeNameError = document.querySelector('.popup_type_new-card .popup__input_place-name ~ .error-message');
            const linkError = document.querySelector('.popup_type_new-card .popup__input_link ~ .error-message');
            
            if (placeNameError) {
                placeNameError.textContent = '';
            }
            if (linkError) {
                linkError.textContent = '';
            }
            const placeNameInput = document.querySelector('.popup_type_new-card .popup__input_place-name');
            const linkInput = document.querySelector('.popup_type_new-card .popup__input_link');
            if (placeNameInput && placeNameInput.classList.contains('invalid')) {
                placeNameInput.classList.remove('invalid');
            }
            if (linkInput && linkInput.classList.contains('invalid')) {
                linkInput.classList.remove('invalid');
            }
            break;
        case 'change-avatar':
            const avatarLinkError = document.querySelector('.popup_type_avatar .popup__input_type_avatar-link ~ .error-message');
            
            if (avatarLinkError) {
                avatarLinkError.textContent = '';
            }
            const avatarLinkInput = document.querySelector('.popup__input_type_avatar-link');
            if (avatarLinkInput && avatarLinkInput.classList.contains('invalid')) {
                avatarLinkInput.classList.remove('invalid');
            }
            break;
    }
}

export function validateForm(formType) {
    let valid = true;
    
    switch (formType) {
        case 'edit': {
            const nameInput = document.querySelector('.popup_type_edit .popup__input_type_name');
            const jobInput = document.querySelector('.popup_type_edit .popup__input_type_description');
            const allowedCharsRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;

            let nameError = document.querySelector('.popup_type_edit .popup__input_type_name ~ .error-message');
            if (!nameError && nameInput) {
                nameError = createErrorMessage(nameInput);
            }

            let descriptionError = document.querySelector('.popup_type_edit .popup__input_type_description ~ .error-message');
            if (!descriptionError && jobInput) {
                descriptionError = createErrorMessage(jobInput);
            }

            if (nameInput.value === '') {
                nameError.textContent = 'Вы пропустили это поле';
                nameInput.classList.add('invalid');
                valid = false;
            } else if (nameInput.value.length < 2 || nameInput.value.length > 40) {
                nameError.textContent = 'Имя должно быть от 2 до 40 символов';
                nameInput.classList.add('invalid');
                valid = false;
            } else if (!allowedCharsRegex.test(nameInput.value)) {
                nameError.textContent = 'Поле может содержать только латинские и кириллические буквы, дефисы и пробелы';
                nameInput.classList.add('invalid');
                valid = false;
            } else {
                nameError.textContent = '';
                nameInput.classList.remove('invalid');
            }

            if (jobInput.value === '') {
                descriptionError.textContent = 'Вы пропустили это поле';
                jobInput.classList.add('invalid');
                valid = false;
            } else if (jobInput.value.length < 2 || jobInput.value.length > 200) {
                descriptionError.textContent = 'Описание должно быть от 2 до 200 символов';
                jobInput.classList.add('invalid');
                valid = false;
            } else if (!allowedCharsRegex.test(jobInput.value)) {
                descriptionError.textContent = 'Поле может содержать только латинские и кириллические буквы, дефисы и пробелы';
                jobInput.classList.add('invalid');
                valid = false;
            } else {
                descriptionError.textContent = '';
                jobInput.classList.remove('invalid');
            }

            const saveButton = document.querySelector('.popup_type_edit .popup__button');
            saveButton.disabled = !valid;

            return valid;
        }
        case 'new-place': {
            const placeNameInput = document.querySelector('.popup_type_new-card .popup__input_place-name');
            const linkInput = document.querySelector('.popup_type_new-card .popup__input_link');

            let placeNameError = document.querySelector('.popup_type_new-card .popup__input_place-name ~ .error-message');
            if (!placeNameError && placeNameInput) {
                placeNameError = createErrorMessage(placeNameInput);
            }

            let linkError = document.querySelector('.popup_type_new-card .popup__input_link ~ .error-message');
            if (!linkError && linkInput) {
                linkError = createErrorMessage(linkInput);
            }

            if (placeNameInput && placeNameInput.value === '') {
                placeNameError.textContent = 'Вы пропустили это поле';
                placeNameInput.classList.add('invalid');
                valid = false;
            } else if (placeNameInput && (placeNameInput.value.length < 2 || placeNameInput.value.length > 30)) {
                placeNameError.textContent = 'Название должно быть от 2 до 30 символов';
                placeNameInput.classList.add('invalid');
                valid = false;
            } else if (placeNameInput && !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(placeNameInput.value)) {
                placeNameError.textContent = 'Поле может содержать только латинские и кириллические буквы, дефисы и пробелы';
                placeNameInput.classList.add('invalid');
                valid = false;
            } else {
                if (placeNameError) {
                    placeNameError.textContent = ''; 
                }
                if (placeNameInput) {
                    placeNameInput.classList.remove('invalid');
                }
            }

            if (linkInput && linkInput.value === '') {
                linkError.textContent = 'Вы пропустили это поле';
                linkInput.classList.add('invalid');
                valid = false;
            } else if (linkInput && !isValidURL(linkInput.value)) {
                linkError.textContent = 'Некорректный URL';
                linkInput.classList.add('invalid');
                valid = false;
            } else {
                if (linkError) {
                    linkError.textContent = '';
                }
                if (linkInput) {
                    linkInput.classList.remove('invalid');
                }
            }

            const saveButton = document.querySelector('.popup_type_new-card .popup__button');
            saveButton.disabled = !valid;

            return valid;
        }
        case 'change-avatar': {
            const avatarLinkInput = document.querySelector('.popup__input_type_avatar-link');

            let avatarLinkError = document.querySelector('.popup_type_avatar .popup__input_type_avatar-link ~ .error-message');
            if (!avatarLinkError && avatarLinkInput) {
                avatarLinkError = createErrorMessage(avatarLinkInput);
            }

            if (avatarLinkInput && avatarLinkInput.value === '') {
                avatarLinkError.textContent = 'Вы пропустили это поле';
                avatarLinkInput.classList.add('invalid');
                valid = false;
            } else if (avatarLinkInput && !isValidURL(avatarLinkInput.value)) {
                avatarLinkError.textContent = 'Некорректный URL';
                avatarLinkInput.classList.add('invalid');
                valid = false;
            } else {
                if (avatarLinkError) {
                    avatarLinkError.textContent = '';
                }
                if (avatarLinkInput) {
                    avatarLinkInput.classList.remove('invalid');
                }
            }

            const saveButton = document.querySelector('.popup_type_avatar .popup__button');
            saveButton.disabled = !valid;

            return valid;
        }
    }
}

export function isValidURL(urlString) {
    try {
        new URL(urlString);
        return true;
    } catch (_) {
        return false;
    }
}

// Создать сообщение об ошибке рядом с полем
function createErrorMessage(inputField) {
    if (!inputField) {
        return;
    }
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    inputField.parentNode.insertBefore(errorSpan, inputField.nextSibling);
    return errorSpan;
}