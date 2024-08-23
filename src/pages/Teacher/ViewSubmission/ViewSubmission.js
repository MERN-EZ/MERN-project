import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="teacher view-submission">
      <section className="homework-rounded-edge-rectangle">
        <h2 className="homework-header">Home Works</h2>
        <div className="homework-items-container">
          {submission.length === 0 ? (
            <p>No submissions</p>
          ) : (
            <div className="homework-items">
              {submission.map(({ _id, title, description }) => (
                <div key={_id} className="homework-item">
                  <div>
                    <pre>- </pre>
                    <span className="hw-title"> {title}</span>
                  </div>
                  <div>
                    <pre className="des">* {description}</pre>
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

export default ViewSubmission;

const Submission = ({ submission }) => {
  return (
    <div className="submission">
      <div className="submission-header">
        <h3>{submission.student}</h3>
        <p>{submission.date}</p>
      </div>
      <div className="submission-content">
        <p>{submission.content}</p>
      </div>
    </div>
  );
};
