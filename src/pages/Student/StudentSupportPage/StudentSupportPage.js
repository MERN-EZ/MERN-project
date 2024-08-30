import React, { useState } from 'react';
import { useDB } from '../../../context/DatabaseContext';
import Button from '../../../components/common/Button/Button';
import { useUser } from '../../../context/UserContext';
import Alert from '../../../components/common/Alert/Alert';
import './StudentSupportPage.scss';

const StudentSupportPage = () => {
  const { userDetails } = useUser();
  const { DB } = useDB();
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('');

  const handleSend = async () => {
    if (!message.trim()) {
      setAlertMessage('Please enter a message.');
      setAlertType('error');
      return;
    }

    const supportData = {
      studentId: userDetails.studentId,
      name: `${userDetails.firstName} ${userDetails.lastName}`,
      email: userDetails.email,
      message,
      batch: DB,
    };

    try {
      const response = await fetch(`/student/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supportData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('Your message has been sent successfully.');
        setAlertType('success');
        setMessage(''); // Clear the textarea
      } else {
        setAlertMessage(data.message || 'Something went wrong.');
        setAlertType('error');
      }
    } catch (error) {
      setAlertMessage('Failed to send message. Please try again later.');
      setAlertType('error');
    }
  };

  return (
    <div className="student-support-page">
      <h1>Student Support</h1>

      <p>
        We're here to ensure you have the best experience in your ICT class.
        Don’t hesitate to ask questions or suggest improvements—we’re listening!
      </p>

      <div className="student-info">
        <p>
          <strong>Student ID:</strong> {userDetails.studentId}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
      </div>

      <div className="form-group">
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question or suggestion here..."
        />
      </div>

      <Button onClick={handleSend}>Send Message</Button>

      {alertMessage && <Alert type={alertType}>{alertMessage}</Alert>}
    </div>
  );
};

export default StudentSupportPage;
