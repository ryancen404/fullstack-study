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

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (
    <div>
      <h1>{"statistics"}</h1>
      {"No feedback given"}
    </div>
    )
  }
  return (
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
      <div>
        {"all " + all}
      </div>
      <div>
        {"average " + ((good - bad) / all)}
      </div>
      <div>
        {"positive " + (100 * (good / all)) + "%"}
      </div>
    </div>
  )
}

let all = 0

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const clickGood = () => {
    all = all + 1 
    setGood(good + 1)
  }
  const clickNeutral = () => {
    all = all + 1 
    setNeutral(neutral + 1)
  }
  const clickBad = () => {
    all = all + 1 
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button onClick = {clickGood} text = {"good"}/>
      <Button onClick = {clickNeutral} text = {"neutral"} />
      <Button onClick = {clickBad} text = {"bad"} />
      <Statistics good = {good} 
                  neutral = {neutral} 
                  bad = {bad}
                  all = {all} />
    </div> 
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
