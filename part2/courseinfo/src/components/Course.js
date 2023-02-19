const Header = ({ name }) => {
  return <h3>{name}</h3>;
};

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Part parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

const Part = ({ parts }) => {
  return (
    <div>
      {parts.map((part, idx) => (
        <p key={idx}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h4>total of {total} exercises</h4>;
};

const Course = ({ courses }) => {
  return (
    <div>
      <Content courses={courses} />
    </div>
  );
};

export default Course;
