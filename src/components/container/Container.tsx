import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
};

export default Container;
