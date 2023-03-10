import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState([]);

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <br />
      <form>
        Find Countries: <input value={value} onChange={handleChange} />
      </form>
      <Country country={country} />
    </div>
  );
}

export default App;
