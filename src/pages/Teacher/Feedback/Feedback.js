import React, { useEffect, useState } from 'react';
import Alert from '../../../components/common/Alert/Alert';
import useGetRequest from '../../../hooks/useGetRequest';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import CloseIcon from '@mui/icons-material/Close';
import './Feedback.scss';

const Feedback = () => {
  // const location = useLocation();
  const [endpoint] = useState(`teacher/feedback/`);
  const { data, error, loading } = useGetRequest(endpoint);
  const [feedback, setFeedback] = useState([]);

  const [deleteEndpoint, setDeleteEndpoint] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const {
    data: response,
    error: deleterror,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  useEffect(() => {
    if (data) {
      setFeedback(data);
    }
  }, [data]);
  useEffect(() => {
    if (response) {
      window.location.reload();
    }
  }, [response]);
  const handleDelete = (_id) => {
    console.log('delete');
    setDeleteEndpoint(`teacher/feedback/${_id}`);
    setDeleteId(_id);
  };
  const [showAlert, setShowAlert] = useState(true);
  if (loading && showAlert)
    return (
      <Alert
        message={'Loading...'}
        variant={'message'}
        onCancel={() => setShowAlert(false)}
      />
    );
  if (error && showAlert)
    return (
      <Alert
        message={'Error: ' + error}
        variant={'message'}
        onCancel={() => setShowAlert(false)}
      />
    );
  return (
    <div className="teacher view-feedback">
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Feedback</h2>
        <div className="homework-items-container">
          {feedback.length === 0 ? (
            <p>No feedbacks</p>
          ) : (
            <div className="homework-items">
              {feedback.map(({ _id, studentId, name, email, message }) => (
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
