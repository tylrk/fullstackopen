import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    console.log("effect ran, country is now", value);
    // const country = countries.map((country) => country);

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

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (selectedCountry) {
      console.log("fetching data..");
      axios
        .get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&units=imperial&appid=${apiKey}`
        )
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        });
    }
  }, [selectedCountry]);

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
            weather={weather}
          />
        ))
      )}
    </div>
  );
}

export default App;
