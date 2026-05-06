import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import FlightDealsOne from "../FlightDealsWay";
import { Plane, Flag, Search } from "lucide-react";

// Bản đồ China GeoJSON
const geoUrl = "https://geojson-maps.ash.ms/countries/CHN.json";

// Airports data
const airports: Record<string, { name: string; city: string; country: string }> = {
  HAN: { name: "Sân bay Nội Bài", city: "Hà Nội", country: "Việt Nam" },
  SGN: { name: "Sân bay Tân Sơn Nhất", city: "TP.HCM", country: "Việt Nam" },
  DAD: { name: "Sân bay Đà Nẵng", city: "Đà Nẵng", country: "Việt Nam" },

  PEK: { name: "Beijing Capital Intl", city: "Bắc Kinh", country: "China" },
  SHA: { name: "Shanghai Hongqiao Intl", city: "Thượng Hải", country: "China" },
  CAN: { name: "Guangzhou Baiyun Intl", city: "Quảng Châu", country: "China" },
  CTU: { name: "Chengdu Shuangliu Intl", city: "Thành Đô", country: "China" },
  SZX: { name: "Shenzhen Bao'an Intl", city: "Thâm Quyến", country: "China" },
};

// Province → cities
const provinceCities: Record<string, string[]> = {
  "Bắc Kinh": ["Bắc Kinh"],
  "Thượng Hải": ["Thượng Hải"],
  "Quảng Đông": ["Quảng Châu", "Thâm Quyến"],
  "Tứ Xuyên": ["Thành Đô"],
};

// City → IATA
const cityToIata: Record<string, string> = {
  "Hà Nội": "HAN",
  "TP.HCM": "SGN",
  "Đà Nẵng": "DAD",

  "Bắc Kinh": "PEK",
  "Thượng Hải": "SHA",
  "Quảng Châu": "CAN",
  "Thành Đô": "CTU",
  "Thâm Quyến": "SZX",
};

// Tuyến bay nội địa China
const cnRoutes: Record<string, string[]> = {
  "Bắc Kinh": ["Thượng Hải", "Quảng Châu", "Thành Đô"],
  "Thượng Hải": ["Bắc Kinh", "Quảng Châu"],
  "Quảng Châu": ["Bắc Kinh", "Thành Đô"],
  "Thành Đô": ["Bắc Kinh", "Thượng Hải"],
};

// === Helper
const formatDate = (date: Date) =>
  date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

const getAirport = (code: string) => airports[code] || null;

const generateFlights = (fromCode: string, toCode: string) => {
  const from = getAirport(fromCode);
  const to = getAirport(toCode);
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
      price: 150 + i * 20,
      originalPrice: 200 + i * 20,
      description: `Chuyến bay từ ${from.city} đến ${to.city} ngày ${formatDate(d)}`,
    };
  });
};

const ChinaMapWithCities = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [tripType, setTripType] = useState<"vietnam" | "china" | null>(null);
  const [fromCity, setFromCity] = useState("Hà Nội");
  const [fromCNCity, setFromCNCity] = useState("Bắc Kinh");
  const [flights, setFlights] = useState<any[]>([]);
  const [searchProvince, setSearchProvince] = useState("");

  const provinces = Object.keys(provinceCities);
  const filteredProvinces = provinces.filter((p) =>
    p.toLowerCase().includes(searchProvince.toLowerCase())
  );

  useEffect(() => {
    if (!selectedCity || !tripType) return;
    let flightsData: any[] = [];
    if (tripType === "vietnam") {
      const fromCode = cityToIata[fromCity];
      const toCode = cityToIata[selectedCity];
      if (fromCode && toCode) flightsData = generateFlights(fromCode, toCode);
    }
    if (tripType === "china") {
      const fromCode = cityToIata[fromCNCity];
      const toCode = cityToIata[selectedCity];
      if (fromCode && toCode) flightsData = generateFlights(fromCode, toCode);
      const routes = cnRoutes[selectedCity] || [];
      routes.forEach((fromName) => {
        const fCode = cityToIata[fromName];
        if (fCode) flightsData = flightsData.concat(generateFlights(fCode, toCode));
      });
    }
    setFlights(flightsData);
  }, [tripType, selectedCity, fromCity, fromCNCity]);

  return (
    <div className="container">
      <h1
        className="mb-4 mt-5 fw-bold text-center title-responsive"
        style={{ color: "#2D4271" }}
      >
        <Plane size={40} color="#2D4271" className="mb-2" /> Khám phá Trung Quốc
        cùng AirBookings
      </h1>

      <div className="china-map-container">
        {/* Map */}
        <div className="china-map">
          <ComposableMap projection="geoMercator" className="china-geo-map">
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const provinceName: string = geo.properties.name;
                  const isSelected = provinceName === selectedProvince;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={-1}
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
                          outline: "none",
                        },
                        hover: {
                          fill: "#4FC3F7",
                          cursor: "pointer",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#0288D1",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Sidebar */}
        <div className="china-sidebar">
          <div className="china-header">
            <h2 className="title-responsive">Trung Quốc</h2>
            <p>Chọn tỉnh và thành phố để xem các tuyến bay phổ biến</p>
          </div>

          {/* Search Province */}
          <div className="china-search-container">
            <div className="china-input-container">
              <span className="china-input-icon">
                <Search />
              </span>
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
                className="china-input-box"
              />
            </div>
            {searchProvince && !selectedProvince && (
              <ul className="china-suggestions">
                {filteredProvinces.map((p) => (
                  <li
                    key={p}
                    onClick={() => {
                      setSelectedProvince(p);
                      setSearchProvince(p);
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Province info */}
          {selectedProvince ? (
            <div className="china-province-info">
              <h3>Tỉnh {selectedProvince}</h3>
              <p>Chọn một thành phố để xem các tuyến bay:</p>

              <div className="china-city-list">
                {provinceCities[selectedProvince] &&
                provinceCities[selectedProvince].length > 0 ? (
                  provinceCities[selectedProvince].map((ct) => (
                    <button
                      key={ct}
                      onClick={() => {
                        setSelectedCity(ct);
                        setTripType(null);
                        setFlights([]);
                      }}
                      className={selectedCity === ct ? "active" : ""}
                    >
                      {ct}
                    </button>
                  ))
                ) : (
                  <p className="text-primary">
                    Chưa cập nhật thành phố ở tỉnh này
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="china-placeholder">
              <div className="china-placeholder-icon">🏮</div>
              <p>Vui lòng chọn một tỉnh để bắt đầu</p>
            </div>
          )}

          {/* City info */}
          {selectedCity && (
            <div className="china-city-info">
              <div className="china-city-header">
                <h3>Thành phố {selectedCity}</h3>
                {!tripType ? (
                  <div className="china-trip-type-selector">
                    <p>Bạn muốn bay từ đâu?</p>
                    <div className="china-trip-buttons">
                      <button
                        onClick={() => setTripType("vietnam")}
                        className="china-trip-btn"
                      >
                        <Plane size={40} color="#2D4271" className="mb-2" />
                        Từ Việt Nam
                      </button>
                      <button
                        onClick={() => setTripType("china")}
                        className="china-trip-btn"
                      >
                        <Flag size={40} color="#2D4271" className="mb-2" />
                        Nội địa Trung Quốc
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="china-routes-container">
                    {tripType === "vietnam" ? (
                      <>
                        <div className="china-route-header">
                          <h4>Các tuyến bay từ Việt Nam</h4>
                          <div className="china-from-selector">
                            <label>Xuất phát từ:</label>
                            <select
                              value={fromCity}
                              onChange={(e) => setFromCity(e.target.value)}
                              className="china-route-select"
                            >
                              <option value="Hà Nội">Hà Nội (HAN)</option>
                              <option value="TP.HCM">TP.HCM (SGN)</option>
                              <option value="Đà Nẵng">Đà Nẵng (DAD)</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4>Các tuyến bay nội địa</h4>
                        <div className="china-route-header">
                          <label>Xuất phát từ:</label>
                          <select
                            value={fromCNCity}
                            onChange={(e) => setFromCNCity(e.target.value)}
                            className="china-route-select"
                          >
                            <option value="Bắc Kinh">Bắc Kinh (PEK)</option>
                            <option value="Thượng Hải">Thượng Hải (SHA)</option>
                            <option value="Quảng Châu">Quảng Châu (CAN)</option>
                            <option value="Thành Đô">Thành Đô (CTU)</option>
                          </select>
                        </div>
                      </>
                    )}
                    {/* Deals */}
                    {flights.length > 0 && <FlightDealsOne flights={flights} />}
                    {tripType && flights.length === 0 && (
                      <>
                        <p className="text-danger large">
                          Tuyến bay chưa được cập nhật
                        </p>
                        <a
                          href="/"
                          className="small text-decoration-underline text-primary"
                        >
                          Tìm tất cả tuyến bay ở đây
                        </a>
                      </>
                    )}

                    <button
                      onClick={() => {
                        setTripType(null);
                        setFlights([]);
                      }}
                      className="china-back-btn"
                    >
                      ← Quay lại
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChinaMapWithCities;
