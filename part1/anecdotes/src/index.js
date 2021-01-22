import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <>
    <button onClick = {onClick} > {text} </button>
  </>
)

const Header = (props) => (<h1>{props.text}</h1>)

const Content = (props) => (<div>{props.text}</div>)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [max, setMax] = useState(0)

  const clickNext = () => {
    const random = parseInt(Math.random() * anecdotes.length, 10)
    setSelected(random)
  }

  const clickVote = () => {
    const copy = [...points]
    copy[selected] += 1
    let maxValue = Math.max(...copy)
    const maxIndex = copy.indexOf(maxValue)
    setPoints(copy)
    setMax(maxIndex)
  }

  return (
    <div>
      <Header text = {"Anecdote of the day"}/>
      <Content text =  {props.anecdotes[selected]} />
      <Content text = {"has " + points[selected] + " votes"} />
      <div>
        <Button onClick = {clickVote} text = {"vote"} />
        <Button onClick = {clickNext} text = {"next anecdote"} />
      </div>
      <div>
        <Header text = {"Anecdote with most votes"} />
        <Content text = {props.anecdotes[max]} />
        <Content text = {"has " + points[max] + " votes"} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)