import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (response.ok) {
        console.log("Login successfull");
        setErrorResponse("");

        goTo("/");
      } else {
        console.log("Something went wrong");
        const json = await response.json() as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </DefaultLayout>
  )
}