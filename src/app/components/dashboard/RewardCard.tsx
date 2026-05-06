import React from "react";

interface Props {
  title: string;
  value?: string;
  subtitle?: string;
  buttonText: string;
  gradient?: string;
}

export default function RewardCard({
  title,
  value,
  subtitle,
  buttonText,
  gradient,
}: Props) {
  return (
    <div
      className="reward-card"
      style={{
        background: gradient || "linear-gradient(180deg, #007bff 0%, #4dafff 100%)",
      }}
    >
      <h6 className="fw-semibold">{title}</h6>
      {value && (
        <div className="display-6 fw-bold mt-2">
          <span>🎯</span> {value}
        </div>
      )}
      {subtitle && <p className="mt-2">{subtitle}</p>}
      <button className="btn btn-light mt-3 fw-semibold px-3 py-1 rounded-pill">
        {buttonText}
      </button>
    </div>
  );
}
