"use client";

import { useMemo } from "react";
import TicketTable from "./TicketTable";

export interface Ticket {
  id: number;
  bookingId: number;
  bookingDate: string;
  airline: string;
  airlineName: string;
  flightNumber: string;
  departure: string;
  departureCity: string;
  arrival: string;
  arrivalCity: string;
  startDate: string;
  endDate: string;
  seats: string[];
  baggages: string[];
  status: string;
}

interface SearchTabProps {
  tickets: Ticket[];
  searchInput: string;
  setSearchInput: (v: string) => void;
}

export default function SearchTab({
  tickets,
  searchInput,
  setSearchInput,
}: SearchTabProps) {
  // 🔍 Lọc kết quả tìm kiếm
  const filtered = useMemo(() => {
    if (!searchInput) return [];

    const query = searchInput.trim().toLowerCase();
    const idMatch = query.match(/vntk(\d+)/i);
    const idToSearch = idMatch ? Number(idMatch[1]) : Number(query);

    return tickets.filter((t) => {
      const flightMatch =
        typeof t.flightNumber === "string" &&
        t.flightNumber.toLowerCase().includes(query);

      const codeMatch = `vntk${t.id}`.toLowerCase() === query;

      const idMatch =
        !isNaN(idToSearch) &&
        (Number(t.id) === idToSearch || Number(t.bookingId) === idToSearch);

      return flightMatch || codeMatch || idMatch;
    });
  }, [searchInput, tickets]);

  return (
    <div className="fade-in">
      <div className="mb-4 text-center">
        <input
          type="text"
          className="d-none d-md-block form-control w-50 mx-auto"
          placeholder="Nhập mã chuyến bay hoặc mã đặt vé (VD: VNTK1)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
          <input
          type="text"
          className="d-block d-md-none form-control w-70 mx-auto"
          placeholder="Nhập mã chuyến bay hoặc mã đặt vé (VD: VNTK1)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {searchInput ? (
        filtered.length > 0 ? (
          <TicketTable data={filtered} selectedId={null} setSelectedId={() => {}} />
        ) : (
          <div className="text-center text-muted">Không tìm thấy kết quả</div>
        )
      ) : (
        <div className="text-center text-muted">
          Vui lòng nhập mã chuyến bay hoặc mã đặt vé để tra cứu
        </div>
      )}
    </div>
  );
}
