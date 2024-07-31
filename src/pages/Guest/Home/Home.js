import React from "react";
import Button from "../../../components/common/Button/Button";
import "../../../components/common/Button/Button.css";

function Home() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>This is a sample homepage for Guest.</p>
      <Button text="Click Me" variant="alt" onClick={handleClick} />
    </div>
  );
}

export default Home;
