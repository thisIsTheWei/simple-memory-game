import React, {useEffect, useState} from 'react';
import Card from "../Card/Card";
import './GameBoard.css'
import {shuffleArray} from "../../utils/shuffle";

const initialCards = [
  { id: 1, content: 'A' },
  { id: 2, content: 'A' },
  { id: 3, content: 'B' },
  { id: 4, content: 'B' },
  { id: 5, content: 'C' },
  { id: 6, content: 'C' },
  { id: 7, content: 'D' },
  { id: 8, content: 'D' },
  { id: 9, content: 'E' },
  { id: 10, content: 'E' },
  { id: 11, content: 'F' },
  { id: 12, content: 'F' },
];

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disableAll, setDisableAll] = useState(false);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    // need to create the shuffle function
    setCards(shuffleArray([...initialCards]))
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      // disable all cards
      setDisableAll(true);
      // check the match after the animation
      setTimeout(()=>{
        checkForMatch();
      }, 1000)
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === initialCards.length) {
      setShowRest(true)
    }
  }, [matchedCards]);

  const handleClick = (card) => {
    // check if disableAll or the cards is in the flipped cards
    if (disableAll || flippedCards.includes(card)) {
      return;
    }
    // track flipped
    setFlippedCards((prevCard) => [...prevCard, card])
  };

  const checkForMatch = () => {
    const [first, second] = flippedCards;
    if (first.content === second.content){
      setMatchedCards((prevMatchedCards) => [...prevMatchedCards, first, second])
    }
    // clear flipped cards
    setFlippedCards([]);
    // enable all
    setDisableAll(false);
  };
  
  const resetBoard = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setCards(shuffleArray([...initialCards]))
    setShowRest(false)
  };

  return (
    <div className="game-board">
      <div className="card-group">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            isFlipped={flippedCards.includes(card)}
            isMatched={matchedCards.includes(card)}
            isDisableAll={disableAll}
          />
        ))}
      </div>
      <button className={showRest ? '' : 'hidden'} onClick={resetBoard}>Reset</button>
    </div>
  );
};

export default GameBoard;