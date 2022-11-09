import React from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = (props) => {
  const inputRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    })
    inputRef.current.value = '';
  }

  //Для корректной работы сброса валидаций, я также возвращаю исходные значения для инпутов
  function handleClose() {
    inputRef.current.value = '';
    props.onClose();
  }

  return (
    <PopupWithForm 
      isOpen={props.isOpen} 
      onClose={handleClose} 
      name="update-avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      submitText='Сохранить'
      loading={props.loading}
    >
      <label className="form__field">
        <input
          id="avatar-link-input"
          type="url"
          name="input-avatar-link"
          className="form__input form__input_field_avatar-link"
          placeholder="Ссылка на изображение"
          required={true}
          autoFocus={true}
          ref={inputRef}
        />
        <span className="avatar-link-input-error form__input-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup