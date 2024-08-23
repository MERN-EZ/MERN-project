import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetRequest from '../../../hooks/useGetRequest';
import './ViewSubmission.scss';

const ViewSubmission = () => {
  const { lessonId, homeworkId } = useParams();
  const { data, error, loading } = useGetRequest(
    `teacher/submissions/${lessonId}/${homeworkId}`
  );
  const [submission, setSubmission] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (data) {
    setSubmission(data);
  }

  return (
    <div className="view-submission teacher">
      <h1>Submissions</h1>
      <div className="submission-details">
        {submission ? (
          submission.map((submission, index) => (
            <Submission key={index} submission={submission} />
          ))
        ) : (
          <p>No submissions</p>
        )}
      </div>
      <div className="submission-content">
        <p>{submission.content}</p>
      </div>
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
