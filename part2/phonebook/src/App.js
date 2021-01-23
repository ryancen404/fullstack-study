import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const addPerson = (event) => {
      event.preventDefault()
      setPersons(persons.concat({
        name: newName
      }))
      setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          {"name: "} <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p =>
        <div key = {p.name}> {p.name} </div>
      )}
    </div>
  )
}

export default App