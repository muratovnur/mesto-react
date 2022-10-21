function PopupWithForm(props) {
  return (
    <div className={`${props.isOpen && "popup_opened"} popup popup_type_${props.name}`}> 
      <div className="popup__container">
        <form name={`form-${props.name}`} className="form" noValidate="">
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button type="button" className="form__submit">Сохранить</button>
        </form>
        <button type="button" className="popup__close-btn" onClick={props.onClose}/>
      </div>
    </div>
  );
}

export default PopupWithForm;