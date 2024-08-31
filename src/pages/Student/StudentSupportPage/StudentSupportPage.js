import React, { useState, useEffect } from 'react';
import { useDB } from '../../../context/DatabaseContext';
import Button from '../../../components/common/Button/Button';
import { useUser } from '../../../context/UserContext';
import Alert from '../../../components/common/Alert/Alert';
import usePostRequest from '../../../hooks/usePostRequest';
import './StudentSupportPage.scss';

const StudentSupportPage = () => {
  const { userDetails } = useUser();
  const { DB } = useDB();
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('');

  const [postData, setPostData] = useState(null);
  const [postEndpoint, setPostEndpoint] = useState(null);

  const { response, error: postError, loading: postLoading } = usePostRequest(postEndpoint, postData, {
    'Content-Type': 'application/json',
  });
  

  useEffect(() => {
    console.log('response', response);
    // Handle response or error from the POST request
    if (response) {
      console.log('response', response);
      setAlertMessage('Your message has been sent successfully.');
      setAlertType('success');
      setMessage(''); // Clear the textarea
      setPostData(null); // Reset postData after the request is completed
      setPostEndpoint(null); // Reset postEndpoint after the request is completed
    }
    console.log('postError', postError);
    if (postError) {
      setAlertMessage('Failed to send message. Please try again later.');
      setAlertType('error');
      setPostData(null); // Reset postData after the request is completed
      setPostEndpoint(null); // Reset postEndpoint after the request is completed
    }
  }, [response, postError]);

  const handleSend = () => {
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

    setPostData(supportData);
    setPostEndpoint('student/StudentSupportPage/support');
  };

  if (postLoading) {
    return <div>Sending message...</div>;
  }

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
      <div>
        <Button onClick={handleSend} style={{ display: 'block', margin: '10px auto' }}>
          Send Message
        </Button>
      </div>
      {alertMessage && <Alert type={alertType}>{alertMessage}</Alert>}
    </div>
  );
};

export default StudentSupportPage;
