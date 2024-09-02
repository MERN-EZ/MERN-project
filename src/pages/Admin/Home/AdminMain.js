import React from "react";
import { Container, Grid } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import NavCard from "../../../components/admin/NavCard";

const AdminMain = () => {
  return (
    // Container with height 100vh to ensure it takes the full height of the viewport
    <Container style={{ height: "100vh" }}>
      {/* Grid container with spacing, centering content both horizontally and vertically */}
      <Grid
        container
        spacing={12}
        justifyContent="center" // Centers the Grid items horizontally
        alignItems="center" // Centers the Grid items vertically
        style={{ height: "100%" }} // Ensures the Grid container takes the full height of the parent Container
      >
        {/* Card for Student Requests*/}
        <Grid item>
          <NavCard
            title="Student Requests"
            icon={<PeopleAltOutlinedIcon style={{ fontSize: 100 }} />}
            navigateTo="/student-requests" // The route to navigate to the Student Requests Page when the card is clicked
          />
        </Grid>
        {/* Card to Create Assistants*/}
        <Grid item>
          <NavCard
            title="Create Assistant"
            icon={<PersonOutlineOutlinedIcon style={{ fontSize: 100 }} />}
            navigateTo="/create-assistant" // The route to navigate to the Create Assistant Page when the card is clicked
          />
        </Grid>
        {/* Card to Manage Students*/}
        <Grid item>
          <NavCard
            title="Staff registration"
            icon={<ManageAccountsOutlinedIcon style={{ fontSize: 100 }} />}
            navigateTo="/reg-staff" // The route to navigate to the Student Management Page when the card is clicked
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminMain;
