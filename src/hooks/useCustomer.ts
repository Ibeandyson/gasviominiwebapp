import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useNotify from "../hooks/useNotify"


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
};
const useCustomer = () => {
	const [loading, setLoading] = useState(false)
	const { useShowNotify } = useNotify()


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
				if(err.response.status === 500){
					useShowNotify("something went bad contact the engineer", "error")
				}
				if(err.response.status === 403){
					useShowNotify(err.response?.data.emailError, "error")
				}
			});
	};
	return {
		addCustomer,
		loading: loading,
	}
}
export default useCustomer;