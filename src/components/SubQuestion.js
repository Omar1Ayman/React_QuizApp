import React from "react";

const SubQuestion = ({ question, hasAnswerd, dispatch }) => {
  return (
    <>
      <div className="question">
        <h1 className="title">{question.question}</h1>
        <ul>
          {question.options.map((option, i) => {
            return (
              <li
                disabled={hasAnswerd}
                className={`li ${
                  hasAnswerd
                    ? i === question.correctOption
                      ? "right"
                      : "wrong"
                    : ""
                }`}
                onClick={() => dispatch({ type: "newAnswer", payload: i })}
                key={i}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SubQuestion;
