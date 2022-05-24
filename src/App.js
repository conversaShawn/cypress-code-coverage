import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card'

const initialCards = [
  { "src": "/images/aang.png", matched: false },
  { "src": "/images/iroh.png", matched: false },
  { "src": "/images/katara.png", matched: false },
  { "src": "/images/sokka.png", matched: false },
  { "src": "/images/toph.png", matched: false },
  { "src": "/images/zuko.png", matched: false },
];

const backCards = [
      {src: "/images/air.png"},
      {src: "/images/earth.png"},
      {src: "/images/fire.png"},
      {src: "/images/water.png"},
    ];


// function shuffleBack() {
  //   const back = [
  //     {src: "/images/air.png"},
  //     {src: "/images/earth.png"},
  //     {src: "/images/fire.png"},
  //     {src: "/images/water.png"},
  //   ];
  //   const shuffledBack = back[Math.floor(Math.random() * back.length)];
  //   // shuffledBack()
  // }





function App() {
  const [cards, setCards] = useState([]);
  const [back, setBack] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false)
    }, 1000);
    shuffleCards();
  }, []);

  function shuffleCards() {
    // setCards(null)
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    const shuffledBack = [...backCards, ...backCards]
      .sort(() => Math.random() - 0.5)
      .map((back) => ({ ...back, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setBack(shuffledBack);
    setTurn(0);
    setDisabled(false)
    setStartFlip(true)
    setTimeout(() => {
      setStartFlip(false)
    }, 1000);
  }


  function handleChoice(card) {
    choiceOne ? (
      choiceOne.id !== card.id &&
      setChoiceTwo(card))
      : setChoiceOne(card)
  }

  function resetTurn() {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className='container'>

      
      <button onClick={shuffleCards}>New Game</button>

      
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched || startFlip}
            disabled={disabled}
            matched={card.matched}
          />
        ))}
      </div>
      <p>Turns: {turn}</p>
    </div>
  );
}

export default App;