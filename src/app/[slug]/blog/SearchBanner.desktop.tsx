"use client";

import dynamic from "next/dynamic";

const PlaneSearch = dynamic(() => import("../FlightPluginBlog"), {
  ssr: false,
  loading: () => <div style={{ height: '80px' }} />, 
});

export default function SearchBannerDesktop() {
  return (
    <div className="container" style={{ position: "relative", zIndex: 1 }}>
      <PlaneSearch />
    </div>
  );
}