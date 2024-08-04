import Lesson from "./Lesson";
import React, { useState } from "react";
import "./HomeworkManager.css";

const HomeworkManager = () => {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Lesson 1: Newton Raphson Method",
      homeworks: [
        {
          id: 1,
          title: "Homework 1",
          description: "Training exercise on approximation",
          deadline: "2024-08-09",
          reminders: ["2 days prior", "3 hours prior"],
        },
        {
          id: 2,
          title: "Homework 2",
          description: "Training exercise on approximation",
          deadline: "2024-08-09",
          reminders: ["2 days prior", "3 hours prior"],
        },
      ],
    },
  ]);

  const deleteLesson = (lessonId) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
  };

  const updateLesson = (lessonId) => {
    // Update lesson logic
  };

  return (
    <div className="homework-manager">
      {lessons.map((lesson) => (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          deleteLesson={deleteLesson}
          updateLesson={updateLesson}
        />
      ))}
    </div>
  );
};
export default HomeworkManager;

// const [lessons, setLessons] = useState([]);

// useEffect(() => {
//   fetch("http://localhost:5000/lessons")
//     .then((response) => response.json())
//     .then((data) => setLessons(data));
// }, []);

// const deleteLesson = (lessonId) => {
//   fetch(`http://localhost:5000/lessons/${lessonId}`, { method: "DELETE" }).then(
//     () => setLessons(lessons.filter((lesson) => lesson.id !== lessonId))
//   );
// };

// const updateLesson = (lessonId) => {
//   // Update lesson logic
// };
