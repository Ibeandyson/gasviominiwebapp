import { saleGas } from "../../src/backend/controller/staff"

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "POST": {
            return saleGas(req, res);
        }
    }
}
export default handler;