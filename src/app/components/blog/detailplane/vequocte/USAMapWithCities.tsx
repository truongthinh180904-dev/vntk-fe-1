import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import FlightDealsOne from './FlightDealsWay';
import "./USAMapWithCities.css";
import usRoutes from './usRoutes';
import { Flag, Plane, Search } from "lucide-react";

// Bản đồ USA
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// ===== Airports data theo IATA =====
const airports: Record<
  string,
  { name: string; city: string; country: string; image?: string }
> = {
  // ==== Việt Nam ====
  HAN: { name: "Sân bay Nội Bài", city: "Hà Nội", country: "Việt Nam" },
  SGN: { name: "Sân bay Tân Sơn Nhất", city: "TP.HCM", country: "Việt Nam" },
  DAD: { name: "Sân bay Đà Nẵng", city: "Đà Nẵng", country: "Việt Nam" },

  // ==== USA: Top hubs ====
  JFK: { name: "John F. Kennedy Intl", city: "New York City", country: "USA" },
  EWR: { name: "Newark Liberty Intl", city: "Newark", country: "USA" },
  LGA: { name: "LaGuardia", city: "New York City", country: "USA" },

  LAX: { name: "Los Angeles Intl", city: "Los Angeles", country: "USA" },
  SFO: { name: "San Francisco Intl", city: "San Francisco", country: "USA" },
  SAN: { name: "San Diego Intl", city: "San Diego", country: "USA" },
  SJC: { name: "San Jose Intl", city: "San Jose", country: "USA" },
  SMF: { name: "Sacramento Intl", city: "Sacramento", country: "USA" },
  OAK: { name: "Oakland Intl", city: "Oakland", country: "USA" },
  BUR: { name: "Hollywood Burbank", city: "Burbank", country: "USA" },
  LGB: { name: "Long Beach Airport", city: "Long Beach", country: "USA" },
  SNA: { name: "John Wayne Airport", city: "Santa Ana (OC)", country: "USA" },
  PSP: { name: "Palm Springs Intl", city: "Palm Springs", country: "USA" },

  ORD: { name: "O'Hare Intl", city: "Chicago", country: "USA" },
  MDW: { name: "Midway Intl", city: "Chicago", country: "USA" },

  DFW: { name: "Dallas/Fort Worth Intl", city: "Dallas", country: "USA" },
  DAL: { name: "Dallas Love Field", city: "Dallas", country: "USA" },

  IAH: { name: "George Bush Intercontinental", city: "Houston", country: "USA" },
  HOU: { name: "William P. Hobby", city: "Houston", country: "USA" },

  ATL: { name: "Hartsfield–Jackson Atlanta Intl", city: "Atlanta", country: "USA" },
  MIA: { name: "Miami Intl", city: "Miami", country: "USA" },
  FLL: { name: "Fort Lauderdale Intl", city: "Fort Lauderdale", country: "USA" },
  TPA: { name: "Tampa Intl", city: "Tampa", country: "USA" },
  MCO: { name: "Orlando Intl", city: "Orlando", country: "USA" },

  BOS: { name: "Logan Intl", city: "Boston", country: "USA" },
  PHL: { name: "Philadelphia Intl", city: "Philadelphia", country: "USA" },
  DCA: { name: "Reagan National", city: "Washington DC", country: "USA" },
  IAD: { name: "Dulles Intl", city: "Washington DC", country: "USA" },
  BWI: { name: "Baltimore/Washington Intl", city: "Baltimore", country: "USA" },

  SEA: { name: "Seattle–Tacoma Intl", city: "Seattle", country: "USA" },
  PDX: { name: "Portland Intl", city: "Portland", country: "USA" },
  GEG: { name: "Spokane Intl", city: "Spokane", country: "USA" },
  BOI: { name: "Boise Airport", city: "Boise", country: "USA" },

  DEN: { name: "Denver Intl", city: "Denver", country: "USA" },
  COS: { name: "Colorado Springs Airport", city: "Colorado Springs", country: "USA" },

  LAS: { name: "Harry Reid Intl", city: "Las Vegas", country: "USA" },
  RNO: { name: "Reno–Tahoe Intl", city: "Reno", country: "USA" },

  PHX: { name: "Phoenix Sky Harbor Intl", city: "Phoenix", country: "USA" },
  TUS: { name: "Tucson Intl", city: "Tucson", country: "USA" },

  DTW: { name: "Detroit Metro", city: "Detroit", country: "USA" },
  GRR: { name: "Gerald R. Ford Intl", city: "Grand Rapids", country: "USA" },
  FNT: { name: "Bishop Intl", city: "Flint", country: "USA" },

  MSP: { name: "Minneapolis–Saint Paul Intl", city: "Minneapolis", country: "USA" },
  STL: { name: "St. Louis Lambert Intl", city: "St. Louis", country: "USA" },
  MCI: { name: "Kansas City Intl", city: "Kansas City", country: "USA" },

  CLT: { name: "Charlotte Douglas Intl", city: "Charlotte", country: "USA" },
  RDU: { name: "Raleigh–Durham Intl", city: "Raleigh", country: "USA" },
  BNA: { name: "Nashville Intl", city: "Nashville", country: "USA" },
  MEM: { name: "Memphis Intl", city: "Memphis", country: "USA" },
  SDF: { name: "Louisville Intl", city: "Louisville", country: "USA" },
  IND: { name: "Indianapolis Intl", city: "Indianapolis", country: "USA" },
  CMH: { name: "John Glenn Columbus Intl", city: "Columbus", country: "USA" },
  CVG: { name: "Cincinnati/Northern Kentucky Intl", city: "Cincinnati", country: "USA" },
  CLE: { name: "Cleveland Hopkins Intl", city: "Cleveland", country: "USA" },
  PIT: { name: "Pittsburgh Intl", city: "Pittsburgh", country: "USA" },
  BUF: { name: "Buffalo Niagara Intl", city: "Buffalo", country: "USA" },
  ALB: { name: "Albany Intl", city: "Albany", country: "USA" },

  // Hawaii & Alaska
  HNL: { name: "Honolulu Intl", city: "Honolulu", country: "USA" },
  OGG: { name: "Kahului Airport", city: "Kahului (Maui)", country: "USA" },
  KOA: { name: "Kona Intl", city: "Kona (Hawaii)", country: "USA" },
  LIH: { name: "Lihue Airport", city: "Lihue (Kauai)", country: "USA" },

  ANC: { name: "Ted Stevens Anchorage Intl", city: "Anchorage", country: "USA" },
  FAI: { name: "Fairbanks Intl", city: "Fairbanks", country: "USA" },
  JNU: { name: "Juneau Intl", city: "Juneau", country: "USA" },
};

// Mapping state → city (UI dùng để chọn)
// Mapping state → cities (25 bang, mỗi bang >= 5 thành phố lớn)
const stateCities: Record<string, string[]> = {
  California: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
  Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
  "New York": ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
  Illinois: ["Chicago", "Springfield", "Naperville", "Peoria", "Rockford"],
  Washington: ["Seattle", "Spokane", "Tacoma", "Bellevue", "Everett"],
  Massachusetts: ["Boston", "Cambridge", "Worcester", "Lowell", "Springfield"],
  Georgia: ["Atlanta", "Savannah", "Athens", "Augusta", "Macon"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Harrisburg", "Allentown", "Erie"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  Michigan: ["Detroit", "Ann Arbor", "Grand Rapids", "Lansing", "Flint"],
  Arizona: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Tempe"],
  Colorado: ["Denver", "Colorado Springs", "Boulder", "Aurora", "Fort Collins"],
  Virginia: ["Richmond", "Virginia Beach", "Norfolk", "Arlington", "Alexandria"],
  Minnesota: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
  Wisconsin: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Appleton"],
  Oregon: ["Portland", "Salem", "Eugene", "Bend", "Medford"],
  Nevada: ["Las Vegas", "Reno", "Carson City", "Henderson", "Paradise"],
  Indiana: ["Indianapolis", "Fort Wayne", "Bloomington", "Evansville", "South Bend"],
  Tennessee: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
  Missouri: ["St. Louis", "Kansas City", "Springfield", "Columbia", "Independence"],
  Maryland: ["Baltimore", "Annapolis", "Frederick", "Silver Spring", "Rockville"],
  Louisiana: ["New Orleans", "Baton Rouge", "Lafayette", "Shreveport", "Lake Charles"],
};

// Bản đồ city → airport code (chỉ cần 1 code chính cho mỗi city hub)

// City → IATA mapping (dùng chung cho cả app, không cần đặt trong useEffect)
const cityToIata: Record<string, string> = {
  // Việt Nam
  "Hà Nội": "HAN",
  "TP.HCM": "SGN",
  "Đà Nẵng": "DAD",

  // USA (80+ cities)
  "New York City": "JFK",
  "Los Angeles": "LAX",
  "San Francisco": "SFO",
  "Chicago": "ORD",
  "Miami": "MIA",
  "Seattle": "SEA",
  "Boston": "BOS",
  "Atlanta": "ATL",
  "Dallas": "DFW",
  "Houston": "IAH",
  "Orlando": "MCO",
  "Washington DC": "DCA",
  "Las Vegas": "LAS",
  "Philadelphia": "PHL",
  "Denver": "DEN",
  "Phoenix": "PHX",
  "Detroit": "DTW",
  "Minneapolis": "MSP",
  "San Diego": "SAN",
  "Charlotte": "CLT",
  "Tampa": "TPA",
  "Baltimore": "BWI",
  "Salt Lake City": "SLC",
  "Portland": "PDX",
  "Nashville": "BNA",
  "Newark": "EWR",
  "Fort Lauderdale": "FLL",
  "San Jose": "SJC",
  "Austin": "AUS",
  "Sacramento": "SMF",
  "Kansas City": "MCI",
  "St. Louis": "STL",
  "Cleveland": "CLE",
  "Pittsburgh": "PIT",
  "Indianapolis": "IND",
  "Columbus": "CMH",
  "Cincinnati": "CVG",
  "Milwaukee": "MKE",
  "Raleigh": "RDU",
  "New Orleans": "MSY",
  "Memphis": "MEM",
  "Louisville": "SDF",
  "Richmond": "RIC",
  "Norfolk": "ORF",
  "Buffalo": "BUF",
  "Albany": "ALB",
  "Hartford": "BDL",
  "Providence": "PVD",
  "Manchester": "MHT",
  "Anchorage": "ANC",
  "Honolulu": "HNL",
  "Kahului (Maui)": "OGG",
  "Kona (Hawaii)": "KOA",
  "Lihue (Kauai)": "LIH",
  "Spokane": "GEG",
  "Boise": "BOI",
  "Reno": "RNO",
  "Palm Springs": "PSP",
  "Santa Ana (OC)": "SNA",
  "Long Beach": "LGB",
  "Oakland": "OAK",
  "Burbank": "BUR",
  "El Paso": "ELP",
  "Albuquerque": "ABQ",
  "Colorado Springs": "COS",
  "Tulsa": "TUL",
  "Oklahoma City": "OKC",
  "Little Rock": "LIT",
  "Des Moines": "DSM",
  "Omaha": "OMA",
  "Sioux Falls": "FSD",
  "Fargo": "FAR",
  "Madison": "MSN",
  "Grand Rapids": "GRR",
  "Flint": "FNT",
  "Charleston (SC)": "CHS",
  "Savannah": "SAV",
  "Birmingham": "BHM",
  "Jacksonville": "JAX",
  "West Palm Beach": "PBI",
  "Dayton": "DAY",
  "Knoxville": "TYS",
  "Chattanooga": "CHA",
  "Fairbanks": "FAI",
  "Juneau": "JNU",
};

// Tuyến bay US nội địa (city name → city name)
// const usRoutes: Record<string, string[]> = {
//   "Los Angeles": ["New York City", "Chicago", "Dallas", "Las Vegas"],
//   "San Francisco": ["Seattle", "Denver", "Las Vegas", "Los Angeles"],
//   "Miami": ["Atlanta", "Orlando", "Washington DC", "New York City"],
//   "New York City": ["Los Angeles", "Chicago", "Houston", "Miami"],
//   Chicago: ["Miami", "Dallas", "Boston", "Denver"],
//   Seattle: ["San Francisco", "Los Angeles", "Denver", "Chicago"],
//   Boston: ["New York City", "Chicago", "Washington DC", "Atlanta"],
//   Atlanta: ["Miami", "New York City", "Chicago", "Dallas"],
// };

// Tuyến bay từ Việt Nam (city name → routes mô tả)
// const vietnamRoutes: Record<string, string[]> = {
//   "Los Angeles": ["Bay thẳng từ SGN", "Qua Seoul (ICN)", "Qua Tokyo (NRT)"],
//   "San Francisco": ["Bay thẳng từ SGN", "Bay thẳng từ HAN", "Qua Taipei (TPE)"],
//   "New York City": ["Qua San Francisco", "Qua Seoul (ICN)", "Qua Tokyo (NRT)"],
//   Chicago: ["Qua San Francisco", "Qua Seoul (ICN)", "Qua Tokyo (NRT)"],
//   Dallas: ["Qua San Francisco", "Qua Seoul (ICN)", "Qua Los Angeles"],
//   Seattle: ["Qua San Francisco", "Qua Seoul (ICN)", "Qua Tokyo (NRT)"],
// };

// === Helper ===
const formatDate = (date: Date) =>
  date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
// Helper lấy airport an toàn
const getAirport = (code: string) => {
  if (!airports[code]) return null;
  return airports[code];
};

const generateFlights = (fromCode: string, toCode: string) => {
  const fromAirport = getAirport(fromCode);
  const toAirport = getAirport(toCode);

  if (!fromAirport || !toAirport) {
    return []; // nếu không có thì trả mảng rỗng
  }

  const today = new Date();
  const flights = [];

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i * 7);
    flights.push({
      id: `${fromCode}-${toCode}-${i}`,
      from: `${fromAirport.city} (${fromCode})`,
      to: `${toAirport.city} (${toCode})`,
      date: formatDate(d),
      price: 200 + i * 30,
      originalPrice: 250 + i * 30,
      description: `Chuyến bay từ ${fromAirport.city} đến ${toAirport.city} ngày ${formatDate(d)}`,
      img: toAirport.image,
    });
  }
  return flights;
};


// === UI chính ===
const USAMapWithCities = () => {
  const [searchState, setSearchState] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [tripType, setTripType] = useState<"vietnam" | "us" | null>(null);
  const [fromCity, setFromCity] = useState("Hà Nội");
  const [flights, setFlights] = useState<any[]>([]);
  const [fromUSCity, setFromUSCity] = useState<string>("Los Angeles");

  const filteredStates = Object.keys(stateCities).filter((st) =>
    st.toLowerCase().includes(searchState.toLowerCase())
  );
useEffect(() => {
  if (!selectedCity || !tripType) return;

  let flightsData: any[] = [];

  if (tripType === "vietnam") {
    const fromCode = cityToIata[fromCity];
    const toCode = cityToIata[selectedCity];

    if (!fromCode || !toCode) {
      setFlights([]);
      return;
    }
    flightsData = generateFlights(fromCode, toCode);
  }

  if (tripType === "us") {
    const toCode = cityToIata[selectedCity];
    const fromCode = cityToIata[fromUSCity];

    if (!toCode || !fromCode) {
      setFlights([]);
      return;
    }

    flightsData = generateFlights(fromCode, toCode);

    // 🔥 chỉ check usRoutes khi tripType = "us"
    const routes = usRoutes[selectedCity] || [];
    routes.forEach((fromName) => {
      const fromCode = cityToIata[fromName];
      if (fromCode) {
        flightsData = flightsData.concat(generateFlights(fromCode, toCode));
      }
    });
  }

  setFlights(flightsData);
}, [tripType, selectedCity, fromCity, fromUSCity]);


  return (
    <div className="container">
      <h1
        className="mb-4 mt-5 fw-bold text-center title-responsive"
        style={{ color: "#2D4271" }}
      >
        <Plane size={40} color="#2D4271" className="mb-2" /> Khám phá Hoa Kỳ
        cùng AirBookings
      </h1>

      <div className="usamap-container">
        {/* Map */}
        <div className="usamap-map-container">
          <ComposableMap projection="geoAlbersUsa" className="usamap-map">
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const stateName: string = geo.properties.name;
                  const isSelected = stateName === selectedState;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={-1}
                      onClick={() => {
                        setSelectedState(stateName);
                        setSearchState(stateName);
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
        <div className="usamap-sidebar">
          <div className="usamap-header">
            <h2 className="title-responsive">Hoa Kỳ</h2>
            <p>Chọn tiểu bang và thành phố để xem các tuyến bay phổ biến</p>
          </div>

          {/* Search State */}
          <div className="usamap-search-container">
            <div className="usamap-input-container">
              <span className="usamap-input-icon">
                <Search />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm tiểu bang..."
                value={searchState}
                onChange={(e) => {
                  setSearchState(e.target.value);
                  setSelectedState(null);
                  setSelectedCity(null);
                  setTripType(null);
                  setFlights([]);
                }}
                className="usamap-input-box"
              />
            </div>
            {searchState && !selectedState && (
              <ul className="usamap-suggestions">
                {filteredStates.map((st) => (
                  <li
                    key={st}
                    onClick={() => {
                      setSelectedState(st);
                      setSearchState(st);
                    }}
                  >
                    {st}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* State info */}
          {selectedState ? (
            <div className="usamap-state-info">
              <h3>Tiểu bang {selectedState}</h3>
              <p>Chọn một thành phố để xem các tuyến bay:</p>

              <div className="usamap-city-list">
                {stateCities[selectedState] && stateCities[selectedState].length > 0 ? (
                  stateCities[selectedState].map((ct) => (
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
                    Chưa cập nhật thành phố ở tiểu bang này
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="usamap-placeholder">
              <div className="usamap-placeholder-icon">🗽</div>
              <p>Vui lòng chọn một tiểu bang để bắt đầu</p>
            </div>
          )}

          {/* City info */}
          {selectedCity && (
            <div className="usamap-city-info">
              <div className="usamap-city-header">
                <h3>Thành phố {selectedCity}</h3>
                {!tripType ? (
                  <div className="usamap-trip-type-selector">
                    <p>Bạn muốn bay từ đâu?</p>
                    <div className="usamap-trip-buttons">
                      <button
                        onClick={() => setTripType("vietnam")}
                        className="usamap-trip-btn"
                      >
                        <span className="usamap-btn-icon">
                          <Plane
                            size={40}
                            color="#2D4271"
                            className="mb-2"
                          />
                        </span>
                        Từ Việt Nam
                      </button>
                      <button
                        onClick={() => setTripType("us")}
                        className="usamap-trip-btn"
                      >
                        <span className="usamap-btn-icon">
                          <Flag
                            size={40}
                            color="#2D4271"
                            className="mb-2"
                          />
                        </span>
                        Nội địa Hoa Kỳ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="usamap-routes-container">
                    {tripType === "vietnam" ? (
                      <>
                        <div className="usamap-route-header">
                          <h4>Các tuyến bay từ Việt Nam</h4>
                          <div className="usamap-from-selector">
                            <label>Xuất phát từ:</label>
                            <select
                              value={fromCity}
                              onChange={(e) =>
                                setFromCity(e.target.value)
                              }
                              className="usamap-route-select"
                            >
                              <option value="Hà Nội">
                                Hà Nội (HAN)
                              </option>
                              <option value="TP.HCM">
                                TP.HCM (SGN)
                              </option>
                              <option value="Đà Nẵng">
                                Đà Nẵng (DAD)
                              </option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4>Các tuyến bay nội địa phổ biến</h4>
                        {tripType === "us" && (
  <div className="usamap-route-header">
    <h4>Các tuyến bay nội địa</h4>
    <div className="usamap-from-selector">
      <label>Xuất phát từ:</label>
      <select
        value={fromUSCity}
        onChange={(e) => setFromUSCity(e.target.value)}
        className="usamap-route-select"
      >
        <option value="Los Angeles">Los Angeles (LAX)</option>
        <option value="New York City">New York City (JFK)</option>
        <option value="Chicago">Chicago (ORD)</option>
        <option value="Miami">Miami (MIA)</option>
        <option value="Dallas">Dallas (DFW)</option>
        <option value="Houston">Houston (IAH)</option>
        <option value="Atlanta">Atlanta (ATL)</option>
        <option value="San Francisco">San Francisco (SFO)</option>
      </select>
    </div>
  </div>
)}

                      </>
                    )}
                    {/* Deals */}
                    {flights.length > 0 && (
                      <FlightDealsOne flights={flights} />
                    )}
                      {tripType && flights.length === 0 && (
                        <>
                        <p className="text-danger large">Tuyến bay chưa được cập nhật</p>
                        <a href="/" className="small text-decoration-underline text-primary">
                            Tìm tất cả tuyến bay ở đây
                        </a>
                        </>
                    )}

                    <button
                      onClick={() => {
                        setTripType(null);
                        setFlights([]);
                      }}
                      className="usamap-back-btn"
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



export default USAMapWithCities;
