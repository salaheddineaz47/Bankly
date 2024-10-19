import { useRef, useEffect } from "react";
import { TransferOperation, CloseAccountOperation, LoanOperation } from "./";

export default function Operations({
  accounts,
  currentAccount,
  onTransfer,
  onLoan,
  onClose,
}) {
  const timeoutIds = useRef([]);

  const clearTimeouts = () => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];
  };

  const addTimeOut = (tOut) => timeoutIds.current.push(tOut);
  useEffect(() => () => clearTimeouts(), []);

  return (
    <>
      <TransferOperation
        onAddTimeOut={addTimeOut}
        onClearTimeOut={clearTimeouts}
        currentAccount={currentAccount}
        accounts={accounts}
        onTransfer={onTransfer}
      />

      <LoanOperation
        onAddTimeOut={addTimeOut}
        onClearTimeOut={clearTimeouts}
        currentAccount={currentAccount}
        onLoan={onLoan}
      />

      <CloseAccountOperation
        onAddTimeOut={addTimeOut}
        onClearTimeOut={clearTimeouts}
        currentAccount={currentAccount}
        onClose={onClose}
      />
    </>
  );
}
