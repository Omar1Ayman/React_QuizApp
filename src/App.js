import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Welcome from "./components/Welcome";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Finished from "./components/Finished";
import Login from "./components/Login";

const SEC_PER_QUESTION = 30;

var initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
  username: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "LoginQuiz":
      return {
        ...state,
        status: "login",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SEC_PER_QUESTION,
        username: action.payload,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "EndeTheExam":
      return {
        ...state,
        points: state.points,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        status: "finished",
      };
    case "restartQuiz":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    default:
      throw new Error("Unknown action");
  }
}
const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      timeRemaining,
      username,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const sumOfPoints = questions.reduce((accumulator, question) => {
    return accumulator + question.points;
  }, 0);
  const numOfQuestions = questions.length;

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" ? (
          <Loader />
        ) : status === "ready" ? (
          <Welcome dispatch={dispatch} numQuestions={questions.length} />
        ) : status === "login" ? (
          <Login dispatch={dispatch} />
        ) : status === "active" ? (
          <Question
            timeRemaining={timeRemaining}
            numOfQuestions={numOfQuestions}
            question={questions[index]}
            dispatch={dispatch}
            index={index}
            points={points}
            answer={answer}
            sumOfPoints={sumOfPoints}
            username={username}
          />
        ) : status === "finished" ? (
          <Finished
            dispatch={dispatch}
            sumOfPoints={sumOfPoints}
            highScore={highScore}
            points={points}
            username={username}
          />
        ) : (
          status === "error" && <Error />
        )}
      </Main>
    </div>
  );
};

export default App;
