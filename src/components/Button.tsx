import React from "react";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Specify the allowed values for the 'type' prop
  bgColor?: string;
  textColor?: string;
  className?: string;
};

const Button = ({
  children,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}: Props) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
