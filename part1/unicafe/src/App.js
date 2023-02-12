import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
};

const Statistics = ({ good, neutral, bad, totalReviews }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p> all {totalReviews}</p>
    </div>
  )
}

// UPDATE TOTAL REVIEWS BY SETTING NEW STATE 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    console.log(good);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    console.log(neutral);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    console.log(bad);
  };

  const totalReviews = () => {
    return good + neutral + bad;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} totalReviews={totalReviews}/>
    </div>
  )
}

export default App;
