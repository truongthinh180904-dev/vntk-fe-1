"use client";
import React, { useState } from "react";
import FlightInfoPropsDetailCity from "../components/blog/detailplane/FlightInfoPropsDetailCity";
import FlightDealsOne from "../components/blog/detailplane/vequocte/FlightDealsWayOne"; 
import FlightDealsTwo from "../components/blog/detailplane/vequocte/FlightDealsWayTwo";
import FlightDealsSimilar from "../components/blog/detailplane/vequocte/FlightDealsWayTwoSimilar"; 
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demodanangImg from '../assets/img/home/vemaybaynoidia/danang.webp';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';

// Việt Nam
// import imghanoi from "../assets/img/country_img/ve-may-bay-di-HaNoi.jpg";
// import imgtphcm from "../assets/img/country_img/ve-may-bay-di-HoChiMinh.jpg";
// import imgdanang from "../assets/img/country_img/ve-may-bay-di-DaNang.jpg";
import imghue from "../assets/img/country_img/ve-may-bay-di-hue.jpg";
import imghaiphong from "../assets/img/country_img/ve-may-bay-hai-phong.jpg";
import imgphuquoc from "../assets/img/country_img/ve-may-bay-phu-quoc.jpg";
import imgnhatrang from "../assets/img/country_img/ve-may-bay-nha-trang.webp";
import imgquynhon from "../assets/img/country_img/ve-may-bay-quy-nhon.webp";
import imgtuyhoa from "../assets/img/country_img/ve-may-bay-tuy-hoa.png";
import imgthanhhoa from "../assets/img/country_img/ve-may-bay-thanh-hoa.jpg";
import imgcantho from "../assets/img/country_img/ve-may-bay-di-can-tho.jpg";
import imgvinh from "../assets/img/country_img/ve-may-bay-di-vinh.jpg";
import imgdonghoi from "../assets/img/country_img/ve-may-bay-di-dong-hoi.jpg";
import imgchulai from "../assets/img/country_img/ve-may-bay-di-chu-lai.jpg";
import imgpleiku from "../assets/img/country_img/ve-may-bay-di-pleiku.jpg";
import imgbuonmathuot from "../assets/img/country_img/ve-may-bay-di-buon-ma-thuoc.jpg";
import imgdalat from "../assets/img/country_img/ve-may-bay-di-da-lat.jpg";
import imgcamau from "../assets/img/country_img/ve-may-bay-di-ca-mau.jpg";
import imgrachgia from "../assets/img/country_img/ve-may-bay-di-rach-gia.webp";
import imgcondao from "../assets/img/country_img/ve-may-bay-di-con-dao.jpg";
import imgdienbien from "../assets/img/country_img/ve-may-bay-di-dien-bien.jpg";
import imgquangninh from "../assets/img/country_img/ve-may-bay-di-quang-ninh.jpg";

// Mỹ
import imgnewyork from "../assets/img/country_img/ve-may-bay-di-new-york.jpg";
import imglosangeles from "../assets/img/country_img/ve-may-bay-di-los-angeles.jpg";
import imgsanfrancisco from "../assets/img/country_img/ve-may-bay-di-san-francisco.jpg";
import imgchicago from "../assets/img/country_img/ve-may-bay-di-chi-ca-go.jpg";
import imgmiami from "../assets/img/country_img/ve-may-bay-dmami-a-mi.jpg";
import imgseattle from "../assets/img/country_img/ve-may-bay-di-seattle.jpg";
import imgdallas from "../assets/img/country_img/ve-may-bay-di-Dallas.jpg";
import imghouston from "../assets/img/country_img/ve-may-bay-di-houston.jpg";
import imgatlanta from "../assets/img/country_img/ve-may-bay-di-Atlanta.webp";
import imgboston from "../assets/img/country_img/ve-may-bay-di-boston.webp";
import imgwashington from "../assets/img/country_img/ve-may-bay-di-Washington.webp";

// Canada
import imgtoronto from "../assets/img/country_img/ve-may-bay-di-Toronto.webp";
import imgmontreal from "../assets/img/country_img/ve-may-bay-montreal.jpg";
import imgvancouver from "../assets/img/country_img/ve-may-bay-di-vancouver.jpg";

// Châu Âu
import imglondon from "../assets/img/country_img/ve-may-bay-di-london.jpg";
import imgparis from "../assets/img/country_img/ve-may-bay-di-paris.jpg";
import imgfrankfurt from "../assets/img/country_img/ve-may-bay-di-Frankfurt.jpg";
import imgamsterdam from "../assets/img/country_img/ve-may-bay-di-Amsterdam.webp";
import imgmoscow from "../assets/img/country_img/ve-may-bay-di-Moscow.jpg";
import imgzurich from "../assets/img/country_img/ve-may-bay-di-Zurich.webp";
import imgbarcelona from "../assets/img/country_img/ve-may-bay-di-Barcelona.webp";
import imgmadrid from "../assets/img/country_img/ve-may-bay-di-Madrid.jpg";
import imgrome from "../assets/img/country_img/ve-may-bay-di-Rome.webp";
import imgistanbul from "../assets/img/country_img/ve-may-bay-di-Istanbul.jpg";

// Trung Đông
import imgdubai from "../assets/img/country_img/ve-may-bay-Dubai.png";
import imgabudhabi from "../assets/img/country_img/ve-may-bay-di-Abu Dhabi.jpg";
import imgdoha from "../assets/img/country_img/ve-may-bay-di-Doha.jpg";

// Trung Quốc
import imgbeijing from "../assets/img/country_img/ve-may-bay-di-Bac kinh.jpg";
import imgshanghai from "../assets/img/country_img/ve-may-bay-di-thuong-hai.jpg";
import imgguangzhou from "../assets/img/country_img/ve-may-bay-di-quang-chau.jpg";
import imgshenzhen from "../assets/img/country_img/ve-may-bay-di-tham-quyen.jpg";

// Đài Loan
import imgtaipei from "../assets/img/country_img/ve-may-bay-di-dai-loan.jpg";
import imgkaohsiung from "../assets/img/country_img/ve-may-bay-di-cao-hung.jpg";

// Nhật Bản
import imgtokyo from "../assets/img/country_img/ve-may-bay-di-Tokyo.jpg";
import imghaneda from "../assets/img/country_img/ve-may-bay-di-Haneda.jpg";
import imgosaka from "../assets/img/country_img/ve-may-bay-di-osaka.jpg";
import imgnagoya from "../assets/img/country_img/ve-may-bay-di-nagoya.jpg";
import imgfukuoka from "../assets/img/country_img/ve-may-bay-di-fukuoka.jpg";

// Hàn Quốc
import imgseoul from "../assets/img/country_img/ve-may-bay-di-seoul.webp";
import imggimpo from "../assets/img/country_img/ve-may-bay-di-gimpo.jpg";
import imgbusan from "../assets/img/country_img/ve-may-bay-di-bu-san.jpg";
import imgjeju from "../assets/img/country_img/ve-may-bay-di-Jeju.jpg";

// Thái Lan
import imgbangkok from "../assets/img/country_img/ve-may-bay-di-bangkok.webp";
import imgdonmueang from "../assets/img/country_img/ve-may-bay-di-don-mueangi.jpg";
import imgphuket from "../assets/img/country_img/ve-may-bay-di-phuket.jpg";
import imgchiangmai from "../assets/img/country_img/ve-may-bay-di-chang-mai.webp";

// Malaysia
import imgkl from "../assets/img/country_img/ve-may-bay-di-kuala_lumpur.jpg";
import imgpenang from "../assets/img/country_img/ve-may-bay-di-penang.jpg";

// Singapore
import imgsingapore from "../assets/img/country_img/ve-may-bay-di-singapore.jpg";

// Hong Kong
import imghongkong from "../assets/img/country_img/ve-may-bay-di-HongKong.jpg";

// Indonesia
import imgbali from "../assets/img/country_img/ve-may-bay-di-bali.jpg";

// Philippines
import imgmanila from "../assets/img/country_img/ve-may-bay-Manila.png";
import imgcebu from "../assets/img/country_img/ve-may-bay-di-cebu.jpg";

// Ấn Độ
import imgdelhi from "../assets/img/country_img/ve-may-bay-di-delhi.jpg";
import imgmumbai from "../assets/img/country_img/ve-may-bay-di-mumbai.webp";

// Úc
import imgsydney from "../assets/img/country_img/ve-may-bay-di-sysney.jpg";
import imgmelbourne from "../assets/img/country_img/ve-may-bay-di-melbourne.webp";
import imgbrisbane from "../assets/img/country_img/ve-may-bay-di-Brisbane.jpg";
import imgperth from "../assets/img/country_img/ve-may-bay-Perth.webp";

// Châu Phi
import imgcairo from "../assets/img/country_img/ve-may-bay-di-cairo.jpg";
import imgjohannesburg from "../assets/img/country_img/ve-may-bay-di-Johannesburg.jpg";
import { CreditCard, Headphones, House, Plane } from "lucide-react";
import TravelInspiration from "../ve-quoc-te/TravelInspiration";
import TravelSuggestion from "../ve-quoc-te/TravelSuggestion";
import PopularDestinations from "../ve-quoc-te/PopularDestinations";

// import FAQ from "../components/question/FAQ";
interface FlightInfo {
  from: string;
  to: string;
  dateStr:string;
  date: string;
  rawDate: { day: string; month: string; year: string };
}

interface DetailPlaneProps {
  wayOne: FlightInfo | null;
  wayTwo?: FlightInfo | null;
}
const DetailPlane: React.FC<DetailPlaneProps> = ({ wayOne, wayTwo }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);


const airports: Record<
  string,
  { name: string; image: string | null }
> = {
  // ===== Việt Nam =====
 HAN: { name: "Hà Nội", image: demohanoiImg.src },
    SGN: { name: "Tp. Hồ Chí Minh", image: demotphcmImg.src },
    DAD: { name: "Đà Nẵng", image: demodanangImg.src },
    HPH: { name: "Hải Phòng", image: imghaiphong.src },
    HUI: { name: "Huế", image: imghue.src },
    PQC: { name: "Phú Quốc", image: imgphuquoc.src },
    CXR: { name: "Nha Trang", image: imgnhatrang.src },
    UIH: { name: "Quy Nhơn", image: imgquynhon.src },
    TBB: { name: "Tuy Hòa", image: imgtuyhoa.src },
    THD: { name: "Thanh Hóa", image: imgthanhhoa.src },
    VCA: { name: "Cần Thơ", image: imgcantho.src },
    VII: { name: "Vinh", image: imgvinh.src },
    VDH: { name: "Đồng Hới", image: imgdonghoi.src },
    VCL: { name: "Chu Lai", image: imgchulai.src },
    PXU: { name: "Pleiku", image: imgpleiku.src },
    BMV: { name: "Buôn Ma Thuột", image: imgbuonmathuot.src },
    DLI: { name: "Đà Lạt", image: imgdalat.src },
    CAH: { name: "Cà Mau", image: imgcamau.src },
    VKG: { name: "Rạch Giá", image: imgrachgia.src },
    VCS: { name: "Côn Đảo", image: imgcondao.src },
    DIN: { name: "Điện Biên", image: imgdienbien.src },
    VDO: { name: "Quảng Ninh", image: imgquangninh.src },

    // ===== Mỹ (USA) =====
    JFK: { name: "New York", image: imgnewyork.src },
    LAX: { name: "Los Angeles", image: imglosangeles.src },
    SFO: { name: "San Francisco", image: imgsanfrancisco.src },
    ORD: { name: "Chicago", image: imgchicago.src },
    MIA: { name: "Miami", image: imgmiami.src },
    SEA: { name: "Seattle", image: imgseattle.src },
    DFW: { name: "Dallas/Fort Worth", image: imgdallas.src },
    IAH: { name: "Houston", image: imghouston.src },
    ATL: { name: "Atlanta", image: imgatlanta.src },
    BOS: { name: "Boston", image: imgboston.src },
    IAD: { name: "Washington DC", image: imgwashington.src },

    // ===== Canada =====
    YYZ: { name: "Toronto", image: imgtoronto.src },
    YUL: { name: "Montreal", image: imgmontreal.src },
    YVR: { name: "Vancouver", image: imgvancouver.src },

    // ===== Châu Âu =====
    LHR: { name: "London", image: imglondon.src },
    CDG: { name: "Paris", image: imgparis.src },
    FRA: { name: "Frankfurt", image: imgfrankfurt.src },
    AMS: { name: "Amsterdam", image: imgamsterdam.src },
    SVO: { name: "Moscow", image: imgmoscow.src },
    ZRH: { name: "Zurich", image: imgzurich.src },
    BCN: { name: "Barcelona", image: imgbarcelona.src },
    MAD: { name: "Madrid", image: imgmadrid.src },
    FCO: { name: "Rome", image: imgrome.src },
    IST: { name: "Istanbul", image: imgistanbul.src },

// ===== Trung Đông =====
DXB: { name: "Dubai", image: imgdubai.src },
AUH: { name: "Abu Dhabi", image: imgabudhabi.src },
DOH: { name: "Doha", image: imgdoha.src },

// ===== Trung Quốc =====
PEK: { name: "Bắc Kinh", image: imgbeijing.src },
PVG: { name: "Thượng Hải", image: imgshanghai.src },
CAN: { name: "Quảng Châu", image: imgguangzhou.src },
SZX: { name: "Thâm Quyến", image: imgshenzhen.src },

// ===== Đài Loan =====
TPE: { name: "Đài Bắc", image: imgtaipei.src },
KHH: { name: "Cao Hùng", image: imgkaohsiung.src },

// ===== Nhật Bản =====
NRT: { name: "Tokyo", image: imgtokyo.src },
HND: { name: "Tokyo Haneda", image: imghaneda.src },
KIX: { name: "Osaka", image: imgosaka.src },
NGO: { name: "Nagoya", image: imgnagoya.src },
FUK: { name: "Fukuoka", image: imgfukuoka.src },

// ===== Hàn Quốc =====
ICN: { name: "Seoul", image: imgseoul.src },
GMP: { name: "Seoul Gimpo", image: imggimpo.src },
PUS: { name: "Busan", image: imgbusan.src },
CJU: { name: "Jeju", image: imgjeju.src },

// ===== Thái Lan =====
BKK: { name: "Bangkok", image: imgbangkok.src },
DMK: { name: "Bangkok Don Mueang", image: imgdonmueang.src },
HKT: { name: "Phuket", image: imgphuket.src },
CNX: { name: "Chiang Mai", image: imgchiangmai.src },

// ===== Malaysia =====
KUL: { name: "Kuala Lumpur", image: imgkl.src },
PEN: { name: "Penang", image: imgpenang.src },

// ===== Singapore =====
SIN: { name: "Singapore", image: imgsingapore.src },

// ===== Hong Kong =====
HKG: { name: "Hong Kong", image: imghongkong.src },

// ===== Indonesia =====
DPS: { name: "Bali", image: imgbali.src },

// ===== Philippines =====
MNL: { name: "Manila", image: imgmanila.src },
CEB: { name: "Cebu", image: imgcebu.src },

// ===== Ấn Độ =====
DEL: { name: "Delhi", image: imgdelhi.src },
BOM: { name: "Mumbai", image: imgmumbai.src },

// ===== Úc =====
SYD: { name: "Sydney", image: imgsydney.src },
MEL: { name: "Melbourne", image: imgmelbourne.src },
BNE: { name: "Brisbane", image: imgbrisbane.src },
PER: { name: "Perth", image: imgperth.src },

// ===== Châu Phi =====
CAI: { name: "Cairo", image: imgcairo.src },
JNB: { name: "Johannesburg", image: imgjohannesburg.src },

};

// Tạo mảng 5 mảng con, mỗi mảng 6 sân bay quốc tế nổi bật
const airportGroups = [
    // Nhóm 1: Các điểm đến châu Á phổ biến
    [
        airports.HAN,
        airports.SGN,
        airports.BKK,  // Bangkok, Thái Lan
        airports.SIN,  // Singapore
        airports.KUL,  // Kuala Lumpur, Malaysia
        airports.ICN   // Seoul, Hàn Quốc
    ],
    // Nhóm 2: Các điểm đến Đông Bắc Á
    [
        airports.HAN,
        airports.SGN,
        airports.NRT,  // Tokyo, Nhật Bản
        airports.PEK,  // Bắc Kinh, Trung Quốc
        airports.TPE,  // Đài Bắc, Đài Loan
        airports.HKG   // Hong Kong
    ],
    // Nhóm 3: Các điểm đến châu Âu và Mỹ
    [
        airports.HAN,
        airports.SGN,
        airports.LHR,  // London, Anh
        airports.CDG,  // Paris, Pháp
        airports.JFK,  // New York, Mỹ
        airports.LAX   // Los Angeles, Mỹ
    ],
    // Nhóm 4: Các điểm đến châu Úc và Trung Đông
    [
        airports.HAN,
        airports.SGN,
        airports.SYD,  // Sydney, Úc
        airports.DXB,  // Dubai, UAE
        airports.DOH,  // Doha, Qatar
        airports.AMS   // Amsterdam, Hà Lan
    ],
    // Nhóm 5: Các điểm đến châu Á khác
    [
        airports.HAN,
        airports.SGN,
        airports.DPS,  // Bali, Indonesia
        airports.MNL,  // Manila, Philippines
        airports.DEL,  // Delhi, Ấn Độ
        airports.FRA   // Frankfurt, Đức
    ]
];
const usaAirports = [
  "JFK", "LAX", "SFO", "ORD", "MIA",
  "SEA", "DFW", "IAH", "ATL", "BOS", "IAD"
];
// Hàm lấy thông tin địa điểm
const getPlaceInfo = (code: string | undefined) => {
  if (!code) return null;
  return airports[code.toUpperCase()] || { name: code, image: null };
};

// Gom dữ liệu chuyến bay
const routes: any[] = [];

if (wayOne) {
  routes.push({
    ...wayOne,
    fromInfo: getPlaceInfo(wayOne.from),
    toInfo: getPlaceInfo(wayOne.to),
  });
}

if (wayTwo) {
  routes.push({
    ...wayTwo,
    fromInfo: getPlaceInfo(wayTwo.from),
    toInfo: getPlaceInfo(wayTwo.to),
  });
}

// Hàm format ngày (dd/MM/yyyy)
const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, "0")}/${
    (date.getMonth() + 1).toString().padStart(2, "0")
  }/${date.getFullYear()}`;
};

// Parse string dd/MM/yyyy => Date
function parseDDMMYYYY(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

let flights: any[] = [];
let flights1: any[] = [];

if (wayOne) {
  const today = new Date();
  const oneWeek = new Date();
  oneWeek.setDate(today.getDate() + 7);

  const twoWeeks = new Date();
  twoWeeks.setDate(today.getDate() + 14);

  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  // ✅ Ngày user chọn (nếu có trong wayOne.date)
  let userDate: Date | null = null;
  if (wayOne.date) {
    userDate = parseDDMMYYYY(wayOne.date);
  }

  // Gom danh sách ngày (đi)
  const dates = [today, oneWeek, twoWeeks, nextMonth];
  if (userDate) {
    const isDuplicate = dates.some(
      (d) => formatDate(d) === formatDate(userDate as Date)
    );
    if (!isDuplicate) {
      dates.unshift(userDate);
    }
  }

  flights = dates.map((d, idx) => ({
    id: idx + 1,
    from: getPlaceInfo(wayOne.from)?.name || wayOne.from,
    to: getPlaceInfo(wayOne.to)?.name || wayOne.to,
    date: formatDate(d),
    price: 100,
    originalPrice: 100,
    description: `Giá tốt nhất ngày ${formatDate(d)}`,
    img: getPlaceInfo(wayOne.to)?.image || null,
  }));
}
// ✅ Sinh danh sách chuyến khứ hồi
if (wayOne) {
  let returnDate: Date | null = null;

  if (wayTwo && wayTwo.date) {
    // Nếu có ngày của wayTwo thì dùng
    returnDate = parseDDMMYYYY(wayTwo.date);
  } else if (wayOne.date) {
    // Nếu không có wayTwo thì fallback sang ngày của wayOne
    returnDate = parseDDMMYYYY(wayOne.date);
  }

  if (returnDate) {
    // Sinh thêm các mốc ngày
    const oneWeek = new Date(returnDate);
    oneWeek.setDate(returnDate.getDate() + 7);

    const twoWeeks = new Date(returnDate);
    twoWeeks.setDate(returnDate.getDate() + 14);

    const threeWeeks = new Date(returnDate);
    threeWeeks.setDate(returnDate.getDate() + 21);

    const nextMonth = new Date(returnDate);
    nextMonth.setMonth(returnDate.getMonth() + 1);

    const returnDates = [returnDate, oneWeek, twoWeeks, threeWeeks, nextMonth];

    flights1 = returnDates.map((d, idx) => ({
      id: idx + 1,
      from: getPlaceInfo(wayOne.to)?.name || wayOne.to, // đảo ngược
      to: getPlaceInfo(wayOne.from)?.name || wayOne.from,
      date: formatDate(d),
      price: 120,
      originalPrice: 120,
      description: `Giá tốt nhất ngày ${formatDate(d)}`,
      img: getPlaceInfo(wayOne.from)?.image || null,
    }));
  }
}

  const images = [
    "https://cdn3657.cdn4s7.io.vn/media/huong/ve-may-bay-du-hoc-canada/ve-may-bay-du-hoc-canada.jpg",
    "https://cdn3657.cdn4s7.io.vn/media/huong/ve-may-bay-di-canada-bao-nhieu-tien/ve-may-bay-di-canada-bao-nhieu-tien.jpg",
    "https://cdn3657.cdn4s7.io.vn/media/kieu-trang/viet-nam-bay-qua-my-qua-canh-o-dau/viet-nam-bay-qua-my-qua-canh-o-dau.jpg",
    "https://cdn3657.cdn4s7.io.vn/media/huong/thoi-gian-nghi-dong-o-canada/thoi-gian-nghi-dong-canada.jpg"
  ];

  // interface FlightDeal {
  //   airline: string;
  //   airlineLogo: string;
  //   from: string;
  //   to: string;
  //   dateRange: string;
  //   price: number;
  //   tripType: "khu-hoi" | "mot-chieu"; // ✅ thêm field này
  // }
  const flightData = {
    title: "Chuyến bay từ Hà Nội đến TP. Hồ Chí Minh",
    description:
      "Chuyến bay từ Hà Nội đến TP. Hồ Chí Minh là một trong những tuyến bay nội địa nhộn nhịp nhất tại Việt Nam. Với tần suất dày đặc từ nhiều hãng hàng không như Vietnam Airlines, Vietjet Air, Bamboo Airways, hành khách có thể dễ dàng lựa chọn khung giờ phù hợp. Đây là tuyến bay kết nối hai trung tâm kinh tế - văn hóa lớn, phục vụ cho nhu cầu công tác, học tập, du lịch và thăm thân.",
    flightTime: "2 giờ 10 phút",
    fromAirport: { name: "Sân bay Nội Bài", code: "HAN" },
    toAirport: { name: "Sân bay Tân Sơn Nhất", code: "SGN" },
    faqs: [
      "Tôi có thể mang bao nhiêu kg hành lý xách tay?",
      "Có được đổi vé sau khi đặt không?",
      "Có suất ăn trên chuyến bay không?",
      "Khi nào tôi cần đến sân bay để làm thủ tục?",
    ],
    imageUrl:
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };



// ✅ Descriptions random cho đẹp SEO
const descriptions = [
  "Giá tốt nhất",
];

// ✅ Hàm random
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ✅ Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

let flights2: any[] = [];

if (wayOne) {
  // Chọn 1 nhóm random trong 5 nhóm
  const randomGroup = getRandomItem(airportGroups);

  // Lấy code điểm đến
  const toCode = wayOne.to;
  const fromCode = wayOne.to;

  // Nhóm sử dụng, ưu tiên giữ lại city "to"
  let groupToUse = randomGroup;
  if (randomGroup.some((city) => city === airports[toCode])) {
    groupToUse = [
      airports[toCode],
      ...randomGroup.filter((c) => c !== airports[toCode]),
    ];
  }

  // ✅ Lọc bỏ city trùng với from/to
  const filteredCities = groupToUse.filter(
    (c) =>
      c?.name !== getPlaceInfo(toCode)?.name
  );

  // ✅ Shuffle, loại bỏ duplicate bằng Set, chọn 5 item
  const selectedCities = Array.from(
    new Set(shuffleArray(filteredCities))
  ).slice(0, 5);

  // ✅ Sinh flights3
  flights2 = selectedCities.map((city, idx) => ({
    id: idx + 1,
    from: getPlaceInfo(fromCode)?.name || fromCode,
    to: city?.name,
    date: formatDate(new Date(Date.now() + idx * 86400000)), // ngày tăng dần
    price: 90 + idx * 10,
    originalPrice: 120 + idx * 10,
    description: getRandomItem(descriptions),
    img: city?.image,
  }));
}

  return (
    <div className="container-fluid mt-5">
      <div className="container my-4">
       <div className="mt-3 position-relative">
             {wayOne && flights && (
               <>
                 <ol
                   className="breadcrumb d-flex align-items-center mb-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "nowrap", // 🔥 Không cho xuống hàng
                    overflowX: "auto", // 🔥 Cho phép cuộn ngang
                    whiteSpace: "nowrap",
                    gap: "8px", // 🔥 Thêm khoảng cách giữa các item

                    color: "#4b86cf",
                    padding: "10px 15px",
                    background: "rgb(93 139 243)",
                    borderRadius: "10px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                    fontSize: "0.95rem",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none", // ẩn scrollbar Firefox
                    WebkitOverflowScrolling: "touch", // cuộn mượt iOS
                  }}
                 >
                   {/* Trang chủ */}
                   <li
                     className="breadcrumb-item d-flex align-items-center"
                     style={{
                       display: "flex",
                       alignItems: "center",
                       gap: "6px",
                     }}
                   >
                     <House
                       size={18}
                       style={{
                         color: "rgba(255, 255, 255, 0.9)",
                         marginBottom: "2px",
                       }}
                     />
                     <a
                       href="/"
                       className="breadcrumb-link"
                       style={{
                         color: "rgba(255, 255, 255, 0.9)",
                         textDecoration: "none",
                         fontWeight: 500,
                         transition: "color 0.2s ease",
                       }}
                       onMouseEnter={(e) =>
                         (e.currentTarget.style.color = "rgba(255,255,255,1)")
                       }
                       onMouseLeave={(e) =>
                         (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                       }
                     >
                       Trang chủ
                     </a>
                   </li>
     
                   {/* Vé nội địa */}
                   <li
                     className="breadcrumb-item"
                     style={{
                       marginLeft: "10px",
                     }}
                   >
                     <a
                       href="/ve-noi-dia"
                       className="breadcrumb-link"
                       style={{
                         color: "rgba(255, 255, 255, 0.85)",
                         textDecoration: "none",
                         fontWeight: 500,
                         transition: "color 0.2s ease",
                       }}
                       onMouseEnter={(e) =>
                         (e.currentTarget.style.color = "rgba(255,255,255,1)")
                       }
                       onMouseLeave={(e) =>
                         (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
                       }
                     >
                       Vé quốc tế
                     </a>
                   </li>
     
                   {/* Vé cụ thể */}
                   <li
                     className="breadcrumb-item active"
                     style={{
                       color: "rgba(255, 255, 255, 1)",
                       fontWeight: 600,
                       marginLeft: "10px",
                     }}
                     aria-current="page"
                   >
                     Vé máy bay {flights[0].from} đi {flights[0].to}
                   </li>
                 </ol>
               </>
             )}
           </div>

        {/* Modal (Bootstrap) */}
        <div
          className="modal fade"
          id="photoModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Photos of Jakarta</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center">
                <img  loading="lazy" 
                  src={images[activeIndex]}
                  alt="Main"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "420px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <img  loading="lazy" 
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      className={`rounded ${
                        i === activeIndex ? "border border-primary" : ""
                      }`}
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        cursor: "pointer"
                      }}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  {activeIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
      {/* <FAQ items={faqItems} /> */}
      {/* <CheapFlights deals={sampleDeals} /> */}
      <FlightDealsOne flights={flights}  />  
      <FlightDealsTwo flights={flights1} />  
      <FlightDealsSimilar flights={flights2} /> 
      
       <div className="mt-3 container position-relative" >
        {wayOne && flights && (
          <>
          <h2 className="fw-bold mt-5 text-heading"> Vé máy bay {flights[0].from} đi {flights[0].to} </h2> {/* Breadcrumb */} <nav aria-label="breadcrumb"> 
            </nav>        {/* Mô tả tuyến bay */}
          <div
            className="mt-3 description-wrapper"
            style={{
              maxHeight: expanded ? "none" : "120px",
              overflow: "hidden",
              position: "relative",
              transition: "max-height 0.3s ease",
              lineHeight: "1.8"
            }}
        >
          <p className="description">
        Đặt vé máy bay từ <strong>{flights[0].from}</strong> đi <strong>{flights[0].to}</strong> 
        {" "}cùng  <strong>VietNam Tickets </strong> để trải nghiệm dịch vụ bay chất lượng, nhanh chóng và thuận tiện.
        Đây là một trong những tuyến bay nội địa quan trọng, kết nối hai trung tâm du lịch – kinh tế lớn của Việt Nam.  
        Hành khách lựa chọn chặng bay này không chỉ bởi nhu cầu công tác, mà còn để tận hưởng kỳ nghỉ, thăm người thân 
        hay tham gia các sự kiện đặc biệt.  
        <br /><br />
        Khi đặt vé, bạn sẽ có nhiều sự lựa chọn về hãng hàng không, khung giờ bay, hạng vé và mức giá phù hợp với nhu cầu. 
        Ngoài ra, VietNam Tickets thường xuyên cập nhật các chương trình khuyến mãi hấp dẫn, 
        giúp bạn tiết kiệm chi phí nhưng vẫn đảm bảo chất lượng dịch vụ hàng đầu.
      </p>
        {!expanded && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "25px",
              background:
                "linear-gradient(to top, white 60%, rgba(255,255,255,0))"
            }}
          />
        )}
      </div>
        {/* Nút toggle */}
      <button
        className="btn btn-link toggle-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Thu gọn" : "Xem thêm"}
      </button>

      {/* Các chính sách & ưu điểm */}
       <div
       className="row mt-4 mb-5"
       style={{
         padding: "20px",
         borderRadius: "10px",
       }}
     >
       {/* Cột 1 */}
       <div className="col-md-4 mb-3 mb-md-0">
         <div
           className="feature-card h-100"
           style={{
             backgroundColor: "#fff",
             borderRadius: "10px",
             padding: "20px",
             boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
             transition: "0.3s",
             display: "flex",
             flexDirection: "column",
             alignItems: "flex-start",
             textAlign: "left",
           }}
           onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
           onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
         >
           <div
             style={{
               display: "flex",
               alignItems: "center",
               gap: "10px",
               marginBottom: "8px",
             }}
           >
             <Plane className="feature-icon" size={28} color="#007bff" />
             <h6 className="fw-bold mb-0" style={{ fontSize: "15px" }}>
               Linh hoạt thay đổi
             </h6>
           </div>
           <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
             Bạn có thể dễ dàng hủy hoặc đổi chuyến khi kế hoạch thay đổi.
           </p>
         </div>
       </div>
     
       {/* Cột 2 */}
       <div className="col-md-4 mb-3 mb-md-0">
         <div
           className="feature-card h-100"
           style={{
             backgroundColor: "#fff",
             borderRadius: "10px",
             padding: "20px",
             boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
             transition: "0.3s",
             display: "flex",
             flexDirection: "column",
             alignItems: "flex-start",
             textAlign: "left",
           }}
           onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
           onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
         >
           <div
             style={{
               display: "flex",
               alignItems: "center",
               gap: "10px",
               marginBottom: "8px",
             }}
           >
             <CreditCard className="feature-icon" size={28} color="#007bff" />
             <h6 className="fw-bold mb-0" style={{ fontSize: "15px" }}>
               Thanh toán đa dạng
             </h6>
           </div>
           <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
             Hỗ trợ nhiều phương thức thanh toán tiện lợi và an toàn.
           </p>
         </div>
       </div>
     
       {/* Cột 3 */}
       <div className="col-md-4">
         <div
           className="feature-card h-100"
           style={{
             backgroundColor: "#fff",
             borderRadius: "10px",
             padding: "20px",
             boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
             transition: "0.3s",
             display: "flex",
             flexDirection: "column",
             alignItems: "flex-start",
             textAlign: "left",
           }}
           onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
           onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
         >
           <div
             style={{
               display: "flex",
               alignItems: "center",
               gap: "10px",
               marginBottom: "8px",
             }}
           >
             <Headphones className="feature-icon" size={28} color="#007bff" />
             <h6 className="fw-bold mb-0" style={{ fontSize: "15px" }}>
               Hỗ trợ 24/7
             </h6>
           </div>
           <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
             Đội ngũ VietNam Ticketsluôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.
           </p>
         </div>
       </div>
     </div>
     
    </> 
  )}

  
      </div>
        <TravelSuggestion />
        <PopularDestinations />
  
       </div>
  );
};

export default DetailPlane;
