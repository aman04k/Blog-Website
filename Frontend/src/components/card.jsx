import React from 'react';

const Card = ({ thumbnail, date, title, description, onClick }) => {
  return (
    <div className="card" style={{ width: "18rem" }} onClick={onClick}>
      <img
        src={thumbnail}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">{date}</small></p>
      </div>
    </div>
  );
};

export default Card;
