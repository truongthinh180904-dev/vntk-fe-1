import React, { useState, useMemo } from "react";
import { getIata, parseDateRange, addDaysLocal, formatDDMMYYYY } from "./flightUtils";
import "./FlightLink.css"; 
interface FlightDealLinkProps {
  from: string;
  to: string;
  price: number | string;
  tripType: "khu-hoi" | "mot-chieu";
  dateRange?: string;
  airlines ?:string;
  children: React.ReactNode;
}

const FlightDealLink: React.FC<FlightDealLinkProps> = ({
  from, to, tripType, dateRange, children, airlines
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const url = useMemo(() => {
    // ... (Logic useMemo giữ nguyên như bản trước để đảm bảo ổn định)
    const fromCode = getIata(from);
    const toCode = getIata(to);
    const parsed = dateRange ? parseDateRange(dateRange) : null;
    const today = new Date();
    const depart = parsed?.depart || addDaysLocal(today, 2);
    const ret = parsed?.ret || (tripType === "khu-hoi" ? addDaysLocal(today, 7) : undefined);
    const departStr = formatDDMMYYYY(depart);
    const returnStr = ret ? formatDDMMYYYY(ret) : "";
    const dtcr = (tripType === "khu-hoi" && ret)
      ? `${fromCode}${toCode}${departStr}-${toCode}${fromCode}${returnStr}`
      : `${fromCode}${toCode}${departStr}`;
    const dtcp = '100';
    const queryAirlines = airlines ? `&dtcs=${airlines}` : "";
    return `/tim-kiem-chuyen-bay?dtcr=${dtcr}&dtcp=${dtcp}${queryAirlines}`;
  }, [from, to, tripType, dateRange, airlines]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <a 
      href={url} 
      onClick={handleClick}
      style={{ 
        textDecoration: "none", 
        display: "block", 
        position: "relative",
        opacity: isLoading ? 0.8 : 1,
        transition: "opacity 0.2s ease-in-out",
        pointerEvents: isLoading ? "none" : "auto"
      }}
    >
      {children}
      
      {isLoading && (
        <div className="loading-overlay">
           <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
           </div>
        </div>
      )}
      
    </a>
  );
};

export default FlightDealLink;