import { useEffect, useState } from "react";
import { Navigation } from "./Componnents/Navigation";
import { Movements } from "./Componnents/Movements";
import { Operations } from "./Componnents/Operations";
import Main from "./Componnents/Main/Main";
import Balance from "./Componnents/Balance/Balance";
import Summary from "./Componnents/Summary/Summary";
import Timer from "./Componnents/Timer/Timer";
import Accounts from "./assets/Accounts";

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const createUsernames = function (accs) {
  accs?.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

// TODO: APP
export default function App() {
  const [accounts, setAccounts] = useState(Accounts);
  const [currentAccount, setCurrentAccount] = useState({});
  const [sort, setSort] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => createUsernames(accounts), []);

  const onCalcDisplayBalance = function (acc) {
    const updatedBalance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    setCurrentAccount((curacc) => ({
      ...curacc,
      balance: updatedBalance,
    }));
    setAccounts((accs) =>
      accs.map((account) =>
        account === acc
          ? {
              ...acc,
              balance: updatedBalance,
            }
          : account
      )
    );
  };

  const handleSort = function () {
    setSort((prev) => !prev);
  };
  const handleTime = function () {
    setIsLogedIn(false);
  };

  const handleLogin = function (loginVal, loginPin) {
    const currentAcc = accounts.find((acc) => acc.username === loginVal);
    if (currentAcc?.pin !== loginPin) return false;

    setCurrentAccount(currentAcc);
    setIsLogedIn(true);
    return true;
  };

  const handleLogout = function () {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setCurrentAccount({});
      setIsLogedIn(false);
    }
  };

  const handleTransfer = function (receiverAcc, senderAcc, amount) {
    const updateAccount = (account, movement) => ({
      ...account,
      movements: [...account.movements, movement],
      movementsDates: [...account.movementsDates, new Date().toISOString()],
    });
    setAccounts((accs) =>
      accs.map((account) =>
        account.username === receiverAcc.username
          ? updateAccount(account, amount)
          : account.username === senderAcc.username
          ? updateAccount(account, -amount)
          : account
      )
    );
  };

  useEffect(() => {
    const updatedSenderAcc = accounts.find(
      (acc) => acc.username === currentAccount.username
    );
    if (updatedSenderAcc) {
      setCurrentAccount(updatedSenderAcc);
    }
  }, [accounts, currentAccount?.username]);

  const handleLoan = function (curr, amount) {
    setAccounts((accs) =>
      accs.map((account) =>
        account === curr
          ? {
              ...account,
              movements: [...account.movements, amount],
              movementsDates: [
                ...account.movementsDates,
                new Date().toISOString(),
              ],
            }
          : account
      )
    );
  };
  const handleClose = function (curr) {
    const index = accounts.findIndex((acc) => acc.username === curr.username);
    setAccounts((accs) => accs.filter((_, i) => i !== index));
    setCurrentAccount({});
    setIsLogedIn(false);
  };

  return (
    <>
      <Navigation
        currentAccount={currentAccount}
        onLogin={handleLogin}
        isLogedIn={isLogedIn}
        onLogout={handleLogout}
      />
      {!isLogedIn && (
        <>
          <div className="flex items-end flex-col text-2xl mt-16">
            <h2>
              <strong>👤 Test it out!</strong>
            </h2>
            <br />
            <b>User 1:</b>
            {/* <br /> */}
            Username: se
            <br />
            Password: 1111 <br />
            <br />
            <b> User 2:</b>
            Username: me <br />
            Password: 2222 <br />
          </div>
        </>
      )}
      {isLogedIn && (
        <Main>
          <Balance
            currentAcc={currentAccount}
            onCalcDisplayBalance={onCalcDisplayBalance}
            OnformatCur={formatCur}
          />
          <Movements
            currentAcc={currentAccount}
            sort={sort}
            OnformatCur={formatCur}
          />
          <Summary
            onSort={handleSort}
            currentAcc={currentAccount}
            OnformatCur={formatCur}
          />
          <Operations
            accounts={accounts}
            currentAccount={currentAccount}
            onTransfer={handleTransfer}
            onLoan={handleLoan}
            onClose={handleClose}
          />
          <Timer onTimeOut={handleTime} />
        </Main>
      )}
    </>
  );
}
