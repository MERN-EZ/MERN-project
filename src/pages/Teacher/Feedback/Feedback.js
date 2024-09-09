import React, { useEffect, useState } from 'react';
import Alert from '../../../components/Alert/Alert';
import useGetRequest from '../../../hooks/useGetRequest';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import CloseIcon from '@mui/icons-material/Close';
import './Feedback.scss';

const Feedback = () => {
  const [endpoint] = useState('teacher/feedback/');
  const { data, error, loading } = useGetRequest(endpoint);
  const [feedback, setFeedback] = useState([]);
  const [deleteEndpoint, setDeleteEndpoint] = useState('');

  const {
    data: deleteResponse,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (data) {
      setFeedback(data);
    }
  }, [data]);

  useEffect(() => {
    if (deleteResponse) {
      window.location.reload(); 
    }
  }, [deleteResponse]);

  const handleDelete = (id) => {
    setDeleteEndpoint(`teacher/feedback/${id}`);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if ((loading || deleteLoading) && showAlert) {
    return (
      <Alert
        message="Loading..."
        variant="message"
        onCancel={handleCloseAlert}
      />
    );
  }

  if ((error || deleteError) && showAlert) {
    const errorMessage = error || deleteError;
    return (
      <Alert
        message={`Error: ${errorMessage}`}
        variant="message"
        onCancel={handleCloseAlert}
      />
    );
  }

  return (
    <div className="teacher view-feedback">
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Feedback</h2>
        <div className="homework-items-container">
          {feedback.length === 0 ? (
            <p>No feedback available</p>
          ) : (
            <div className="homework-items">
              {feedback.map(({ _id, name, email, message }) => (
                <div key={_id} className="homework-item">
                  <span className="deleteContainer">
                    <CloseIcon
                      className="delete"
                      onClick={() => handleDelete(_id)}
                    />
                  </span>
                  <div>
                    <span className="des" style={{ fontSize: '0.8rem' }}>
                      <pre>- </pre>
                      <span>
                        {name} | ({email})
                      </span>
                    </span>
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 'lighter' }}>
                    <pre>&gt;&gt; {message}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
