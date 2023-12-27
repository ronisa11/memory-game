import { useEffect, useState } from 'react';
import './App.css'
import SingelCard from './components/SingelCard';

const cardImages = [
  { "src": 'src/img/dolphin.jpg', matched: false },
  { "src": 'src/img/flamingo.jpg', matched: false },
  { "src": 'src/img/sky.jpg', matched: false },
  { "src": 'src/img/planets.jpg', matched: false },
  { "src": 'src/img/sunset.jpg', matched: false },
  { "src": 'src/img/surferSign.jpg', matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled ,setDisabled ] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
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
        resetTurn()
      } else {
        setTimeout(()=> resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  // start a new game automagically
  useEffect(()=> {
    shuffleCards()
  },[])


  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="cardGrid">
        {cards.map(card => (
          <SingelCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <h5>TURNS : {turns}</h5>
    </div>
  )
}
export default App



