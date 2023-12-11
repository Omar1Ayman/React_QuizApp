import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import SubQuestion from "./SubQuestion";

const Question = ({
  question,
  dispatch,
  index,
  answer,
  points,
  sumOfPoints,
  numOfQuestions,
  timeRemaining,
}) => {
  const hasAnswerd = answer !== null;

  return (
    <>
      <div className="paper">
        <div className="range">
          <div className="progress">
            <progress
              className="child"
              max={numOfQuestions}
              value={index + Number(answer !== null)}
            ></progress>
          </div>
          <div className="dta">
            <p>
              Question {index + 1}/{numOfQuestions}
            </p>
            <p>
              {points} /{sumOfPoints} points
            </p>
          </div>
        </div>

        <SubQuestion
          dispatch={dispatch}
          question={question}
          hasAnswerd={hasAnswerd}
        />

        <div className="btns">
          <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
          {index < numOfQuestions - 1 ? (
            <button
              disabled={!hasAnswerd}
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          ) : ( 
            <button
              onClick={() =>
                dispatch({
                  type: "EndeTheExam",
                  payload: points,
                })
              }
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
