import React, { useState } from "react";

const Login = ({ dispatch }) => {
  const [name, setName] = useState("");
  return (
    <>
      <h2>you have to loing to start th quiz</h2>
      <form>
        <div className="form-control">
          <label>Username:</label>

          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="username..."
            required
          />
        </div>
        <div className="btns-login">
          <button
            onClick={() => dispatch({ type: "startQuiz", payload: name })}
            className="btn-login"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
