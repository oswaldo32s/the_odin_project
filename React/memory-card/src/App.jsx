import { useEffect, useState } from "react"
import './app.css'

export function App() {

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  } 

  function resetGame() {
    setScore(0)
    setLastPick([])
    setDiscoveredCards([])
  }

  function restartGame() {
    setDeck(prev => shuffleArray([...prev]))
    resetGame()
    setWinner(false)
  }

  function checkWinner(newScore) {
    if(newScore === 10) setWinner(true)
  }

  function playRound(newCard, index) {
    
    if(discoveredCards.includes(newCard)) return
    if (!lastPick.length) {
      setLastPick([newCard, index])
    } else if(lastPick[1] === index) {
      return
    }else if(newCard === lastPick[0]) {
      const newScore = score + 1
      setScore(newScore)
      setDiscoveredCards(prev => [...prev, newCard])
      setLastPick([])
      checkWinner(newScore)
    } else {
      resetGame()
    }
  }

  const [deck, setDeck] = useState([])
  const [score, setScore] = useState(0)
  const [lastPick, setLastPick] = useState([])
  const [discoveredCards, setDiscoveredCards] = useState([])
  const [winner, setWinner] = useState(false)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      .then(res => res.json())
      .then(async (data) => {
        const cards = data.results;
        // Fetch all images in parallel
        const pokemonData = await Promise.all(
          cards.map(async (card) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${card.name}/`);
            const ndData = await res.json();
            return { name: card.name, url: ndData.sprites.front_default };
          })
        );
        setDeck(shuffleArray([...pokemonData, ...pokemonData]));
      });
  }, []);
  

  return (
    <main>
      <h1>Memory Card</h1>
      <h2>{`Score: ${score}`}</h2>
      {
        winner && 
        <div>
          <h3>You won!!</h3>
          <button onClick={restartGame}>Play Again</button>
        </div>
      }
      <section className="cardsContainer">
        {
          deck && 
          deck.map((card, index) => (
            <div 
            style={
              (discoveredCards.includes(card.name) || index === lastPick[1]) ?
              {
                backgroundImage: `url(${card.url})`
              } :
              null
            }
            className="card"
            key={index}
            onClick={() => {
              playRound(card.name, index)
            }}
            >
            </div>
          ))
        }
      </section>
      <button onClick={restartGame}>Restart Game</button>
    </main>
  )
}