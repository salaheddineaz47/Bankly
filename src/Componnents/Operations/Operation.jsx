export default function Operation({
  type = "loan",
  title,
  children,
  handleSubmit,
}) {
  const operationClass = `operation operation--${type} bg-gradient-to-tl ${
    type === "transfer"
      ? " from-yellow-500 to-yellow-400"
      : type === "loan"
      ? " from-green-500 to-green-300"
      : " from-red-500 to-red-400"
  } rounded-xl py-12 px-16 text-[#333333]`;

  const formClass = `form form--${type} grid grid-cols-${
    type === "loan"
      ? "[minmax(0,2.5fr)_1fr_minmax(0,2.5fr)]"
      : "[minmax(0,2.5fr)_minmax(0,2.5fr)_1fr]"
  } grid-rows-[auto_auto] gap-x-[0.4rem] gap-y-[1rem]`;
  return (
    <div className={operationClass}>
      <h2 className="mb-6 text-[1.7rem] font-semibold text-[#333]">{title}</h2>
      <form className={formClass} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  );
}
