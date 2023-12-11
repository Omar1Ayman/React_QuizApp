import React from "react";
import img1 from "../logo.png";

const Header = () => {
  return (
    <header>
      <img src={img1} alt="logo" />
      <h1>The React Quiz</h1>
    </header>
  );
};

export default Header;
