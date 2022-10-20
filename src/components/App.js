import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        name="update-avatar"
        title="Обновить аватар"
      >
        <label className="form__field">
          <input
            id="avatar-link-input"
            type="url"
            name="input-avatar-link"
            className="form__input form__input_field_avatar-link"
            placeholder="Ссылка на изображение"
            required=""
            autofocus=""
          />
          <span className="avatar-link-input-error form__input-error" />
        </label>
      </PopupWithForm>
      <PopupWithForm 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        name="edit-profile"
        title="Редактировать профиль"
      >
        <label className="form__field">
          <input
            id="profile-name-input"
            type="text"
            name="input-profile-name"
            className="form__input form__input_field_profile-name"
            placeholder="Введите ваше имя"
            minLength={2}
            maxLength={40}
            required=""
            autofocus=""
          />
          <span className="profile-name-input-error form__input-error" />
        </label>
        <label className="form__field">
          <input
            id="profile-about-self-input"
            type="text"
            name="input-profile-info"
            className="form__input form__input_field_profile-about-self"
            placeholder="Введите информацию о себе"
            minLength={2}
            maxLength={200}
            required=""
          />
          <span className="profile-about-self-input-error form__input-error" />
        </label>
      </PopupWithForm>
      <PopupWithForm 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
        name="add-card"
        title="Новое место"
      >
        <label className="form__field">
          <input
            id="card-name-input"
            type="text"
            name="input-card-name"
            className="form__input form__input_field_card-name"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
            autofocus=""
          />
          <span className="card-name-input-error form__input-error" />
        </label>
        <label className="form__field">
          <input
            id="card-image-link-input"
            type="url"
            name="input-card-link"
            className="form__input form__input_field_card-link"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="card-image-link-input-error form__input-error" />
        </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
