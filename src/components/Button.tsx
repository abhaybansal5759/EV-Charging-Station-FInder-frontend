import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#4338ca",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontWeight: "bold",
      }}
    >
      {children}
    </button>
  );
}
