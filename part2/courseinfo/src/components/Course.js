const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
