import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h2>{props.text}</h2>

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
  const exercises = parts.map(e => e.exercises)
  const total = exercises.reduce((s, p) => s + p)
  return (
    <div>
      {parts.map(part => 
          <Part key = {part.id} name = {part.name} exercises = {part.exercises} />
      )}
      <Total count = {total} />
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>{"Web development curriculum"}</h1>
      {courses.map(e =>
        <Course course={e} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))