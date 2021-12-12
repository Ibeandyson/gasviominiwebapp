import {
    addStaff,
    getStaff,
    deleteStaff,
    updateStaff,
} from "../../src/backend/controller/staff";

export default async function handler(req: any, res: any) {
    switch (req.method) {
        case "GET": {
            return getStaff(req, res);
        }

        case "POST": {
            return addStaff(req, res);
        }

        case "PUT": {
            return updateStaff(req, res);
        }

        case "DELETE": {
            return deleteStaff(req, res);
        }
    }
}
