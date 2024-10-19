function Input({
  type,
  classTitle,
  length = null,
  use = "form",
  pHolder = null,
  callback,
  value = null,
  onRef = null,
  disabled = false,
}) {
  let inputclassName;
  if (use === "login") {
    inputclassName =
      classTitle === "user" || classTitle === "pin"
        ? `${use}__input ${use}__input--${classTitle} border-none py-2 px-8 text-[1.6rem] text-center w-[12rem] rounded-[10rem] mr-4 border-white transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400`
        : "";
  } else {
    inputclassName = `${use}__input ${use}__input--${classTitle} col-span-1 w-full border-none bg-[rgba(255,255,255,0.4)] text-[1.5rem] text-center text-[#333] py-[0.3rem] px-4 rounded-[0.7rem] transition-all focus:outline-none focus:bg-[rgba(255,255,255,0.6)]`;
  }

  return (
    <input
      ref={onRef}
      type={type}
      value={value}
      maxLength={!length ? undefined : length}
      placeholder={!pHolder ? "" : pHolder}
      className={inputclassName}
      // className={`${use}__input ${use}__input--${classTitle}`}
      onChange={callback}
      disabled={disabled}
    />
  );
}

export default Input;
