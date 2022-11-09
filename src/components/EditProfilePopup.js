import React from 'react'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) => {
  const[name, setName] = React.useState('');
  const[description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    });
  }

  function handleName(e) {
    setName(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }
  //Для корректной работы сброса валидаций, я также возвращаю исходные значения для инпутов
  function handleClose() {
    setName(currentUser.name);
    setDescription(currentUser.about);
    props.onClose();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={handleClose}
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      submitText='Сохранить'
      loading={props.loading}
    >
      <label className="form__field">
        <input
          value={name}
          onChange={handleName}
          id="profile-name-input"
          type="text"
          name="input-profile-name"
          className="form__input form__input_field_profile-name"
          placeholder="Введите ваше имя"
          minLength={2}
          maxLength={40}
          required={true}
          autoFocus={true}
        />
        <span className="profile-name-input-error form__input-error" />
      </label>
      <label className="form__field">
        <input
          value={description}
          onChange={handleDescription}
          id="profile-about-self-input"
          type="text"
          name="input-profile-info"
          className="form__input form__input_field_profile-about-self"
          placeholder="Введите информацию о себе"
          minLength={2}
          maxLength={200}
          required={true}
        />
        <span className="profile-about-self-input-error form__input-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;