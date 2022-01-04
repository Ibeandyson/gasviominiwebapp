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

interface saleGasProps {
	user_id: string;
	email: string;
	phone: string;
	address: string;
	firstName: string;
	lastName: string;
	cylinderSize: string;
	cylinderAge: string;
	staffFirstName: string;
	staffLastName: string;
	staffRole: string;
	refillDate: string;
	refillKg: string;
	amount: string;
};
const useStaff = () => {
	const [loading, setLoading] = useState(false)
	const { useShowNotify } = useNotify()
	const [staffCount, setSaffCount] = useState()
	const [purchaseCount, setPurchaseCount] = useState()


	const addStaff = (data: addStaffProps) => {
		setLoading(true)
		const options: AxiosRequestConfig<any> = {
			url: "/api/staff",
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
					if (err.response?.data.firstName) {
						useShowNotify(err.response?.data.firstName, "error")
					}
					if (err.response?.data.lastName) {
						useShowNotify(err.response?.data.lastName, "error")
					}
					if (err.response?.data.address) {
						useShowNotify(err.response?.data.address, "error")
					}
					if (err.response?.data.role) {
						useShowNotify(err.response?.data.role, "error")
					}
					if (err.response?.data.password) {
						useShowNotify(err.response?.data.password, "error")
					}
					if (err.response?.data.password2) {
						useShowNotify(err.response?.data.password2, "error")
					}

				}
				if (err.response.status === 500) {
					useShowNotify("something went bad contact the engineer", "error")
				}
				if (err.response.status === 403) {
					useShowNotify(err.response?.data.emailError, "error")
				}
			});
	};

	const saleGas = (data: saleGasProps) => {
		setLoading(true)
		const options: AxiosRequestConfig<any> = {
			url: "/api/sale_gas",
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
					if (err.response?.data.amount) {
						useShowNotify(err.response?.data.amount, "error")
					}
					if (err.response?.data.refillKg) {
						useShowNotify(err.response?.data.refillKg, "error")
					}
				}
				if (err.response.status === 500) {
					useShowNotify("something went bad contact the engineer", "error")
				}
			});
	};

	const countStaff = () => {
		setLoading(true)
		const options: AxiosRequestConfig<any> = {
			url: `/api/staffCount`,
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			}
		};
		axios(options)
			.then((response: any) => {
				setLoading(false)
				setSaffCount(response.data.data)
			})
			.catch((err: any) => {
				setLoading(false)
				if (err.response.status === 500) {
					useShowNotify("something went bad contact the engineer", "error")
				}
			});
	}

	const countPurchase = () => {
		setLoading(true)
		const options: AxiosRequestConfig<any> = {
			url: `/api/purchaseCount`,
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			}
		};
		axios(options)
			.then((response: any) => {
				setLoading(false)
				setPurchaseCount(response.data.data)
			})
			.catch((err: any) => {
				setLoading(false)
				if (err.response.status === 500) {
					useShowNotify("something went bad contact the engineer", "error")
				}
			});
	}

	return {
		addStaff,
		saleGas,
		countStaff,
		countPurchase,
		purchaseCountData: purchaseCount,
		staffCountData: staffCount,
		loading: loading,
	}
}
export default useStaff