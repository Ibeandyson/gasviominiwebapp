import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import { Form, Button, Card } from "react-bootstrap";
import { Header } from "../src/components";

const Home: NextPage = () => {
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
        <Card className="shadow-sm p-3 mb-5 bg-body rounde">
          <Card.Body>
            <Form>
              <Form.Group className="mb-5 mt-3" controlId="formBasicEmail">
                <Form.Control
                  className="form"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-5 mt-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Enter Password" />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </main>
      </div>
     
    </div>
  );
};

export default Home;
