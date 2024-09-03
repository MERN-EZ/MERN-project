import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AssistantList = ({ assistants, loading, error, onEdit, onDelete }) => {
  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return (
      <Typography color="error">Failed to load assistants: {error}</Typography>
    );

  return (
    <>
    {/* Check if assistants exist and map over the list to display each assistant */}
      {assistants &&
        assistants.map((assistant) => (
          <Card key={assistant._id} sx={{ marginBottom: '10px', boxShadow: 1 }}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                {/* Display assistant's details */}
                <Typography variant="h6">
                  {assistant.firstName} {assistant.lastName}
                </Typography>
                <Typography variant="body2">
                  ID: {assistant.assistantId}
                </Typography>
                <Typography variant="body2">
                  Username: {assistant.username}
                </Typography>
                <Typography variant="body2">
                  Email: {assistant.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {assistant.phoneNumber}
                </Typography>
              </Box>
              <Box>
                {/* Edit button triggers the onEdit function with the assistant's data */}
                <IconButton 
                  aria-label="edit" 
                  onClick={() => {
                    console.log('Editing assistant:', assistant);
                    onEdit(assistant);
                  }}
                  >
                  <EditIcon />
                </IconButton>

                 {/* Delete button triggers the onDelete function with the assistant's ID */}
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    console.log('Deleting assistant with ID:', assistant._id);
                    onDelete(assistant._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default AssistantList;
