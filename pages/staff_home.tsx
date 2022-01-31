import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import { Button, Row, Col } from "react-bootstrap";
import { Header, Loader } from "../src/components";
import withAuth from "../src/hoc/withAuth";
import Link from "next/link";

const StaffHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <Link passHref href="/gas_purchase">
            <button type="button" className="btn btn-primary btn-lg btn-block">
              {" "}
              Add Customer
            </button>
          </Link>
          <Link passHref href="/gas_purchase">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block mt-5"
            >
              Sell Gas
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default withAuth(StaffHome, false);
