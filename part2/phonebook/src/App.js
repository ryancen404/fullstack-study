import React, { useState, useEffect } from 'react'
import personsService from './services/persons';

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

const Persons = ({ persons, clickRef }) => {
  console.log("Persons render");
  return (
      persons.map(p =>
        <div key = {p.id}>
            {p.name} {p.number} 
            <button key = {p.id} 
                    onClick = {() => clickRef(p)}>
              delete
            </button>
        </div>
      )
  )
}

const App = () => {
  console.log("App render");
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(all => {
        console.log('useEffect get :>> ', all);
        setPersons(all)
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
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personsService
          .create(newPerson)
          .then(returnPerson => {
            setPersons(persons.concat(returnPerson))
          })
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

  const handleDeleteClick = (p) => {
    if (window.confirm(`Delete ${p.name} ?`)) {
      personsService
        .deleteById(p.id)
        .then(res => {
          setPersons(persons.filter(e => e.id !== p.id))
        })
    }
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
      
      <Persons 
        persons = {filterPersons()}
        clickRef = {handleDeleteClick} />
    </div>
  )
}

export default App