function LoginGreeting({ currentAccount, isLogedIn }) {
  return (
    <p className="welcome text-[1.9rem] font-medium">
      {" "}
      {isLogedIn
        ? `Welcome back ${currentAccount?.owner.split(" ")[0]}`
        : "Log in to get started"}
    </p>
  );
}

export default LoginGreeting;
