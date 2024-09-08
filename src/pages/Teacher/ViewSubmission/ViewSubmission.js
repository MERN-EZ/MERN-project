import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Alert from '../../../components/Alert/Alert';
import useGetRequest from '../../../hooks/useGetRequest';
import './ViewSubmission.scss';

const ViewSubmission = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lessonId = queryParams.get('lessonId');
  const homeworkId = queryParams.get('homeworkId');
  console.log(lessonId, homeworkId);
  const [endpoint, setEndpoint] = useState(null);
  const { data, error, loading } = useGetRequest(endpoint);
  const [submission, setSubmission] = useState([]);

  useEffect(() => {
    if (lessonId && homeworkId) {
      setEndpoint(`teacher/submissions/${lessonId}/${homeworkId}`);
    }
  }, [lessonId, homeworkId]);

  useEffect(() => {
    if (data) {
      setSubmission(data);
    }
  }, [data]);
  const [showAlert, setShowAlert] = useState(false);
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
    <div className="teacher view-submission">
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Home Works</h2>
        <div className="homework-items-container">
          {submission.length === 0 ? (
            <p>No submissions</p>
          ) : (
            <div className="homework-items">
              {submission.map(
                ({ _id, studentId, submissionText, submissionDate }) => (
                  <div key={_id} className="homework-item">
                    <div>
                      <span> {submissionDate.split('T')[0]}</span>
                      <pre>- </pre>
                      <span className="hw-title">{studentId}</span>
                    </div>
                    <div>
                      <pre className="des">&gt;&gt; {submissionText}</pre>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewSubmission;
