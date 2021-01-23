import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')

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

  const getShowNumbers = () => {
      if (search === '') {
          return persons.map(p =><div key = {p.name}> {p.name} {p.number} </div>)
      }
      const lowerCase = search.toLowerCase()
      console.log(lowerCase);
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
      console.log(match);
      return match.map(p =><div key = {p.name}> {p.name} {p.number} </div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          {"filter shown with "} <input value = {search} onChange = {handleSearchChange} />
      </div>
      <h2>{"add a new"}</h2>
      <form onSubmit = {addPerson}>
        <div>
            {"name: "} <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
            {"number: "} <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {getShowNumbers()}
    </div>
  )
}

export default App