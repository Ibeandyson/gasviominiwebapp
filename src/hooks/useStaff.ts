import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useNotify from "../hooks/useNotify"

interface addStaffProps {
    email: string;
    phone: string;
    address: string;
    firstName: string;
    lastName: string;
    password: string;
    password2: string;
    role: string;
};
const useStaff = () => {
    const [state, setstate] = useState()
    const { useShowNotify } = useNotify()

    const addStaff = (data: addStaffProps) => {
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
                console.log(response.data.message);
            })
            .catch((err: any) => {
                useShowNotify('HI ERROR', "error")
            });
    };
    return {
        addStaff,
    }
}
export default useStaff