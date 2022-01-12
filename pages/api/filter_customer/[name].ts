import { getCustomerByFilter} from "../../../src/backend/controller/customers";

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "GET": {
            return getCustomerByFilter(req, res);
        }
    }
}
export default handler;