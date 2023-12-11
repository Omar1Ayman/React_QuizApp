import React from "react";

const Finished = ({ username, points, sumOfPoints, highScore, dispatch }) => {
  let percentage = Math.ceil((points / sumOfPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <h1
        style={{
          background: "gray",
          padding: "15px 80px",
          borderRadius: "20px",
          fontSize: "25px",
          margin: "30px 0 10px 0",
        }}
      >
        <span>{emoji}</span>Hello {username} You Scored{" "}
        <strong>{points}</strong> out of {sumOfPoints} ({percentage}%)
      </h1>
      <p>(Username: {username} )</p>
      <p>(Highscore: {highScore} points)</p>
      <div>
        <button onClick={() => dispatch({ type: "restartQuiz" })}>
          Restart Quiz
        </button>
      </div>
    </>
  );
};

export default Finished;
