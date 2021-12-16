import { useState } from "react";
import { uuid } from "uuidv4"

const useCreateId = () => {
    const [uid, setUid] = useState('')

    const createId = () => {
        let id = uuid()
        setUid(id)
    }
return {
    createId,
    uid,
    setUid,
}
}
export default useCreateId 