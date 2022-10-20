function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <div className="element" onClick={handleClick}>
      <img className="element__image" src={props.card.link} alt={`Изображение ${props.card.name}`}/>
      <button type="button" className="element__remove" />
      <div className="element__title-wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-wrapper">
          <button type="button" className="element__like" />
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;