import React, { useEffect, useState } from "react";
import "./App.scss";
import Box from "./Box.jsx";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {
  const [numbers, setNumbers] = React.useState(generateNumbers());
  const [isWon, setIsWon] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isLost, setIsLost] = useState(false);
  const [isStared, setIsStarted] = useState(false);


  function generateNumbers() {
    const nums = [];
    for (let i = 0; i < 9; i++) {
      const num = Math.ceil(Math.random() * 10);
      nums.push({ value: num, locked: false, id: nanoid() });
    }
    return nums;
  }

  function lock(id) {
    setNumbers((prevNumbers) => {
      return prevNumbers.map((n) => {
        return n.id === id ? { ...n, locked: !n.locked } : n;
      });
    });
  }

  function clickHandler() {
    setNumbers((prevNumbers) => {
      return prevNumbers.map((n) => {
        const num = Math.ceil(Math.random() * 10);
        return n.locked ? n : { ...n, value: num };
      });
    });
  }
  useEffect(() => {
    if (isStared) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStared]);

  useEffect(() => {
    const values = numbers.map((x) => x.value);
    if (values.every((x) => x === values[0])) {
      setIsWon(true);
      setIsLost(false);
      setIsStarted(false);
      console.log(isWon);
      console.log(isLost);
      console.log(isStared);
    }

  }, [numbers]);

  useEffect(() => {
    if (timer === 0 && !isWon) {
      setIsLost(true);
      setIsWon(false);
      setIsStarted(false);
    }
  }, [timer]);

  function win() {}
  const elements = numbers.map((n) => {
    return (
      <Box
        clickHandler={isWon ? win : lock}
        victory={n.victory}
        id={n.id}
        key={n.id}
        value={n.value}
        locked={n.locked}
      />
    );
  });

  function restart() {
    const newNumbers = [];
    for (let i = 0; i < 9; i++) {
      const num = Math.ceil(Math.random() * 10);
      newNumbers.push(num);
    }
    setNumbers(
      newNumbers.map((n) => ({
        value: n,
        locked: false,
        id: nanoid(),
        victory: false,
      }))
    );
    setIsWon(false);
    setIsLost(false);
    setIsStarted(false);
    setTimer(30);
  }
  function start() {
    setIsStarted(true);
    setIsWon(false);
    setIsLost(false);
  }

 
  return (
    <>
      <h1 className="title">Make all numbers equal</h1>
      {isWon && <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />}
      <p className="isntructions">
        You can click a box to lock it's value and click Change Numbers to
        generate new values.
      </p>
      {!isWon && timer >= 0 && <h3 className="timer">Timer: {timer}</h3>}
      <div className="box-container">{isStared || isWon? elements : ""}</div>
      {isWon && <h1 className="win">You've won!</h1>}
      {isLost && <h1 className="win">You've lost!</h1>}
      { !isWon && !isLost && isStared &&
        <button onClick={clickHandler} className={"btn"}>
          "Change Numbers!"
        </button>
      }
      {!isLost && !isWon && !isStared && (
        <button className="btn" onClick={start}>
          Start
        </button>
      )}
      { ((!isLost && isWon) || (isLost && !isWon) ) && 
      (
          <button className="btn" onClick={restart}>
            Restart
          </button>
        )}
    </>
  );
}
