import { useState } from "react"

let data = false
const useModal = () => {
	const [modalShow, setModalShow] = useState<boolean>(false);
	const setModaleState = (val: boolean) => {
	}
	return {
		setModaleState,
		setModalShow,
		modalShow: data
	}
}

export default useModal;