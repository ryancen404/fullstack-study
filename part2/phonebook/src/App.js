import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Filter = ({text, onChange}) => {
    return(
        <div>
          {"filter shown with "} <input value = {text} onChange = {onChange} />
        </div>
    )
}

const PersonForm = ({nameText, numberText, onNameChang, onNumberChange, onSubmit}) => {
    return (
        <form onSubmit = {onSubmit}>
        <div>
            {"name: "} <input value = {nameText} onChange = {onNameChang}/>
        </div>
        <div>
            {"number: "} <input value = {numberText} onChange = {onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = ({ persons }) => {
    return (persons.map(p =><div key = {p.name}> {p.name} {p.number} </div>))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = 
    (event) => setNumber(event.target.value)

  const handleSearchChange = (event) => {
      setSearch(event.target.value)
  }

  const addPerson = (event) => {
      event.preventDefault()
      const find =  persons.findIndex(p => p.name === newName)
      if (find !== -1) {
        window.alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat({
            name: newName,
            number: newNumber
        }))
        setNewName('')
        setNumber('')
      }
  }

  const filterPersons = () => {
      if (search === '') {
          return persons
      }
      const lowerCase = search.toLowerCase()
      let match = []
      persons.forEach (p => {
        let name = p.name.toLowerCase()
        let isMatch = true
        for (let index = 0; index < lowerCase.length; index++) {
            isMatch = lowerCase.charAt(index) === name.charAt(index)
            if (!isMatch) break
        }
        if (isMatch) {
            match.push(p)
        }
      })
      return match
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text = {search} onChange = {handleSearchChange} />

      <h3>{"add a new"}</h3>

      <PersonForm
        nameText = {newName}
        numberText = {newNumber}
        onNameChang = {handleNameChange}
        onNumberChange = {handleNumberChange}
        onSubmit = {addPerson}
        />
      <h3>Numbers</h3>
      
      <Persons persons = {filterPersons()} />
    </div>
  )
}

export default App