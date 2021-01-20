import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="flex-container">
          <span className="card-image">
            <figure className="image">
              <img src={props.picture.thumbnail} alt={props.name.first} />
            </figure>
          </span>
          <div className="userD">
            <p className="name">
              {props.name.title}. {props.name.first} {props.name.last}{" "}
              {props.dob}
            </p>

            <p className="location">
              {props.location.street.number} {props.location.street.name},{" "}
              {props.location.city}, {props.location.state}
            </p>
            <p className="contact">
              {" "}
              ✉️ {props.email} 📞 {props.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
