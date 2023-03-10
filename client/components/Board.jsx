/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import InputBox from './InputBox.jsx';
import Timer from './Timer.jsx';
import Blanks from './Blanks.jsx';

// state passed from App via props:
// resetTimeout (starts at false, set to true if run out of time)
// setRoundScore (starts at 0, updates on isGuessed)
// score
// roundNumber
// englishWord
// foreignWord

function Board(props) {
  const [guessed, isGuessed] = useState(false);
  const [timeRemaining, updateTime] = useState(15);

  useEffect(() => {
    if (guessed === true) {
      props.setScore({
        totalScore: props.score.totalScore + Math.round(timeRemaining * 100),
        latestScore: Math.round(timeRemaining * 100),
      });
      props.setInterstitial(true);
    }
  }, [guessed]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      props.setInterstitial(true);
    }
  }, [timeRemaining]);

  useEffect(() => {
    setInterval(() => {
      updateTime((timeRemaining) => timeRemaining - 0.01);
    }, 10);
  }, []);

  return (
    <div className='flex'>
      <div className='main-container' id='gameboard'>
        <div id='score-time-container'>
          <div id='scorebox'>
            <div id='roundDisplay'>Round {props.roundNumber} of 3</div>
            <div id='scoreDisplay'>Total Score: {props.score.totalScore}</div>
          </div>
          <div id='timer'>
            <Timer timeRemaining={timeRemaining} updateTime={updateTime} />
          </div>
        </div>

        <Blanks foreignWord={props.foreignWord} timeRemaining={timeRemaining} />
        <div id='englishword'>{props.englishWord}</div>
        <InputBox foreignWord={props.foreignWord} isGuessed={isGuessed} />
      </div>
    </div>
  );
}

export default Board;
