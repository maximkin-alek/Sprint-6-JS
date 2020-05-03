
// контейнер для карточек
const list = document.querySelector('.places-list');
// кнопка добавить карточку
const buttonAdd = document.querySelector('.user-info__button');
// форма добавления карточки
const cardPopup = document.querySelector('.popup');
//кнопка закрыть форму
const buttonClose = document.querySelector('.popup__close');
// открыть форму
function openPopup() {
  cardPopup.classList.toggle('popup_is-opened');
};
// закрыть форму
function closePopup() {
  cardPopup.classList.toggle('popup_is-opened');
};

// добавить элемент
function addElem(elem) {
  return document.createElement(elem);
};
// добавить класс элементу
function addClass(name, attribute) {
  return name.classList.add(attribute);
};
// добавить новую карточку, принимает на вход объект с данными
function addCard(obj) {
  // создать разметку карточки
  const cardItem = addElem('div');
  addClass(cardItem, 'place-card');

  const cardImage = addElem('div');
  addClass(cardImage, 'place-card__image');
  // берем фоновое изображение из массива
  cardImage.style.backgroundImage = `url('${obj.link}')`;

  const buttonDelete = addElem('button');
  addClass(buttonDelete, 'place-card__delete-icon');

  const cardDescription = addElem('div');
  addClass(cardDescription, "place-card__description");

  const cardName = addElem('h3');
  addClass(cardName, "place-card__name");
  //берем заголовок из массива
  cardName.textContent = obj.name;

  const buttonLike = addElem('button');
  addClass(buttonLike, "place-card__like-icon");

  cardImage.appendChild(buttonDelete);
  cardDescription.appendChild(cardName);
  cardDescription.appendChild(buttonLike);

  cardItem.appendChild(cardImage);
  cardItem.appendChild(cardDescription);
/* REVIEW. Можно лучше. Лучше добавление карточки к контейнеру всех карточек делать при рендере карточек и при добавлении новой карточки, введя
дополнительную функцию добавления карточки в конец общего списка (то есть команду list.appendChild(cardItem) убрать из функции addCard
и поместить в другую), так как в соответствии с принципом единственной ответственности функции, addCard должна отвечать
только за создание шаблона карточки и возврат его в инструкции return. Она не должна зависеть от размётки на странице - от константы list.
Тогда addCard (лучше её переименовать в createTemplate, например) можно использовать и в других проектах, где бы так же нужен был шаблон карточки.*/
  list.appendChild(cardItem);
};
// создать карточку из формы
function createCard(event) {
  // отмена действия по умолчанию
  event.preventDefault();
  // получить данные от пользователя
  const cardObject = {};
  const cardTitle = document.querySelector('.popup__input_type_name');
  const cardLink = document.querySelector('.popup__input_type_link-url');
  const popupForm = document.querySelector('.popup__form');
  // занести их в массив
  cardObject.name = cardTitle.value;
  cardObject.link = cardLink.value;
  // проверить заполнены ли поля
  if (cardTitle.value.length === 0 || cardLink.value.length === 0) {
    return alert('Заполните пожалуйста оба поля')
  };
  // вызвать функцию addCard
  addCard(cardObject);
  popupForm.reset();
  // закрыть форму по отправке
  closePopup();
}
// удалить карточку
function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon'))
    list.removeChild(event.target.closest('.place-card'));
};
// снять и поставить лайк
function addNndRemoveLike(event) {
  if (event.target.classList.contains('place-card__like-icon'))
    event.target.classList.toggle('place-card__like-icon_liked');
};


// пройти по исходному массиву функцией, чтобы получить данные для каждой карточки
/* REVIEW. Можно лучше. Рендер карточек лучше поместить в функцию, где будет вызываться и функция добавления карточки в конец списка. */
initialCards.forEach(addCard);

// слушатели
buttonAdd.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
cardPopup.addEventListener('submit', createCard);
list.addEventListener('click', addNndRemoveLike);
list.addEventListener('click', deleteCard);


/* REVIEW. Резюме.
Неплохая работа. Весь функционал, требуемый по заданию, работает.

В чем достигнут успех.
1. Студент в основном свободно и правильно применяет конструкции языка js.
2. Использовано делегирование событий.
3. Перезагрузка страницы предотвращена инструкцией event.preventDefault.
4. Функциям и константам даны названия, имеющие смысл.
5. Сделана валидация формы карточки с выводом сообщения об ошибке.
6. Функции addCard передаётся параметр в виде объекта.



Что можно улучшить.
1. Лучше добавление карточки к контейнеру всех карточек делать при рендере карточек, введя дополнительную функцию
добавления карточки в конец общего списка, а не в функции addCard (подробности в ревью в коде addCard).
2. addCard лучше переименовать в createTemplate(подробности в ревью в коде addCard).
3. Рендер карточек лучше поместить в функцию, где будет вызываться и функция добавления карточки в конец списка(подробности в ревью в коде).
5. В обработчике сабмита формы вызывать и функцию создания шаблона карточки, и функцию добавления карточки в конец списка.

Задание принято!

*/