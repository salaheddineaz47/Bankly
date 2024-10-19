import { useEffect, useState } from "react";

export default function Balance({
  currentAcc,
  onCalcDisplayBalance,
  OnformatCur,
}) {
  const [balance, setBalance] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => onCalcDisplayBalance(currentAcc), [currentAcc.movements]);

  useEffect(() => {
    setBalance(
      OnformatCur(currentAcc.balance, currentAcc.locale, currentAcc.currency)
    );
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: 'long',
    };

    setFormattedDate(
      new Intl.DateTimeFormat(currentAcc.locale, options).format(now)
    );
  }, [currentAcc, balance]);

  return (
    <div className="balance col-span-2 flex items-end justify-between mb-8">
      <div>
        <p className="balance__label text-[2.2rem] font-medium mb-[-0.2rem]">
          Current balance
        </p>
        <p className="balance__date text-[1.4rem] text-[#888]">
          As of <span className="date">{formattedDate}</span>
        </p>
      </div>
      <p className="balance__value text-[4.5rem] font-normal">{balance}</p>
    </div>
  );
}
