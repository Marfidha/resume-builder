import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({
  text = "Loading...",
  fullScreen = true,
  size = 40
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3
      ${fullScreen ? "min-h-screen" : "py-10"}`}
    >
      <Loader2
        size={size}
        className="animate-spin text-emerald-600"
      />

      <p className="text-slate-500 text-sm font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;