import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import {
  Card,
  InputGroup,
  SplitButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import { Header, Loader } from "../src/components";
import useCustomer from "../src/hooks/useCustomer";
import Moment from "react-moment";
import withAuth from "../src/hoc/withAuth";

const Customers: NextPage = () => {
  const [query, setQuery] = useState({
    name: "",
    keyword: "",
  });
  const { getAllCustomer, customerData, fillerCustomer, loading } =
    useCustomer();

  useEffect(() => {
    getAllCustomer();
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
        <main style={{ marginTop: "50px" }}>
          <Card className="shadow-sm p-3 mb-5 bg-body rounde">
            <Card.Header>
              <Card.Title>
                <b>Customers</b>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div>
                <InputGroup className="shadow-lg mb-5 mt-3">
                  <SplitButton
                    variant="primary"
                    title="Apply"
                    id="segmented-button-dropdown-1"
                    onClick={() => fillerCustomer(query)}
                  >
                    <Dropdown.Item
                      onClick={() => setQuery({ ...query, name: "_id" })}
                    >
                      By Id
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => setQuery({ ...query, name: "email" })}
                    >
                      By Email
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() =>
                        setQuery({ ...query, name: "cylinderSize" })
                      }
                    >
                      By Size of Cylinder
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() =>
                        setQuery({ ...query, name: "cylinderAge" })
                      }
                    >
                      By Age of Cylinder
                    </Dropdown.Item>

                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => setQuery({ ...query, name: "created_at" })}
                    >
                      By Join Date
                    </Dropdown.Item>

                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() =>
                        setQuery({ ...query, name: "lastRefillDate" })
                      }
                    >
                      By Last Refilled Date
                    </Dropdown.Item>

                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() =>
                        setQuery({ ...query, name: "lastRefillKg" })
                      }
                    >
                      By Last Refilled Kg
                    </Dropdown.Item>
                  </SplitButton>
                  <FormControl
                    type={
                      query.name === "cylinderAge" ||
                      query.name === "created_at" ||
                      query.name === "lastRefillDate"
                        ? "date"
                        : "text"
                    }
                    onChange={(e: any) =>
                      setQuery({ ...query, keyword: e.target.value })
                    }
                    aria-label="Text input with dropdown button"
                  />
                </InputGroup>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr style={{ width: "100%", fontSize: "13px" }}>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Cylinder Size</th>
                      <th>Cylinder Age</th>
                      <th>Last Refill Date</th>
                      <th>Last Refilled Kg</th>
                      <th>Staff Name</th>
                      <th>Staff Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData[0] !== null
                      ? customerData?.map((data: any) => (
                          <tr style={{ fontSize: "13px" }} key={data?._id}>
                            <td>{data?.firstName}</td>
                            <td>{data?.lastName}</td>
                            <td>{data?.email}</td>
                            <td>{data?.address}</td>
                            <td>{data?.phone}</td>
                            <td>{data?.cylinderSize} Kg</td>
                            <td>
                              <Moment fromNow ago>
                                {data?.cylinderAge}
                              </Moment>
                            </td>
                            {data?.purchase?.lastRefillDate === "none" ? (
                              <td>{data?.purchase?.lastRefillDate}</td>
                            ) : (
                              <td>
                                <Moment fromNow>
                                  {data?.purchase?.lastRefillDate}
                                </Moment>
                              </td>
                            )}
                            <td>{data?.purchase?.lastRefillKg} kg</td>
                            <td>{data?.staffData?.firstName}</td>
                            <td>{data?.staffData?.role}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              <div className="text-center"></div>
            </Card.Body>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Customers, true);
