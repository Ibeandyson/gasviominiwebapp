import { getSalesByFilter} from "../../../src/backend/controller/staff";

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "GET": {
            return getSalesByFilter(req, res);
        }
    }
}
export default handler;