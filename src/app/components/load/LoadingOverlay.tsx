"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PropagateLoader } from "react-spinners";

export default function LoadingOverlayRoute() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mỗi khi pathname thay đổi -> hiển thị loading tạm thời
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1100); // 0.6s loading ảo
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
      }}
    >
      <PropagateLoader color="#004aad" size={25} />
    </div>
  );
}
