import React from 'react'
import PopupWithForm from './PopupWithForm'

const ConfirmPopup = (props) => {
  function handleSubmit(e) {
    e.preventDefault();

    props.onCardDeleteConfirm();
  }

  return (
    <PopupWithForm 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      name="confirm"
      title="Вы уверены?"
      onSubmit={handleSubmit}
      submitText='Подтвердить'
      loading={props.loading}
    />
  )
}

export default ConfirmPopup