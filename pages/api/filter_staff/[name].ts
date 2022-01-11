import { getStaffByFilter } from "../../../src/backend/controller/staff";

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "GET": {
            return getStaffByFilter(req, res);
        }
    }
}
export default handler;