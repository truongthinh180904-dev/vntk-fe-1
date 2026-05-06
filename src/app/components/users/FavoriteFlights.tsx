"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";

interface FavoriteFlight {
  from: string;
  to: string;
  month?: string;
  weekend?: boolean;
  season?: string;
}

export default function FavoriteFlights() {
  const [showModal, setShowModal] = useState(false);
  const [flights, setFlights] = useState<FavoriteFlight[]>([
    // Demo data
    { from: "Hà Nội", to: "Đà Nẵng", month: "6,7", weekend: true, season: "Hạ" },
    { from: "TP.HCM", to: "Nha Trang", month: "4,5", weekend: false, season: "Xuân" },
    { from: "Đà Lạt", to: "Phú Quốc", month: "12", weekend: true, season: "Đông" }
  ]);
  const [newFlight, setNewFlight] = useState<FavoriteFlight>({
    from: "",
    to: "",
    month: "",
    weekend: false,
    season: "",
  });

  const handleAddFlight = () => {
    if (!newFlight.from || !newFlight.to) return;
    setFlights([...flights, newFlight]);
    setShowModal(false);
    setNewFlight({ from: "", to: "", month: "", weekend: false, season: "" });
    alert(
      "Chúng tôi sẽ gửi đề xuất các chuyến bay phù hợp qua email cho bạn!"
    );
  };

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: "#1a237e" }}>Tuyến bay yêu thích</h4>
          <p className="text-muted small">Quản lý các tuyến bay bạn thường xuyên tìm kiếm</p>
        </div>
       <Button
        variant="primary"
        className="rounded-pill d-flex align-items-center justify-content-center shadow-sm"
        style={{ 
            width: 44, 
            height: 44, 
            fontSize: 20,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none"
        }}
        onClick={() => setShowModal(true)}
        >
        <Plus size={20} color="white" />
        </Button>
      </div>

      {/* Danh sách tuyến đã lưu */}
      <div className="list-group shadow-sm rounded-3 overflow-hidden">
        {flights.length === 0 && (
          <div className="text-muted text-center py-5 bg-light">
            <i className="bi bi-airplane fs-1 text-muted mb-2 d-block"></i>
            Bạn chưa lưu tuyến bay yêu thích nào.
            <br />
            <Button 
              variant="link" 
              className="p-0 mt-2"
              onClick={() => setShowModal(true)}
            >
              Thêm tuyến bay đầu tiên
            </Button>
          </div>
        )}
        {flights.map((f, idx) => (
          <div
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center py-3 border-0"
            style={{ 
              transition: "all 0.2s",
              borderBottom: "1px solid #f0f0f0 !important"
            }}
          >
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                   style={{ width: 48, height: 48 }}>
                <i className="bi bi-airplane-fill text-primary"></i>
              </div>
              <div>
                <div className="d-flex align-items-center mb-1">
                   <strong className="me-2" style={{ fontSize: "1.1rem" }}>
                    {f.from}
                    </strong>
                    <ArrowRight size={18} color="#333" className="mx-1" />
                    <strong className="ms-2" style={{ fontSize: "1.1rem" }}>
                     {f.to}
                    </strong>
                  {f.weekend && (
                    <Badge bg="warning" text="dark" className="ms-2">
                      Cuối tuần
                    </Badge>
                  )}
                </div>
                <div className="small text-muted">
                  {f.month && (
                    <span className="me-3">
                      <i className="bi bi-calendar3 me-1"></i>
                      Tháng: {f.month}
                    </span>
                  )}
                  {f.season && (
                    <span>
                      <i className="bi bi-tree me-1"></i>
                      Mùa: {f.season}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Badge
              bg="light"
              text="danger"
              className="border border-danger"
              pill
              style={{ 
                cursor: "pointer",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px"
              }}
              onClick={() =>
                setFlights(flights.filter((_, i) => i !== idx))
              }
            >
              ✕
            </Badge>
          </div>
        ))}
      </div>

      {/* Modal thêm tuyến mới */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered
        contentClassName="rounded-3 shadow-lg border-0"
        style={{zIndex:"99999"}}
      >
        <Modal.Header 
          closeButton 
          className="border-0 pb-0"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <Modal.Title className="text-white">
            <i className="bi bi-plus-circle me-2"></i>
            Thêm tuyến bay yêu thích
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Điểm đi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập điểm đi"
                value={newFlight.from}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, from: e.target.value })
                }
                className="rounded-2 py-2 border-0"
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Điểm đến</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập điểm đến"
                value={newFlight.to}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, to: e.target.value })
                }
                className="rounded-2 py-2 border-0"
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tháng dự kiến</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="VD: 11, 12"
                    value={newFlight.month}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, month: e.target.value })
                    }
                    className="rounded-2 py-2 border-0"
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Mùa</Form.Label>
                  <Form.Select
                    value={newFlight.season}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, season: e.target.value })
                    }
                    className="rounded-2 py-2 border-0"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <option value="">Chọn mùa</option>
                    <option value="Xuân">Xuân</option>
                    <option value="Hạ">Hạ</option>
                    <option value="Thu">Thu</option>
                    <option value="Đông">Đông</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Chuyến bay cuối tuần"
                checked={newFlight.weekend}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, weekend: e.target.checked })
                }
                className="fw-semibold"
              />
            </Form.Group>
          </Form>
          <div className="bg-light rounded-2 p-3 mt-3">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Chúng tôi sẽ gửi đề xuất các chuyến bay phù hợp qua email cho bạn.
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button 
            variant="light" 
            onClick={() => setShowModal(false)}
            className="rounded-2 px-4"
          >
            Hủy
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddFlight}
            className="rounded-2 px-4"
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none"
            }}
            disabled={!newFlight.from || !newFlight.to}
          >
            Lưu tuyến bay
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx global>{`
        .list-group-item:hover {
          background-color: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        
        .btn-primary:disabled {
          background: #6c757d !important;
          border-color: #6c757d !important;
        }
        
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          border-color: #667eea;
        }
        
        .modal-header .btn-close {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}