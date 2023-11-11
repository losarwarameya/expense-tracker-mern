import React from "react";
import Dashboard from "./Dashboard";
import AddEntry from "./AddEntry";

const Hero = (props) => {
  const { hero } = props;

  return (
    <div>
      {hero === "Dashboard" ? (
        <Dashboard />
      ) : hero === "AddEntry" ? (
        <AddEntry />
      ) : null}
    </div>
  );
};

export default Hero;
