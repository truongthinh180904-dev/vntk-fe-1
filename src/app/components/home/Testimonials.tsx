"use client";

import Image from "next/image";
import { Container, Row, Col, Card } from "react-bootstrap";
import evaluate from "../../assets/img/home/danh-gia.png";
import customers from "../../assets/img/home/customers.png";
import customers_01 from "../../assets/img/home/xuan-trang.webp";
import customers_02 from "../../assets/img/home/richard-do.webp";

export default function Testimonials() {

  const data = [
  {
    id: 1,
    name: "An Nguyễn",
    email: "Antech@gmail.com",
    text: "Vietnam Tickets giúp tôi đặt vé máy bay nhanh chóng, giá cả hợp lý , dịch vụ chuyên nghiệp.",
    img: customers.src,
  },
  {
    id: 2,
    name: "Xuân Trang",
    email: "Trangcmotahei@tahen.com",
    text: "Tôi rất ấn tượng với các ưu đãi và mã giảm giá khi đặt vé lần đầu trên VietNam Tickets.",
    img: customers_01.src,
  },
  {
    id: 3,
    name: "Richard Do",
    email: "Richarddmair@gmail.com",
    text: "Trang web dễ sử dụng, thông tin chuyến bay đầy đủ và minh bạch. Tôi sẽ tiếp tục ủng hộ.",
    img: customers_02.src,
  }
];


  return (
    <section className="testimonials py-4">
      <Container>
       
        <Row>
          <div className="col-md-3 mt-5 mb-2">
             <h1 className="fw-bold promo-header d-flex align-items-center mb-0">
            {/* <PencilLine style={{ marginRight: "10px" }} size={35} color="#2d4f85" className="mb-1" /> */}
            Khách Hàng Nói Gì Về Chúng Tôi
        </h1>
        <p className="text-muted mt-2">
          Những lời khen và chia sẻ thành thật của Quý khách hàng
        </p>
          </div>
          {data.map((item) => (
            <Col md={3} sm={12} key={item.id} className="mb-4">
              <Card className="h-100 border-0 testimonial-card shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-between" style={{backgroundColor: "#f9f9f9"     }}>
                  
                  {/* Text + sao với background chung */}
                  <div
                    className="testimonial-content position-relative p-4 mb-4"
                    style={{ backgroundImage: `url(${evaluate.src})` }}
                  >
                    <div className="stars mb-2">
                      {"★".repeat(5)}
                    </div>
                    <Card.Text className="testimonial-text">
                      {item.text}
                    </Card.Text>
                  </div>

                  {/* Avatar + tên */}
                  <div className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{item.name}</h6>
                      <small className="text-muted">{item.email}</small>
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
