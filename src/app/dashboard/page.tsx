"use client";
import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import RewardCard from "../components/dashboard/RewardCard";
// import Sidebar from "../../components/Sidebar";
// import RewardCard from "@/components/RewardCard";

export default function DashboardPage() {
  return (
    <div className="container dashboard-container">
      <Sidebar />

      <div className="content">
        <h4 className="fw-semibold mb-4">Điểm thưởng của tôi</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <RewardCard
              title="Traveloka Points"
              value="0"
              buttonText="Thông tin về Xu"
            />
          </div>
          <div className="col-md-6">
            <RewardCard
              title="Tìm hiểu thêm về Xu"
              subtitle="Hãy tìm hiểu về cách kiếm và đổi Xu!"
              buttonText="Tìm hiểu cách thức"
              gradient="linear-gradient(180deg, #00aaff 0%, #33ccff 100%)"
            />
          </div>
        </div>

        <div className="section">
          <h5 className="fw-semibold mb-3">Lịch sử tích Xu</h5>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#">Hoạt động</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Đang chờ xử lý</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Đã hết hạn</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Đã hủy</a>
            </li>
          </ul>

          <div className="text-center mt-5">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/images/points_empty_state.svg"
              alt="No Points"
              width="180"
            />
            <p className="mt-3 fw-semibold">Bạn chưa có điểm thưởng nào</p>
          </div>
        </div>
      </div>
    </div>
  );
}
