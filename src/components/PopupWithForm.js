function PopupWithForm(props) {
  return (
    <div className={`${props.isOpen && "popup_opened"} popup popup_type_${props.name}`} /*edit-profile*/> 
      <div className="popup__container">
        <form name={`form-${props.name}`} className="form" noValidate="">
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <input type="submit" className="form__submit" value="Сохранить"/>
        </form>
        <button type="button" className="popup__close-btn" onClick={props.onClose}/>
      </div>
    </div>
  );
}

export default PopupWithForm;