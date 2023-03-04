import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import numberService from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    numberService.getAll().then((initialNumbers) => {
      console.log("so fulfilled");
      setPersons(initialNumbers);
    });
  }, []);

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

    if (personExists) {
      if (
        window.confirm(
          `${personExists.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...personExists, number: newNumber };

        numberService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === personExists.id ? returnedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage(`${updatedPerson.name}'s number has been updated`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((err) => {
            setMessage(`Contact information for ${updatedPerson.name} has already been removed from the server`);
          });
      }
    } else {
      numberService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((err) => {
          setMessage(`Could not add ${newName}`);
        });
    }
  };

  const deletePerson = (id) => {
    const newPersons = persons.filter((p) => p.id !== id);
    const personObject = { ...newPersons };
    const deletedPerson = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      numberService
        .deleteNum(id, personObject)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage(`${deletedPerson.name} has been deleted`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
        })
        .catch((err) => {
          setMessage(`Could not delete ${deletedPerson.name}`);
        });
    }
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
      <Notification message={message} />
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
      {filterNames.map((person) => (
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
