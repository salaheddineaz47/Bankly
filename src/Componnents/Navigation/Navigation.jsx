import { LoginGreeting, Logo, Login } from "./";

function Navigation({ currentAccount, onLogin, isLogedIn, onLogout }) {
  return (
    <nav
      className={`${
        isLogedIn ? "navLogedIn" : "navLogin"
      } flex justify-between items-center px-8 py-0`}
    >
      <LoginGreeting currentAccount={currentAccount} isLogedIn={isLogedIn} />
      <Logo />
      <Login onLogin={onLogin} isLogedIn={isLogedIn} onLogout={onLogout} />
    </nav>
  );
}

export default Navigation;
