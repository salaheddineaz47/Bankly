const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

export default function Movement({
  mov,
  currentAcc,
  currentIndex,
  OnformatCur,
}) {
  const type = mov > 0 ? "deposit" : "withdrawal";
  const date = new Date(currentAcc.movementsDates[currentIndex]);
  const displayDate = formatMovementDate(date, currentAcc.locale);
  const formattedMov = OnformatCur(mov, currentAcc.locale, currentAcc.currency);
  return (
    <div className="movements__row flex items-center border-b border-[#eee] py-9 px-16">
      <div
        className={`movements__type movements__type--${type} text-[1.1rem] uppercase font-medium text-white py-[0.1rem] px-4 rounded-full mr-8 bg-gradient-to-tl ${
          type === "deposit"
            ? "from-[#39b385] to-[#9be15d]"
            : "from-[#e52a5a] to-[#ff585f]"
        }`}
      >
        ${currentIndex + 1} ${type}
      </div>
      <div className="movements__date text-[1.1rem] uppercase font-medium text-[#666]">
        {displayDate}
      </div>
      <div className="movements__value text-[1.7rem] ml-auto">
        {formattedMov}
      </div>
    </div>
  );
}
