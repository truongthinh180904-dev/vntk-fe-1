"use client";
import { useState } from "react";
import { TicketCheck, History, Search, Menu, X } from "lucide-react";
import logo from "../../assets/img/home/logo-vietnam-tickets.webp";

interface SidebarProps {
  activeTab: "tickets" | "history" | "search";
  setActiveTab: (tab: "tickets" | "history" | "search") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Nút toggle cho mobile */}
      

      {/* Sidebar */}
      <aside className={`sidebar shadow-sm ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-logo-link">
            <img src={logo.src} alt="Logo" className="sidebar-logo" />
            <span className="sidebar-title">Vietnam Tickets</span>
          </a>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Menu</div>
          <ul className="sidebar-menu">
            <li>
              <button
                className={`sidebar-btn ${activeTab === "tickets" ? "active" : ""}`}
                onClick={() => setActiveTab("tickets")}
              >
                <TicketCheck size={18} />
                <span>Vé đã đặt</span>
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                <History size={18} />
                <span>Lịch sử</span>
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${activeTab === "search" ? "active" : ""}`}
                onClick={() => setActiveTab("search")}
              >
                <Search size={18} />
                <span>Tra cứu</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <button
        className="sidebar-toggle-btn d-md-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </>
  );
}
