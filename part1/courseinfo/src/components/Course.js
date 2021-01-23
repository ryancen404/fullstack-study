import React from 'react'

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

export default Course