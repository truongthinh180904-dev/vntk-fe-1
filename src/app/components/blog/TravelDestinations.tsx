import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface Destination {
  name: string;
  image: string;
  description: string;
}

const destinations: Destination[] = [
  {
    name: "Ha Noi",
    image:
      "https://images.pexels.com/photos/2977432/pexels-photo-2977432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  },
  {
    name: "Ho Chi Minh City",
    image:
      "https://images.pexels.com/photos/6128410/pexels-photo-6128410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Ho Chi Minh City is the most populous and vibrant city in Vietnam..."
  },
  {
    name: "Da Nang",
    image:
      "https://images.pexels.com/photos/15467068/pexels-photo-15467068/free-photo-of-dragon-head-over-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
     "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"  },
  {
    name: "Hoi An",
    image:
      "https://images.pexels.com/photos/14021769/pexels-photo-14021769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: 
      "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"  },
  {
    name: "Hue City",
    image:
      "https://images.pexels.com/photos/14021274/pexels-photo-14021274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: 
       "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  },
  {
    name: "Da Lat",
    image:
      "https://images.pexels.com/photos/6617613/pexels-photo-6617613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: 
     "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  },
  {
    name: "Ha Giang",
    image:
      "https://images.pexels.com/photos/1486578/pexels-photo-1486578.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: 
    "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  },
  {
    name: "Ha Long",
    image:
      "https://images.pexels.com/photos/6877795/pexels-photo-6877795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: 
     "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  },
  {
    name: "Can Tho",
    image:
      "https://images.pexels.com/photos/8281076/pexels-photo-8281076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Can Tho is a city in the Mekong Delta, famous for its floating markets..."
  },
  {
    name: "Ly Son",
    image:
      "https://images.pexels.com/photos/6559877/pexels-photo-6559877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  },
  {
    name: "Phu Quoc",
    image:
      "https://images.pexels.com/photos/9638368/pexels-photo-9638368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: 
    "Ha Noi is the capital and second-largest city of Vietnam, located on the western bank of the Red River. It is a political, cultural, educational and economic center of the country, with a rich history and heritage. Ha Noi has many historical and cultural attractions, such as the Hoang Thanh Thang Long (the Imperial Citadel), the Temple of Literature, the Ho Chi Minh Mausoleum and the Hanoi Opera House. Ha Noi is also known for its cuisine, handicrafts and festivals, which reflect the diversity and traditions of the city. Ha Noi is a charming and vibrant destination that offers a glimpse into the history and culture of Vietnam"
  }
];

const TravelDestinations: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
   <section
  className="container-fluid py-5"
  style={{ backgroundColor: "rgb(240, 248, 251)" }}
>
  {/* Thanh tab menu */}
  <div className="container mb-4">
     <h1 className="text-center mb-2 ContentLeft title-responsive fw-bold" style={{ color: "#2D4271"}}>Địa điểm du lịch hấp dẫn</h1>
    <div className="d-flex justify-content-center align-items-center" style={{whiteSpace: 'nowrap'}}>
       
      <ul
        className="nav nav-pills flex-nowrap overflow-auto"
        style={{ fontSize: "0.9rem" }} // chữ nhỏ lại
      >
        {destinations.map((dest, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link px-3 fw-bold py-1 ${
                index === activeIndex ? "active text-white" : ""
              }`}
              style={{ color:'#4b4a4aff' }}
              onClick={() => setActiveIndex(index)}
            >
              {dest.name}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="btn btn-outline-secondary ms-2"
        style={{ border: "none" }}
        onClick={() =>
          setActiveIndex((prev) =>
            prev < destinations.length - 1 ? prev + 1 : 0
          )
        }
      >
        <ChevronRight size={22} />
      </button>
    </div>
  </div>

  {/* Nội dung tab */}
  <div className="row g-4 align-items-center">
    <div className="col-md-7">
      <img
        src={destinations[activeIndex].image}
        alt={destinations[activeIndex].name}
        className="img-fluid rounded shadow"
        style={{maxHeight: "400px", objectFit: "cover", width: "100%"}}
        loading="lazy" 
      />
    </div>
    <div className="col-md-5 d-flex flex-column justify-content-center">
      <h2 className="fw-bold mb-3">{destinations[activeIndex].name}</h2>
     <p
        className="text-muted"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 5, // số dòng tối đa
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {destinations[activeIndex].description}
      </p>

    </div>
  </div>
</section>
  );
};

export default TravelDestinations;
