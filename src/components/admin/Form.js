import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {TextField, Container, Box, Grid, FormControl, FormLabel, MenuItem,FormGroup, FormControlLabel,formFields, Select, InputLabel } from '@mui/material';
import Button from '../Button/Button';

// Create the form by undestanding the form elemets
// Add comments
// fro now use your own cutom button
// Menu Item??
const Form = ({formFeilds, formType, onSubmit, onCancel}) => {

    // Initialize formData state based on formFields prop
    const [formData, setFormData] = useState (
        formFeilds.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {})
    );

    // Handle changes to form input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handel form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }
    return (
        <Container>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Map through each form field and create a Grid item for each */}
                {formFields.map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    {/* FormControl to wrap the input components for better control */}
                    <FormControl fullWidth>
                      {/* InputLabel to show the label of the field */}
                      <InputLabel>{field.label}</InputLabel>
                      {/* Conditional rendering based on the field type */}
                      {field.type === 'select' ? (
                        // Select component for dropdown fields
                        <Select
                          label={field.label}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                        >
                          {/* Map through options and create a MenuItem for each */}
                          {field.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        // TextField component for other input types
                        <TextField
                          type={field.type}
                          label={field.label}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                        />
                      )}
                    </FormControl>
                  </Grid>
                ))}
                {/* Grid item for the form buttons */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* Submit button */}
                  <Button type="submit" variant="contained" color="primary">
                    {formType === 'assistant' ? 'Create Assistant Account' : 'Create Classroom'}
                  </Button>
                  {/* Cancel button */}
                  <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ marginLeft: 2 }}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      );
    };

    Form.propTypes = {
        formFields: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
              PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
              })
            ),
          })
        ).isRequired,
        formType: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
      };
      
      export default Form;
    
{/* <TextField
  id="demo-helper-text-aligned-no-helper"
  label="Name"
/>


<FormControl variant="standard">
<InputLabel htmlFor="component-simple">Name</InputLabel>
<Input id="component-simple" defaultValue="Composed TextField" />
</FormControl> */}


// Go thor forms in material ui again

//MenuItem???















