import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import Die from "./components/Die/Die";
import Button from "./components/Button/Button";
import ConfettiComponent from "./customHooks/ConfettiComponent";
import Timer from "./components/Timer/Timer";

function App() {

  // GENERATING DICE

  const generateZeroState = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        number: "?",
        isHeld: false,
        id: nanoid()
      });
    }
    return newDice;
  }

  const generateNewDie = () => {
    return {
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const [gameStart, setGameStart] = useState(false);
  const [diceCollection, setDiceCollection] = useState(generateZeroState());
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("score")) || []
  );
  const [tenzies, setTenzies] = useState(false);

  const diceElements = diceCollection.map(die => (
    <Die
      value={die.number}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  // CHECK IF DIE IS HELD  

  const holdDice = (id) => {
    setDiceCollection(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die;
    }))
  }

  // TIME COUNTING

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    if (tenzies) {
      setRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, tenzies]);

  //TIME SAVING  


  const saveScore = () => {
    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const miliSec = ("0" + ((time / 10) % 100)).slice(-2);

    const newScore = {
      id: nanoid(),
      body: `${minutes}:${seconds}:${miliSec}`
    }
    setScores(prevScores => [newScore, ...prevScores]);
  }

  const sorted = scores.sort((a, b) => Number(a.body.replace(/[^a-zA-Z0-9 ]/g, '')) - Number(b.body.replace(/[^a-zA-Z0-9 ]/g, '')));

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(scores))
  }, [scores])

  // CHECK IW VINS

  useEffect(() => {
    const refValue = diceCollection[0].number;
    if (diceCollection.every(die => die.number === refValue) &&
      diceCollection.every(die => die.isHeld)) {
      setTenzies(true);
    }
  }, [diceCollection]);

  // BUTTON

  const handleRoll = () => {
    if (tenzies) {
      setRunning(false);
      setTime(0);
      setDiceCollection(generateZeroState());
      setTenzies(false);
      saveScore();
    } else {
      setRunning(true);
      setDiceCollection(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }));
    }
  }



  return (
    <main>
      {tenzies && <ConfettiComponent />}

      <div className="main-container">
        <div className="tenzie-description">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="die-container">
          {diceElements}
        </div>
        <Button
          text={
            tenzies ? "Save & New Game" : "Roll"}
          handleClick={handleRoll}
        />
      </div>

      <div className="aside-container">
        <Timer running={running} time={time} />
        <div className="scores-container">
          <h1>Table</h1>
          <div className="table">
            {

              scores.length > 0 ?
                sorted.map(score => (<p key={score.id}>{score.body}</p>)) :
                ""
            }
          </div>

        </div>

      </div>

    </main>
  );
}

export default App;
