import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const[userName, setUserName] = React.useState("");
  const[userDescription, setUserDescription] = React.useState("");
  const[userAvatar, setUserAvatar] = React.useState("");

  const[cards, setCards] = React.useState([]);

  React.useEffect(() => {
   api.getUserInfo()
   .then(userData => {
    setUserName(userData.name);
    setUserDescription(userData.about);
    setUserAvatar(userData.avatar);
   })
   .catch(err => {
    console.log(err);
   })

   api.getInitialCards()
   .then(cardsData => {
    setCards(cardsData);
   })
   .catch(err => {
    console.log(err);
   })
  }, [])

  return (
    <main className="content">
        <section className="profile">
          <button type="button" className="profile__update-avatar" onClick={props.onEditAvatar}>
            <img alt="Аватар профиля" className="profile__avatar" src={userAvatar} />
          </button>
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__button profile__edit-btn" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__about-self">{userDescription}</p>
          </div>
          <button type="button" className="profile__button profile__add-btn" onClick={props.onAddPlace}/>
        </section>
        <section className="elements">
          {cards.map(card => {
              return (
                <Card card={card} onCardClick={props.onCardClick} key={card._id} />
              )
            })}
        </section>
      </main>
  );
}

export default Main;