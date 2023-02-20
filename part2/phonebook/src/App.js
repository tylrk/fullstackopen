import { useState } from "react";
import Name from "./components/Name";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123-4567", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const addName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

  const personExists = persons.find(
    (person) => person.name === newName || person.number === newNumber
  );
    personExists
      ? alert(`${newName || newNumber} is already added to the phonebook`)
      : setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setNameFilter(e.target.value)
  }

  console.log(persons.map(person => person.name))

  const filterNames = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
          Filter by Name: <input value={nameFilter} onChange={handleFilter}/>
        </div>
        <h2>Add a New Contact</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterNames.map((person) => (
        <Name key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
