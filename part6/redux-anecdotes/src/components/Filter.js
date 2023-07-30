import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "FILTER",
      payload: event.target.value,
    });
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
