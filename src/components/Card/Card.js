import React from 'react';
import './Card.css';

const Card = ({card, handleClick, isFlipped, isMatched, isDisableAll}) => {
  return (
    <div
      className={`card  ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={() => !isFlipped && !isMatched && handleClick(card)}
    >
      <div className={`card-inner ${isDisableAll ? 'disabled' : ''}`}>
        <div className="card-front">{card.content}</div>
        <div className="card-back">?</div>
      </div>
    </div>
  );
};

export default Card;