import { useEffect, useState } from "react";

export default function Timer({ onTimeOut }) {
  const [time, setTime] = useState(600 * 5);

  useEffect(() => {
    const tick = () => {
      if (time <= 0) {
        clearInterval(timerId);
        onTimeOut();
        return;
      }
      setTime(time - 1);
    };

    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, [time, onTimeOut]);

  const formattedTime = `${String(Math.trunc(time / 60)).padStart(
    2,
    "0"
  )}:${String(time % 60).padStart(2, "0")}`;

  return (
    <p className="logout-timer px-[0.3rem] mt-[1.9rem] text-right text-[1.25rem]">
      You will be logged out in{" "}
      <span className="timer font-semibold">{formattedTime} </span>
    </p>
  );
}
