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
    "Bắc Kinh": "PEK",
    "bắc kinh": "PEK",
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


    // Hàn Quốc
    "incheon": "ICN",
    "Incheon": "ICN",

    // Singapore (Sentosa & Marina Bay dùng chung)
    "sentosa": "SIN",
    "entosa": "SIN",
    "marina bay": "SIN",
    "Marina Bay": "SIN",
    "seletar": "XSP",
    "xsp": "XSP",

    // Trung Quốc
    "thuong hai": "PVG",  // Mặc định dùng sân bay quốc tế
    "thượng hải": "PVG",  // Mặc định dùng sân bay quốc tế
    "Thượng Hải": "PVG",  // Mặc định dùng sân bay quốc tế
    "sha": "SHA",         // Hongqiao

    "quang chau": "CAN",
    "Quảng Châu": "CAN",
    "quảng châu": "CAN",

    "tham quyen": "SZX",
    "thâm quyến":"SZX",
    "Thâm Quyến": "SZX",

    // Thái Lan
    "krabi": "KBV",
    "Krabi": "KBV",
    "kbv": "KBV",

    // Canada
    "calgary": "YYC",
    "Calgary": "YYC",
    "yyc": "YYC",

  };

  

  const key = s.toLowerCase();
  for (const k in map) {
    if (key.includes(k)) return map[k];
  }
  return s.slice(0, 3).toUpperCase();
};

const parseDateRange = (range: string): { depart: Date; ret?: Date } | null => {
  const regex = /(\d{1,2})\s*-\s*(\d{1,2})\s*thg\s*(\d{1,2})/i;
  const m = range.match(regex);
  if (m) {
    const year = 2026;
    return {
      depart: new Date(year, parseInt(m[3], 10) - 1, parseInt(m[1], 10)),
      ret: new Date(year, parseInt(m[3], 10) - 1, parseInt(m[2], 10)),
    };
  }

  const regexOne = /(\d{1,2})\s*thg\s*(\d{1,2})/i;
  const m2 = range.match(regexOne);
  if (m2) {
    return {
      depart: new Date(2026, parseInt(m2[2], 10) - 1, parseInt(m2[1], 10)),
    };
  }
  return null;
};

// --- Props ---
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
  from,
  to,
//   price,
  tripType,
  dateRange,
  children,
  airlines
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

  let url = "";

  if(airlines){
      url = `/tim-kiem-chuyen-bay?dtcr=${dtcr}&dtcp=${dtcp}&dtcs=${airlines}`;
  }
  else
  {
      url = `/tim-kiem-chuyen-bay?dtcr=${dtcr}&dtcp=${dtcp}`;
  }
 
  return (
    <a href={url} style={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};

export default FlightDealLink;
