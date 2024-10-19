import { useRef, useEffect } from "react";
import { Movement } from "./";

export default function Movements({ currentAcc, sort, OnformatCur }) {
  const movementsEndRef = useRef(null);
  const hasMounted = useRef(false);
  const idTimeOutRef = useRef(null);

  useEffect(() => {
    if (idTimeOutRef.current) clearTimeout(idTimeOutRef.current);

    if (hasMounted.current) {
      if (movementsEndRef.current) {
        movementsEndRef.current.scrollIntoView({
          behavior: "smooth",
          // block: "end",
        });
      }
    } else
      idTimeOutRef.current = setTimeout(() => (hasMounted.current = true), 0);
  }, [currentAcc.movements]);

  const movs = sort
    ? currentAcc.movements.slice().sort((a, b) => a - b)
    : currentAcc.movements;

  return (
    <div className="movements row-start-2 row-span-3 bg-white rounded-2xl overflow-y-scroll">
      {movs.map((mov, i) => {
        return (
          <Movement
            key={i}
            mov={mov}
            currentAcc={currentAcc}
            currentIndex={i}
            OnformatCur={OnformatCur}
          />
        );
      })}
      <div ref={movementsEndRef} />
    </div>
  );
}
