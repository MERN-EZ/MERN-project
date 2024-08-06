import React from "react";
import "./Homework.css";

const Homework = ({ homework }) => {
  return (
    <div className="homework">
      <h4>{homework.title}</h4>
      <p>{homework.description}</p>
      <p>Deadline: {homework.deadline}</p>
      <p>Reminders: {homework.reminders.join(", ")}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Homework;
