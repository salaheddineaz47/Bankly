import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export default function Summary({ currentAcc, onSort, OnformatCur }) {
  const [formattedIncomes, setFormattedIncomes] = useState("");
  const [formattedOutComes, setFormattedOutComes] = useState("");
  const [formattedInterest, setFormattedInterest] = useState("");

  useEffect(
    function () {
      const inc = currentAcc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
      setFormattedIncomes(
        OnformatCur(inc, currentAcc.locale, currentAcc.currency)
      );

      const out = currentAcc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
      setFormattedOutComes(
        OnformatCur(Math.abs(out), currentAcc.locale, currentAcc.currency)
      );

      const inter = currentAcc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * currentAcc.interestRate) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
      setFormattedInterest(
        OnformatCur(inter, currentAcc.locale, currentAcc.currency)
      );
    },
    [currentAcc, OnformatCur]
  );

  const summaryLabelClass =
    "summary__label text-[1.2rem] font-medium uppercase mr-[0.8rem]";
  const summaryValueClass = (x) =>
    `summary__value summary__value--${x} text-[2.2rem] mr-10 ${
      x === "out" ? "text-[#f5465d]" : "text-[#66c873]"
    }`;
  return (
    <div className="summary row-start-5 flex items-baseline mt-4 py-0 px-[0.3rem]">
      <div className="summary__box--in">
        <p className={summaryLabelClass}>In</p>
        <p className={summaryValueClass("in")}>{formattedIncomes}</p>
      </div>
      <div className="summary__box--out">
        <p className={summaryLabelClass}>Out</p>
        <p className={summaryValueClass("out")}>{formattedOutComes}</p>
      </div>
      <div className="summary__box--interest">
        <p className={summaryLabelClass}>Interest</p>
        <p className={summaryValueClass("interest")}>{formattedInterest}</p>
      </div>
      <button
        className="btn--sort ml-auto flex items-center gap-2 border-none bg-none text-[1.3rem] font-medium cursor-pointer hover:text-[#777]"
        onClick={() => onSort()}
      >
        <FaArrowDown /> SORT
      </button>
    </div>
  );
}
