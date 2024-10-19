import { useState, useRef } from "react";
import { Input, LogoutButton, LoginButton, Message } from "../UI";

export default function Login({ onLogin, isLogedIn, onLogout }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginFocusInput, setLoginFocusInput] = useState(false);
  const [loginFeedbackMessage, setLoginFeedbackMessage] = useState("");
  const idTimeOutRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginFeedbackMessage("");
    setLogin("");
    setPassword("");
    setLoginFocusInput(true);

    if (idTimeOutRef.current) clearTimeout(idTimeOutRef.current);

    if (!onLogin(login, password))
      setLoginFeedbackMessage("Incorrect username or password.");

    idTimeOutRef.current = setTimeout(() => setLoginFocusInput(false), 300);
  };

  return (
    <>
      {!isLogedIn && (
        <div>
          <form className="login flex gap-4" onSubmit={handleLogin}>
            <Input
              type="text"
              classTitle="user"
              use="login"
              pHolder="user"
              value={login}
              callback={(e) => setLogin(e.target.value)}
              disabled={loginFocusInput}
            />
            <Input
              // onRef={inputLoginPin}
              type="number"
              classTitle="pin"
              use="login"
              pHolder="PIN"
              value={password}
              length={4}
              callback={(e) => setPassword(Number(e.target.value))}
              disabled={loginFocusInput}
            />
            <LoginButton />
          </form>
          <Message>{loginFeedbackMessage}</Message>
        </div>
      )}

      {isLogedIn && <LogoutButton onLogout={onLogout} />}
    </>
  );
}
