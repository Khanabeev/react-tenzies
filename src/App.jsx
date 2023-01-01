import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const isEqual = dice.every((el) => el.value === dice[0].value);
    const isAllHeld = dice.every((el) => el.isHeld === true);
    if (isEqual && isAllHeld) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    return [...Array(10)].map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  function rollDice() {
    if (!tenzies) {
      const newDice = allNewDice();
      setDice((oldDice) =>
        oldDice.map((die, index) => {
          return die.isHeld === false ? { ...newDice[index] } : die;
        })
      );
    }
  }

  function holdDice(id) {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  function startNewGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      number={die.value}
      isHeld={die.isHeld}
      onHoldDie={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="container">
      <div className="box">
        {tenzies && <Confetti width={width} height={height} />}
        <h2 className="box__title">Tenzies</h2>
        <p className="box__description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="box__numbers">{diceElements}</div>
        {tenzies ? (
          <button onClick={startNewGame} className="box__btn">
            New Game
          </button>
        ) : (
          <button onClick={rollDice} className="box__btn">
            Roll
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
