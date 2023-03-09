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
          country.map((item) => <p key={item.name.common}>{item.name.common}</p>)
        ) : (
          <p>Too many matches, please specify</p>
        )}
        {country.length === 1
          ? country.map((item, idx) => (
              <div key={idx}>
                <p key={item.capital}>Capital: {item.capital}</p>
                <p key={item.area}>Area: {item.area}</p>
                <h3>Languages:</h3>
              </div>
            ))
          : null}
      </pre>
    </div>
  );
}

export default App;
