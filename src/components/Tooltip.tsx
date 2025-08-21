// Tooltip.tsx
import React from "react";

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <span className="relative inline-block ml-2 cursor-pointer text-[#64ffda] font-bold">
      &#x3f;
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-black text-white text-sm rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {text}
      </span>
    </span>
  );
};

export default Tooltip;
