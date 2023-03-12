const Country = ({ country, onSelect, selectedCountry, weather }) => {
  return (
    <div>
      {selectedCountry &&
      selectedCountry.name.common === country.name.common ? (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map((val) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} width='200' />
          <h2>Weather in {country.capital}</h2>
          {weather.current && (
            <div>
              <p>Temperature: {weather.current.temp}° Fahrenheit</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                alt={weather.current.weather[0].description}
                width='80'
              />
              <p>Wind: {weather.current.wind_speed} m/s</p>
            </div>
          )}
        </div>
      ) : (
        <p>
          {country.name.common}{" "}
          <button onClick={() => onSelect(country)}>show</button>
        </p>
      )}
    </div>
  );
};

export default Country;
