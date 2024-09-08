import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../../../context/DatabaseContext';
import Button from '../../../components/Button/Button';
import { useUser } from '../../../context/UserContext';
import support from '../../../images/support.png';
import Alert from '../../../components/Alert/Alert';
import usePostRequest from '../../../hooks/usePostRequest';
import './StudentSupportPage.scss';

const StudentSupportPage = () => {
  const { userDetails } = useUser();
  const { DB } = useDB();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [postData, setPostData] = useState(null);
  const [postEndpoint, setPostEndpoint] = useState(null);

  const {
    response,
    error: postError,
    loading: postLoading,
  } = usePostRequest(postEndpoint, postData, {
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    if (response) {
      setShowSuccessAlert(true);
      setMessage('');
      setPostData(null);
      setPostEndpoint(null);
    }

    if (postError) {
      setAlertMessage('Failed to send message. Please try again later.');
    }
  }, [response, postError]);

  const handleSend = () => {
    if (!message.trim()) {
      setAlertMessage('Please enter a message.');
      return;
    }

    const supportData = {
      studentId: userDetails.studentId,
      name: `${userDetails.firstName} ${userDetails.lastName}`,
      email: userDetails.email,
      message,
    };

    setPostData(supportData);
    setPostEndpoint('student/StudentSupportPage/support');
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
    navigate('/');
  };

  if (postLoading) {
    return <div>Sending message...</div>;
  }

  return (
    <div className="student-support-container">
      <div className="student-support-card">
        <h1>Student Support</h1>
        <img src={support} alt="support" className="support-img" />
        <p>
          We're here to ensure you have the best experience in your ICT class.
          Don’t hesitate to ask questions or suggest improvements—we’re
          listening!
        </p>
        <div className="student-info">
          <p>
            <strong>Name:&nbsp;</strong> {userDetails.firstName}{' '}
            {userDetails.lastName}
          </p>
          <p>
            <strong>Student ID:&nbsp;</strong> {userDetails.studentId}
          </p>
          <p>
            <strong>Email:&nbsp;</strong> {userDetails.email}
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
          <Button text="Send Message" variant="primary" onClick={handleSend} />
        </div>
        {alertMessage && (
          <Alert
            message={alertMessage}
            variant="message"
            onCancel={() => setAlertMessage(null)}
          />
        )}
        {showSuccessAlert && (
          <Alert
            message="Your message has been sent successfully!"
            variant="message"
            onCancel={handleSuccessAlertClose}
          />
        )}
      </div>
    </div>
  );
};

export default StudentSupportPage;
