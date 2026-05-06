import React from "react";

// --- Helpers ---
const pad2 = (n: number) => String(n).padStart(2, "0");
const formatDDMMYYYY = (d: Date) =>
  `${pad2(d.getDate())}${pad2(d.getMonth() + 1)}${d.getFullYear()}`;
const addDaysLocal = (base: Date, days: number) => {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  d.setDate(d.getDate() + days);
  return d;
};

const getIata = (s: string): string => {
    const map: Record<string, string> = {
    // Hà Nội
    "hà nội": "HAN",
    "ha noi": "HAN",
    "hn": "HAN",
    "han": "HAN",

    // TP. Hồ Chí Minh (Sài Gòn)
    "tp hcm": "SGN",
    "tp. hcm": "SGN",
    "hồ chí minh": "SGN",
    "ho chi minh": "SGN",
    "sài gòn": "SGN",
    "sai gon": "SGN",
    "sgn": "SGN",

    // Đà Nẵng
    "đà nẵng": "DAD",
    "da nang": "DAD",
    "danang": "DAD",
    "dad": "DAD",

    // Hải Phòng (Cát Bi)
    "hải phòng": "HPH",
    "hai phong": "HPH",
    "cat bi": "HPH",
    "hph": "HPH",

    // Huế (Phú Bài)
    "huế": "HUI",
    "hue": "HUI",
    "phu bai": "HUI",
    "hui": "HUI",

    // Phú Quốc
    "phú quốc": "PQC",
    "phu quoc": "PQC",
    "pq": "PQC",
    "pqc": "PQC",

    // Nha Trang (Cam Ranh)
    "nha trang": "CXR",
    "cam ranh": "CXR",
    "cxr": "CXR",

    // Quy Nhơn (Phù Cát)
    "quy nhơn": "UIH",
    "quy nhon": "UIH",
    "phu cat": "UIH",
    "uih": "UIH",

    // Phú Yên (Tuy Hòa)
    "phú yên": "TBB",
    "phu yen": "TBB",
    "tuy hòa": "TBB",
    "tuy hoa": "TBB",
    "tbb": "TBB",

    // Thanh Hóa (Thọ Xuân)
    "thanh hóa": "THD",
    "thanh hoa": "THD",
    "tho xuan": "THD",
    "thd": "THD",

    // Cần Thơ
    "cần thơ": "VCA",
    "can tho": "VCA",
    "vca": "VCA",

    // Vinh (Nghệ An)
    "vinh": "VII",
    "nghệ an": "VII",
    "nghe an": "VII",
    "vii": "VII",

    // Đồng Hới (Quảng Bình)
    "đồng hới": "VDH",
    "dong hoi": "VDH",
    "quảng bình": "VDH",
    "quang binh": "VDH",
    "vdh": "VDH",

    // Chu Lai (Quảng Nam)
    "chu lai": "VCL",
    "quảng nam": "VCL",
    "quang nam": "VCL",
    "vcl": "VCL",

    // Tuy Hòa (Phú Yên) → đã có ở trên (TBB)

    // Pleiku (Gia Lai)
    "pleiku": "PXU",
    "gia lai": "PXU",
    "pxu": "PXU",

    // Buôn Ma Thuột (Đắk Lắk)
    "buôn ma thuột": "BMV",
    "buon ma thuot": "BMV",
    "dak lak": "BMV",
    "đắk lắk": "BMV",
    "bmv": "BMV",

    // Đà Lạt (Liên Khương - Lâm Đồng)
    "đà lạt": "DLI",
    "da lat": "DLI",
    "lien khuong": "DLI",
    "lam dong": "DLI",
    "dli": "DLI",

    // Cà Mau
    "cà mau": "CAH",
    "ca mau": "CAH",
    "cah": "CAH",

    // Rạch Giá (Kiên Giang)
    "ràch giá": "VKG",
    "rach gia": "VKG",
    "kien giang": "VKG",
    "vkg": "VKG",

    // Côn Đảo (Bà Rịa - Vũng Tàu)
    "côn đảo": "VCS",
    "con dao": "VCS",
    "vcs": "VCS",

    // Điện Biên
    "điện biên": "DIN",
    "dien bien": "DIN",
    "din": "DIN",

    // Tuyển thêm một số sân bay mới
    "quảng ninh": "VDO",
    "quang ninh": "VDO",
    "van don": "VDO",
    "vdo": "VDO",

      // Mỹ (USA)
    "new york": "JFK",
    "jfk": "JFK",
    "los angeles": "LAX",
    "la": "LAX",
    "lax": "LAX",
    "chicago": "ORD",
    "ord": "ORD",
    "miami": "MIA",
    "mia": "MIA",
    "san francisco": "SFO",
    "sf": "SFO",
    "sfo": "SFO",
    "seattle": "SEA",
    "sea": "SEA",

    // Mỹ
    "dallas": "DFW",
    "dfw": "DFW",
    "houston": "IAH",
    "iah": "IAH",
    "atlanta": "ATL",
    "atl": "ATL",
    "boston": "BOS",
    "bos": "BOS",
    "washington": "IAD",
    "washington dc": "IAD",
    "iAD": "IAD",

    // Trung Quốc
    "beijing": "PEK",
    "pek": "PEK",
    "shanghai": "PVG",
    "pvg": "PVG",
    "guangzhou": "CAN",
    "can": "CAN",
    "shenzhen": "SZX",
    "szx": "SZX",

        // Đài Loan
    "taipei": "TPE",
    "tpe": "TPE",
    "kaohsiung": "KHH",
    "khh": "KHH",

    // Canada
    "toronto": "YYZ",
    "yyz": "YYZ",
    "montreal": "YUL",
    "montréal": "YUL",
    "yul": "YUL",
    "vancouver": "YVR",
    "yvr": "YVR",

    // Châu Âu
    "london": "LHR",
    "lhr": "LHR",
    "paris": "CDG",
    "cdg": "CDG",
    "frankfurt": "FRA",
    "fra": "FRA",
    "amsterdam": "AMS",
    "ams": "AMS",
    "moscow": "SVO",
    "svo": "SVO",
    "zurich": "ZRH",
    "zrh": "ZRH",
    "barcelona": "BCN",
    "bcn": "BCN",
    "madrid": "MAD",
    "mad": "MAD",
    "rome": "FCO",
    "fco": "FCO",
    "istanbul": "IST",
    "ist": "IST",

    // Trung Đông
    "dubai": "DXB",
    "dxb": "DXB",
    "abu dhabi": "AUH",
    "auh": "AUH",
    "doha": "DOH",
    "doh": "DOH",

    // Châu Á
    "tokyo": "NRT",
    "nrt": "NRT",
    "seoul": "ICN",
    "icn": "ICN",
    "bangkok": "BKK",
    "bkk": "BKK",
    "singapore": "SIN",
    "sin": "SIN",
    "hong kong": "HKG",
    "hk": "HKG",
    "hkg": "HKG",
    "kuala lumpur": "KUL",
    "kul": "KUL",

    // Nhật Bản
    "tokyo haneda": "HND",
    "haneda": "HND",
    "hnd": "HND",
    "osaka": "KIX",
    "kix": "KIX",
    "nagoya": "NGO",
    "ngo": "NGO",
    "fukuoka": "FUK",
    "fuk": "FUK",


    // Hàn Quốc
  "gimpo": "GMP",
  "gmp": "GMP",
  "busan": "PUS",
  "pus": "PUS",
  "jeju": "CJU",
  "cju": "CJU",

  // Thái Lan
  "don mueang": "DMK",
  "dmk": "DMK",
  "phuket": "HKT",
  "hkt": "HKT",
  "chiang mai": "CNX",
  "cnx": "CNX",

  // Malaysia
  "penang": "PEN",
  "pen": "PEN",

  // Indonesia
  "bali": "DPS",
  "denpasar": "DPS",
  "dps": "DPS",

  // Philippines
  "manila": "MNL",
  "mnl": "MNL",
  "cebu": "CEB",
  "ceb": "CEB",

  // Ấn Độ
  "delhi": "DEL",
  "del": "DEL",
  "mumbai": "BOM",
  "bom": "BOM",

  // Úc (bổ sung)
  "brisbane": "BNE",
  "bne": "BNE",
  "perth": "PER",
  "per": "PER",

    // Úc
    "sydney": "SYD",
    "syd": "SYD",
    "melbourne": "MEL",
    "mel": "MEL",

    // Châu Phi
    "cairo": "CAI",
    "cai": "CAI",
    "johannesburg": "JNB",
    "jnb": "JNB",
  };
//   const map: Record<string, string> = {
//   // Hà Nội
//   "hà nội": "HAN",
//   "ha noi": "HAN",
//   "hn": "HAN",
//   "han": "HAN",

//   // TP. Hồ Chí Minh (Sài Gòn)
//   "tp hcm": "SGN",
//   "tp. hcm": "SGN",
//   "hồ chí minh": "SGN",
//   "ho chi minh": "SGN",
//   "sài gòn": "SGN",
//   "sai gon": "SGN",
//   "sgn": "SGN",

//   // Đà Nẵng
//   "đà nẵng": "DAD",
//   "da nang": "DAD",
//   "danang": "DAD",
//   "dad": "DAD",

//   // Hải Phòng (Cát Bi)
//   "hải phòng": "HPH",
//   "hai phong": "HPH",
//   "cat bi": "HPH",
//   "hph": "HPH",

//   // Huế (Phú Bài)
//   "huế": "HUI",
//   "hue": "HUI",
//   "phu bai": "HUI",
//   "hui": "HUI",

//   // Phú Quốc
//   "phú quốc": "PQC",
//   "phu quoc": "PQC",
//   "pq": "PQC",
//   "pqc": "PQC",

//   // Nha Trang (Cam Ranh)
//   "nha trang": "CXR",
//   "cam ranh": "CXR",
//   "cxr": "CXR",

//   // Quy Nhơn (Phù Cát)
//   "quy nhơn": "UIH",
//   "quy nhon": "UIH",
//   "phu cat": "UIH",
//   "uih": "UIH",

//   // Phú Yên (Tuy Hòa)
//   "phú yên": "TBB",
//   "phu yen": "TBB",
//   "tuy hòa": "TBB",
//   "tuy hoa": "TBB",
//   "tbb": "TBB",

//   // Thanh Hóa (Thọ Xuân)
//   "thanh hóa": "THD",
//   "thanh hoa": "THD",
//   "tho xuan": "THD",
//   "thd": "THD",

//   // Cần Thơ
//   "cần thơ": "VCA",
//   "can tho": "VCA",
//   "vca": "VCA",

//   // Vinh (Nghệ An)
//   "vinh": "VII",
//   "nghệ an": "VII",
//   "nghe an": "VII",
//   "vii": "VII",

//   // Đồng Hới (Quảng Bình)
//   "đồng hới": "VDH",
//   "dong hoi": "VDH",
//   "quảng bình": "VDH",
//   "quang binh": "VDH",
//   "vdh": "VDH",

//   // Chu Lai (Quảng Nam)
//   "chu lai": "VCL",
//   "quảng nam": "VCL",
//   "quang nam": "VCL",
//   "vcl": "VCL",

//   // Tuy Hòa (Phú Yên) → đã có ở trên (TBB)

//   // Pleiku (Gia Lai)
//   "pleiku": "PXU",
//   "gia lai": "PXU",
//   "pxu": "PXU",

//   // Buôn Ma Thuột (Đắk Lắk)
//   "buôn ma thuột": "BMV",
//   "buon ma thuot": "BMV",
//   "dak lak": "BMV",
//   "đắk lắk": "BMV",
//   "bmv": "BMV",

//   // Đà Lạt (Liên Khương - Lâm Đồng)
//   "đà lạt": "DLI",
//   "da lat": "DLI",
//   "lien khuong": "DLI",
//   "lam dong": "DLI",
//   "dli": "DLI",

//   // Cà Mau
//   "cà mau": "CAH",
//   "ca mau": "CAH",
//   "cah": "CAH",

//   // Rạch Giá (Kiên Giang)
//   "ràch giá": "VKG",
//   "rach gia": "VKG",
//   "kien giang": "VKG",
//   "vkg": "VKG",

//   // Côn Đảo (Bà Rịa - Vũng Tàu)
//   "côn đảo": "VCS",
//   "con dao": "VCS",
//   "vcs": "VCS",

//   // Điện Biên
//   "điện biên": "DIN",
//   "dien bien": "DIN",
//   "din": "DIN",

//   // Tuyển thêm một số sân bay mới
//   "quảng ninh": "VDO",
//   "quang ninh": "VDO",
//   "van don": "VDO",
//   "vdo": "VDO",

//     // Mỹ (USA)
//   "new york": "JFK",
//   "jfk": "JFK",
//   "los angeles": "LAX",
//   "la": "LAX",
//   "lax": "LAX",
//   "chicago": "ORD",
//   "ord": "ORD",
//   "miami": "MIA",
//   "mia": "MIA",
//   "san francisco": "SFO",
//   "sf": "SFO",
//   "sfo": "SFO",
//   "seattle": "SEA",
//   "sea": "SEA",

//   // Canada
//   "toronto": "YYZ",
//   "yyz": "YYZ",
//   "montreal": "YUL",
//   "montréal": "YUL",
//   "yul": "YUL",
//   "vancouver": "YVR",
//   "yvr": "YVR",

//   // Châu Âu
//   "london": "LHR",
//   "lhr": "LHR",
//   "paris": "CDG",
//   "cdg": "CDG",
//   "frankfurt": "FRA",
//   "fra": "FRA",
//   "amsterdam": "AMS",
//   "ams": "AMS",
//   "moscow": "SVO",
//   "svo": "SVO",

//   // Trung Đông
//   "dubai": "DXB",
//   "dxb": "DXB",
//   "abu dhabi": "AUH",
//   "auh": "AUH",
//   "doha": "DOH",
//   "doh": "DOH",

//   // Châu Á
//   "tokyo": "NRT",
//   "nrt": "NRT",
//   "seoul": "ICN",
//   "icn": "ICN",
//   "bangkok": "BKK",
//   "bkk": "BKK",
//   "singapore": "SIN",
//   "sin": "SIN",
//   "hong kong": "HKG",
//   "hk": "HKG",
//   "hkg": "HKG",
//   "kuala lumpur": "KUL",
//   "kul": "KUL",

//   // Úc
//   "sydney": "SYD",
//   "syd": "SYD",
//   "melbourne": "MEL",
//   "mel": "MEL",

//   // Châu Phi
//   "cairo": "CAI",
//   "cai": "CAI",
//   "johannesburg": "JNB",
//   "jnb": "JNB",
// };

  const key = s.toLowerCase().trim();
  if (map[key]) return map[key];
  return s.slice(0, 3).toUpperCase();
};

// --- Props ---
interface FlightRouteLinkProps {
  from: string;
  to: string;
  tripType: "khu-hoi" | "mot-chieu";
  children: React.ReactNode;
}

const FlightRouteLink: React.FC<FlightRouteLinkProps> = ({
  from,
  to,
  tripType,
  children,
}) => {
  const fromCode = getIata(from);
  const toCode = getIata(to);

  const today = new Date();
  const depart = addDaysLocal(today, 2);
  const ret = addDaysLocal(depart, 7);

  const departStr = formatDDMMYYYY(depart);
  const returnStr = formatDDMMYYYY(ret);

  const dtcr =
    tripType === "khu-hoi"
      ? `${fromCode}${toCode}${departStr}-${toCode}${fromCode}${returnStr}`
      : `${fromCode}${toCode}${departStr}`;

  const dtcp = "100"; // placeholder, có thể thay bằng giá trị động

  const url = `/tim-kiem-chuyen-bay?dtcr=${dtcr}&dtcp=${dtcp}`;

  return (
    <a href={url} style={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};

export default FlightRouteLink;
