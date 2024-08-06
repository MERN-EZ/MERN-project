import React, { useState } from "react";
import "./Homework.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const Homework = ({ homework }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="homework-teacher">
      <div className="homework-header" onClick={toggleOpen}>
        <button>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</button>
        <h4>{homework.title}</h4>
      </div>
      {isOpen && (
        <div className="homework-body">
          <p>{homework.description}</p>
          <p>Deadline: {homework.deadline}</p>
          <p>Reminders: {homework.reminders.join(", ")}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Homework;
