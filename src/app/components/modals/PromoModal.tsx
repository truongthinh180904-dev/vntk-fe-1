"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import "./promotion.css";

import imgpromotion from "../../assets/img/modals/demo-01.png";
import imgmodalsmobile from "../../assets/img/modals/1.png";

export default function PromotionModals() {
  const pathname = usePathname();

  /* ✅ CHỈ CHẠY Ở TRANG CHỦ */
  if (pathname !== "/khuyen-mai") return null;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://127.0.0.1:8000/storage/";

  const [desktopImg, setDesktopImg] = useState<string | null>(null);
  const [mobileImg, setMobileImg] = useState<string | null>(null);

  /* ===== FETCH BANNER ===== */
  useEffect(() => {
    let mounted = true;

    const fetchBanner = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/bannermodals/1",
          { cache: "no-store" }
        );
        const data = await res.json();
        if (mounted) {
          setDesktopImg(
            data?.data?.image_path
              ? BASE_URL + data.data.image_path
              : imgpromotion.src
          );
        }
      } catch {
        setDesktopImg(imgpromotion.src);
      }

      try {
        const res2 = await fetch(
          "http://127.0.0.1:8000/api/bannermodals/2",
          { cache: "no-store" }
        );
        const data2 = await res2.json();
        if (mounted) {
          setMobileImg(
            data2?.data?.image_path
              ? BASE_URL + data2.data.image_path
              : imgmodalsmobile.src
          );
        }
      } catch {
        setMobileImg(imgmodalsmobile.src);
      }

      if (mounted) setLoading(false);
    };

    fetchBanner();
    return () => {
      mounted = false;
    };
  }, []);

  /* ===== CONTROL HIỂN THỊ ===== */
  useEffect(() => {
    if (loading) return;

    const lastShown = localStorage.getItem(
      "promotion_modals_last_shown"
    );
    const now = Date.now();

    if (!lastShown || now - Number(lastShown) > 15 * 60 * 1000) {
      setTimeout(() => setShow(true), 300);
      localStorage.setItem(
        "promotion_modals_last_shown",
        now.toString()
      );
    }
  }, [loading]);

  if (loading || !show) return null;

  return (
    <div className="promotion-modals-overlay">
      <div className="promotion-modals-dialog">
        <div className="promotion-modals-card">
          {/* DESKTOP */}
          <div className="d-none d-md-block promotion-modals-header">
            <img
              src={desktopImg || imgpromotion.src}
              alt="Banner desktop"
              className="promotion-modals-banner"
              loading="lazy"
            />
            <button
              className="promotion-modals-close"
              onClick={() => setShow(false)}
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* MOBILE */}
          <div className="d-block d-md-none promotion-modals-header">
            <img
              src={mobileImg || imgmodalsmobile.src}
              alt="Banner mobile"
              className="promotion-modals-banner"
              loading="lazy"
            />
            <button
              className="promotion-modals-close"
              onClick={() => setShow(false)}
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
