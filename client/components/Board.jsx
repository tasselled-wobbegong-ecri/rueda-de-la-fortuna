import React, { useState } from 'react';
import InputBox from 'InputBox.jsx';
import Timer from 'Timer.jsx';
import Blanks from 'Blanks.jsx';

// state passed from App via props:
// setTimeout (starts at false, set to true if run out of time)
// setRoundScore (starts at 0, updates on isGuessed)
// score
// roundNumber
// englishWord
// foreignWord

function Board(props) {
  const [guessed, isGuessed] = useState(false);
  const [timeRemaining, updateTime] = useState(15);
  if (guessed === true) {
    props.setScore({
      totalScore: props.score.totalScore + timeRemaining * 100,
      roundScore: timeRemaining * 100,
    });
  }
  if (timeRemaining <= 0) {
    props.setTimeout(true);
  }
  return (
    <div id='gameboard'>
      <div id='scorebox'>
        <div id='roundDisplay'>Round {props.roundNumber} of 10</div>
        <div id='scoreDisplay'>Total Score: {props.score.totalScore}</div>
      </div>
      <Timer timeRemaining={timeRemaining} updateTime={updateTime} />
      <Blanks foreignWord={props.foreignWord} />
      <div id='englishword'>{props.englishWord}</div>
      <InputBox foreignWord={props.foreignWord} isGuessed={isGuessed} />
    </div>
  );
}

export default Board;