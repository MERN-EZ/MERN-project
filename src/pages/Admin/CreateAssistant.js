// // src/pages/Admin/CreateAssistant.js
// import React, { useState } from 'react';
// import Button from '../../components/Button/Button';
// import Form from '../../components/admin/Form';
// import { Container } from '@mui/material';

// const CreateAssistant = () => {
//   const [showForm, setShowForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowForm(true);
//   };

//   const handleFormSubmit = (formData) => {
//     console.log('Form Data:', formData);
//     // Add logic to handle form submission and add a new assistant
//     setShowForm(false); // Hide form after submission
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//   };

//   const formFields = [
//     { name: 'firstName', label: 'First Name', type: 'text' },
//     { name: 'lastName', label: 'Last Name', type: 'text' },
//     { name: 'assistantID', label: 'Assistant ID', type: 'text' },
//     { name: 'email', label: 'Email', type: 'email' },
//     { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
//     {
//       name: 'classroom',
//       label: 'Classroom',
//       type: 'select',
//       options: [
//         { value: 'classroom1', label: 'Classroom 1' }, // Input correct select values
//         { value: 'classroom2', label: 'Classroom 2' },
//       ],
//     },
//     {
//       name: 'venue',
//       label: 'Venue',
//       type: 'select',
//       options: [
//         { value: 'venue1', label: 'Venue 1' },
//         { value: 'venue2', label: 'Venue 2' },
//       ],
//     },
//   ];

//   return (
//     <Container>
//       <Button text="Create Assistant Account +" onClick={handleButtonClick} />
//       {showForm && (
//         <Form
//           formFields={formFields}
//           formType="assistant"
//           onSubmit={handleFormSubmit}
//           onCancel={handleCancel}
//         />
//       )}
//     </Container>
//   );
// };

// export default CreateAssistant;
