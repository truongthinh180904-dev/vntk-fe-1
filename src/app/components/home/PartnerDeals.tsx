"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {Calendar, PlaneTakeoff, TicketsPlane } from "lucide-react";;
import iconline from "../../assets/img/home/icon/icon_line.svg";
import iconlinearrow from "../../assets/img/home/icon/icon_line_arrow.svg";
import logovnal from "../../assets/img/domestic/viet-nam-airlines-logo-circle.png";
import logovietjet from "../../assets/img/domestic/vietjet-airlines-logo-circle.png";
import logobamboo from "../../assets/img/home/logo/3.png";
import logoeva from "../../assets/img/home/logo/2.png";
import logocathay from "../../assets/img/home/logo/1.png";
import { BarLoader } from "react-spinners";
import FlightDealLink from "../flightlink/FlightDealLink";

type Deal = {
  id: number;
  airline: string;
  title: string;
  date: string;
  price: string;
  image: string;
};

export interface Flight {
  airline: string;
  logo: string;
  timeStart: string;
  timeEnd: string;
  routeFrom: string;
  routeTo: string;
  duration: string;
  price: string;
  date:string;
  weekday: string,
  stops: string,
  seatClass: string

}


// Hàm sinh ngày có định dạng "22 Thg10 2026"
function getDynamicDate(offsetDays: number): string {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays);

  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${date} Thg ${month} ${year}`;
}

const bestFlights: Flight[] = [
  
  
  // ===== Vietnam Airlines =====
  {
    airline: 'Vietnam Airlines',
    logo: logovnal.src,
    timeStart: '06:00',
    timeEnd: '08:10',
    routeFrom: 'SGN',
    routeTo: 'HAN',
    duration: '2h 10m',
    price: '1.250.000 VND',
    date: getDynamicDate(2),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Vietnam Airlines',
    logo: logovnal.src,
    timeStart: '13:20',
    timeEnd: '15:30',
    routeFrom: 'HAN',
    routeTo: 'DAD',
    duration: '2h 10m',
    price: '1.350.000 VND',
    date: getDynamicDate(4),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  // + 4 tuyến thêm cho VN Airlines
  {
    airline: 'Vietnam Airlines',
    logo: logovnal.src,
    timeStart: '07:30',
    timeEnd: '09:40',
    routeFrom: 'SGN',
    routeTo: 'DAD',
    duration: '2h 10m',
    price: '1.300.000 VND',
    date: getDynamicDate(6),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Vietnam Airlines',
    logo: logovnal.src,
    timeStart: '10:50',
    timeEnd: '13:05',
    routeFrom: 'SGN',
    routeTo: 'PQC',
    duration: '2h 15m',
    price: '1.400.000 VND',
    date: getDynamicDate(8),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Vietnam Airlines',
    logo: logovnal.src,
    timeStart: '14:00',
    timeEnd: '16:10',
    routeFrom: 'HAN',
    routeTo: 'CXR',
    duration: '1h 55m',
    price: '1.150.000 VND',
    date: getDynamicDate(10),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Vietnam Airlines',
    logo: logovnal.src,
    timeStart: '17:20',
    timeEnd: '19:30',
    routeFrom: 'DAD',
    routeTo: 'SGN',
    duration: '2h 10m',
    price: '1.280.000 VND',
    date: getDynamicDate(12),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },

  // ===== VietJet Air =====
  {
    airline: 'VietJet Air',
    logo: logovietjet.src,
    timeStart: '07:00',
    timeEnd: '09:10',
    routeFrom: 'SGN',
    routeTo: 'HAN',
    duration: '2h 10m',
    price: '990.000 VND',
    date: getDynamicDate(3),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'VietJet Air',
    logo: logovietjet.src,
    timeStart: '16:00',
    timeEnd: '18:05',
    routeFrom: 'HAN',
    routeTo: 'SGN',
    duration: '2h 05m',
    price: '1.050.000 VND',
    date: getDynamicDate(5),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  // + 4 tuyến thêm cho VietJet
  {
    airline: 'VietJet Air',
    logo: logovietjet.src,
    timeStart: '08:30',
    timeEnd: '10:40',
    routeFrom: 'SGN',
    routeTo: 'DAD',
    duration: '2h 10m',
    price: '1.100.000 VND',
    date: getDynamicDate(7),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'VietJet Air',
    logo: logovietjet.src,
    timeStart: '11:45',
    timeEnd: '13:55',
    routeFrom: 'DAD',
    routeTo: 'SGN',
    duration: '2h 10m',
    price: '1.120.000 VND',
    date: getDynamicDate(9),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'VietJet Air',
    logo: logovietjet.src,
    timeStart: '12:50',
    timeEnd: '15:00',
    routeFrom: 'SGN',
    routeTo: 'PQC',
    duration: '2h 10m',
    price: '1.300.000 VND',
    date: getDynamicDate(11),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'VietJet Air',
    logo: logovietjet.src,
    timeStart: '18:20',
    timeEnd: '20:30',
    routeFrom: 'PQC',
    routeTo: 'SGN',
    duration: '2h 10m',
    price: '1.250.000 VND',
    date: getDynamicDate(13),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },




  // ===== EVA Airways =====
  {
    airline: 'EVA Airways',
    logo: logoeva.src,
    timeStart: '08:00',
    timeEnd: '13:00',
    routeFrom: 'SGN',
    routeTo: 'TPE',
    duration: '5h 00m',
    price: '6.800.000 VND',
    date: getDynamicDate(10),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'EVA Airways',
    logo: logoeva.src,
    timeStart: '23:40',
    timeEnd: '04:50+1',
    routeFrom: 'TPE',
    routeTo: 'SGN',
    duration: '5h 10m',
    price: '6.700.000 VND',
    date: getDynamicDate(12),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  // 4 tuyến thêm cho EVA Airways
  {
    airline: 'EVA Airways',
    logo: logoeva.src,
    timeStart: '09:15',
    timeEnd: '14:20',
    routeFrom: 'HAN',
    routeTo: 'TPE',
    duration: '4h 05m',
    price: '5.900.000 VND',
    date: getDynamicDate(14),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'EVA Airways',
    logo: logoeva.src,
    timeStart: '15:50',
    timeEnd: '20:55',
    routeFrom: 'SGN',
    routeTo: 'HAN',
    duration: '4h 05m',
    price: '5.400.000 VND',
    date: getDynamicDate(16),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'EVA Airways',
    logo: logoeva.src,
    timeStart: '02:30+1',
    timeEnd: '07:40+1',
    routeFrom: 'TPE',
    routeTo: 'HAN',
    duration: '4h 10m',
    price: '5.500.000 VND',
    date: getDynamicDate(18),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'EVA Airways',
    logo: logoeva.src,
    timeStart: '11:10',
    timeEnd: '16:15',
    routeFrom: 'SGN',
    routeTo: 'KUL',
    duration: '3h 05m',
    price: '4.800.000 VND',
    date: getDynamicDate(20),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },

  // ===== Cathay Pacific =====
  {
    airline: 'Cathay Pacific',
    logo: logocathay.src,
    timeStart: '08:25',
    timeEnd: '12:10',
    routeFrom: 'SGN',
    routeTo: 'HKG',
    duration: '2h 45m',
    price: '5.900.000 VND',
    date: getDynamicDate(14),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Cathay Pacific',
    logo: logocathay.src,
    timeStart: '14:00',
    timeEnd: '15:55',
    routeFrom: 'HKG',
    routeTo: 'SGN',
    duration: '2h 55m',
    price: '5.850.000 VND',
    date: getDynamicDate(16),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  // 4 tuyến thêm cho Cathay Pacific
  {
    airline: 'Cathay Pacific',
    logo: logocathay.src,
    timeStart: '09:50',
    timeEnd: '13:40',
    routeFrom: 'HAN',
    routeTo: 'HKG',
    duration: '2h 50m',
    price: '6.200.000 VND',
    date: getDynamicDate(18),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Cathay Pacific',
    logo: logocathay.src,
    timeStart: '17:30',
    timeEnd: '19:25',
    routeFrom: 'HKG',
    routeTo: 'HAN',
    duration: '2h 55m',
    price: '6.150.000 VND',
    date: getDynamicDate(20),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Cathay Pacific',
    logo: logocathay.src,
    timeStart: '06:05',
    timeEnd: '09:55',
    routeFrom: 'SGN',
    routeTo: 'HKG',
    duration: '2h 50m',
    price: '5.700.000 VND',
    date: getDynamicDate(22),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  {
    airline: 'Cathay Pacific',
    logo: logocathay.src,
    timeStart: '22:10',
    timeEnd: '01:00+1',
    routeFrom: 'HKG',
    routeTo: 'SGN',
    duration: '2h 50m',
    price: '5.950.000 VND',
    date: getDynamicDate(24),
    weekday: '',
    stops: 'Bay thẳng',
    seatClass: 'Phổ thông'
  },
  

  // ===== Bamboo Airways =====
{
  airline: 'Bamboo Airways',
  logo: logobamboo.src,
  timeStart: '06:00',
  timeEnd: '08:10',
  routeFrom: 'SGN',
  routeTo: 'HAN',
  duration: '2h 10m',
  price: '2.200.000 VND',
  date: getDynamicDate(10),
  weekday: '',
  stops: 'Bay thẳng',
  seatClass: 'Phổ thông'
},
{
  airline: 'Bamboo Airways',
  logo: logobamboo.src,
  timeStart: '20:45',
  timeEnd: '22:55',
  routeFrom: 'HAN',
  routeTo: 'SGN',
  duration: '2h 10m',
  price: '2.150.000 VND',
  date: getDynamicDate(12),
  weekday: '',
  stops: 'Bay thẳng',
  seatClass: 'Phổ thông'
},
// 4 tuyến thêm cho Bamboo Airways
{
  airline: 'Bamboo Airways',
  logo: logobamboo.src,
  timeStart: '07:20',
  timeEnd: '08:40',
  routeFrom: 'HAN',
  routeTo: 'DAD',
  duration: '1h 20m',
  price: '1.350.000 VND',
  date: getDynamicDate(14),
  weekday: '',
  stops: 'Bay thẳng',
  seatClass: 'Phổ thông'
},
{
  airline: 'Bamboo Airways',
  logo: logobamboo.src,
  timeStart: '09:50',
  timeEnd: '11:05',
  routeFrom: 'DAD',
  routeTo: 'SGN',
  duration: '1h 15m',
  price: '1.400.000 VND',
  date: getDynamicDate(16),
  weekday: '',
  stops: 'Bay thẳng',
  seatClass: 'Phổ thông'
},
{
  airline: 'Bamboo Airways',
  logo: logobamboo.src,
  timeStart: '23:30',
  timeEnd: '06:00+1',
  routeFrom: 'HAN',
  routeTo: 'ICN',
  duration: '4h 30m',
  price: '5.800.000 VND',
  date: getDynamicDate(18),
  weekday: '',
  stops: 'Bay thẳng',
  seatClass: 'Phổ thông'
},
{
  airline: 'Bamboo Airways',
  logo: logobamboo.src,
  timeStart: '11:10',
  timeEnd: '13:20',
  routeFrom: 'SGN',
  routeTo: 'BKK',
  duration: '2h 10m',
  price: '3.600.000 VND',
  date: getDynamicDate(20),
  weekday: '',
  stops: 'Bay thẳng',
  seatClass: 'Phổ thông'
},

];



const airlines = [
  {
    name: "Vietnam Airlines",
    logo: logovnal.src,
  },
  {
    name: "VietJet Air",
    logo: logovietjet.src,
  },
  {
    name: "Bamboo Airways",
    logo: logobamboo.src,
  },
  {
    name: "Cathay Pacific",
    logo: logocathay.src,
   
  },
  {
    name: "EVA Airways",
    logo: logoeva.src,
  },

  
];


export default function PartnerDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleNext = () => {
    if (currentIndex < filteredDeals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

    const [activeTab, setActiveTab] = useState<string>(airlines[0].name);
    const [flying, setFlying] = useState<string | null>(null);
    const filteredDeals = bestFlights.filter((d) => d.airline === activeTab);
    const [showAll, setShowAll] = useState(false);
    const dealsRef = useRef<HTMLDivElement | null>(null);


  // Khi nhấn "Xem thêm", scroll mượt xuống
  useEffect(() => {
    if (showAll && dealsRef.current) {
      dealsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll]);

    const handleChangeTab = (airline: string) => {
      setFlying(airline);
      setTimeout(() => {
        setActiveTab(airline);
        setFlying(null);
      }, 1200);
    };

  const handleSelectCity = (city:string) => {
    handleChangeTab(city);
    setLoading(true);
    // Giả lập delay 1s để hiện spinner
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }; 



  return (
   <div className="container-fluid"  style={{paddingTop: "30px", background: "linear-gradient(135deg, #ffffffff, #73c4f3)",}}>
     <section className="container partner-deals-container">
      <h1 className="fw-bold promo-header d-flex align-items-center" >
         <TicketsPlane style={{marginRight: "10px"}} size={35} color="#2d4f85" className="d-none d-md-block mb-1" />
          Bay Cùng Đối Tác Của Vietnam Tickets
       </h1>
      <div
          className="airline-tabs-wrapper"  
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none", // ẩn thanh cuộn Firefox
            msOverflowStyle: "none", // ẩn trên IE/Edge
          }}
        >
          {/* Ẩn thanh scroll trên Chrome/Safari */}
          <style>
            {`
              .airline-tabs-wrapper::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <div
            className="airline-tabs  d-flex gap-2"
            style={{
              flexWrap: "nowrap",
              justifyContent: "flex-start",
            }}
          >
          {airlines.map((airline) => (
              <button
                key={airline.name}
                className={`airline-tab ${
                  activeTab === airline.name ? "airline-tab--active" : ""
                }`}
                onClick={() => handleSelectCity(airline.name)}
                style={{
                  display: "inline-block",
                  minWidth: "110px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <PlaneTakeoff
                  size={18}
                  className={`plane-icon ${flying === airline.name ? "plane-fly" : ""}`}
                />
                <img  src={airline.logo} alt={airline.name} style={{marginRight:"5px",marginLeft:"5px", height: 24 }} />
                <span>{airline.name}</span>
              </button>
            ))}

          </div>
        </div>


      {/* Deals */}
  <div className="deals-slider d-none d-md-block position-relative">
  <div className="position-relative" style={{ minHeight: "300px" }}>
  {loading ? (
    <div
      className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "300px" }}
    >
      <BarLoader color="#007bff" width={200} height={5} />
    </div>
  ) : (
    <div className="row g-2">
      {filteredDeals.length > 0 ? (
        filteredDeals.map((bestFlight, index) => (
          <div key={index} className="col-md-6 col-lg-4 col-12 mb-3">
            <div className="flight-card-new shadow-sm h-100 overflow-hidden">
              {/* Header */}
             <div
              className="p-2 border-bottom fw-semibold small d-flex justify-content-between align-items-center"
              style={{ background: "rgb(248, 249, 250)" }}
            >
              {/* Bên trái: logo + hãng */}
              <div className="d-flex align-items-center gap-3">
                <img
                  src={bestFlight.logo}
                  alt={bestFlight.airline}
                  style={{ height: 28, objectFit: "contain" }}
                />
                <div className="new-flight-content-wrapper-small fw-bold">
                  {bestFlight.airline}
                </div>
              </div>

              {/* Bên phải: icon + ngày */}
              <div className="d-flex align-items-center gap-1 text-primary fw-semibold">
                <Calendar size={16} color="#007bff" />
                <span className="new-flight-content-wrapper-small  text-primary fw-bold">
                  {bestFlight.date}
                </span>
              </div>
</div>

              {/* Nội dung chính */}
              <div className="d-flex align-items-center justify-content-between p-3 bg-white">
                {/* Thời gian bay */}
                <div className="text-center new-flight-content-wrapper-small">
                  <div className="fw-bold">{bestFlight.timeStart}</div>
                  <div className="small text-muted">{bestFlight.routeFrom}</div>
                </div>

                {/* Duration */}
                <div className="text-center small text-muted">
                  <div>{bestFlight.duration}</div>
                  <div className="d-flex align-items-center gap-1 justify-content-center">
                    <img src={iconline.src} alt="icon" style={{ width: 22, height: 22 }} />
                    <span className="fw-bold">{bestFlight.stops}</span>
                    <img src={iconlinearrow.src} alt="icon" style={{ width: 22, height: 22 }} />
                  </div>
                </div>

                {/* Điểm đến */}
                <div className="text-center new-flight-content-wrapper-small">
                  <div className="fw-bold">{bestFlight.timeEnd}</div>
                  <div className="small text-muted">{bestFlight.routeTo}</div>
                </div>

                {/* Giá và nút chọn */}
                <div className="text-end">
                  <div className="text-danger fw-bold new-flight-content-wrapper">
                    {bestFlight.price}
                  </div>
                   <FlightDealLink
                      from={bestFlight.routeFrom}
                      to={bestFlight.routeTo}
                      price={bestFlight.price}
                      tripType="mot-chieu"
                      dateRange={bestFlight.date}
                      airlines={bestFlight.airline=='Vietnam Airlines' ? 'VN' : bestFlight.airline=='VietJet Air' ? 'VJ' :''}
                      data-loader
                    >
                   <button className="btn btn-primary mt-2 btn-sm px-4">Chọn vé</button>
                  </FlightDealLink>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted py-4">
          Không tìm thấy chuyến bay nào phù hợp.
        </div>
      )}
    </div>
  )}
</div>


    </div>


      <div className="deals-slider d-block d-md-none position-relative" ref={dealsRef}>
      {/* CSS nội tuyến cho hiệu ứng */}
      <style>
        {`
          .fade-in {
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 0.6s ease forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .show-more-btn {
            border: none;
            background: linear-gradient(90deg, #007bff, #00b4d8);
            color: white;
            border-radius: 25px;
            padding: 8px 22px;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.3px;
            box-shadow: 0 3px 8px rgba(0, 123, 255, 0.3);
            transition: all 0.3s ease;
          }

          .show-more-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 12px rgba(0, 123, 255, 0.4);
          }
        `}
      </style>

      {/* Danh sách vé */}
      <div
        className="deals-wrapper d-flex"
        style={{
          paddingBottom: "20px",
          maxHeight: showAll ? "100%" : "300px",
          overflow: showAll ? "visible" : "hidden",
          transition: "max-height 0.6s ease-in-out",
        }}
      >
        <div className="row g-3">
       {filteredDeals.map((bestFlight, index) => (
            <div key={index} className="col-12 col-md-4 fade-in">
              <div className="flight-card-new shadow-sm h-100 overflow-hidden">
                {/* Header */}
                <div
                  className="p-2 border-bottom fw-semibold small d-flex align-items-center"
                  style={{ background: "rgb(248, 249, 250)" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={bestFlight.logo}
                      alt={bestFlight.airline}
                      style={{ height: 28, objectFit: "contain" }}
                    />
                    <div className="new-flight-content-wrapper-small fw-bold">
                      {bestFlight.airline}
                    </div>
                  </div>
                </div>

                {/* Nội dung chính */}
                <div className="d-flex align-items-center justify-content-between p-3 bg-white">
                  {/* Điểm đi */}
                  <div className="text-center new-flight-content-wrapper-small">
                    <div className="fw-bold">{bestFlight.timeStart}</div>
                    <div className="small text-muted">{bestFlight.routeFrom}</div>
                  </div>

                  {/* Duration */}
                  <div className="text-center small text-muted">
                    <div>{bestFlight.duration}</div>
                    <div className="d-flex align-items-center gap-1">
                      <img src={iconline.src} alt="icon" style={{ width: 22, height: 22 }} />
                      <span className="fw-bold">{bestFlight.stops}</span>
                      <img src={iconlinearrow.src} alt="icon" style={{ width: 22, height: 22 }} />
                    </div>
                  </div>

                  {/* Điểm đến */}
                  <div className="text-center new-flight-content-wrapper-small">
                    <div className="fw-bold">{bestFlight.timeEnd}</div>
                    <div className="small text-muted">{bestFlight.routeTo}</div>
                  </div>

                  {/* Giá + nút chọn */}
                  <div className="text-end">
                    <div className="text-danger fw-bold new-flight-content-wrapper">
                      {bestFlight.price}
                      <span className="text-muted small">
                         <FlightDealLink
                            from={bestFlight.routeFrom}
                            to={bestFlight.routeTo}
                            price={bestFlight.price}
                            tripType="mot-chieu"
                            dateRange={bestFlight.date}
                            airlines={bestFlight.airline=='Vietnam Airlines' ? 'VN' : bestFlight.airline=='VietJet Air' ? 'VJ' :''}
                            data-loader
                          >
                        <button className="btn btn-primary mt-2 btn-sm px-4">Chọn vé</button>
                        </FlightDealLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút xem thêm / thu gọn (chỉ hiện khi mobile) */}
      <div className="text-center mt-3 d-md-none">
        <button
          className="show-more-btn"
          onClick={() => setShowAll(!showAll)}
          style={{marginBottom:"20px"}}
        >
          {showAll ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>
    </div>


    </section>
   </div>
  );
}