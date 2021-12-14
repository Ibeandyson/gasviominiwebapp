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
	const { useShowNotify } = useNotify()


	const addStaff = (data: addStaffProps) => {
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
			})
			.catch((err: any) => {
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
				if(err.response.status === 500){
					useShowNotify("something went bad contact the engineer", "error")
				}
				if(err.response.status === 403){
					useShowNotify(err.response?.data.emailError, "error")
				}
			});
	};
	return {
		addStaff,
	}
}
export default useStaff