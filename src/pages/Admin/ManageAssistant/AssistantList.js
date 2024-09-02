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
                <IconButton aria-label="edit" onClick={() => onEdit(assistant)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(assistant._id)}
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
