import React from "react";
import ArrayFn from "./custom/ArrayFn";

export default function ArrayFnImpl() {
  const stu = ArrayFn(["Student1","Student2","Student3"]);

  const handleStudentAdd = () => {
    console.log("Adding Student....");
    stu.add("Stu".concat(Math.random()));
  };

  const handleStudentReset = () => {
    console.log("Clearing Srudent....");
    stu.clear();
  };

  return (
    <div>
      <ul>
        {stu.data.map((val, idx) => {
          return (<li key={idx}>
              {val}
              <button className="btn btn-info" onClick={() => stu.removeIndex(idx)}>delete</button>
              </li>);
        })}
      </ul>
      <button className="btn btn-warning" onClick={handleStudentAdd}>Add Student</button>
      <button className="btn btn-danger" onClick={handleStudentReset}>Reset</button>
    </div>
  );
}