const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
  headers: {
    authorization: '6189ef78-03ef-42f1-a1b8-8ca27d9491b7',
    'Content-Type': 'application/json'
  }
};

// Получение данных пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при получении данных пользователя:', err.message);
    return null;
  });
};

// Получение первоначальных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при загрузке карточек:', err.message);
    return [];
  });
};

// Создание новой карточки
export const postNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при создании карточки:', err.message);
    return null;
  });
};

// Обновление данных пользователя
export const patchUserInfo = (updatedData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(updatedData)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при обновлении данных пользователя:', err.message);
    return null;
  });
};

// Поставить лайк карточке
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при постановке лайка:', err.message);
    return null;
  });
};

// Убрать лайк с карточки
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при снятии лайка:', err.message);
    return null;
  });
};

// Удаление карточки
export const deleteCardById = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }
    return res.json();
  })
  .catch(err => {
    console.error('Ошибка при удалении карточки:', err.message);
    return null;
  });
};