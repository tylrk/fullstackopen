const Filter = ({ nameFilter, handleFilter }) => {
  return (
    <div>
      Filter by Name: <input value={nameFilter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
