import React, { useState } from "react";
import Homework from "./Homework";

const Lesson = ({ lesson, deleteLesson, updateLesson }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="lesson">
      <div className="lesson-header" onClick={toggleOpen}>
        <h3>{lesson.title}</h3>
        <button>{isOpen ? "▼" : "▶"}</button>
      </div>
      {isOpen && (
        <div className="lesson-body">
          {lesson.homeworks.map((homework) => (
            <Homework key={homework.id} homework={homework} />
          ))}
          <button onClick={() => updateLesson(lesson.id)}>Edit Lesson</button>
          <button onClick={() => deleteLesson(lesson.id)}>Delete Lesson</button>
        </div>
      )}
    </div>
  );
};

export default Lesson;
