import React, { useState, useEffect, useCallback } from 'react';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios'; // Make HTTP requests to the server
import Button from '../../../components/Button/Button';
import AssistantForm from './AssistantForm';
import AssistantList from './AssistantList';
import { useDB } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';

const baseUrl = 'http://localhost:5000';

const CreateAssistant = () => {
  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  // State to track the assistant being edited
  const [editingAssistant, setEditingAssistant] = useState(null);

  // State to manage assistants list
  const [assistants, setAssistants] = useState([]);

  // State to manage loading
  const [loading, setLoading] = useState(false);

  // State to manage error states
  const [error, setError] = useState(null);

  // Context hooks to get database name and authentication token
  const { DB } = useDB();
  const { Auth } = useAuth();

  // Fetch the list of assistants from the server
  const fetchAssistants = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching assistants...');
      // GET request to fetch assistants
      const response = await axios.get(`${baseUrl}/admin/assistants`, {
        headers: {
          'db-name': DB, // Include DB name in the request header
          Authorization: `Bearer ${Auth}`, // Include Auth token in the request header
        },
      });
      console.log('Assistants fetched:', response.data);
      setAssistants(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching assistants:', err);
      setError('Failed to fetch assistants');
      alert('Failed to fetch assistants. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [DB, Auth]); // Re-fetch assistants when DB or Auth changes

  // Fetch assistants when DB or fetchAssistants function changes
  useEffect(() => {
    fetchAssistants(); // Call fetchAssistants function to get the latest data
  }, [DB, fetchAssistants]);

  // Handle creating a new assistant or updating an existing one
  const handleCreateOrUpdate = async (formData) => {
    setLoading(true);
    try {
      if (editingAssistant) {
        console.log('Updating assistant:', editingAssistant);
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await axios.put(
          `${baseUrl}/admin/assistants/${editingAssistant}`,
          updateData,
          {
            headers: {
              'db-name': DB,
              Authorization: `Bearer ${Auth}`,
            },
          }
        );
        alert('Assistant updated successfully.');
      } else {
        console.log('Creating new assistant:', formData);
        await axios.post(`${baseUrl}/admin/assistants`, formData, {
          headers: {
            'db-name': DB,
            Authorization: `Bearer ${Auth}`,
          },
        });
        alert('Assistant created successfully.');
      }
      setShowForm(false); // Hide the form after successful creation/update
      setEditingAssistant(null); // Reset editing state
      fetchAssistants(); // Refresh the list of assistants
    } catch (err) {
      console.error('Error during create/update:', err);
      if (err.response && err.response.data) {
        const { error, message, details } = err.response.data;
        if (error === 'Validation Error') {
          if (Array.isArray(details)) {
            alert(`Validation Error: ${details.join(', ')}`);
          } else {
            alert(`Validation Error: ${message}`);
          }
        } else {
          alert(
            `Failed to ${editingAssistant ? 'update' : 'create'} assistant: ${message || 'Unknown error occurred'}`
          );
        }
      } else {
        alert(
          `Failed to ${editingAssistant ? 'update' : 'create'} assistant. Please try again.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle editing an assistant
  const handleEdit = (assistant) => {
    setEditingAssistant(assistant._id); // Set the current assistant ID for editing
    setShowForm(true); // Show the form for editing
  };

  // Handle deleting an assistant
  const handleDelete = async (assistantId) => {
    if (window.confirm('Are you sure you want to delete this assistant?')) {
      setLoading(true);
      try {
        console.log('Sending delete request to server...'); // Log before sending the request
        await axios.delete(`${baseUrl}/admin/assistants/${assistantId}`, {
          headers: {
            'db-name': DB,
            Authorization: `Bearer ${Auth}`,
          },
        });
        console.log('Assistant deleted successfully.'); // Log success
        alert('Assistant deleted successfully.');
        fetchAssistants(); // Refresh the list
      } catch (err) {
        console.error('Error deleting assistant:', err); // Log the error
        if (err.response && err.response.data && err.response.data.message) {
          alert(`Failed to delete assistant: ${err.response.data.message}`);
        } else {
          alert('Failed to delete assistant. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container sx={{ position: 'relative', paddingTop: '20px' }}>
      {/* Create Assistant Button */}
      <Box
        sx={{ position: 'absolute', top: 20, left: -120, marginLeft: '60px' }}
      >
        <Button
          text="Create Assistant Account &nbsp;&nbsp;+"
          variant="primary"
          onClick={() => {
            setShowForm(true); // Show the form for creating a new assistant
            // Reset editingAssistant to null to switch to "create" mode 
            setEditingAssistant(null); // Clear any editing state
          }}
        />
      </Box>

      {showForm && (
        <AssistantForm
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setShowForm(false)} // Hide the form on cancel
          initialData={
            editingAssistant
              ? assistants.find((a) => a._id === editingAssistant) // Populate form with assistant data if editing
              : null
          }
        />
      )}

      <Box sx={{ marginTop: '80px', marginLeft: '-120px' }}>
        <Typography variant="h6" gutterBottom sx={{ marginLeft: '52px' }}>
          Created Assistants
        </Typography>
        <AssistantList
          assistants={assistants}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
};

export default CreateAssistant;
