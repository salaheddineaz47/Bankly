export default function Button({ type, use = "form" }) {
  return (
    <button
      className={`form__btn form__btn--${type} col-span-1 w-24 border-none rounded-[0.7rem] text-[1.8rem] bg-white cursor-pointer transition-all duration-300  hover:bg-[rgba(255,255,255,0.8)] `}
    >
      &rarr;
    </button>
  );
}
