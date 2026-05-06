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
  const m = s.match(/\(([A-Za-z]{3})\)\s*$/);
  if (m) return m[1].toUpperCase();
  if (/^[A-Za-z]{3}$/.test(s.trim())) return s.trim().toUpperCase();
const map: Record<string, string> = {
  // ===== Việt Nam =====
  "hà nội": "HAN",
  "ha noi": "HAN",
  "hn": "HAN",
  "han": "HAN",

  "tp hcm": "SGN",
  "tp. hcm": "SGN",
  "hồ chí minh": "SGN",
  "ho chi minh": "SGN",
  "sài gòn": "SGN",
  "sai gon": "SGN",
  "sgn": "SGN",

  "đà nẵng": "DAD",
  "da nang": "DAD",
  "danang": "DAD",
  "dad": "DAD",

  "hải phòng": "HPH",
  "hai phong": "HPH",
  "cat bi": "HPH",
  "hph": "HPH",

  "huế": "HUI",
  "hue": "HUI",
  "phu bai": "HUI",
  "hui": "HUI",

  "phú quốc": "PQC",
  "phu quoc": "PQC",
  "pq": "PQC",
  "pqc": "PQC",

  "nha trang": "CXR",
  "cam ranh": "CXR",
  "cxr": "CXR",

  "quy nhơn": "UIH",
  "quy nhon": "UIH",
  "phu cat": "UIH",
  "uih": "UIH",

  "phú yên": "TBB",
  "phu yen": "TBB",
  "tuy hòa": "TBB",
  "tuy hoa": "TBB",
  "tbb": "TBB",

  "thanh hóa": "THD",
  "thanh hoa": "THD",
  "tho xuan": "THD",
  "thd": "THD",

  "cần thơ": "VCA",
  "can tho": "VCA",
  "vca": "VCA",

  "vinh": "VII",
  "nghệ an": "VII",
  "nghe an": "VII",
  "vii": "VII",

  "đồng hới": "VDH",
  "dong hoi": "VDH",
  "quảng bình": "VDH",
  "quang binh": "VDH",
  "vdh": "VDH",

  "chu lai": "VCL",
  "quảng nam": "VCL",
  "quang nam": "VCL",
  "vcl": "VCL",

  "pleiku": "PXU",
  "gia lai": "PXU",
  "pxu": "PXU",

  "buôn ma thuột": "BMV",
  "buon ma thuot": "BMV",
  "dak lak": "BMV",
  "đắk lắk": "BMV",
  "bmv": "BMV",

  "đà lạt": "DLI",
  "da lat": "DLI",
  "lien khuong": "DLI",
  "lam dong": "DLI",
  "dli": "DLI",

  "cà mau": "CAH",
  "ca mau": "CAH",
  "cah": "CAH",

  "ràch giá": "VKG",
  "rach gia": "VKG",
  "kien giang": "VKG",
  "vkg": "VKG",

  "côn đảo": "VCS",
  "con dao": "VCS",
  "vcs": "VCS",

  "điện biên": "DIN",
  "dien bien": "DIN",
  "din": "DIN",

  "quảng ninh": "VDO",
  "quang ninh": "VDO",
  "van don": "VDO",
  "vdo": "VDO",

  // ===== Mỹ (USA) =====
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
  "iad": "IAD",

  // ===== Canada =====
  "toronto": "YYZ",
  "yyz": "YYZ",
  "montreal": "YUL",
  "montréal": "YUL",
  "yul": "YUL",
  "vancouver": "YVR",
  "yvr": "YVR",

  // ===== Châu Âu =====
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

  // ===== Trung Đông =====
  "dubai": "DXB",
  "dxb": "DXB",
  "abu dhabi": "AUH",
  "auh": "AUH",
  "doha": "DOH",
  "doh": "DOH",

  // ===== Trung Quốc =====
  "bắc kinh": "PEK",
  "beijing": "PEK",
  "pek": "PEK",
  "thượng hải": "PVG",
  "shanghai": "PVG",
  "pvg": "PVG",
  "quảng châu": "CAN",
  "guangzhou": "CAN",
  "can": "CAN",
  "thâm quyến": "SZX",
  "shenzhen": "SZX",
  "szx": "SZX",

  // ===== Đài Loan =====
  "đài bắc": "TPE",
  "taipei": "TPE",
  "tpe": "TPE",
  "cao hùng": "KHH",
  "kaohsiung": "KHH",
  "khh": "KHH",

  // ===== Nhật Bản =====
  "tokyo": "NRT",
  "nrt": "NRT",
  "haneda": "HND",
  "tokyo haneda": "HND",
  "hnd": "HND",
  "osaka": "KIX",
  "kix": "KIX",
  "nagoya": "NGO",
  "ngo": "NGO",
  "fukuoka": "FUK",
  "fuk": "FUK",

  // ===== Hàn Quốc =====
  "seoul": "ICN",
  "icn": "ICN",
  "gimpo": "GMP",
  "seoul gimpo": "GMP",
  "gmp": "GMP",
  "busan": "PUS",
  "pus": "PUS",
  "jeju": "CJU",
  "cju": "CJU",

  // ===== Thái Lan =====
  "bangkok": "BKK",
  "bkk": "BKK",
  "don mueang": "DMK",
  "dmk": "DMK",
  "phuket": "HKT",
  "hkt": "HKT",
  "chiang mai": "CNX",
  "cnx": "CNX",

  // ===== Malaysia =====
  "kuala lumpur": "KUL",
  "kul": "KUL",
  "penang": "PEN",
  "pen": "PEN",

  // ===== Singapore =====
  "singapore": "SIN",
  "sin": "SIN",

  // ===== Hong Kong =====
  "hong kong": "HKG",
  "hk": "HKG",
  "hkg": "HKG",

  // ===== Indonesia =====
  "bali": "DPS",
  "dps": "DPS",

  // ===== Philippines =====
  "manila": "MNL",
  "mnl": "MNL",
  "cebu": "CEB",
  "ceb": "CEB",

  // ===== Ấn Độ =====
  "delhi": "DEL",
  "del": "DEL",
  "mumbai": "BOM",
  "bom": "BOM",

  // ===== Úc =====
  "sydney": "SYD",
  "syd": "SYD",
  "melbourne": "MEL",
  "mel": "MEL",
  "brisbane": "BNE",
  "bne": "BNE",
  "perth": "PER",
  "per": "PER",

  // ===== Châu Phi =====
  "cairo": "CAI",
  "cai": "CAI",
  "johannesburg": "JNB",
  "jnb": "JNB",
};



  const key = s.toLowerCase();
  for (const k in map) {
    if (key.includes(k)) return map[k];
  }
  return s.slice(0, 3).toUpperCase();
};
const parseDateRange = (range: string): { depart: Date; ret?: Date } | null => {
  // ✅ 1) dạng DD/MM/YYYY - DD/MM/YYYY (khứ hồi)
  const regexRange = /(\d{1,2})\/(\d{1,2})\/(\d{4})\s*-\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/;
  const mRange = range.match(regexRange);
  if (mRange) {
    return {
      depart: new Date(
        parseInt(mRange[3], 10),
        parseInt(mRange[2], 10) - 1,
        parseInt(mRange[1], 10)
      ),
      ret: new Date(
        parseInt(mRange[6], 10),
        parseInt(mRange[5], 10) - 1,
        parseInt(mRange[4], 10)
      ),
    };
  }

  // ✅ 2) dạng DD/MM/YYYY (một chiều)
  const regexOne = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
  const mOne = range.match(regexOne);
  if (mOne) {
    return {
      depart: new Date(
        parseInt(mOne[3], 10),
        parseInt(mOne[2], 10) - 1,
        parseInt(mOne[1], 10)
      ),
    };
  }

  // ✅ 3) fallback: dạng cũ "28 - 30 thg 9"
  const regexThg = /(\d{1,2})\s*-\s*(\d{1,2})\s*thg\s*(\d{1,2})/i;
  const mThg = range.match(regexThg);
  if (mThg) {
    const year = 2026;
    return {
      depart: new Date(year, parseInt(mThg[3], 10) - 1, parseInt(mThg[1], 10)),
      ret: new Date(year, parseInt(mThg[3], 10) - 1, parseInt(mThg[2], 10)),
    };
  }

  // ✅ 4) fallback: "28 thg 9"
  const regexThgOne = /(\d{1,2})\s*thg\s*(\d{1,2})/i;
  const mThgOne = range.match(regexThgOne);
  if (mThgOne) {
    return {
      depart: new Date(
        2026,
        parseInt(mThgOne[2], 10) - 1,
        parseInt(mThgOne[1], 10)
      ),
    };
  }

  return null;
};


// --- Props ---
interface FlightDealLinkProps {
  from: string;
  to: string;
  price: number;
  tripType: "khu-hoi" | "mot-chieu";
  dateRange?: string;
  children: React.ReactNode;
}

const FlightDealLink: React.FC<FlightDealLinkProps> = ({
  from,
  to,
//   price,
  tripType,
  dateRange,
  children,
}) => {
  const fromCode = getIata(from);
  const toCode = getIata(to);

  let depart: Date;
  let ret: Date | undefined;
  if (dateRange) {
    const parsed = parseDateRange(dateRange);
    if (parsed) {
      depart = parsed.depart;
      ret = parsed.ret;
    } else {
      const today = new Date();
      depart = addDaysLocal(today, 2);
      ret = addDaysLocal(today, 7);
    }
  } else {
    const today = new Date();
    depart = addDaysLocal(today, 2);
    ret = addDaysLocal(today, 7);
  }

  const departStr = formatDDMMYYYY(depart);
  const returnStr = ret ? formatDDMMYYYY(ret) : "";

  const dtcr =
    tripType === "khu-hoi" && ret
      ? `${fromCode}${toCode}${departStr}-${toCode}${fromCode}${returnStr}`
      : `${fromCode}${toCode}${departStr}`;

//   const dtcp = String(price);
  const dtcp ='100'

  const url = `/tim-kiem-chuyen-bay?dtcr=${dtcr}&dtcp=${dtcp}`;

  return (
    <a href={url} style={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};

export default FlightDealLink;
