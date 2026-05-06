import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import FlightDealsOne from "../FlightDealsWay";
import { Flag, Plane } from "lucide-react";
// GeoJSON Thái Lan
const geoUrl =
  "https://raw.githubusercontent.com/cvibhagool/thailand-map/master/thailand-provinces.topojson";
// Airports
const airports: Record<string, { name: string; city: string; country: string }> = {
  // Vietnam
  HAN: { name: "Sân bay Nội Bài", city: "Hà Nội", country: "Vietnam" },
  SGN: { name: "Sân bay Tân Sơn Nhất", city: "TP.HCM", country: "Vietnam" },
  DAD: { name: "Sân bay Đà Nẵng", city: "Đà Nẵng", country: "Vietnam" },

  // Thailand (chính & du lịch)
  BKK: { name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
  DMK: { name: "Don Mueang Intl", city: "Bangkok", country: "Thailand" },
  CNX: { name: "Chiang Mai Intl", city: "Chiang Mai", country: "Thailand" },
  CEI: { name: "Chiang Rai Intl", city: "Chiang Rai", country: "Thailand" },
  HKT: { name: "Phuket Intl", city: "Phuket", country: "Thailand" },
  KBV: { name: "Krabi Intl", city: "Krabi", country: "Thailand" },
  USM: { name: "Samui Airport", city: "Koh Samui", country: "Thailand" },
  UTP: { name: "U-Tapao Intl", city: "Pattaya", country: "Thailand" },
  TST: { name: "Trang Airport", city: "Trang", country: "Thailand" },
  UNN: { name: "Ranong Airport", city: "Ranong", country: "Thailand" },
  PHS: { name: "Phitsanulok Airport", city: "Phitsanulok", country: "Thailand" },
  NNT: { name: "Nan Airport", city: "Nan", country: "Thailand" },
  LPT: { name: "Lampang Airport", city: "Lampang", country: "Thailand" },
  KKC: { name: "Khon Kaen Airport", city: "Khon Kaen", country: "Thailand" },
  UTH: { name: "Udon Thani Airport", city: "Udon Thani", country: "Thailand" },
  UBP: { name: "Ubon Ratchathani Airport", city: "Ubon Ratchathani", country: "Thailand" },
  NST: { name: "Nakhon Si Thammarat Airport", city: "Nakhon Si Thammarat", country: "Thailand" },
  HDY: { name: "Hat Yai Airport", city: "Hat Yai", country: "Thailand" },
  HHQ: { name: "Hua Hin Airport", city: "Hua Hin", country: "Thailand" },
};

// Province → Cities
const provinceCities: Record<string, string[]> = {
  Bangkok: ["Bangkok", "Nonthaburi", "Pathum Thani", "Samut Prakan"],
  "Chiang Mai": ["Chiang Mai", "Lamphun", "San Sai", "Hang Dong"],
  "Chiang Rai": ["Chiang Rai", "Mae Sai", "Chiang Saen", "Mae Chan"],
  Phuket: ["Phuket City", "Patong", "Kata", "Karon"],
  Krabi: ["Krabi Town", "Ao Nang", "Railay", "Klong Muang"],
  "Surat Thani": ["Koh Samui", "Surat Thani City", "Koh Tao", "Koh Phangan"],
  Chonburi: ["Pattaya", "Chonburi City", "Sriracha", "Bang Saen"],

  // Tỉnh có sân bay chính
  Ayutthaya: ["Ayutthaya City", "Bang Pa-In", "Bang Sai", "Phra Nakhon Si"],
  Sukhothai: ["Sukhothai City", "Si Satchanalai", "Sawankhalok", "Thung Saliam"],
  Lampang: ["Lampang City", "Ko Kha", "Mae Mo", "Ngao"],
  Trang: ["Trang City", "Kantang", "Sikao", "Yan Ta Khao"],
  Ranong: ["Ranong City", "La-un", "Kapoe", "Kra Buri"],
  Phitsanulok: ["Phitsanulok City", "Bang Rakam", "Wang Thong", "Wat Bot"],
  Nan: ["Nan City", "Pua", "Tha Wang Pha", "Chaloem Phra Kiat"],
  Rayong: ["Rayong City", "Ban Chang", "Pluak Daeng", "Map Ta Phut"],
  "Khon Kaen": ["Khon Kaen City", "Nam Phong", "Ubolratana", "Chum Phae"],
  "Udon Thani": ["Udon Thani City", "Nong Han", "Ban Dung", "Phen"],
  "Ubon Ratchathani": ["Ubon City", "Warin Chamrap", "Det Udom", "Khong Chiam"],
  "Nakhon Si Thammarat": ["Nakhon Si City", "Thung Song", "Khanom", "Sichon"],
  "Hat Yai": ["Hat Yai", "Songkhla City", "Sadao", "Na Thawi"],
  HuaHin: ["Hua Hin", "Cha-am", "Pranburi", "Sam Roi Yot"],
};

// City → IATA
const cityToIata: Record<string, string> = {
  // Vietnam
  "Hà Nội": "HAN",
  "TP.HCM": "SGN",
  "Đà Nẵng": "DAD",

  // Thailand
  Bangkok: "BKK",
  "Chiang Mai": "CNX",
  "Chiang Rai": "CEI",
  Phuket: "HKT",
  Krabi: "KBV",
  "Koh Samui": "USM",
  Pattaya: "UTP",
  Ayutthaya: "DMK",
  Sukhothai: "THS", // thực tế sân bay Sukhothai
  Lampang: "LPT",
  Trang: "TST",
  Ranong: "UNN",
  Phitsanulok: "PHS",
  Nan: "NNT",
  Rayong: "UTP",
  "Khon Kaen": "KKC",
  "Udon Thani": "UTH",
  "Ubon Ratchathani": "UBP",
  "Nakhon Si Thammarat": "NST",
  "Hat Yai": "HDY",
  HuaHin: "HHQ",
};

// Routes (VN ↔ Thailand + nội địa Thái)
const thRoutes: Record<string, string[]> = {
  // quốc tế từ VN
  "Hà Nội": ["Bangkok", "Chiang Mai", "Phuket"],
  "TP.HCM": ["Bangkok", "Chiang Mai", "Phuket", "Krabi"],
  "Đà Nẵng": ["Bangkok"],

  // Thái nội địa
  Bangkok: [
    "Chiang Mai",
    "Chiang Rai",
    "Phuket",
    "Krabi",
    "Koh Samui",
    "Trang",
    "Ranong",
    "Phitsanulok",
    "Nan",
    "Khon Kaen",
    "Udon Thani",
    "Ubon Ratchathani",
    "Nakhon Si Thammarat",
    "Hat Yai",
    "Hua Hin",
    "Rayong",
  ],
  "Chiang Mai": ["Bangkok", "Phuket", "Krabi", "Koh Samui"],
  "Chiang Rai": ["Bangkok"],
  Phuket: ["Bangkok", "Chiang Mai", "Chiang Rai", "Hat Yai"],
  Krabi: ["Bangkok", "Chiang Mai"],
  "Koh Samui": ["Bangkok", "Chiang Mai", "Phuket"],
  Trang: ["Bangkok"],
  Ranong: ["Bangkok"],
  Phitsanulok: ["Bangkok"],
  Nan: ["Bangkok"],
  "Khon Kaen": ["Bangkok"],
  "Udon Thani": ["Bangkok"],
  "Ubon Ratchathani": ["Bangkok"],
  "Nakhon Si Thammarat": ["Bangkok"],
  "Hat Yai": ["Bangkok", "Phuket"],
  HuaHin: ["Bangkok"],
};

// City coordinates
const cityCoordinates: Record<string, [number, number]> = {
  Bangkok: [100.5018, 13.7563],
  "Chiang Mai": [98.9817, 18.7061],
  "Chiang Rai": [99.832, 19.9069],
  Phuket: [98.3923, 7.8804],
  Krabi: [98.911, 8.0863],
  "Koh Samui": [100.0253, 9.512],
  Pattaya: [100.9025, 12.9276],
  Trang: [99.6114, 7.5596],
  Ranong: [98.633, 9.9658],
  Phitsanulok: [100.2586, 16.8211],
  Nan: [100.773, 18.776],
  Lampang: [99.4928, 18.2888],
  Rayong: [101.281, 12.6814],
  "Khon Kaen": [102.835, 16.4419],
  "Udon Thani": [102.792, 17.4138],
  "Ubon Ratchathani": [104.8421, 15.2384],
  "Nakhon Si Thammarat": [99.9631, 8.4325],
  "Hat Yai": [100.474, 7.0084],
  HuaHin: [99.963, 12.5684],
};


// Format date
const formatDate = (date: Date) =>
  date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

// Generate flights
const generateFlights = (fromCode: string, toCode: string) => {
  const from = airports[fromCode];
  const to = airports[toCode];
  if (!from || !to) return [];
  const today = new Date();
  return Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i * 7);
    return {
      id: `${fromCode}-${toCode}-${i}`,
      from: `${from.city} (${fromCode})`,
      to: `${to.city} (${toCode})`,
      date: formatDate(d),
      price: 100 + i * 20,
      originalPrice: 150 + i * 20,
      description: `Chuyến bay từ ${from.city} đến ${to.city} ngày ${formatDate(d)}`,
    };
  });
};

const ThailandMapWithCities = () => {
  const [searchProvince, setSearchProvince] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [tripType, setTripType] = useState<"vietnam" | "thailand" | null>(null);
  const [fromCityVN, setFromCityVN] = useState("Hà Nội");
  const [fromCityTH, setFromCityTH] = useState("Bangkok");
  const [flights, setFlights] = useState<any[]>([]);

  // ✅ Fix: luôn fallback về string rỗng để tránh lỗi .toLowerCase
  const filteredProvinces = Object.keys(provinceCities).filter((p) =>
    (p ?? "").toLowerCase().includes((searchProvince ?? "").toLowerCase())
  );

  // Load flights
  useEffect(() => {
    if (!selectedCity || !tripType) return;
    let flightsData: any[] = [];

    if (tripType === "vietnam") {
      const fromCode = cityToIata[fromCityVN];
      const toCode = selectedCity ? cityToIata[selectedCity] : null;
      if (fromCode && toCode) {
        flightsData = generateFlights(fromCode, toCode);
      }
    }

    if (tripType === "thailand") {
      const fromCode = cityToIata[fromCityTH];
      if (fromCode) {
        const routes = thRoutes[fromCityTH] || [];
        routes.forEach((toName) => {
          const toCode = cityToIata[toName];
          if (toCode) flightsData = flightsData.concat(generateFlights(fromCode, toCode));
        });
      }
    }

    setFlights(flightsData);
  }, [tripType, selectedCity, fromCityVN, fromCityTH]);

  return (
    <div className="container">
      <h1
        className="mb-4 mt-5 fw-bold text-center title-responsive"
        style={{ color: "#2D4271" }}
      >
        <Plane size={40} color="#2D4271" className="mb-2" /> Khám phá Thái Lan
        cùng AirBookings
      </h1>

      <div className="usamap-container">
        {/* Map */}
        <div className="usamap-map-container" style={{ width: "100%", height: "600px" }}>
          <ComposableMap
            projection="geoMercator"
          
            projectionConfig={{ scale: 2000, center: [100, 13] }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const provinceName = geo.properties.name || "";
                  const isSelected = provinceName === selectedProvince;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        setSelectedProvince(provinceName);
                        setSelectedCity(null);
                        setTripType(null);
                        setFlights([]);
                      }}
                      style={{
                        default: {
                          fill: isSelected ? "#0288D1" : "#e0e7ef",
                          stroke: "#94a3b8",
                          strokeWidth: 0.5,
                        },
                        hover: { fill: "#4FC3F7", cursor: "pointer" },
                        pressed: { fill: "#0288D1" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Marker for selected city */}
            {selectedCity && cityCoordinates[selectedCity] && (
              <Marker coordinates={cityCoordinates[selectedCity]}>
                <circle r={6} fill="#FF5722" stroke="#fff" strokeWidth={2} />
              </Marker>
            )}
          </ComposableMap>
        </div>

        {/* Sidebar */}
        <div className="usamap-sidebar">
          <div className="usamap-header">
          <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>Thái Lan</h2>
          <p style={{ marginBottom: "16px", color: "#555" }}>Chọn tỉnh và thành phố để xem các chuyến bay phổ biến</p>

          {/* Search */}
          <div style={{ marginBottom: "16px", position: "relative" }}>
            <input
              type="text"
              placeholder="Tìm kiếm tỉnh..."
              value={searchProvince}
              onChange={(e) => {
                setSearchProvince(e.target.value);
                setSelectedProvince(null);
                setSelectedCity(null);
                setTripType(null);
                setFlights([]);
              }}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
              }}
            />
            {searchProvince && !selectedProvince && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginTop: "4px",
                  listStyle: "none",
                  padding: "6px 0",
                  maxHeight: "180px",
                  overflowY: "auto",
                  zIndex: 100,
                }}
              >
                {filteredProvinces.map((p) => (
                  <li
                    key={p}
                    onClick={() => {
                      setSelectedProvince(p);
                      setSearchProvince(p);
                      setSelectedCity(null);
                      setTripType(null);
                      setFlights([]);
                    }}
                    style={{
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#f5f8ff")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Province info */}
          {selectedProvince && (
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>
                Tỉnh {selectedProvince}
              </h3>
              <p style={{ marginBottom: "10px", fontSize: "14px" }}>Chọn thành phố:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {provinceCities[selectedProvince]?.map((ct) => (
                  <button
                    key={ct}
                    onClick={() => {
                      setSelectedCity(ct);
                      setTripType(null);
                      setFlights([]);
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      border: "1px solid #2D4271",
                      background: selectedCity === ct ? "#2D4271" : "#fff",
                      color: selectedCity === ct ? "#fff" : "#2D4271",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.3s",
                    }}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trip type */}
          {selectedCity && !tripType && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ marginBottom: "10px", fontSize: "14px" }}>Bạn muốn bay từ đâu?</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setTripType("vietnam")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    background: "#f5f8ff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                <Plane /> Từ Việt Nam
                </button>
                <button
                  onClick={() => setTripType("thailand")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    background: "#f5f8ff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <Flag />  Nội địa Thái Lan
                </button>
              </div>
            </div>
          )}

          {/* Flight deals */}
          {tripType && (
            <div style={{ marginBottom: "16px" }}>
              {tripType === "vietnam" && (
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontWeight: 500 }}>Xuất phát từ:</label>
                  <select
                    value={fromCityVN}
                    onChange={(e) => setFromCityVN(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="Hà Nội">Hà Nội (HAN)</option>
                    <option value="TP.HCM">TP.HCM (SGN)</option>
                    <option value="Đà Nẵng">Đà Nẵng (DAD)</option>
                  </select>
                </div>
              )}

              {tripType === "thailand" && (
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ fontWeight: 500 }}>Xuất phát từ:</label>
                  <select
                    value={fromCityTH}
                    onChange={(e) => setFromCityTH(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  >
                    {Object.keys(thRoutes).map((ct) => (
                      <option key={ct} value={ct}>
                        {ct} ({cityToIata[ct]})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {flights.length > 0 ? (
                <FlightDealsOne flights={flights} />
              ) : (
                <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
                  Tuyến bay chưa được cập nhật
                </p>
              )}

              <button
                onClick={() => setTripType(null)}
                style={{
                  marginTop: "14px",
                  background: "none",
                  border: "none",
                  color: "#2D4271",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                ← Quay lại
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThailandMapWithCities;
