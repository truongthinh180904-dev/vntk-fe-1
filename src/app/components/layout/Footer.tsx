import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import logofooter from "../../assets/img/home/footer/logofooter.png";
import bgfooter from "../../assets/img/home/footer/bg-footer.webp";
import logoianta from "../../assets/img/home/footer/logoianta.png";
import notification from "../../assets/img/home/footer/thong-bao-bo-cong-thuong.png";
import leftimg from "../../assets/img/home/footer/thanhtoan.png";
import righdemo from "../../assets/img/home/footer/lienhe.png";
import footerairlines from "../../assets/img/home/footer/footerhangbay.png";

export default function Footer() {
  return (
    <footer
      className="text-light pt-4"
      style={{
        backgroundImage: `url(${bgfooter.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        {/* HÀNG TRÊN CÙNG: Logo + Newsletter */}
        <Row className="align-items-center mb-4">
          <Col md={6} sm={12} className="d-flex align-items-center">
            <Image
              src={logofooter.src}
              alt="Logo Việt Nam Tickets"
              width={230}
              height={60}
              className="me-3"
            />
          </Col>

          <Col md={6} sm={12}>
            <div className=" d-flex mt-2 flex-column flex-md-row justify-content-md-end align-items-md-center gap-2" style={{textAlign:"center"}}>
              <div className="d-none d-md-block">
                <h2 className="mb-1 footer-title fw-bold text-white">Đăng kí tư vấn</h2>
                <p className="small mb-0 text-light">
                  Hỗ trợ khách hàng 24/7
                </p>
                </div>

             <div
              className="d-flex justify-content-center align-items-center"
              style={{
             
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  width: "320px",
                }}
              >
                <input
                  type="email"
                  placeholder="Nhập email/số điện thoại của bạn"
                  className="form-control border-0"
                  style={{
                    flex: 1,
                    fontSize: "14px",
                    padding: "10px 12px",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                <button
                  className="fw-semibold"
                  style={{
                    backgroundColor: "#FFA500",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    fontSize: "13px",
                    height: "100%",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff8c00")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFA500")}
                >
                  GỬI
                </button>
              </div>
          </div>
            </div>
          </Col>
        </Row>

        <hr className="border-light opacity-50 my-4" />

        {/* HÀNG DƯỚI: 4 CỘT */}
        <Row className="gy-4">
          {/* Cột 1 */}
          <Col md={5} sm={12}>
            <h2 className="footer-title fw-bold text-uppercase mb-3">
              Văn phòng tại TP Hồ Chí Minh
            </h2>
            <p className="mb-1 small">
              Trụ sở chính: 69 Võ Thị Sáu, P.6, Q.3, TP.HCM
            </p>
            <p className="mb-1 small">
              Chi nhánh: 173 Nguyễn Thị Minh Khai, P.Phạm Ngũ Lão, Q.1, TP.HCM
            </p>
            <p className="mb-1 small">
              Điện thoại:{" "}
              <strong className="text-warning">
                1900 3173 - (028) 3936 2020 - (028) 3925 9950
              </strong>
            </p>
            <p className="mb-1 small">
              Email:{" "}
              <a
                href="mailto:info@vietnam-tickets.com"
                className="text-light text-decoration-none"
              >
               vietnamtickets16@gmail.com
              </a>
            </p>
            <p className="mb-1 small">
              Website:{" "}
              <a
                href="https://vietnam-tickets.com"
                className="text-light text-decoration-none"
              >
                vietnam-tickets.com
              </a>
            </p>
            <p className="mb-0 small">GPĐK: 0314558363</p>
          </Col>
      <hr className="border-light d-flex d-md-none my-4 opacity-50" />
        {/* Cột 2 */}
      <Col
        md={2}
        sm={6}
        xs={4}
        className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start"
      >
        {/* Tiêu đề */}
        <h2
          className="footer-title fw-bold text-uppercase mb-3"
          style={{
            textDecoration: "none",
            borderBottom: "none",
            color: "#fff",
          }}
        >
          Giới thiệu
        </h2>

        {/* Danh sách link */}
        <ul className="list-unstyled small mb-3" style={{ textAlign: "left" }}>
          <li>
            <a
              href="/gioi-thieu"
              className="footer-link text-light"
              style={{
                textDecoration: "none",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Về chúng tôi
            </a>
          </li>
          <li>
            <a
              href="/tuyen-dung"
              className="footer-link text-light"
              style={{
                textDecoration: "none",
                display: "block",
              }}
            >
              Tuyển dụng
            </a>
          </li>
        </ul>

        {/* Box chứa 2 ảnh */}
        <div
          className="d-none d-md-flex"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >

        <Image
          src={logoianta}
          alt="Logo ianta"
          width={100}
          height={60}
          style={{
            borderRadius: "6px",
            marginRight: "10px",
          }}
        />

          <Image
            src={notification.src}
            alt="Chứng nhận"
            width={150}
            height={50}
            style={{
              borderRadius: "6px",
            }}
          />
        </div>
      </Col>


          {/* Cột 3 */}
          <Col md={2} sm={6} xs={4}>
            <h6 className="fw-bold text-uppercase mb-3">Dịch vụ</h6>
            <ul className="list-unstyled small" >
              <li>
                <a href="/ve-noi-dia" style={{ textDecoration: "none"}} className="footer-link text-light">
                  Vé máy bay nội địa
                </a>
              </li>
              <li>
                <a href="/ve-quoc-te"style={{ textDecoration: "none"}} className="footer-link text-light">
                  Vé máy bay quốc tế
                </a>
              </li>
              <li>
                <a href="/visa" style={{ textDecoration: "none"}} className="footer-link text-light">
                  Dịch vụ visa
                </a>
              </li>
              <li>
                <a href="/tour" style={{ textDecoration: "none"}} className="footer-link text-light">
                  Tour du lịch
                </a>
              </li>
            </ul>
          </Col>

          {/* Cột 4 */}
          <Col md={3} sm={6} xs={4}>
            <h6 className="fw-bold text-uppercase mb-3">Hỗ trợ</h6>
            <ul className="list-unstyled small" style={{ textDecoration: "none"}}>
              <li>
                <a href="/lien-he" style={{ textDecoration: "none"}} className="footer-link text-light">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/thanh-toan" style={{ textDecoration: "none"}} className="footer-link text-light">
                  Thanh toán
                </a>
              </li>
              <li>
                <a href="/bao-mat" style={{ textDecoration: "none"}} className="footer-link text-light">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </Col>

        </Row>
          <hr className="border-light my-4 opacity-50" />
          <Row
            className="align-items-center d-none d-md-flex justify-content-between py-3"
            style={{
              background: "linear-gradient(90deg, #0056b3 0%, #007bff 100%)",
              color: "#fff",
              borderRadius: "8px 8px 0 0",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
     

      {/* Cột phải: Theo dõi chúng tôi */}
      <Col md={6} sm={12} className="mb-3 mb-md-0">
        <div className="d-flex flex-column flex-md-row justify-content-md-start align-items-center gap-2">
          <h6 className="fw-bold mb-0">Theo dõi chúng tôi:</h6>
          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            <Image src={righdemo.src} alt="Visa" height={30} width={220} />
          </div>
        </div>
      </Col>

       {/* Cột trái: Hình thức thanh toán */}
      <Col md={6} sm={12} className="mb-3 mb-md-0">
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <h2 className="footer-title fw-bold mb-0">Hình thức thanh toán:</h2>
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-md-0">
            <Image src={leftimg.src} alt="Visa" height={30} width={220} />
          </div>
        </div>
      </Col>
         </Row>

        <Row
            className="align-items-center d-flex d-md-none justify-content-between py-3"
            style={{
              borderRadius: "8px 8px 0 0",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
     

      {/* Cột phải: Theo dõi chúng tôi */}
      <Col md={6} sm={12} className="mb-3 mb-md-0">
        <div className="d-flex flex-column flex-md-row justify-content-md-start align-items-center gap-2">
          <h6 className="fw-bold mb-0">Theo dõi chúng tôi:</h6>
          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            <Image src={righdemo.src} alt="Visa" height={30} width={200}  />
          </div>
        </div>
      </Col>

       {/* Cột trái: Hình thức thanh toán */}
      <Col md={6} sm={12} className="mb-3 mb-md-0">
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <h2 className="footer-title fw-bold mb-0">Hình thức thanh toán : </h2>
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-md-0">
            <Image src={leftimg.src} alt="Visa" height={30} width={300}  />
          </div>
        </div>
      </Col>
    </Row>

    {/* Hàng dưới: Logo hãng bay */}
    <Row
      className="align-items-center d-none d-md-flex justify-content-center py-3"
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "0 0 8px 8px",
      }}
    >
      <Col md={12}>
        <div className="d-flex   justify-content-center align-items-center flex-wrap gap-3">
            {/* Ảnh trang trí bên trái */}
            <Image
              src={footerairlines.src}
              alt="Decor left"
              height={30}
              width={600}
              style={{opacity: 0.9 }}
            />
          </div>
        </Col>

        </Row>
        <hr className="border-light opacity-50" />
        <div className="text-center small pb-2">
          © 2026 Vietnam Tickets. All rights reserved.
        </div>
      </Container>

     </footer>
  );
}
