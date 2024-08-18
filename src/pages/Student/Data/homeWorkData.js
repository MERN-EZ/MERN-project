// import { useState, useEffect } from 'react';
// import useGetRequest from '../../../hooks/useGetRequest';

// const useHomeworkData = () => {
//   const [homework, setHomework] = useState([]);
//   const { data, error, loading } = useGetRequest('student/homeworks');

//   useEffect(() => {
//     if (data) {
//       setHomework(data);
//     }
//   }, [data]);

//   return { homework, error, loading };
// };

// export default useHomeworkData;












const homeworkData = [
  {
    id: 1,
    lesson: 'Boolean Algebra', // Lesson this homework belongs to
    title: 'Homework 1.1',
    description: 'Exercises on page 22.',
    deadline: '2024-08-10T23:59:00', // ISO 8601 format deadline
    homework: [
      {
        id: 436,
        title: '3453345',
        description: 'eeeeeeeee',
        deadline: '2024-08-03T00:00:00.000Z',
        reminders: ['false,false,false'],
        _id: '66bd2338d9eef9652437b103',
      },
    ],
    __v: 1,
  },
  {
    id: 2,
    lesson: 'Newton Raphson Method',
    title: 'Homework 1.2',
    description: 'Training exercise on approximation.',
    deadline: '2024-08-15T17:00:00',
    homework: [
      {
        id: 437,
        title: 'Approximation Exercise',
        description: 'Training exercise on approximation.',
        deadline: '2024-08-15T17:00:00.000Z',
        reminders: ['false,false,false'],
        _id: '66bd2338d9eef9652437b104',
      },
    ],
    __v: 1,
  },
  {
    id: 3,
    lesson: 'Newton Raphson Method',
    title: 'Homework 1.3',
    description: 'Diagram plot exercise.',
    deadline: '2024-08-20T12:00:00',
    homework: [
      {
        id: 438,
        title: 'Diagram Plot',
        description: 'Diagram plot exercise.',
        deadline: '2024-08-20T12:00:00.000Z',
        reminders: ['false,false,false'],
        _id: '66bd2338d9eef9652437b105',
      },
    ],
    __v: 1,
  },
  {
    id: 4,
    lesson: 'Flow Charts',
    title: 'Homework 1.4',
    description: 'Presentation on recent topics.',
    deadline: '2024-08-25T09:30:00',
    homework: [
      {
        id: 439,
        title: 'Presentation Topics',
        description: 'Presentation on recent topics.',
        deadline: '2024-08-25T09:30:00.000Z',
        reminders: ['false,false,false'],
        _id: '66bd2338d9eef9652437b106',
      },
    ],
    __v: 1,
  },
];

export default homeworkData;
