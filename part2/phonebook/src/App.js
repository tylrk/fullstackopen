import { useState } from "react";
import Name from "./components/Name";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-123-4567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const nameExists = persons.find((person) => person.name === newName || person.number === newNumber);
    nameExists
      ? alert(`${newName || newNumber} is already added to the phonebook`)
      : setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Name key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
