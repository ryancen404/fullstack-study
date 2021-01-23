import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.text}</h1>

const Part = ({ name, exercises }) => (
  <div>
    <p>
      {name} {exercises}
    </p>
  </div>
)

const Total = ({ count }) => (
  <div>
    <b>
      {"total of " + count + " exercises"}
    </b>
  </div>
)

const Content = ({ parts }) => {
  let res = 0
  parts.forEach(part => {
    res += part.exercises
  });
  return (
    <div>
      {parts.map(part => 
          <Part key = {part.id} name = {part.name} exercises = {part.exercises} />
      )}
      <Total count = {res} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
       <Header text = {course.name} />
       <Content parts = {course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }
  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))