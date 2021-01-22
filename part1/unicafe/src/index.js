import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => (
  <h1>give feedback</h1>
)

const Button = ({onClick, text}) => (
  <>
    <button onClick = {onClick}>{text}</button>
  </>
)

const Stat = ({good, neutral, bad}) => (
  <div>
    <h1>{"statistics"}</h1>
    <div>
      {"good " + good}
    </div>
    <div>
      {"neutral " + neutral}
    </div>
    <div>
      {"bad " + bad}
    </div>
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button onClick = {() => setGood(good + 1)} text = {"good"}/>
      <Button onClick = {() => setNeutral(neutral + 1)} text = {"neutral"} />
      <Button onClick = {() => setBad(bad + 1)} text = {"bad"} />
      <Stat good = {good} neutral = {neutral} bad = {bad} />
    </div> 
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
