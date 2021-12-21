import { getOneCustomerById } from "../../../src/backend/controller/customers";

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "GET": {
            return getOneCustomerById(req, res);
        }
    }
}
export default handler;