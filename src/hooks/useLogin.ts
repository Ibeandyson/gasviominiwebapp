import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useNotify from "../hooks/useNotify"
import { useRouter } from "next/router";


interface addStaffProps {
    email: string;
    password: string;

};
const useStaff = () => {
    const [loading, setLoading] = useState(false)
    const { useShowNotify } = useNotify()
    const Router = useRouter();


    const login = (data: addStaffProps) => {
        setLoading(true)
        const options: AxiosRequestConfig<any> = {
            url: "/api/login",
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
                    useShowNotify("Logedin successfully", "success")
                }
                setLoading(false)
                Router.replace("/add_staff")
            })
            .catch((err: any) => {
                setLoading(false)
                if (err.response.status === 400) {
                    if (err.response?.data.email) {
                        useShowNotify(err.response?.data.email, "error")
                    }
                    if (err.response?.data.password) {
                        useShowNotify(err.response?.data.password, "error")
                    }
                    if (err.response?.data.passwordincorrect) {
                        useShowNotify(err.response?.data.passwordincorrect, "error")
                    }
                }
                if (err.response.status === 500) {
                    useShowNotify("something went bad contact the engineer", "error")
                }
                if (err.response.status === 404) {
                    useShowNotify(err.response?.data.emailError, "error")
                }

            });
    };
    return {
        login,
        loading: loading,
    }
}
export default useStaff