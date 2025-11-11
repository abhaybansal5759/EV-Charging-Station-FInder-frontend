import React from "react";

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ label, type = "text", value, onChange }: Props) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "4px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
