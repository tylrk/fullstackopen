import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    console.log("effect ran, country is now", value);

    if (value) {
      console.log("fetching country...");
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then((response) => {
          setCountries(response.data);
          if (response.data.length === 1) {
            setSelectedCountry(response.data[0]);
          } else {
            setSelectedCountry(null);
          }
        })
        .catch((err) => {
          alert("Cannot find countries");
        });
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <br />
      <form>
        Find Countries: <input value={value} onChange={handleChange} />
      </form>
      {countries.length > 10 ? (
        <p>Too many matches, please specify</p>
      ) : (
        countries.map((country) => (
          <Country
            key={country.name.common}
            country={country}
            onSelect={handleClick}
            selectedCountry={selectedCountry}
          />
        ))
      )}
    </div>
  );
}

export default App;
