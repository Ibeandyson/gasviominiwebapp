import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Header, Loader } from "../src/components";
import styles from "../styles/AddStaff.module.css";
import useCustomer from "../src/hooks/useCustomer";
import dynamic from "next/dynamic";
import crypto from "crypto";
const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});
import withAuth from "../src/hoc/withAuth";

type formData = {
  _id: string;
  email: string;
  phone: string;
  address: string;
  firstName: string;
  lastName: string;
  cylinderSize: string;
  cylinderAge: string;
  dob: string;
  staffFirstName: string;
  staffLastName: string;
  staffRole: string;
};

const AddCustomer: NextPage = () => {
 
  const [formInput, setFormInput] = useState<formData>({
    _id: "",
    email: "",
    phone: "",
    address: "",
    firstName: "",
    lastName: "",
    cylinderSize: "",
    cylinderAge: "",
    dob: "",
    staffFirstName: "",
    staffLastName: "",
    staffRole: "",
  });

  const {
    _id,
    email,
    phone,
    address,
    lastName,
    firstName,
    dob,
    cylinderAge,
    cylinderSize,
  } = formInput;

  const onChangeHandler = (e: any) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleScan = (data: any) => {
    if (data) {
      setFormInput({ ...formInput, _id: data });
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };

  const { addCustomer, loading } = useCustomer();
  const onSubmit = (e: any) => {
    e.preventDefault();
    addCustomer(formInput);
  };

  //LOCAL STORAGE ENCRYPTION AND DECYPTION keys
  let aeskey: any = "MvYiDO2ePasOLVcN";
  let ivKey: any = "RQBblIzmI3UhH0N9";

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("staff_data")) {
        let data: any = localStorage.getItem("staff_data");
        const md5Key = crypto
          .createHash("md5")
          .update(aeskey)
          .digest("hex")
          .substr(0, 24);
        const decipher = crypto.createDecipheriv(
          "des-ede3",
          md5Key,
          ivKey,
          aeskey
        );
        let decrypted = decipher.update(data, "base64", "utf8");
        decrypted += decipher.final("utf8");
        const _staffData = JSON.parse(decrypted);
        setFormInput({
          ...formInput,
          staffFirstName: _staffData.firstName,
          staffLastName: _staffData.lastName,
          staffRole: _staffData.role,
        });
        console.log("dkk",_staffData)
      }
    } else {
      return undefined
    }
  }, []);


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {loading && <Loader />}
      <div className={styles.container}>
        <main className={styles.main}>
          <Card className="shadow-sm p-3 mb-5 bg-body rounde">
            <Card.Header>
              <Card.Title>
                <b>Register Customer</b>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {_id.length < 1 ? (
                <div>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="mb-3 mt-3 text-center">
                        <QrReader
                          delay={300}
                          onScan={(val) => handleScan(val)}
                          onError={handleError}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          className="form"
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          className="form"
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          className="form"
                          type="number"
                          placeholder="Phone"
                          name="phone"
                          value={phone}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          className="form"
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={address}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          className="form"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          className="form"
                          type="date"
                          placeholder="DOB"
                          name="dob"
                          value={dob}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Cylinder Age</Form.Label>
                        <Form.Control
                          className="form"
                          type="date"
                          placeholder="Cylinder Age"
                          name="cylinderAge"
                          value={cylinderAge}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group
                        className="mb-5 mt-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Cylinder Size</Form.Label>
                        <Form.Control
                          className="form"
                          type="number"
                          placeholder="Cylinder Size"
                          name="cylinderSize"
                          min="1"
                          value={cylinderSize}
                          onChange={(e) => onChangeHandler(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <div className="text-center mt-4">
                        <Button
                          className="mb-5 mt-3"
                          variant="primary"
                          onClick={onSubmit}
                        >
                          Register Customer
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default  withAuth(AddCustomer, false) ;
