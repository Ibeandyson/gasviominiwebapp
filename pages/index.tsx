import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Header, Loader } from "../src/components";
import useCustomer from "../src/hooks/useCustomer";
import useStaff from "../src/hooks/useStaff";
import withAuth from "../src/hoc/withAuth";

const Home: NextPage = () => {
  const { countCustomer, customerCountData, loading } = useCustomer();
  const {countStaff, countPurchase, staffCountData, purchaseCountData} = useStaff()

  useEffect(() => {
    countCustomer();
    countStaff();
    countPurchase();
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
        <main className="mt-5">
          <Row>
            <Col sm="12" md="4">
              <Card className="shadow-sm p-3 mb-5 bg-body rounde">
                <Card.Header>Total Customers</Card.Header>
                <Card.Body className="mt-3 text-center">
                  <p style={{ fontSize: "30px", fontWeight: "500" }}>
                    {customerCountData}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" md="4">
              <Card className="shadow-sm p-3 mb-5 bg-body rounde">
                <Card.Header>Total Staffs</Card.Header>
                <Card.Body className="mt-3 text-center">
                  <p style={{ fontSize: "30px", fontWeight: "500" }}>
                    {staffCountData}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" md="4">
            <Card className="shadow-sm p-3 mb-5 bg-body rounde">
                <Card.Header>Total Gas Purchase</Card.Header>
                <Card.Body className="mt-3 text-center">
                  <p style={{ fontSize: "30px", fontWeight: "500" }}>
                    {purchaseCountData}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Home, true)
