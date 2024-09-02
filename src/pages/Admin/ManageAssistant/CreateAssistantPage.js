import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import Button from '../../../components/common/Button/Button';
import AssistantForm from './AssistantForm';
import AssistantList from './AssistantList';
import { useDB } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';

const baseUrl = 'http://localhost:5000';

const CreateAssistant = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState(null);
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { DB } = useDB();
  const { Auth } = useAuth();

  const fetchAssistants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/admin/assistants`, {
        headers: {
          'db-name': DB,
          Authorization: `Bearer ${Auth}`,
        },
      });
      setAssistants(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch assistants');
      console.error(err);
      alert('Failed to fetch assistants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    setLoading(true);
    try {
      if (editingAssistant) {
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
        await axios.post(`${baseUrl}/admin/assistants`, formData, {
          headers: {
            'db-name': DB,
            Authorization: `Bearer ${Auth}`,
          },
        });
        alert('Assistant created successfully.');
      }
      setShowForm(false);
      setEditingAssistant(null);
      fetchAssistants(); // Refresh the list
    } catch (err) {
      console.error(err);
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

  const handleEdit = (assistant) => {
    setEditingAssistant(assistant._id);
    setShowForm(true);
  };

  const handleDelete = async (assistantId) => {
    if (window.confirm('Are you sure you want to delete this assistant?')) {
      setLoading(true);
      try {
        await axios.delete(`${baseUrl}/admin/assistants/${assistantId}`, {
          headers: {
            'db-name': DB,
            Authorization: `Bearer ${Auth}`,
          },
        });
        alert('Assistant deleted successfully.');
        fetchAssistants(); // Refresh the list
      } catch (err) {
        console.error(err);
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
      <Box sx={{ position: 'absolute', top: 20, left: -120 }}>
        <Button
          text="Create Assistant Account &nbsp;&nbsp;+"
          variant="primary"
          onClick={() => {
            setShowForm(true);
            setEditingAssistant(null);
          }}
        />
      </Box>

      {showForm && (
        <AssistantForm
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setShowForm(false)}
          initialData={
            editingAssistant
              ? assistants.find((a) => a._id === editingAssistant)
              : null
          }
        />
      )}

      <Box sx={{ marginTop: '80px', marginLeft: '-120px' }}>
        <Typography variant="h6" gutterBottom>
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
