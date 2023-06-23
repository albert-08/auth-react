import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DefaultLayout>
      <form action="" className="form">
        <h1>Login</h1>

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