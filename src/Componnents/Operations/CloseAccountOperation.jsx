import { useState, useRef } from "react";
import { Operation } from "./";
import { Button, Input, Message } from "../UI";

export default function CloseAccountOperation({
  onAddTimeOut,
  onClearTimeOut,
  onClose,
  currentAccount,
}) {
  const [closefocusInput, setCloseFocusInput] = useState(false);
  const [closeUsername, setCloseUsername] = useState("");
  const [closePin, setClosePin] = useState("");
  const [closeFeedbackMessage, setCloseFeedbackMessage] = useState("");

  const closeMessageSpan = useRef(null);

  const handleCloseAccount = function (e) {
    e.preventDefault();
    let message = "";
    setCloseFocusInput(true);
    setClosePin("");
    setCloseUsername("");
    onClearTimeOut();
    if (
      closeUsername === currentAccount.username &&
      +closePin === currentAccount.pin
    ) {
      onClose(currentAccount);
    } else if (!closeUsername && !closePin)
      message = "Please enter both your username and password.";
    else message = "Incorrect username or password. Please try again.";
    setCloseFeedbackMessage(message);

    onAddTimeOut(setTimeout(() => setCloseFeedbackMessage(""), 5000));
    onAddTimeOut(setTimeout(() => setCloseFocusInput(false), 300));
  };

  return (
    <Operation
      type="close"
      title="Close account"
      handleSubmit={handleCloseAccount}
    >
      <Input
        type="text"
        classTitle="user"
        value={closeUsername}
        callback={(e) => setCloseUsername(e.target.value)}
        disabled={closefocusInput}
      />
      <Input
        type="password"
        length={6}
        classTitle="pin"
        value={closePin}
        callback={(e) => setClosePin(e.target.value)}
        disabled={closefocusInput}
      />
      <Button type="close" />

      <label className="form__label text-[1.3rem] text-center">
        Confirm user
      </label>
      <label className="form__label text-[1.3rem] text-center">
        Confirm PIN
      </label>
      <Message ref={closeMessageSpan} style={{ color: "greenyellow" }}>
        {closeFeedbackMessage}
      </Message>
    </Operation>
  );
}
