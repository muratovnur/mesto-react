import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddCardPopup";
import ConfirmPopup from "./ConfirmPopup";

import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import FormValidator from "../utils/FormValidator";
import { validationConfig } from '../utils/utils';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({about: '', avatar: '', name: '', _id: ''});
  const [cards, setCards] = React.useState([]);
  const [requestInProgress, setRequestInProgress] = React.useState(false);
  
  //Поробовал сделать валидацию форм
  const formUpdateUserValidator = React.useRef(null);
  const formAddPlaceValidator = React.useRef(null);
  const formUpdateAvatarValidator= React.useRef(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick (card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setRequestInProgress(false);
    //Сброс валидаций форм
    formUpdateUserValidator.current.resetFormValidation();
    formUpdateAvatarValidator.current.resetFormValidation();
    formAddPlaceValidator.current.resetFormValidation();
  }

  //Поробовал сделать валидацию форм
  function initializeFormValidation() {
    formUpdateUserValidator.current = new FormValidator(validationConfig, document.querySelector('.form_type_edit-profile'))
    formAddPlaceValidator.current = new FormValidator(validationConfig, document.querySelector('.form_type_add-card'));
    formUpdateAvatarValidator.current = new FormValidator(validationConfig, document.querySelector('.form_type_update-avatar'));
    formUpdateUserValidator.current.enableValidation();
    formAddPlaceValidator.current.enableValidation();
    formUpdateAvatarValidator.current.enableValidation();
  }
  
  React.useEffect(() => {
    const promiseGetUserInfo = new Promise((resolve, reject) => {
      api.getUserInfo()
      .then((userData) => {
        resolve(userData);
      })
      .catch((err) => {
        console.log(err);
        reject("Возникли проблемы с получением данных пользователя :(")
      })
    })

    const promiseGetInitialCards = new Promise((resolve, reject) => {
      api.getInitialCards()
      .then((cardsData) => {
        resolve(cardsData);
      })
      .catch((err) => {
        console.log(err);
        reject("Возникли проблемы с получением данных карточек :(")
      })
    })
    
    Promise.all([promiseGetUserInfo, promiseGetInitialCards])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => {
      console.log(err);
    })

    initializeFormValidation();
  }, [])
   

  function handleUpdateUser(inputData) {
    setRequestInProgress(true);
    api.updateUserInfo(inputData.name, inputData.about)
    .then((updatedUserInfo) => {
      setCurrentUser((currentUser) => ({...currentUser, name: updatedUserInfo.name, about: updatedUserInfo.about}))
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleUpdateAvatar({ avatar }) {
    setRequestInProgress(true);
    api.updateUserAvatar(avatar)
    .then((updatedUserAvatar) => {
      setCurrentUser((currentUser) => ({...currentUser, avatar: updatedUserAvatar.avatar}))
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleAddPlace({ name, link }) {
    setRequestInProgress(true);
    api.addCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.updateCardLike(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete() {
    setRequestInProgress(true);
    api.deleteCard(selectedCard._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== selectedCard._id));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        cards={cards}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteClick}
        onEditProfile={handleEditProfileClick} 
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} loading={requestInProgress}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} loading={requestInProgress}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} loading={requestInProgress}/>
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDeleteConfirm={handleCardDelete} loading={requestInProgress}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
