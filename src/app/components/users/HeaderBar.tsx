"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderBarProps {
  title: string;
  backLink: string; // URL để quay lại
}

export default function HeaderBar({ title, backLink }: HeaderBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#3f8acd",
        padding: "14px 20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginTop:"5px",
        marginBottom: "12px",
        backgroundColor:"rgb(24, 115, 207)",
        
      }}
    >
      {/* 🔹 Nút quay lại */}
      <Link
        href={backLink}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          color: "#fff",
          fontWeight: 500,
          transition: "color 0.2s",
        }}
      >
        <ArrowLeft size={20} />
        <span>Quay lại</span>
      </Link>

      {/* 🔹 Tiêu đề bên phải */}
      <h4
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        {title}
      </h4>
    </div>
  );
}
