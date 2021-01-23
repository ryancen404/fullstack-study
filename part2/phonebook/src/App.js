import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
        name: 'Arto Hellas' ,
        phone: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setPhone ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handlePhoneChange = 
    (event) => setPhone(event.target.value)

  const addPerson = (event) => {
      event.preventDefault()
      const find =  persons.findIndex(p => p.name === newName)
      if (find !== -1) {
        window.alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat({
            name: newName,
            phone: newPhone
        }))
        setNewName('')
        setPhone('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
            {"name: "} <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
            {"number: "} <input value = {newPhone} onChange = {handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p =>
        <div key = {p.name}> {p.name} {p.phone} </div>
      )}
    </div>
  )
}

export default App