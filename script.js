
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
function createTemplate(obj) {
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

  return cardItem;
};
//функция добавляет карточку в разметку страницы, принимает на вход элементы (к которому добавить, добавляемый)
function addCard(item, elem) {
  item.appendChild(elem);
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
  // занести их в объект
  cardObject.name = cardTitle.value;
  cardObject.link = cardLink.value;
  // проверить заполнены ли поля
  if (cardTitle.value.length === 0 || cardLink.value.length === 0) {
    return alert('Заполните пожалуйста оба поля')
  };
  // записать разметку в переменную
  const template = createTemplate(cardObject);
  // добавить разметку на страницу
  addCard(list, template);
  //  сбросить данные в форме
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

//Функция рендера массива, содержащего объекты с карточками
function renderArrow(arr) {
  arr.forEach(function (obj) {
    const template = createTemplate(obj);
    addCard(list, template)
  })
};


// пройти по исходному массиву функцией, чтобы получить данные для каждой карточки
renderArrow(initialCards);


// слушатели
buttonAdd.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
cardPopup.addEventListener('submit', createCard);
list.addEventListener('click', addNndRemoveLike);
list.addEventListener('click', deleteCard);