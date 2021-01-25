import axios from 'axios';
import React, {useState} from 'react';


const Search = ({text, onChange}) => {
    return (
        <div>
            {"find countries "}
            <input value = {text} onChange = {onChange} />
        </div>
    )
}

const MoreThanWarn = () =>
         <div>{"To many matches, specify another filter"}</div>

const LessThanTen = ({names}) =>
        <>
            {names.map(e =>
                <div key = {e}>{e}</div>
            )}
        </>

const Country = ({country}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <div>{country.capital}</div>
            <div>{country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map( l =>
                    <li key = {l.name}>{l.name}</li>
                )}
            </ul>
            <img src = {country.flag}
                 alt = {`country of ${country.name}`}
                 height = "200"
                 width = "200" />
        </div>
    )
}

const Content = ({ countries }) => {
    const length = countries.length
    if (length > 10) {
        return <MoreThanWarn />
    } else if (length === 1) {
        return <Country country = {countries[0]} />
    } else if (length > 0 && length < 10) {
        return <LessThanTen names = {countries.map(e => e.name)} />
    } else {
        return <div></div>
    }
}

const App = () => {
    console.log("!!render!!");
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const handleSearchChange = (event) => {
        const input = event.target.value
        console.log(input)
        axios
            .get(`https://restcountries.eu/rest/v2/name/${input}`)
            .then(response => {
                console.log("promise fulfilled!");
                console.log("datalength", response.data.length)
                setCountries(response.data)
            })
        setSearch(input)
    }

    return(
        <div>
            <Search text = {search} onChange = {handleSearchChange} />
            <Content countries = {countries} />
        </div>
    )
}



export default App