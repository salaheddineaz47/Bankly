import { useState, useRef } from "react";
import { Operation } from "./";
import { Button, Input, Message } from "../UI";

export default function TransferOperation({
  onAddTimeOut,
  onClearTimeOut,
  currentAccount,
  accounts,
  onTransfer,
}) {
  const [transferAmount, setTransferAmount] = useState("");
  const [receiverAccountUsername, setReceiverAccountUsername] = useState("");
  const [transfocusInput, setTransFocusInput] = useState(false);
  const transferMessageSpan = useRef(null);
  const [transFeedbackMessage, setTransFeedbackMessage] = useState("");

  const handleTransfer = function (e) {
    e.preventDefault();

    const receiverAcc = accounts.find(
      (acc) => acc.username === receiverAccountUsername
    );

    setTransFeedbackMessage("");
    transferMessageSpan.current.style.color = "red";
    let message;
    if (!receiverAccountUsername && !transferAmount) {
      message =
        "Please enter both the receiver's username and the transfer amount.";
    } else if (receiverAccountUsername && transferAmount <= 0) {
      message = "Transfer amount must be greater than zero.";
    } else if (!receiverAcc) {
      message = "Receiver account not found.";
    } else if (currentAccount.balance < transferAmount) {
      message = "Insufficient balance for this transfer.";
    } else if (receiverAcc.username === currentAccount.username) {
      message = "You cannot transfer to your own account.";
    } else {
      message = "Transfer successful!";
      onTransfer(receiverAcc, currentAccount, transferAmount);
      transferMessageSpan.current.style.color = "green";
    }

    setTransFeedbackMessage(message);

    onClearTimeOut();

    setReceiverAccountUsername("");
    setTransferAmount("");
    setTransFocusInput(true);

    onAddTimeOut(
      setTimeout(() => {
        setTransFeedbackMessage("");
      }, 5000)
    );

    onAddTimeOut(
      setTimeout(() => {
        setTransFocusInput(false);
      }, 200)
    );
  };

  const labelClass = "form__label text-[1.3rem] text-center";

  return (
    <Operation
      type="transfer"
      title="Transfer money"
      handleSubmit={handleTransfer}
    >
      <Input
        type="text"
        classTitle="to"
        value={receiverAccountUsername}
        callback={(e) => setReceiverAccountUsername(e.target.value)}
        disabled={transfocusInput}
      />
      <Input
        type="number"
        classTitle="amount"
        value={transferAmount}
        callback={(e) => setTransferAmount(Number(e.target.value))}
        disabled={transfocusInput}
      />
      <Button type="transfer" />

      <label className={labelClass}>Transfer to</label>
      <label className={labelClass}>Amount</label>
      <Message ref={transferMessageSpan}>{transFeedbackMessage}</Message>
    </Operation>
  );
}
