import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useNotify from "../hooks/useNotify"
import useModal from "../hooks/useModal"



interface addCustomerProps {
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



const useCustomer = () => {
  const [loading, setLoading] = useState(false)
  const [oneCustomer, setOneCustomer] = useState({})
  const [customer, setCustomer] = useState([])
  const [customerCount, setCustomerCount] = useState('')
  const { useShowNotify } = useNotify()
  const { setModalShow } = useModal()


  const addCustomer = (data: addCustomerProps) => {
    setLoading(true)
    const options: AxiosRequestConfig<any> = {
      url: "/api/customer",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        data,
      },
    };
    axios(options)
      .then((response: any) => {
        if (response.status === 200) {
          useShowNotify(response.data?.message, "success")
        }
        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false)
        if (err.response.status === 400) {
          if (err.response?.data.email) {
            useShowNotify(err.response?.data.email, "error")
          }
          if (err.response?.data.phone) {
            useShowNotify(err.response?.data.phone, "error")
          }
          if (err.response?.data._id) {
            useShowNotify(err.response?.data._id, "error")
          }
          if (err.response?.data.firstName) {
            useShowNotify(err.response?.data.firstName, "error")
          }
          if (err.response?.data.lastName) {
            useShowNotify(err.response?.data.lastName, "error")
          }
          if (err.response?.data.address) {
            useShowNotify(err.response?.data.address, "error")
          }
          if (err.response?.data.cylinderAge) {
            useShowNotify(err.response?.data.cylinderAge, "error")
          }
          if (err.response?.data.cylinderSize) {
            useShowNotify(err.response?.data.cylinderSize, "error")
          }
        }
        if (err.response.status === 500) {
          useShowNotify("something went bad contact the engineer", "error")
        }
        if (err.response.status === 403) {
          if (err.response?.data.emailError) {
            useShowNotify(err.response?.data.emailError, "error")
          }
          if (err.response?.data.qrCodeError) {
            useShowNotify(err.response?.data.qrCodeError, "error")
          }

        }
      });
  };

  const getOneUser = (data: object) => {
    setLoading(true)

    const options: AxiosRequestConfig<any> = {
      url: `/api/getOneCustomer/${data}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    };
    axios(options)
      .then((response: any) => {
        setLoading(false)
        setOneCustomer(response.data.data)
        setModalShow(true)
      })
      .catch((err: any) => {
        setLoading(false)
        if (err.response.status === 500) {
          useShowNotify("something went bad contact the engineer", "error")
        }
      });
  }

  const updateOneUser = (data: any) => {
    setLoading(true)
    const options: AxiosRequestConfig<any> = {
      url: "/api/customer",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        data,
      },
    };
    axios(options)
      .then((response: any) => {
        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false)
        if (err.response.status === 500) {
          useShowNotify("something went bad contact the engineer", "error")
        }
      });
  }

  const getAllCustomer = () => {
    setLoading(true)
    const options: AxiosRequestConfig<any> = {
      url: "/api/customer",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    };
    axios(options)
      .then((response: any) => {
        setLoading(false)
        setCustomer(response.data.data)
      })
      .catch((err: any) => {
        setLoading(false)
        if (err.response.status === 500) {
          useShowNotify("something went bad contact the engineer", "error")
        }
      });
  }

  const fillerCustomer = (data: any) => {
    setLoading(true)

    const options: AxiosRequestConfig<any> = {
      url: `/api/fillter_customer/${data.name}?keyword=${data.keyword}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    };
    axios(options)
      .then((response: any) => {
        setLoading(false)
        setCustomer(response.data.data)
        setModalShow(true)
      })
      .catch((err: any) => {
        setLoading(false)
        if (err.response.status === 500) {
          useShowNotify("something went bad contact the engineer", "error")
        }
      });
  }

  const countCustomer = () => {
    setLoading(true)
    const options: AxiosRequestConfig<any> = {
      url: `/api/customerCount`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    };
    axios(options)
      .then((response: any) => {
        setLoading(false)
        setCustomerCount(response.data.data)
        setModalShow(true)
      })
      .catch((err: any) => {
        setLoading(false)
        if (err.response.status === 500) {
          useShowNotify("something went bad contact the engineer", "error")
        }
      });
  }

  return {
    addCustomer,
    getOneUser,
    updateOneUser,
    getAllCustomer,
    fillerCustomer,
    countCustomer,
    oneCustomerData: oneCustomer,
    customerData: customer,
    customerCountData: customerCount,
    loading: loading,
  }
}
export default useCustomer;