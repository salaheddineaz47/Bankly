import { useState, useRef } from "react";
import { Operation } from "./";
import { Input, Button, Message } from "../UI";

export default function LoanOperation({
  currentAccount,
  onClearTimeOut,
  onAddTimeOut,
  onLoan,
}) {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanfocusInput, setLoanFocusInput] = useState(false);
  const [loanFeedbackMessage, setLoanFeedbackMessage] = useState("");
  const loanMessageSpan = useRef(null);

  const handleLoan = function (e) {
    e.preventDefault();
    let message = "";
    const amount = Math.floor(loanAmount);

    loanMessageSpan.current.style.color = "red";
    onClearTimeOut();
    setLoanFocusInput(true);

    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      onLoan(currentAccount, amount);
      message = "Loan succeeded!";
      loanMessageSpan.current.style.color = "darkgreen";
    } else if (!loanAmount) message = "Please enter the loan amount.";
    else if (loanAmount <= 0) message = "Please enter a valid number.";
    else message = "Loan failed!";

    setLoanFeedbackMessage(message);
    setLoanAmount("");

    onAddTimeOut(setTimeout(() => setLoanFeedbackMessage(""), 5000));

    onAddTimeOut(setTimeout(() => setLoanFocusInput(false), 300));
  };

  return (
    <>
      <Operation type="loan" title="Request loan" handleSubmit={handleLoan}>
        <Input
          type="number"
          classTitle="loan-amount"
          value={loanAmount}
          callback={(e) => setLoanAmount(e.target.value)}
          disabled={loanfocusInput}
        />
        <Button type="loan" />

        <label className="form__label form__label--loan text-[1.3rem] text-center row-start-2">
          Amount
        </label>
        <Message ref={loanMessageSpan}>{loanFeedbackMessage}</Message>
      </Operation>
    </>
  );
}
