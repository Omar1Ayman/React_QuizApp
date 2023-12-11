import React from "react";
import { useEffect } from "react";
const style = {
  padding: "15px 50px",
  border: "none",
  borderRadius: "50px",
  margin: "15px 0",
  fontSize: "15px",
  fontWeight: "bold",
  color: "#fff",
  background: "rgb(83, 83, 83)",
  width: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Timer = ({ dispatch, timeRemaining }) => {
  const min = Math.floor(timeRemaining / 60);
  const sec = timeRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <p style={style}>
      {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
    </p>
  );
};

export default Timer;
