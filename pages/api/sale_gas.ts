import { saleGas, getAllSales } from "../../src/backend/controller/staff"

const handler = (req: any, res: any) => {
    switch (req.method) {
        case "POST": {
            return saleGas(req, res);
        }
        case "GET": {
            return getAllSales(req, res);
        }
    }
}
export default handler;