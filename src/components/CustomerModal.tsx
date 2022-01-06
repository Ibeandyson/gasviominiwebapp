import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Moment from "react-moment";

const CustomerModal = (props: any) => {
  return (
    <div>
      <Modal
        show={props.modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Customer Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Full Name</b>
                <p style={{ fontSize: "14px" }}>
                  {props.data?.firstName} {props.data?.lastName}
                </p>
              </p>
            </Col>
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Email Address</b>
                <p style={{ fontSize: "14px" }}>{props.data?.email}</p>
              </p>
            </Col>
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Phone Number</b>
                <p style={{ fontSize: "14px" }}>{props.data?.phone}</p>
              </p>
            </Col>
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Address</b>
                <p style={{ fontSize: "14px" }}>{props.data?.address}</p>
              </p>
            </Col>
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Cylinder Size</b>
                <p style={{ fontSize: "14px" }}>{props.data?.cylinderSize} kg</p>
              </p>
            </Col>
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Cylinder Age</b>
                <p style={{ fontSize: "14px" }}>
                  <Moment fromNow ago>
                    {props.data?.cylinderAge}
                  </Moment>
                </p>
              </p>
            </Col>
            
            <Col sm="12" md="6">
              <p style={{ fontSize: "16px" }}>
                <b>Last Refilled Kg</b>
                <p style={{ fontSize: "14px" }}>
                  {props.data?.purchase?.lastRefillKg} kg
                </p>
              </p>
            </Col>
            <Col sm="12" md="6">
              {props.data?.purchase?.lastRefillDate === "none" ? (
                <p style={{ fontSize: "16px" }}>
                  <b>Last Refilled Kg</b>
                  <p style={{ fontSize: "14px" }}>
                    {props.data?.purchase?.lastRefillDate}
                  </p>
                </p>
              ) : (
                <p style={{ fontSize: "16px" }}>
                  <b>Last Refilled Kg</b>
                  <p style={{ fontSize: "14px" }}>
                    <Moment fromNow>
                      {props.data?.purchase?.lastRefillDate} 
                    </Moment>
                  </p>
                </p>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.hide(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerModal;
