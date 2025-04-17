(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-36",headers:{authorization:"6189ef78-03ef-42f1-a1b8-8ca27d9491b7","Content-Type":"application/json"}};function t(t,n,r,o,c){var a=document.querySelector("#card-template").content.cloneNode(!0),u=a.querySelector(".card__title"),i=a.querySelector(".card__image");return u.textContent=t.name,i.src=t.link,i.alt=t.alt,i.addEventListener("click",r),a.querySelector(".card__like-count").textContent=t.likes.length,t.likes.some((function(e){return e._id===c}))&&a.querySelector(".card__like-button").classList.add("card__like-button_is-active"),t.owner._id===c||(a.querySelector(".card__delete-button").style.display="none"),a.querySelector(".card").dataset.id=t._id,a.querySelector(".card__delete-button").addEventListener("click",(function(){var n;(function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при удалении карточки:",e.message),null}))})(n=t._id).then((function(){var e=document.querySelector('[data-id="'.concat(n,'"]'));e&&e.remove()})).catch(console.error)})),a.querySelector(".card__like-button").addEventListener("click",o.bind(null,t._id)),a}function n(t){var n=document.querySelector('[data-id="'.concat(t,'"]'));if(n){var r=n.querySelector(".card__like-button"),o=n.querySelector(".card__like-count");r.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при снятии лайка:",e.message),null}))}(t).then((function(){r.classList.remove("card__like-button_is-active"),o.textContent=Math.max(parseInt(o.textContent)-1,0)})).catch(console.error):function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t,"/likes"),{method:"PUT",headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при постановке лайка:",e.message),null}))}(t).then((function(){r.classList.add("card__like-button_is-active"),o.textContent=parseInt(o.textContent)+1})).catch(console.error)}else console.error("Карточка не найдена.",t)}function r(e){e.classList.add("popup_is-opened"),window.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keydown",c)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup.popup_is-opened");t&&o(t)}}document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")}));var a=".popup__input",u="popup__button_disabled",i="invalid",l="error-message",s=/^[A-Za-zА-Яа-яЁё\s-]+$/,d=function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.classList.add(i),r.textContent=n,r.classList.add(l)},p=function(e,t){var n=t.name;if(""===t.value.trim())return d(e,t,"Вы пропустили это поле."),!1;if("name"===n||"place-name"===n){if(!m(s,t.value))return d(e,t,"Поле может содержать только латинские и кириллические буквы, дефисы и пробелы."),!1;var r="name"===n?40:30;if(t.value.length<2)return d(e,t,"Минимальное количество символов: ".concat(2,". Длина текста сейчас: ").concat(t.value.length," символ(-ов).")),!1;if(t.value.length>r)return d(e,t,"Максимальное количество символов: ".concat(r,". Длина текста сейчас: ").concat(t.value.length," символ(-ов).")),!1}if("description"===n){if(t.value.length<2)return d(e,t,"Минимальное количество символов: ".concat(2,". Длина текста сейчас: ").concat(t.value.length," символ(-ов).")),!1;if(t.value.length>200)return d(e,t,"Максимальное количество символов: ".concat(200,". Длина текста сейчас: ").concat(t.value.length," символ(-ов).")),!1}return"link"!==n||function(e){try{return new URL(e),!0}catch(e){return!1}}(t.value)?(function(e,t){var n=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(i),n.classList.remove(l),n.textContent=""}(e,t),!0):(d(e,t,"Введите адрес сайта."),!1)},f=function(){Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){!function(e){Array.from(e.querySelectorAll(a)).forEach((function(t){t.addEventListener("input",(function(){p(e,t),function(e){var t=e.querySelector(".popup__button");Array.from(e.querySelectorAll(a)).some((function(e){return!p(e.form,e)}))?(t.disabled=!0,t.classList.add(u)):(t.disabled=!1,t.classList.remove(u))}(e)}))}))}(e)}))};window.onload=function(){f()};var _,m=function(e,t){return e.test(t)};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){e.textContent=t,e.disabled=!0,e.classList.add("loading")}function v(e,t){e.textContent=t,e.disabled=!1,e.classList.remove("loading")}var b=document.querySelector(".places__list"),S=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),k=document.querySelector(".popup_type_avatar"),w=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),L=document.querySelector(".profile__image"),C=document.querySelector(".popup__input_type_name"),T=document.querySelector(".popup__input_type_description"),x=(document.querySelector(".popup_type_new-card .popup__input_type_card-name"),document.querySelector(".popup_type_new-card .popup__input_type_url"),document.querySelector(".popup__input_type_avatar-link"),q.querySelector(".popup__image")),A=q.querySelector(".popup__caption");function j(){return Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при получении данных пользователя:",e.message),null})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при загрузке карточек:",e.message),[]}))]).then((function(e){var r,o,c=(o=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(r,o)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1],i=a?a._id:null;a?(w.textContent=a.name,E.textContent=a.about,L.style.backgroundImage="url(".concat(a.avatar,")")):console.error("Не удалось получить данные пользователя."),u&&u.length>0?function(e,n,r,o,c){e.forEach((function(e){var r=t(e,0,H,o,c);n.appendChild(r)}))}(u,b,0,n,i):console.log("Карточки не найдены или произошла ошибка при их загрузке.")})).catch((function(e){console.error("Ошибка при инициализации приложения:",e.message)}))}null===(_=document.querySelector(".profile__edit-avatar-button"))||void 0===_||_.addEventListener("click",(function(){return r(k)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){C.value=w.textContent,T.value=E.textContent,r(S)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return r(g)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(e){o(e.currentTarget.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){!function(e){e.addEventListener("click",(function(t){t.target.closest(".popup__content")||o(e)}))}(e)}));var P=document.querySelector('.popup__form[name="edit-profile"]');P&&P.addEventListener("submit",(function(t){t.preventDefault();var n,r=t.target,c=r.elements.name.value,a=r.elements.description.value,u=r.querySelector(".popup__button"),i=u.textContent;y(u,"Сохранение..."),(n={name:c,about:a},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при обновлении данных пользователя:",e.message),null}))).then((function(e){w.textContent=e.name,E.textContent=e.about,o(S),v(u,i)})).catch((function(e){console.error("Ошибка при обновлении данных пользователя:",e.message),v(u,i)}))}));var U=document.querySelector('.popup__form[name="new-place"]');function H(e){var t=e.target;if(t.classList.contains("card__image")){var n=t.closest(".places__item").querySelector(".card__title").innerText,o=t.getAttribute("src"),c=t.getAttribute("alt");x.setAttribute("src",o),x.setAttribute("alt",c),A.textContent=n,r(q)}}U&&U.addEventListener("submit",(function(r){r.preventDefault();var c,a=r.target,u=a.elements["place-name"].value,i=a.elements.link.value,l=a.querySelector(".popup__button"),s=l.textContent;y(l,"Сохранение..."),(c={name:u,link:i},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(c)}).then((function(e){if(!e.ok)throw new Error("Ошибка HTTP: ".concat(e.status));return e.json()})).catch((function(e){return console.error("Ошибка при создании карточки:",e.message),null}))).then((function(e){var r=t(e,0,H,n,e.owner._id);b.prepend(r),o(g),a.reset(),v(l,s)})).catch((function(e){console.error("Ошибка при создании карточки:",e.message),v(l,s)}))})),window.onload=function(){f(),j()}})();