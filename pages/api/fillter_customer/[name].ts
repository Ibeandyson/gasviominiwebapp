import { getCustomerByFillter} from "../../../src/backend/controller/customers";

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "GET": {
            return getCustomerByFillter(req, res);
        }
    }
}
export default handler;