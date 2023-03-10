const Country = ({ country, show }) => {
  return (
    <div>
      {country.length > 1 && country.length <= 10
        ? country.map((item) => (
            <p key={item.name.common}>
              {item.name.common} <button onClick={() => show}>show</button>
            </p>
          ))
        : null}
      {country.length === 1 ? (
        <div>
          <h2>{country[0].name.common}</h2>
          <p>Capital: {country[0].capital}</p>
          <p>Area: {country[0].area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country[0].languages).map((val) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
          <img src={country[0].flags.png} alt={country[0].flags.alt} />
        </div>
      ) : null}
      {country.length > 10 ? <p>Too many matches, please specify</p> : null}
    </div>
  );
};

export default Country;
