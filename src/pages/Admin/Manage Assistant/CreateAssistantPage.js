import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Button from '../../components/common/Button/Button';
import AssistantForm from './AssistantForm';
import AssistantList from './AssistantList';
import useGetRequest from '../../hooks/useGetRequest';

const CreateAssistantPage = () => {
  // State to manage form visibility
  const [showForm, setShowForm] = useState(false);
  // State to track the assistant being edited
  const [editingAssistant, setEditingAssistant] = useState(null);

  // Hook for fetching the list of assistants
  const {
    data: assistants,
    error,
    loading,
  } = useGetRequest('admin/assistants');

  // Handle form visibility and reset form
  const handleCreateClick = () => {
    setEditingAssistant(null);
    setShowForm(true);
  };

  // Handle form cancellation
  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <Container sx={{ position: 'relative', paddingTop: '20px' }}>
      {/* Create Assistant Button */}
      <Box sx={{ position: 'absolute', top: 20, left: -120 }}>
        <Button
          text="Create Assistant Account &nbsp;&nbsp;+"
          variant="primary"
          onClick={handleCreateClick}
        />
      </Box>

      {/* Form Card for creating or editing an assistant */}
      {showForm && (
        <AssistantForm
          editingAssistant={editingAssistant}
          onClose={handleFormClose}
        />
      )}

      {/* Display List of Assistants */}
      <Box sx={{ marginTop: '80px', marginLeft: '-120px' }}>
        <Typography variant="h6" gutterBottom>
          Created Assistants
        </Typography>
        <AssistantList
          assistants={assistants}
          loading={loading}
          error={error}
          onEdit={(assistant) => {
            setEditingAssistant(assistant._id);
            setShowForm(true);
          }}
          onDelete={(assistantId) => {
            // handle delete logic here
          }}
        />
      </Box>
    </Container>
  );
};

export default CreateAssistantPage;
