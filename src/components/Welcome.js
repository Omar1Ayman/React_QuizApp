import React from "react";

const Welcome = ({ numQuestions, dispatch }) => {
  return (
    <>
      <h1>Welcome To The React Quiz!</h1>
      <p>{numQuestions} questions to test your React mastery</p>
      <button
        onClick={() => dispatch({ type: "LoginQuiz" })}
        className="start-btn"
      >
        Let`s start
      </button>
    </>
  );
};

export default Welcome;
