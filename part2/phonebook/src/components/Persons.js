const Persons = ({ filterNames }) => {
  return (
    <div>
      {filterNames.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
