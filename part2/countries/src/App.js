import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState([]);
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    console.log("effect ran, country is now", value);

    if (value) {
      console.log("fetching country...");
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then((response) => {
          setCountry(response.data);
        });
    }
  }, [value]);

  // const onSearch = (event) => {
  //   event.preventDefault();
  //   setSearchInput(value)
  // }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <br />
      <form>
        Find Countries: <input value={value} onChange={handleChange} />
      </form>
      <pre>
        {country.length > 0 && country.length <= 10 ? (
          country.map((item) => (
            <h1 key={item.name.common}>{item.name.common}</h1>
          ))
        ) : (
          <p>Too many matches, please specify</p>
        )}
        {country.length === 1 ? (
          <div>
            <p>Capital: {country[0].capital}</p>
            <p>Area: {country[0].area}</p>
            <h3>Languages:</h3>
            <ul>
            {country.map((item) =>
              Object.values(item.languages).map((val) => (
                <li key={val}>{val}</li>
              ))
            )}
            </ul>
            <img src={country[0].flags.png} alt={country[0].flags.alt}/>
          </div>
        ) : null}
      </pre>
    </div>
  );
}

export default App;

// country.map((item, idx) => (
//   <div key={idx}>
//     <p key={item.capital}>Capital: {item.capital}</p>
//     <p key={item.area}>Area: {item.area}</p>
//     <h3>Languages:</h3>
//   </div>
// )
