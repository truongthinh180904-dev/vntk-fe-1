"use client";

import { useEffect, useState } from "react";
import { Shield, Headphones, PenTool, BarChart3, PencilLine, TicketCheck } from "lucide-react";
import banner from  "../../assets/img/domestic/banner-hero-4.jpg";
import InfoBox from "./InfoBox";
import axios from "axios";

export default function ZaloBenefits() {
  const benefits = [
  {
    icon: <Shield size={32} />,
    title: "Cam kết an toàn & uy tín",
  },
  {
    icon: <Headphones size={32} />,
    title: "Hỗ trợ khách hàng 24/7",
  },
  {
    icon: <PenTool size={32} />,
    title: "Giá vé minh bạch & cạnh tranh",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Thủ tục nhanh chóng & tiện lợi",
  },
];


  // card đầu tiên active mặc định
  const [activeIndex, setActiveIndex] = useState(0);
  // const [pageContent, setPageContent] = useState<string>("");

    // const fetchDataBlog = async () => {
    //   try {
    //     const res = await axios.get(
    //       "https://api.anninhanthienlong.com/wp-json/wp/v2/posts?slug=ve-quoc-te"
    //     );
  
    //     if (res.data && res.data.length > 0) {
    //       const wpContent = res.data[0]?.content?.rendered;
    //       setPageContent(wpContent || fallbackContent);
    //     } else {
    //       setPageContent(fallbackContent);
    //     }
    //   } catch (error) {
    //     console.error("API error:", error);
    //     setPageContent(fallbackContent);
    //   }
    // };

    // useEffect(() => {
    //   fetchDataBlog();
    // }, []);
    
  return (
   <div className="container-fluid pt-2 pb-lg-2" style={{backgroundImage: `url(${banner.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"  }}
>
     <section className="container my-5">
      <h1 className="fw-bold text-white promo-header d-flex align-items-center mb-2">
        <TicketCheck style={{ marginRight: "10px" }} size={35} color="#fefeffff"  />
        VietNam Tickets - Đại lí vé máy bay uy tín
      </h1>
        <p className="text-white mb-2">
         Cam kết hỗ trợ khách hàng 24/7, tư vấn nhiệt tình và chuyên nghiệp
        </p>
        
       
      <div className="row g-4 d-none">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="col-12 col-md-6 col-lg-3"
            onMouseEnter={() => setActiveIndex(idx)}
          >
            <div className={`benefit-card ${activeIndex === idx ? "active" : ""}`}>
              <div className="icon-wrapper">{item.icon}</div>
              <p className="fw-semibold text-center">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      
    </section>
   </div>
  );
}
