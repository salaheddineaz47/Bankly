import { forwardRef } from "react";

const Message = forwardRef(({ style = {}, children }, ref) => {
  return (
    <span
      className="message col-span-3 text-red-500 text-[1.3rem] font-medium"
      ref={ref || null}
      style={style}
    >
      {children}
    </span>
  );
});

export default Message;
