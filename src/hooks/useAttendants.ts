import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface addAttendanceProps {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    role: boolean;
};
const useAttendance = () => {
    const [state, setstate] = useState()

    const addAttendance = (data: addAttendanceProps) => {
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
                console.log(err);
            });
    };
}