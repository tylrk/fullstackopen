import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import numberService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    numberService.getAll().then((initialNumbers) => {
      console.log("so fulfilled");
      setPersons(initialNumbers);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const personExists = persons.find(
      (person) =>
        person.name.toLowerCase() === newName.toLowerCase() ||
        person.number === newNumber
    );
    personExists
      ? alert(`${newName || newNumber} is already added to the phonebook`)
      : numberService.create(personObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const filterNames = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} handleFilter={handleFilter} />
      <h2>Add a New Contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {filterNames.map(person => (
        <Persons 
          key={person.id} 
          name={person.name}
          number={person.number}
          />
      ))}
    </div>
  );
};

export default App;
