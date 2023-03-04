import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState([]);
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    console.log('effect ran, country is now', value)

    if(value) {
      console.log('fetching country...')
      axios.get(`https://restcountries.com/v3.1/name/${value}`)
      .then(response => {
        setCountry(response.data.map(item => item.name.common))
      })
    }
  }, [value])

  // const onSearch = (event) => {
  //   event.preventDefault();
  //   setSearchInput(value)
  // }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <br />
      <form>
      Find Countries: <input value={value} onChange={handleChange}/>
      </form>
      <pre>
        {country.length > 0 && country[0]}
      </pre>
    </div>
  );
}

export default App;
