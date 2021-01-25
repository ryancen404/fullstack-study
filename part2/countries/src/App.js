import axios from 'axios';
import React, {useState} from 'react';


const Search = ({action}) => {
    console.log("!!Search render!!");
    const [search, setSearch] = useState('')

    const handleSearchChange = (event) => {
        const input = event.target.value
        setSearch(input)
        action(input)
    }

    return (
        <div>
            {"find countries "}
            <input value = {search} onChange = {handleSearchChange} />
        </div>
    )
}

const MoreThanWarn = () => {
    console.log("render MoreThanWarn");
    return <div>{"To many matches, specify another filter"}</div>;
}

const LessThanTen = ({countries}) => {
    console.log("render LessThanTen")
    
    const [country, setCountry] = useState(null)

    const handleClick = (country) => {
        setCountry(country)
    }

    return (
        <>
            {countries.map(e => 
                        <div key={e.name}>
                             {e.name} 
                             <button key ={e.name} 
                                    onClick = {() => handleClick(e)}>
                                show
                             </button>
                        </div>)}
            <div>
                {country === null ? <div/> : <Country country = {country} />}
            </div>
        </>
    )
}

const Country = ({country}) => {
    console.log("render Country");
    return(
        <div>
            <h1>{country.name}</h1>
            <div>{`capital ${country.capital}`}</div>
            <div>{`population ${country.population}`}</div>
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
        return <LessThanTen countries = {countries} />
    } else {
        return <div></div>
    }
}

const App = () => {
    console.log("!!render App!!");
    const [countries, setCountries] = useState([])

    const requestAPI = (params) => {
        console.log("toSeachChange", params)
        axios
            .get(`https://restcountries.eu/rest/v2/name/${params}`)
            .then(response => {
                console.log("promise fulfilled!");
                console.log("datalength", response.data.length)
                setCountries(response.data)
            })
    }

    return(
        <div>
            <Search action = {requestAPI} />
            <Content countries = {countries} />
        </div>
    )
}



export default App