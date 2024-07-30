import React from "react";
import { Container, Grid } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NavCard from "../../../components/Admin/Navcard";

const AdminRequestsMain = () => {
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
        {/* Card to Create a Classroom*/}
        <Grid item>
          <NavCard
            title="Create Classroom"
            icon={<AddBoxOutlinedIcon style={{ fontSize: 100 }} />}
            navigateTo="/create-classroom" // The route to navigate to the Create Classroom Page when the card is clicked
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminRequestsMain;
