import React, { useState, useEffect } from "react";
import Lesson from "./Lesson";
import useGetRequest from "./../../../hooks/useGetRequest";
import "./HomeworkManager.css";

const HomeworkManager = () => {
  console.log("HomeworkManager component rendered");
  const { data, error, loading } = useGetRequest(
    "http://localhost:5000/lessons"
  ); // Replace with your actual endpoint

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (data) {
      setLessons(data);
    }
  }, [data]);

  const deleteLesson = (lessonId) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
  };

  const updateLesson = (lessonId) => {
    // Update lesson logic
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
