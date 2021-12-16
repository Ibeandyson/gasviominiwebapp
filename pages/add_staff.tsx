import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Header, Loader } from "../src/components";
import styles from "../styles/AddStaff.module.css";
import useStaff from "../src/hooks/useStaff";

type formData = {
  email: string;
  phone: string;
  address: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
  role: string;
};

const AddStaff: NextPage = () => {
  const [formInput, setFormInput] = useState<formData>({
    email: "",
    phone: "",
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    role: "",
  });
  const {
    email,
    phone,
    address,
    lastName,
    firstName,
    password,
    password2,
    role,
  } = formInput;

  const onChangeHandler = (e: any) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  
  const { addStaff, loading } = useStaff();
  const onSubmit = (e: any) => {
    e.preventDefault();
    addStaff(formInput);
  };

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
              <p>
                <b>Add Staff</b>
              </p>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
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
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
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
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
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
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
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
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
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
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
                    <Form.Control
                      className="form"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
                    <Form.Control
                      className="form"
                      type="password"
                      placeholder="Comfirm Password"
                      name="password2"
                      value={password2}
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Select
                    className="mb-5 mt-3"
                    name="role"
                    value={role}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option hidden>{">>> Choose Role <<<"} </option>
                    <option value="attendant">Gas Attendant</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Col>
                <Col sm={12} md={4}>
                  <div style={{ float: "right" }}>
                    <Button
                      className="mb-5 mt-3"
                      variant="primary"
                      onClick={onSubmit}
                    >
                      Add Sfaff
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddStaff;